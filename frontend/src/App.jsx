import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';

// Page Components
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { Dashboard } from './pages/Dashboard';
import { Analyze } from './pages/Analyze';
import { HistoryPage } from './pages/History';
import { Profile } from './pages/Profile';
import { About } from './pages/About';
import { LearnDashboard } from './pages/Learn/LearnDashboard';
import { DiseaseLibrary } from './pages/Learn/DiseaseLibrary';
import { DiseaseDetails } from './pages/Learn/DiseaseDetails';
import { LearnResult } from './pages/Learn/LearnResult';
import { SimilarDiseases } from './pages/Learn/SimilarDiseases';
import { SkinCareGuide } from './pages/Learn/SkinCareGuide';
import { MythFact } from './pages/Learn/MythFact';
import { Glossary } from './pages/Learn/Glossary';
import { Quiz } from './pages/Learn/Quiz';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080a0f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-clinical-teal/30 border-t-clinical-teal rounded-full animate-spin"></div>
          <p className="text-xs text-clinical-slate font-semibold animate-pulse">Syncing Case Session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Main Workspace Layout
const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#080a0f] text-[#f1f5f9] font-outfit">
      {/* Collapsible Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      {/* Right Content Panel */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Navbar */}
        <Navbar />
        
        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            
            {/* Learn Hub Routes */}
            <Route path="/learn" element={<LearnDashboard />} />
            <Route path="/learn/library" element={<DiseaseLibrary />} />
            <Route path="/learn/disease/:name" element={<DiseaseDetails />} />
            <Route path="/learn/result" element={<LearnResult />} />
            <Route path="/learn/similar" element={<SimilarDiseases />} />
            <Route path="/learn/skincare" element={<SkinCareGuide />} />
            <Route path="/learn/myths" element={<MythFact />} />
            <Route path="/learn/glossary" element={<Glossary />} />
            <Route path="/learn/quiz" element={<Quiz />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Main App Workspace */}
          <Route 
            path="/*" 
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
