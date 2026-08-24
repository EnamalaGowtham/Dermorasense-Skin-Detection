import React from 'react';
import { Info, Cpu, Network, ShieldCheck, Heart } from 'lucide-react';

export const About = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto page-enter page-enter-active">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-white to-clinical-teal bg-clip-text text-transparent">
          About DermoraSense Architecture
        </h1>
        <p className="text-sm text-clinical-slate">
          Understand the deep learning principles and validation metrics driving our screening platform.
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 bg-clinical-teal/10 border border-clinical-teal/20 rounded-xl flex items-center justify-center text-clinical-teal">
            <Cpu className="w-5.5 h-5.5" />
          </div>
          <h3 className="text-md font-bold text-white">EfficientNetV2-B3 Core</h3>
          <p className="text-xs text-clinical-slate leading-relaxed">
            DermoraSense leverages a pre-trained EfficientNetV2-B3 architecture optimized for dermatological features. Fine-tuned via progressive layer freezing, the model achieves state-of-the-art accuracy in identifying structural boundary anomalies.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 bg-clinical-blue/10 border border-clinical-blue/20 rounded-xl flex items-center justify-center text-clinical-blue">
            <Network className="w-5.5 h-5.5" />
          </div>
          <h3 className="text-md font-bold text-white">Explainable AI (Grad-CAM)</h3>
          <p className="text-xs text-clinical-slate leading-relaxed">
            To prevent black-box decision models, we overlay Grad-CAM heatmaps showing pixel attention. By visualizing gradients w.r.t the final convolutional layer, clinicians can confirm whether the network is inspecting the correct dermis features.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center text-purple-400">
            <ShieldCheck className="w-5.5 h-5.5" />
          </div>
          <h3 className="text-md font-bold text-white">Test-Time Augmentation (TTA)</h3>
          <p className="text-xs text-clinical-slate leading-relaxed">
            Each scan runs twice: once on the original input and once on a flipped augmented matrix. The final softmax probabilities are averaged, reducing sensitivity to minor rotations and perspective shifts.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
            <Heart className="w-5.5 h-5.5" />
          </div>
          <h3 className="text-md font-bold text-white">Patient Confidentiality</h3>
          <p className="text-xs text-clinical-slate leading-relaxed">
            We store scan uploads locally under secure, randomized file paths linked to your private user ID. The backend enforces encrypted JWT session validation for all history reads, ensuring patient confidentiality is maintained.
          </p>
        </div>
      </div>

      {/* Tech stack description */}
      <div className="glass-panel p-6 rounded-2xl border border-clinical-border space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Info className="w-4.5 h-4.5 text-clinical-teal" />
          Prototype Technology Stack
        </h3>
        <p className="text-xs text-clinical-slate leading-relaxed">
          The frontend is built on <strong>React 18</strong> and <strong>Vite</strong>, styled with a clinical design system utilizing <strong>Tailwind CSS</strong>, and rendered using <strong>Recharts</strong> for statistical data representation. The backend runs on a high-performance <strong>FastAPI</strong> python server, using <strong>TensorFlow</strong> and <strong>OpenCV</strong> for neural execution, and <strong>ReportLab</strong> for clinical PDF builder outputs.
        </p>
        
        <div className="bg-red-500/5 border border-red-500/15 p-4 rounded-xl text-[11px] text-red-300 leading-relaxed">
          <strong>CRITICAL REGULATORY NOTICE:</strong> This application is a technology demonstration prototype and is not diagnostic. It does not carry FDA approval or CE mark certifications. All diagnostics should be reviewed by a board-certified dermatologist.
        </div>
      </div>
    </div>
  );
};
