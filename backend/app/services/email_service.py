import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import time

def send_otp_email(recipient_email: str, otp: str):
    print(f"\\n[LOG] Forgot Password Request Received. Starting SMTP Dispatch for: {recipient_email}")
    smtp_server = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER")
    smtp_password = os.getenv("SMTP_PASSWORD")
    
    print(f"\\n--- EMAIL VERIFICATION SIMULATION ---")
    print(f"To: {recipient_email}")
    print(f"OTP Code: {otp}")
    print(f"--------------------------------------\\n")
    
    if not smtp_user or not smtp_password:
        print("[LOG] WARNING: SMTP credentials not set in .env file. Skipping actual email dispatch.")
        raise Exception("SMTP credentials missing. Create .env file with SMTP_USER and SMTP_PASSWORD.")
        
    msg = MIMEMultipart()
    msg['From'] = smtp_user
    msg['To'] = recipient_email
    msg['Subject'] = "DermoraSense - Your Verification OTP"
    
    body = f"""
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 20px; color: #1f2937;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #0d9488; text-align: center; margin-bottom: 20px;">DermoraSense Verification</h2>
          <p>Hello,</p>
          <p>Thank you for registering with DermoraSense. Please use the following One-Time Password (OTP) to verify your email address:</p>
          <div style="background-color: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #0d9488; margin: 25px 0;">
            {otp}
          </div>
          <p style="font-size: 12px; color: #6b7280; text-align: center; margin-top: 30px;">
            If you did not request this, please ignore this email.<br/>Do not share your OTP message. Support contact: support@dermorasense.com
          </p>
        </div>
      </body>
    </html>
    """
    msg.attach(MIMEText(body, 'html'))
    
    max_retries = 3
    for attempt in range(max_retries):
        try:
            print(f"[LOG] Attempting SMTP connection to {smtp_server}:{smtp_port} (Attempt {attempt+1}/{max_retries})")
            server = smtplib.SMTP(smtp_server, smtp_port, timeout=10)
            server.set_debuglevel(1)
            print("[LOG] Starting TLS...")
            server.starttls()
            print("[LOG] Authenticating...")
            server.login(smtp_user, smtp_password)
            print("[LOG] Sending email...")
            server.sendmail(smtp_user, recipient_email, msg.as_string())
            server.quit()
            print("[LOG] Email Sent Successfully to", recipient_email)
            return True
        except smtplib.SMTPAuthenticationError as e:
            print(f"[LOG] SMTP Authentication Error: {e}")
            raise Exception(f"Email Dispatch Failed: Invalid App Password or SMTP credentials. {str(e)}")
        except smtplib.SMTPConnectError as e:
            print(f"[LOG] SMTP Connection Error: {e}")
            raise Exception(f"Email Dispatch Failed: Connection refused. Check Firewall/Port 587. {str(e)}")
        except smtplib.SMTPException as e:
            print(f"[LOG] SMTP Exception on attempt {attempt+1}: {e}")
            time.sleep(2)
        except Exception as e:
            print(f"[LOG] General Exception on attempt {attempt+1}: {e}")
            time.sleep(2)
            
    raise Exception("Email Dispatch Failed after multiple attempts. Check backend logs for full traceback.")

def send_password_reset_email(recipient_email: str, otp: str):
    print(f"\n[LOG] Password Reset Request Received. Starting SMTP Dispatch for: {recipient_email}")
    smtp_server = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER")
    smtp_password = os.getenv("SMTP_PASSWORD")
    
    if not smtp_user or not smtp_password:
        print("[LOG] WARNING: SMTP credentials not set in .env file. Skipping actual email dispatch.")
        raise Exception("SMTP credentials missing. Create .env file with SMTP_USER and SMTP_PASSWORD.")
        
    msg = MIMEMultipart()
    msg['From'] = smtp_user
    msg['To'] = recipient_email
    msg['Subject'] = "DermoraSense - Password Reset Request"
    
    body = f"""
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 20px; color: #1f2937;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #0d9488; text-align: center; margin-bottom: 20px;">DermoraSense Password Reset</h2>
          <p>Hello,</p>
          <p>We received a request to reset your DermoraSense password.</p>
          <p>Your verification code is:</p>
          <div style="background-color: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #0d9488; margin: 25px 0;">
            {otp}
          </div>
          <p style="font-size: 14px; text-align: center; margin-top: 10px;">
            This OTP will expire in 10 minutes.
          </p>
          <p style="font-size: 12px; color: #6b7280; text-align: center; margin-top: 30px;">
            If you did not request a password reset, you can safely ignore this email.<br/>Do not share your OTP message. Support contact: support@dermorasense.com
          </p>
        </div>
      </body>
    </html>
    """
    msg.attach(MIMEText(body, 'html'))
    
    max_retries = 3
    for attempt in range(max_retries):
        try:
            print(f"[LOG] Attempting SMTP connection to {smtp_server}:{smtp_port} (Attempt {attempt+1}/{max_retries})")
            server = smtplib.SMTP(smtp_server, smtp_port, timeout=10)
            server.set_debuglevel(1)
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.sendmail(smtp_user, recipient_email, msg.as_string())
            server.quit()
            print("[LOG] Email Sent Successfully to", recipient_email)
            return True
        except smtplib.SMTPAuthenticationError as e:
            raise Exception(f"Email Dispatch Failed: Invalid App Password or SMTP credentials. {str(e)}")
        except smtplib.SMTPConnectError as e:
            raise Exception(f"Email Dispatch Failed: Connection refused. Check Firewall/Port 587. {str(e)}")
        except Exception as e:
            time.sleep(2)
            
    raise Exception("Email Dispatch Failed after multiple attempts. Check backend logs for full traceback.")
