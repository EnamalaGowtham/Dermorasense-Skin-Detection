import sqlite3
import bcrypt
import os
import secrets
import hashlib
from datetime import datetime, timedelta
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "dermorasense.db")

def get_db_connection():
    """Get a connection to the SQLite database with Row factory enabled."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initialize SQLite tables for users and scans."""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create users table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        verified INTEGER DEFAULT 1,
        verification_token TEXT,
        verification_token_expires TIMESTAMP,
        reset_token TEXT,
        reset_token_expires TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    
    # Try adding columns to existing table if they don't exist (for backward compatibility during dev)
    try:
        cursor.execute("ALTER TABLE users ADD COLUMN verification_token_expires TIMESTAMP")
    except sqlite3.OperationalError:
        pass # Column already exists
        
    try:
        cursor.execute("ALTER TABLE users ADD COLUMN reset_token_expires TIMESTAMP")
    except sqlite3.OperationalError:
        pass # Column already exists
    
    # Auto-verify all existing users in the prototype for immediate login access
    cursor.execute("UPDATE users SET verified = 1")
    
    # Create password_reset_otps table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS password_reset_otps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        otp_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP NOT NULL,
        verified BOOLEAN DEFAULT 0,
        verification_attempts INTEGER DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    )
    """)
    
    # Create scans table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS scans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        image_path TEXT NOT NULL,
        prediction TEXT NOT NULL,
        confidence REAL NOT NULL,
        alternates TEXT NOT NULL, -- JSON list of {"class": str, "confidence": float}
        severity TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    )
    """)
    
    # Create learning_progress table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS learning_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL UNIQUE,
        diseases_viewed TEXT DEFAULT '[]',
        glossary_terms_viewed TEXT DEFAULT '[]',
        quizzes_completed INTEGER DEFAULT 0,
        best_score INTEGER DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    )
    """)

    # Create quiz_attempts table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS quiz_attempts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        difficulty TEXT NOT NULL,
        score INTEGER NOT NULL,
        max_score INTEGER NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    )
    """)

    # Create achievements table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS achievements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        achievement_id TEXT NOT NULL,
        unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE(user_id, achievement_id)
    )
    """)
    
    conn.commit()
    conn.close()

def hash_password(password: str) -> str:
    """Hash password using bcrypt."""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

def verify_password(password: str, hashed_str: str) -> bool:
    """Verify password against bcrypt hash."""
    try:
        return bcrypt.checkpw(password.encode('utf-8'), hashed_str.encode('utf-8'))
    except Exception:
        return False

# --- Authentication CRUD ---

def create_user(name: str, email: str, password: str):
    """Register a new user. Returns user dictionary or error message."""
    import random
    import string
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        email = email.strip().lower()
        # Check if email exists
        cursor.execute("SELECT id FROM users WHERE email = ?", (email,))
        if cursor.fetchone():
            return None, "Email is already registered"
            
        password_hash = hash_password(password)
        # Generate 6-digit numeric OTP
        verification_token = "".join(random.choices(string.digits, k=6))
        expires_at = datetime.utcnow() + timedelta(minutes=15)
        
        cursor.execute(
            "INSERT INTO users (name, email, password_hash, verification_token, verification_token_expires, verified) VALUES (?, ?, ?, ?, ?, 0)",
            (name, email, password_hash, verification_token, expires_at)
        )
        conn.commit()
        user_id = cursor.lastrowid
        
        return {
            "id": user_id,
            "name": name,
            "email": email,
            "verification_token": verification_token
        }, None
    except Exception as e:
        return None, f"Database error: {str(e)}"
    finally:
        conn.close()

def verify_email(token: str) -> bool:
    """Verify email using verification token."""
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT id, verification_token_expires FROM users WHERE verification_token = ?", (token,))
        user = cursor.fetchone()
        if user:
            # Check expiry
            if user["verification_token_expires"]:
                expires = datetime.strptime(user["verification_token_expires"], "%Y-%m-%d %H:%M:%S.%f")
                if datetime.utcnow() > expires:
                    return False
                    
            cursor.execute(
                "UPDATE users SET verified = 1, verification_token = NULL, verification_token_expires = NULL WHERE id = ?",
                (user["id"],)
            )
            conn.commit()
            return True
        return False
    except Exception:
        return False
    finally:
        conn.close()

def generate_reset_token(email: str):
    """Generate and save 6-digit numeric OTP for password reset."""
    import string
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        email = email.strip().lower()
        cursor.execute("SELECT id, name FROM users WHERE email = ?", (email,))
        user = cursor.fetchone()
        if not user:
            return None, "Email not found"
            
        user_id = user["id"]
        
        # Check rate limiting: max 3 requests in the last 15 minutes
        fifteen_mins_ago = datetime.utcnow() - timedelta(minutes=15)
        cursor.execute("SELECT COUNT(id) as count FROM password_reset_otps WHERE user_id = ? AND created_at > ?", (user_id, fifteen_mins_ago))
        count = cursor.fetchone()["count"]
        if count >= 3:
            return None, "Too many OTP requests. Please wait 15 minutes before trying again."
            
        # Generate 6-digit numeric OTP using secrets
        otp = "".join(secrets.choice(string.digits) for _ in range(6))
        
        # Hash OTP (SHA-256 is fast enough for 6 digits, but bcrypt is fine. We'll use SHA-256 to allow direct comparison since it's short lived)
        import hashlib
        otp_hash = hashlib.sha256(otp.encode()).hexdigest()
        
        # Invalidate any previously unverified OTPs for this user
        cursor.execute("UPDATE password_reset_otps SET verified = 1 WHERE user_id = ? AND verified = 0", (user_id,))
        
        expires_at = datetime.utcnow() + timedelta(minutes=5)
        cursor.execute(
            "INSERT INTO password_reset_otps (user_id, otp_hash, expires_at) VALUES (?, ?, ?)",
            (user_id, otp_hash, expires_at)
        )
        conn.commit()
        return otp, None
    except Exception as e:
        return None, f"Database error: {str(e)}"
    finally:
        conn.close()

def verify_reset_otp(email: str, otp: str):
    """Verify the 6-digit numeric OTP for password reset and generate a secure reset token."""
    import hashlib
    import secrets
    from datetime import datetime, timedelta
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        email = email.strip().lower()
        cursor.execute("SELECT id FROM users WHERE email = ?", (email,))
        user = cursor.fetchone()
        if not user:
            return None, "User not found"
            
        user_id = user["id"]
        
        # Get the latest active OTP for this user
        cursor.execute(
            "SELECT * FROM password_reset_otps WHERE user_id = ? AND verified = 0 ORDER BY created_at DESC LIMIT 1",
            (user_id,)
        )
        otp_record = cursor.fetchone()
        
        if not otp_record:
            return None, "No active OTP found"
            
        record_id = otp_record["id"]
        attempts = otp_record["verification_attempts"]
        
        if attempts >= 5:
            return None, "Too many failed attempts. Please request a new OTP."
            
        # Check expiry
        expires = datetime.strptime(otp_record["expires_at"], "%Y-%m-%d %H:%M:%S.%f")
        if datetime.utcnow() > expires:
            return None, "OTP has expired. Please request a new one."
            
        # Verify hash
        otp_hash = hashlib.sha256(otp.encode()).hexdigest()
        if otp_hash == otp_record["otp_hash"]:
            # Success
            cursor.execute("UPDATE password_reset_otps SET verified = 1 WHERE id = ?", (record_id,))
            
            # Generate secure reset token
            reset_token = secrets.token_urlsafe(32)
            reset_token_expires = datetime.utcnow() + timedelta(minutes=15)
            
            cursor.execute(
                "UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?",
                (reset_token, reset_token_expires, user_id)
            )
            
            conn.commit()
            return reset_token, None
        else:
            # Failed attempt
            cursor.execute("UPDATE password_reset_otps SET verification_attempts = verification_attempts + 1 WHERE id = ?", (record_id,))
            conn.commit()
            return None, "Invalid OTP"
            
    except Exception as e:
        return None, f"Database error: {str(e)}"
    finally:
        conn.close()

def reset_password(reset_token: str, new_password: str) -> bool:
    """Reset password after OTP verification using the short-lived reset token."""
    from datetime import datetime
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        if not reset_token:
            return False
            
        cursor.execute("SELECT id, reset_token_expires FROM users WHERE reset_token = ?", (reset_token,))
        user = cursor.fetchone()
        if not user:
            return False
            
        # Check expiry
        if not user["reset_token_expires"]:
            return False
            
        expires = datetime.strptime(user["reset_token_expires"], "%Y-%m-%d %H:%M:%S.%f")
        if datetime.utcnow() > expires:
            return False
            
        password_hash = hash_password(new_password)
        cursor.execute(
            "UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?",
            (password_hash, user["id"])
        )
        
        # Cleanup otps
        cursor.execute("DELETE FROM password_reset_otps WHERE user_id = ?", (user["id"],))
        
        conn.commit()
        return True
    except Exception:
        return False
    finally:
        conn.close()

def get_user_by_email(email: str):
    """Retrieve user details by email."""
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        email = email.strip().lower()
        cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
        row = cursor.fetchone()
        if row:
            return dict(row)
        return None
    finally:
        conn.close()

def get_user_by_id(user_id: int):
    """Retrieve user details by ID."""
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
        row = cursor.fetchone()
        if row:
            return dict(row)
        return None
    finally:
        conn.close()

def update_profile(user_id: int, name: str, email: str):
    """Update profile name and email."""
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        email = email.strip().lower()
        # Check if email is taken by another user
        cursor.execute("SELECT id FROM users WHERE email = ? AND id != ?", (email, user_id))
        if cursor.fetchone():
            return False, "Email is already taken by another user"
            
        cursor.execute(
            "UPDATE users SET name = ?, email = ? WHERE id = ?",
            (name, email, user_id)
        )
        conn.commit()
        return True, None
    except Exception as e:
        return False, f"Database error: {str(e)}"
    finally:
        conn.close()

def update_password(user_id: int, new_password: str):
    """Update user password."""
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        password_hash = hash_password(new_password)
        cursor.execute(
            "UPDATE users SET password_hash = ? WHERE id = ?",
            (password_hash, user_id)
        )
        conn.commit()
        return True
    except Exception:
        return False
    finally:
        conn.close()

def delete_user(user_id: int) -> bool:
    """Delete a user account and their data."""
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM users WHERE id = ?", (user_id,))
        conn.commit()
        return True
    except Exception:
        return False
    finally:
        conn.close()

# --- Scan CRUD ---

def create_scan(user_id: int, image_path: str, prediction: str, confidence: float, alternates: list, severity: str):
    """Save an analysis scan record."""
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        alternates_json = json.dumps(alternates)
        cursor.execute(
            """INSERT INTO scans (user_id, image_path, prediction, confidence, alternates, severity)
               VALUES (?, ?, ?, ?, ?, ?)""",
            (user_id, image_path, prediction, confidence, alternates_json, severity)
        )
        conn.commit()
        return cursor.lastrowid
    except Exception as e:
        print(f"Error creating scan: {e}")
        return None
    finally:
        conn.close()

def get_scan(scan_id: int):
    """Get scan by ID."""
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM scans WHERE id = ?", (scan_id,))
        row = cursor.fetchone()
        if row:
            scan_dict = dict(row)
            scan_dict["alternates"] = json.loads(scan_dict["alternates"])
            return scan_dict
        return None
    finally:
        conn.close()

def get_user_scans(user_id: int):
    """Get all scans for a user sorted by timestamp desc."""
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM scans WHERE user_id = ? ORDER BY timestamp DESC", (user_id,))
        rows = cursor.fetchall()
        scans = []
        for r in rows:
            scan_dict = dict(r)
            scan_dict["alternates"] = json.loads(scan_dict["alternates"])
            scans.append(scan_dict)
        return scans
    finally:
        conn.close()

def delete_scan(scan_id: int, user_id: int) -> bool:
    """Delete a scan record for a specific user to ensure ownership verification."""
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM scans WHERE id = ? AND user_id = ?", (scan_id, user_id))
        conn.commit()
        return cursor.rowcount > 0
    except Exception:
        return False
    finally:
        conn.close()

# --- Learning Progress CRUD ---

def get_learning_progress(user_id: int):
    """Get learning progress for a user."""
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM learning_progress WHERE user_id = ?", (user_id,))
        row = cursor.fetchone()
        if not row:
            # Create default progress
            cursor.execute(
                "INSERT INTO learning_progress (user_id) VALUES (?)", (user_id,)
            )
            conn.commit()
            cursor.execute("SELECT * FROM learning_progress WHERE user_id = ?", (user_id,))
            row = cursor.fetchone()
            
        progress = dict(row)
        progress["diseases_viewed"] = json.loads(progress["diseases_viewed"])
        progress["glossary_terms_viewed"] = json.loads(progress["glossary_terms_viewed"])
        
        # Get achievements
        cursor.execute("SELECT achievement_id, unlocked_at FROM achievements WHERE user_id = ?", (user_id,))
        achievements = [dict(r) for r in cursor.fetchall()]
        progress["achievements"] = achievements
        
        return progress
    finally:
        conn.close()

def save_quiz_result(user_id: int, difficulty: str, score: int, max_score: int):
    """Save a quiz attempt and update best score/achievements if applicable."""
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        # Save attempt
        cursor.execute(
            "INSERT INTO quiz_attempts (user_id, difficulty, score, max_score) VALUES (?, ?, ?, ?)",
            (user_id, difficulty, score, max_score)
        )
        
        # Update progress
        cursor.execute("SELECT * FROM learning_progress WHERE user_id = ?", (user_id,))
        row = cursor.fetchone()
        if not row:
            cursor.execute("INSERT INTO learning_progress (user_id) VALUES (?)", (user_id,))
            conn.commit()
            cursor.execute("SELECT * FROM learning_progress WHERE user_id = ?", (user_id,))
            row = cursor.fetchone()
            
        current_best = row["best_score"]
        quizzes_completed = row["quizzes_completed"] + 1
        
        score_percent = int((score / max_score) * 100) if max_score > 0 else 0
        new_best = max(current_best, score_percent)
        
        cursor.execute(
            "UPDATE learning_progress SET quizzes_completed = ?, best_score = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?",
            (quizzes_completed, new_best, user_id)
        )
        
        # Simple achievement logic
        new_achievements = []
        if quizzes_completed == 1:
            try:
                cursor.execute("INSERT INTO achievements (user_id, achievement_id) VALUES (?, ?)", (user_id, "first_quiz"))
                new_achievements.append("first_quiz")
            except sqlite3.IntegrityError:
                pass
                
        if quizzes_completed == 5:
            try:
                cursor.execute("INSERT INTO achievements (user_id, achievement_id) VALUES (?, ?)", (user_id, "5_quizzes"))
                new_achievements.append("5_quizzes")
            except sqlite3.IntegrityError:
                pass
                
        if quizzes_completed == 10:
            try:
                cursor.execute("INSERT INTO achievements (user_id, achievement_id) VALUES (?, ?)", (user_id, "10_quizzes"))
                new_achievements.append("10_quizzes")
            except sqlite3.IntegrityError:
                pass
                
        if score == max_score:
            try:
                cursor.execute("INSERT INTO achievements (user_id, achievement_id) VALUES (?, ?)", (user_id, "perfect_score"))
                new_achievements.append("perfect_score")
            except sqlite3.IntegrityError:
                pass
                
        conn.commit()
        return {"success": True, "new_best": new_best, "new_achievements": new_achievements}
    except Exception as e:
        print(f"Error saving quiz: {e}")
        return {"success": False, "error": str(e)}
    finally:
        conn.close()

def update_learning_view(user_id: int, view_type: str, item_id: str):
    """Mark a disease or glossary term as viewed."""
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM learning_progress WHERE user_id = ?", (user_id,))
        row = cursor.fetchone()
        if not row:
            cursor.execute("INSERT INTO learning_progress (user_id) VALUES (?)", (user_id,))
            conn.commit()
            cursor.execute("SELECT * FROM learning_progress WHERE user_id = ?", (user_id,))
            row = cursor.fetchone()
            
        progress = dict(row)
        field = "diseases_viewed" if view_type == "disease" else "glossary_terms_viewed"
        
        items = json.loads(progress[field])
        if item_id not in items:
            items.append(item_id)
            cursor.execute(
                f"UPDATE learning_progress SET {field} = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?",
                (json.dumps(items), user_id)
            )
            
            # Check for explorer achievement
            if field == "diseases_viewed" and len(items) >= 23:
                try:
                    cursor.execute("INSERT INTO achievements (user_id, achievement_id) VALUES (?, ?)", (user_id, "disease_explorer"))
                except sqlite3.IntegrityError:
                    pass
                    
            conn.commit()
        return True
    except Exception as e:
        print(f"Error updating view: {e}")
        return False
    finally:
        conn.close()
