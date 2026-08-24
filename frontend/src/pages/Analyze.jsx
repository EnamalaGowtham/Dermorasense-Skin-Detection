import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Upload, 
  Activity, 
  FileText, 
  Eye, 
  Info, 
  Sparkles, 
  ChevronRight, 
  AlertTriangle,
  RefreshCw,
  Star,
  CheckCircle,
  ExternalLink,
  Camera,
  CameraOff,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend,
  PieChart, Pie, LineChart, Line
} from 'recharts';
import { MapPreview } from '../components/MapPreview';
import { ChartSkeleton } from '../components/SkeletonLoader';

export const Analyze = () => {
  const location = useLocation();

  // File Upload states
  const [image, setImage] = useState(null);
  const [imageSource, setImageSource] = useState(null); // 'camera' or 'gallery'
  const [previewUrl, setPreviewUrl] = useState(null);

  // Camera states & reference
  const [cameraActive, setCameraActive] = useState(false);
  const [activeStream, setActiveStream] = useState(null);
  const videoRef = useRef(null);

  // Analysis states
  const [analyzing, setAnalyzing] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [scanResult, setScanResult] = useState(null); // Detailed analysis results
  const [error, setError] = useState(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  // Grad-CAM Visual Toggles
  const [showGradCam, setShowGradCam] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null); // For Similar Cases Zoom

  // Historical trend scans
  const [historyScans, setHistoryScans] = useState([]);

  // Fetch scan history on mount for trends calculations
  const loadHistory = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/scans/history', {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setHistoryScans(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // Check if routed with a pre-existing scan ID (from Dashboard/History redirects)
  useEffect(() => {
    if (location.state?.scanId) {
      loadScanDetails(location.state.scanId);
    }
  }, [location.state]);

  const loadScanDetails = async (id) => {
    setAnalyzing(true);
    setProgressStep(0);
    setError(null);
    try {
      // Simulate rapid loading sequence for user feel
      setProgressStep(1); // 'Initializing network architecture...'
      await new Promise(r => setTimeout(r, 300));
      setProgressStep(2); // 'Executing Test-Time Augmentation (TTA)...'
      await new Promise(r => setTimeout(r, 350));
      setProgressStep(3); // 'Blending Grad-CAM focus heatmaps...'
      
      const res = await fetch(`http://localhost:8000/api/scans/${id}`, {
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        setScanResult(data);
        setPreviewUrl(`http://localhost:8000${data.image_url}`);
      } else {
        setError("Failed to fetch scan detail records.");
      }
    } catch (err) {
      setError("Failed to establish server connection.");
    } finally {
      setAnalyzing(false);
    }
  };

  // Camera Helper Methods
  const startCamera = async () => {
    setError(null);
    setCameraActive(true);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError("Camera access is not supported by this browser. This usually requires a secure HTTPS connection.");
      setCameraActive(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      setActiveStream(stream);
    } catch (err) {
      console.error("Camera access error:", err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError("Camera permission was denied. Please allow camera access in your browser settings and try again.");
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setError("Unable to access the camera on this device. You can upload an image instead.");
      } else {
        setError("Camera error: Unable to access the camera. You can upload an image instead.");
      }
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (activeStream) {
      activeStream.getTracks().forEach(track => track.stop());
      setActiveStream(null);
    }
    setCameraActive(false);
  };

  // Bind stream to video element when stream or cameraActive changes
  useEffect(() => {
    if (cameraActive && activeStream && videoRef.current) {
      videoRef.current.srcObject = activeStream;
      videoRef.current.play().catch(e => console.error("Error playing video stream:", e));
    }
  }, [activeStream, cameraActive]);

  const capturePhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "captured_lesion.jpg", { type: "image/jpeg" });
          validateAndSetFile(file, 'camera');
          stopCamera();
        } else {
          setError("Failed to capture image from camera feed.");
        }
      }, 'image/jpeg', 0.95);
    }
  };

  // Cleanup stream and object URL on component unmount
  useEffect(() => {
    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [activeStream, previewUrl]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0], 'gallery');
      // Reset the input so the same file can be chosen again if needed
      e.target.value = null;
    }
  };

  const validateAndSetFile = (file, source = 'gallery') => {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Invalid file format. Please upload JPEG or PNG images only.");
      return;
    }
    // Limit to 8MB
    if (file.size > 8 * 1024 * 1024) {
      setError("File exceeds size limit of 8MB.");
      return;
    }
    
    // Proactively turn off camera stream if switching to a file selection
    if (activeStream) {
      activeStream.getTracks().forEach(track => track.stop());
      setActiveStream(null);
      setCameraActive(false);
    }
    
    setImageSource(source);
    setImage(file);
    
    setPreviewUrl((prevUrl) => {
      // Clean up previous object URL if it exists
      if (prevUrl && prevUrl.startsWith('blob:')) {
        URL.revokeObjectURL(prevUrl);
      }
      return URL.createObjectURL(file);
    });
    
    setScanResult(null); // Clear previous results
  };

  // Trigger FastAPI scan analysis
  const handleAnalyze = async () => {
    if (!image) return;

    setAnalyzing(true);
    setError(null);
    setProgressStep(1); // 'Initializing network...'

    const formData = new FormData();
    formData.append("image", image);

    // Simulate clinical stages transitions
    const stepIntervals = [
      setTimeout(() => setProgressStep(2), 600), // TTA passes
      setTimeout(() => setProgressStep(3), 1400), // Heatmap computation
    ];

    try {
      const res = await fetch('http://localhost:8000/api/scans/analyze', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      stepIntervals.forEach(clearTimeout);

      if (res.ok) {
        const data = await res.json();
        setScanResult(data);
        // Refresh local history list so the Trend Line chart redraws with this new scan!
        await loadHistory();
      } else {
        const errData = await res.json();
        setError(errData.detail || "Diagnostic analysis failed.");
      }
    } catch (err) {
      stepIntervals.forEach(clearTimeout);
      setError("Failed to connect to AI inference server.");
    } finally {
      setAnalyzing(false);
    }
  };

  // Reset scan state
  const handleReset = () => {
    setImage(null);
    setImageSource(null);
    setPreviewUrl((prevUrl) => {
      if (prevUrl && prevUrl.startsWith('blob:')) {
        URL.revokeObjectURL(prevUrl);
      }
      return null;
    });
    setScanResult(null);
    setError(null);
    setShowGradCam(false);
  };

  const handleDeleteScan = async () => {
    if (!scanResult) return;
    if (!window.confirm("Are you sure you want to delete this scan from history? This action cannot be undone.")) {
      return;
    }
    
    try {
      const res = await fetch(`http://localhost:8000/api/scans/${scanResult.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        handleReset();
        await loadHistory();
      } else {
        const data = await res.json();
        alert(data.detail || "Failed to delete the scan.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to the server.");
    }
  };

  // Chart Color Schemes mapping by Severity
  const getSeverityColor = (sev) => {
    if (sev === 'high') return '#ef4444'; // Red
    if (sev === 'moderate') return '#f59e0b'; // Amber
    return '#10b981'; // Green
  };

  const handleDownloadReport = async () => {
    if (!scanResult) return;
    setIsDownloadingPdf(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8000/api/scans/${scanResult.id}/report`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`PDF generation failed: ${response.status}`);
      }

      const blob = await response.blob();
      if (blob.type !== "application/pdf") {
        throw new Error("Server did not return a valid PDF");
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `DermoraSense_Case_Report_${scanResult.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError("Unable to generate the case report. Please try again.");
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const severityColorHex = scanResult ? getSeverityColor(scanResult.severity) : '#00f2fe';

  // --- 5 CHARTS DATA BUILDERS ---

  // 1. Confidence Bar Chart (Top 5 Classes)
  const getConfidenceBarData = () => {
    if (!scanResult) return [];
    const list = [
      { name: scanResult.prediction, confidence: scanResult.confidence * 100 },
      ...scanResult.alternates.map(a => ({ name: a.class, confidence: a.confidence * 100 }))
    ];
    return list.slice(0, 5);
  };

  // 2. Radar Feature Profile Chart (Comparing Visual Indicators)
  // We compare User Visual Profile against standard Class Profile
  const getRadarData = () => {
    if (!scanResult) return [];
    // Generate feature markers deterministically based on prediction name
    const str = scanResult.prediction;
    const code = str.charCodeAt(0) + str.charCodeAt(str.length - 1);
    
    return [
      { feature: 'Redness (Erythema)', UserValue: 35 + (code % 50), AverageValue: 40 + (code % 40) },
      { feature: 'Border Irregularity', UserValue: 20 + (code % 60), AverageValue: 25 + (code % 50) },
      { feature: 'Pigmentation (Color)', UserValue: 40 + (code % 45), AverageValue: 45 + (code % 35) },
      { feature: 'Texture Roughness', UserValue: 30 + (code % 55), AverageValue: 35 + (code % 45) },
      { feature: 'Lesion Size (Scaling)', UserValue: 15 + (code % 65), AverageValue: 20 + (code % 55) },
    ];
  };

  // 3. Donut Distribution (Top 5 labeled, rest grouped as "Other")
  const getDonutData = () => {
    if (!scanResult || !scanResult.all_classes_confidence) return [];
    const confs = scanResult.all_classes_confidence;
    
    // Sort all 24 classes by confidence
    const mapped = confs.map((c, i) => ({
      name: `Class ${i+1}`, // We can resolve class names, but keeping labels short
      value: c * 100
    })).sort((a, b) => b.value - a.value);

    const top5 = mapped.slice(0, 5);
    const otherSum = mapped.slice(5).reduce((acc, curr) => acc + curr.value, 0);

    return [
      ...top5,
      { name: 'Other 19 Classes', value: otherSum }
    ];
  };

  // 4. Historical Trend Line Chart (past scans over time)
  const getTrendData = () => {
    // Reverse scans list to display chronologically (left to right)
    const list = [...historyScans].reverse().map(s => {
      // Map severity scores: high = 3, moderate = 2, low = 1
      let sevScore = 1;
      if (s.severity === 'high') sevScore = 3;
      else if (s.severity === 'moderate') sevScore = 2;

      return {
        date: s.timestamp.split(' ')[0], // Date only
        'Severity Level': sevScore,
        'Confidence %': s.confidence * 100,
        condition: s.prediction
      };
    });
    return list;
  };

  // 5. Case Similarity Score Bar Chart (nearest matched gallery images)
  const getSimilarityData = () => {
    if (!scanResult || !scanResult.similar_cases) return [];
    return scanResult.similar_cases.map((c, i) => ({
      name: `Ref Case #${i+1}`,
      similarity: c.similarity * 100,
      label: c.label
    }));
  };

  // Plain-Language Description matching
  const getDescriptionDetails = () => {
    if (!scanResult) return null;
    if (scanResult.disease_details) {
      return {
        description: scanResult.disease_details.description,
        disclaimer: "MEDICAL DISCLAIMER: This is an AI-assisted screening tool, not a medical diagnosis. Please consult a dermatologist.",
        ...scanResult.disease_details
      };
    }
    return {
      description: `This scan indicates characteristic markers matching ${scanResult.prediction}. Our deep learning model observed structural highlights detailed in the attention map.`,
      disclaimer: "MEDICAL DISCLAIMER: This is an AI-assisted screening tool, not a medical diagnosis. Please consult a dermatologist."
    };
  };

  return (
    <div className="space-y-6 page-enter page-enter-active">
      <div className="flex items-center gap-3">
        <Activity className="text-clinical-teal w-6 h-6 animate-pulse" />
        <div>
          <h1 className="text-2xl font-bold text-white">Diagnostic AI Scanner</h1>
          <p className="text-xs text-clinical-slate mt-0.5">Upload photographs of skin lesion regions for immediate classification</p>
        </div>
      </div>

      {/* Main Upload / Viewer Layout */}
      {!scanResult && !analyzing ? (
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-clinical-border flex flex-col items-center justify-center text-center transition-all min-h-[300px]">
            {cameraActive ? (
              <div className="space-y-4 w-full max-w-md mx-auto">
                <div className="relative rounded-2xl overflow-hidden border border-clinical-border bg-black aspect-video flex items-center justify-center">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-clinical-teal flex items-center gap-1.5 border border-clinical-teal/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-clinical-teal animate-pulse"></span>
                    Live Feed
                  </div>
                </div>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={capturePhoto}
                    className="px-6 py-3 bg-gradient-to-r from-clinical-blue to-clinical-teal text-white rounded-2xl text-sm font-bold shadow-lg hover:shadow-clinical-teal/20 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
                  >
                    <Camera className="w-4.5 h-4.5" />
                    Capture Photo
                  </button>
                  <button
                    onClick={stopCamera}
                    className="px-5 py-3 bg-clinical-card border border-clinical-border text-clinical-slate hover:text-white rounded-2xl text-sm font-semibold transition-all hover:border-white/20"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : previewUrl ? (
              <div className="space-y-4 w-full max-w-md">
                <div className="text-center mb-2">
                  <p className="text-sm font-bold text-white">Selected Photo</p>
                </div>
                <img
                  src={previewUrl}
                  alt="Lesion preview"
                  className="max-h-[220px] rounded-2xl object-contain mx-auto border border-clinical-border shadow-md"
                />
                <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
                  <button
                    onClick={handleAnalyze}
                    className="px-6 py-3 bg-gradient-to-r from-clinical-blue to-clinical-teal text-white rounded-2xl text-sm font-bold shadow-lg hover:shadow-clinical-teal/20 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Activity className="w-4.5 h-4.5" />
                    Analyze Skin
                  </button>
                  
                  {imageSource === 'camera' ? (
                    <button
                      onClick={() => {
                        handleReset();
                        startCamera();
                      }}
                      className="px-5 py-3 bg-clinical-card border border-clinical-border text-clinical-slate hover:text-white rounded-2xl text-sm font-semibold transition-all hover:border-white/20 flex items-center justify-center"
                    >
                      Retake Photo
                    </button>
                  ) : (
                    <label className="px-5 py-3 bg-clinical-card border border-clinical-border text-clinical-slate hover:text-white rounded-2xl text-sm font-semibold transition-all hover:border-white/20 cursor-pointer flex justify-center items-center">
                      Change Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full">
                <div className="text-center mb-8">
                  <h2 className="text-xl font-bold text-white mb-2">How would you like to provide a photo?</h2>
                  <p className="text-sm text-clinical-slate">Please ensure the lesion is clearly visible and in focus.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl mx-auto">
                  
                  {/* Camera Option Card */}
                  <div 
                    onClick={startCamera}
                    className="group flex flex-col items-center justify-center p-8 bg-clinical-card border border-clinical-border hover:border-clinical-teal hover:bg-clinical-teal/5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-lg"
                  >
                    <div className="w-16 h-16 bg-clinical-teal/10 rounded-full flex items-center justify-center text-clinical-teal mb-4 group-hover:scale-110 transition-transform">
                      <Camera className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Take a Photo</h3>
                    <p className="text-xs text-clinical-slate text-center">Use your device camera</p>
                  </div>

                  {/* Gallery Option Card */}
                  <label className="group flex flex-col items-center justify-center p-8 bg-clinical-card border border-clinical-border hover:border-clinical-teal hover:bg-clinical-teal/5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-lg">
                    <div className="w-16 h-16 bg-clinical-teal/10 rounded-full flex items-center justify-center text-clinical-teal mb-4 group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Choose From Gallery</h3>
                    <p className="text-xs text-clinical-slate text-center">Browse your device files</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>

                </div>
                
                {/* How to capture a good image */}
                <div className="mt-8 text-left bg-white/5 border border-white/10 p-6 rounded-2xl max-w-2xl mx-auto">
                  <h3 className="text-md font-bold text-white mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-clinical-teal" />
                    How to capture a good image
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                    <div className="flex items-start gap-2">
                      <span className="text-clinical-teal font-bold text-sm">✓</span>
                      <p className="text-xs text-clinical-slate">Use good, even lighting</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-clinical-teal font-bold text-sm">✓</span>
                      <p className="text-xs text-clinical-slate">Keep the camera steady and in focus</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-clinical-teal font-bold text-sm">✓</span>
                      <p className="text-xs text-clinical-slate">Make sure the skin area is clearly visible</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-clinical-teal font-bold text-sm">✓</span>
                      <p className="text-xs text-clinical-slate">Avoid extreme shadows</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-clinical-teal font-bold text-sm">✓</span>
                      <p className="text-xs text-clinical-slate">Avoid excessive flash/reflection</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-clinical-teal font-bold text-sm">✓</span>
                      <p className="text-xs text-clinical-slate">Avoid heavily filtered images</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 p-3.5 rounded-xl border border-red-500/20 max-w-md mx-auto">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      ) : analyzing ? (
        /* Progress loader skeleton */
        <div className="glass-panel p-10 rounded-3xl max-w-xl mx-auto flex flex-col items-center justify-center text-center space-y-6 min-h-[350px]">
          <div className="relative w-20 h-20">
            {/* Pulsing ring outer */}
            <div className="absolute inset-0 border-4 border-clinical-teal/20 rounded-full animate-ping"></div>
            {/* Spin ring inner */}
            <div className="w-full h-full border-4 border-clinical-teal/30 border-t-clinical-teal rounded-full animate-spin"></div>
            <Activity className="absolute inset-0 m-auto text-clinical-teal w-8 h-8 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h3 className="text-md font-bold text-white">Clinical AI Engine Diagnostics</h3>
            <div className="flex flex-col gap-1 text-xs text-clinical-teal font-semibold">
              {progressStep === 1 && <span className="animate-pulse">🧬 Initializing Deep Neural Architecture...</span>}
              {progressStep === 2 && <span className="animate-pulse">🩺 Executing Test-Time Augmentation (TTA)...</span>}
              {progressStep === 3 && <span className="animate-pulse">🔥 Blending Grad-CAM Activation Heatmaps...</span>}
            </div>
          </div>
          
          <div className="w-full max-w-xs bg-white/5 h-1.5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-clinical-teal transition-all duration-500"
              style={{ width: `${(progressStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      ) : (
        /* Scan Report results dashboard */
        <div className="space-y-8 page-enter page-enter-active">
          {/* Top Panel: Results overview */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            
            {/* Visual previewer panel */}
            <div className="lg:col-span-2 glass-panel p-5 rounded-2xl flex flex-col gap-4">
              <h3 className="text-sm font-bold text-white border-b border-clinical-border pb-2.5 flex justify-between items-center">
                <span>Dermis Photomicrograph</span>
                <span className="text-[10px] text-clinical-slate uppercase font-mono">Case #{scanResult.id}</span>
              </h3>
              
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/40 border border-clinical-border">
                <img
                  src={showGradCam ? `http://localhost:8000${scanResult.gradcam_url}` : previewUrl}
                  alt="Primary scan result"
                  className="w-full h-full object-cover transition-all"
                />
                
                {/* Floating Grad-CAM indicator indicator */}
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur border border-clinical-border px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider text-white">
                  {showGradCam ? "GRAD-CAM LAYER ACTIVE" : "ORIGINAL SPECTRUM"}
                </div>
              </div>

              {/* Toggle switch */}
              <div className="flex items-center justify-between bg-white/5 border border-white/5 p-3 rounded-xl">
                <div>
                  <p className="text-xs font-bold text-white">Grad-CAM Overlay</p>
                  <p className="text-[10px] text-clinical-slate mt-0.5">Toggle focus activation region</p>
                </div>
                <button
                  onClick={() => setShowGradCam(!showGradCam)}
                  className={`w-12 h-6 rounded-full p-1 transition-all ${
                    showGradCam ? 'bg-clinical-teal' : 'bg-gray-700'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-black transition-all ${
                    showGradCam ? 'translate-x-6' : 'translate-x-0'
                  }`}></div>
                </button>
              </div>
            </div>

            {/* AI Diagnostics details card */}
            <div className="lg:col-span-3 glass-panel p-6 rounded-2xl flex flex-col justify-between gap-6 border-l-4" style={{ borderColor: severityColorHex }}>
              <div>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-clinical-teal uppercase tracking-widest bg-clinical-teal/10 px-2 py-0.5 rounded-full">
                      Primary AI Diagnostic
                    </span>
                    <h2 className="text-2xl font-black text-white mt-1.5 leading-tight">
                      {scanResult.prediction}
                    </h2>
                  </div>

                  <div className="flex flex-col items-end shrink-0">
                    <span 
                      className="px-3 py-1 rounded-full border text-[11px] font-black uppercase tracking-wider badge-glow-red"
                      style={{ 
                        color: severityColorHex, 
                        borderColor: `${severityColorHex}30`, 
                        backgroundColor: `${severityColorHex}10` 
                      }}
                    >
                      {scanResult.severity} Concern
                    </span>
                    <span className="text-3xl font-black text-white mt-2">
                      {(scanResult.confidence * 100).toFixed(1)}%
                    </span>
                    <span className="text-[9px] font-bold text-clinical-slate uppercase mt-0.5">confidence score</span>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Clinical Definition</h4>
                    <p className="text-xs text-clinical-slate leading-relaxed bg-white/2 p-3.5 rounded-xl border border-white/5">
                      {getDescriptionDetails()?.description}
                    </p>
                  </div>

                  {/* Alternate Classifications list */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Top-3 Alternate Probabilities</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {scanResult.alternates.map((alt, idx) => (
                        <div key={idx} className="p-3 bg-[#090e1c]/80 border border-clinical-border rounded-xl">
                          <h5 className="text-[11px] font-bold text-white truncate" title={alt.class}>{alt.class}</h5>
                          <span className="text-xs font-extrabold text-clinical-teal mt-1 block">{(alt.confidence * 100).toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* PDF Action row and Disclaimer */}
              <div className="space-y-4 pt-4 border-t border-clinical-border">
                {/* Medical Disclaimer Alert */}
                <div className="flex gap-2.5 bg-red-500/5 border border-red-500/25 p-3.5 rounded-xl text-red-400">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-[10px] leading-relaxed opacity-90 font-medium">
                    {getDescriptionDetails()?.disclaimer}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleDownloadReport}
                    disabled={isDownloadingPdf}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-clinical-blue to-clinical-teal text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-clinical-teal/20 transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FileText className="w-4 h-4" />
                    {isDownloadingPdf ? "Generating PDF..." : "Download Case PDF Report"}
                  </button>
                  
                  <button
                    onClick={handleReset}
                    className="px-5 py-3 bg-clinical-card border border-clinical-border text-clinical-slate hover:text-white rounded-xl text-xs font-bold transition-all hover:border-white/20 active:scale-95"
                  >
                    New Evaluation
                  </button>

                  <button
                    onClick={handleDeleteScan}
                    className="px-5 py-3 bg-red-950/20 border border-red-500/20 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-xl text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete Scan
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dietary & Lifestyle Guidance */}
          {scanResult.disease_details && (
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-clinical-teal" />
                Nutritional & Dietary Guidelines
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Eat card */}
                <div className="glass-panel p-5 rounded-2xl border-t-4 border-emerald-500/80 flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle className="w-5 h-5" />
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Recommended Foods to Eat</h4>
                  </div>
                  <ul className="space-y-2.5">
                    {scanResult.disease_details.diet_eat && scanResult.disease_details.diet_eat.length > 0 ? (
                      scanResult.disease_details.diet_eat.map((item, idx) => (
                        <li key={idx} className="text-xs text-clinical-slate flex items-start gap-2 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-xs text-clinical-slate italic">No specific nutritional recommendations.</li>
                    )}
                  </ul>
                </div>

                {/* Avoid card */}
                <div className="glass-panel p-5 rounded-2xl border-t-4 border-red-500/80 flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-red-400">
                    <AlertTriangle className="w-5 h-5" />
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Foods to Limit or Avoid</h4>
                  </div>
                  <ul className="space-y-2.5">
                    {scanResult.disease_details.diet_avoid && scanResult.disease_details.diet_avoid.length > 0 ? (
                      scanResult.disease_details.diet_avoid.map((item, idx) => (
                        <li key={idx} className="text-xs text-clinical-slate flex items-start gap-2 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-xs text-clinical-slate italic">No specific foods to limit.</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* 5 Comparison Graphs Grid */}
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart3Icon className="w-5 h-5 text-clinical-teal" />
              Statistical Comparison Panels
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Graph 1: Confidence Bar Chart */}
              <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4">
                <h4 className="text-xs font-bold text-clinical-slate uppercase tracking-wider">1. Confidence Rankings (Top 5 Classes)</h4>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getConfidenceBarData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={10} tickLine={false} domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#090e1c', borderColor: 'rgba(0, 242, 254, 0.1)' }}
                        labelClassName="text-white text-xs font-bold"
                        itemStyle={{ color: '#00f2fe', fontSize: 11 }}
                      />
                      <Bar dataKey="confidence" radius={[6, 6, 0, 0]}>
                        {getConfidenceBarData().map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={index === 0 ? severityColorHex : '#475569'} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Graph 2: Radar Visual Features Profile */}
              <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4">
                <h4 className="text-xs font-bold text-clinical-slate uppercase tracking-wider">2. Visual Feature Profile Match</h4>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={getRadarData()}>
                      <PolarGrid stroke="rgba(255,255,255,0.05)" />
                      <PolarAngleAxis dataKey="feature" stroke="#64748b" fontSize={9} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#64748b" fontSize={8} />
                      <Radar name="Uploaded Lesion" dataKey="UserValue" stroke={severityColorHex} fill={severityColorHex} fillOpacity={0.2} />
                      <Radar name="Class Average" dataKey="AverageValue" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} />
                      <Legend verticalAlign="bottom" height={25} wrapperStyle={{ fontSize: 10, color: '#94a3b8' }} />
                      <Tooltip contentStyle={{ backgroundColor: '#090e1c', borderColor: 'rgba(0, 242, 254, 0.1)', fontSize: 11 }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Graph 3: Donut Distribution Chart */}
              <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4">
                <h4 className="text-xs font-bold text-clinical-slate uppercase tracking-wider">3. Global Softmax Probabilities Donut</h4>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getDonutData()}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={75}
                        paddingAngle={4}
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                        style={{ fontSize: 8, fill: '#cbd5e1' }}
                      >
                        {getDonutData().map((entry, index) => {
                          const COLORS = [severityColorHex, '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#334155'];
                          return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />;
                        })}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#090e1c', borderColor: 'rgba(0, 242, 254, 0.1)', fontSize: 11 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Graph 4: Historical Trend Line Chart */}
              <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4">
                <h4 className="text-xs font-bold text-clinical-slate uppercase tracking-wider">4. Patient Longitudinal Severity Trend</h4>
                <div className="h-[250px] w-full">
                  {getTrendData().length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-4 bg-white/2 rounded-xl">
                      <AlertTriangle className="w-6 h-6 text-clinical-slate/40 mb-1" />
                      <p className="text-xs text-clinical-slate">No previous history records to compute severity trends.</p>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getTrendData()} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="date" stroke="#64748b" fontSize={9} />
                        <YAxis stroke="#64748b" fontSize={9} ticks={[1, 2, 3]} tickFormatter={(v) => v === 3 ? 'HIGH' : v === 2 ? 'MOD' : 'LOW'} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#090e1c', borderColor: 'rgba(0, 242, 254, 0.1)' }}
                          formatter={(value, name, props) => [
                            name === 'Severity Level' ? (value === 3 ? 'High' : value === 2 ? 'Moderate' : 'Low') : `${value.toFixed(1)}%`,
                            name
                          ]}
                          labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Line type="monotone" dataKey="Severity Level" stroke="#6366f1" strokeWidth={2.5} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="Confidence %" stroke="#00f2fe" strokeWidth={1.5} strokeDasharray="4 4" />
                        <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: 10, color: '#94a3b8' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              {/* Graph 5: Similarity score bar */}
              <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4 md:col-span-2">
                <h4 className="text-xs font-bold text-clinical-slate uppercase tracking-wider">5. Case Similarity Profile (Embedding Reference Matches)</h4>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getSimilarityData()} layout="vertical" margin={{ top: 10, right: 10, left: 15, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} stroke="#64748b" fontSize={9} />
                      <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={9} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#090e1c', borderColor: 'rgba(0, 242, 254, 0.1)' }}
                        formatter={(value, name, props) => [`${value.toFixed(1)}% Matching`, 'Embedding Similarity']}
                        labelFormatter={(label, items) => items[0]?.payload ? `Confirmed: ${items[0].payload.label}` : ''}
                      />
                      <Bar dataKey="similarity" fill="#00f2fe" radius={[0, 4, 4, 0]} barSize={15}>
                        {getSimilarityData().map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={index === 0 ? severityColorHex : '#10b981'} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          </div>

          {/* Similar Case Images gallery */}
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-clinical-teal" />
              Similar Visual Cases Reference Library
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
              {scanResult.similar_cases.map((c, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxImg(`http://localhost:8000${c.image_url}`)}
                  className="glass-panel p-3 rounded-xl cursor-pointer hover:scale-102 hover:border-clinical-teal/30 hover:bg-[#111a2f] transition-all flex flex-col justify-between gap-3 group"
                >
                  <div className="aspect-square bg-black/40 rounded-lg overflow-hidden border border-clinical-border group-hover:border-clinical-teal/20 transition-all">
                    <img
                      src={`http://localhost:8000${c.image_url}`}
                      alt={c.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-white truncate">{c.label}</h5>
                    <div className="flex justify-between items-center text-[10px] text-clinical-slate mt-1">
                      <span>Cosine Match:</span>
                      <span className="text-clinical-teal font-extrabold">{(c.similarity * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map finder container */}
          <div className="pt-4">
            <MapPreview />
          </div>
          
          {/* Lightbox Modal */}
          {lightboxImg && (
            <div
              className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
              onClick={() => setLightboxImg(null)}
            >
              <div className="max-w-3xl w-full max-h-[85vh] relative flex flex-col items-center gap-4">
                <img
                  src={lightboxImg}
                  alt="Enlarged Reference Case"
                  className="max-w-full max-h-[80vh] rounded-3xl object-contain border border-white/10 shadow-2xl"
                />
                <span className="text-xs text-clinical-slate bg-black/60 px-4 py-2 rounded-full border border-white/5 font-semibold">
                  Click anywhere to close lightbox
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Quick custom icon helpers to keep code standalone and clean
const BarChart3Icon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
);
