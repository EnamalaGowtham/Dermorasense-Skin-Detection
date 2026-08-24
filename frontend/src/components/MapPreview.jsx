import React, { useState, useCallback } from 'react';
import { MapPin, ExternalLink, RefreshCw, AlertTriangle, Navigation } from 'lucide-react';
import { apiFetch } from '../services/apiService';

export const MapPreview = () => {
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clinics, setClinics] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchRadius, setSearchRadius] = useState(0);

  const fetchGeolocation = useCallback(() => {
    setLoading(true);
    setErrorMsg(null);

    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
        searchNearbyPlaces({ lat: latitude, lng: longitude });
      },
      (error) => {
        let msg = "Unable to retrieve your location right now. Please try again.";
        if (error.code === error.PERMISSION_DENIED) {
          msg = "Location access is required to find nearby dermatologists. Please allow location access in your browser/device settings.";
        }
        setErrorMsg(msg);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }, []);

  const searchNearbyPlaces = async (location) => {
    try {
      const data = await apiFetch(`/nearby-dermatologists?lat=${location.lat}&lng=${location.lng}&limit=10`);
      if (data && data.facilities && data.facilities.length > 0) {
        setClinics(data.facilities);
        setSearchRadius(data.search_radius_km);
      } else {
        setErrorMsg("No healthcare facilities were found within 1000 KM of your current location.");
        setClinics([]);
        setSearchRadius(1000);
      }
    } catch (err) {
      // For validation errors, we might want to extract the message, but this fallback is fine
      setErrorMsg("Unable to retrieve nearby healthcare locations right now. Please try again.");
      setClinics([]);
    } finally {
      setLoading(false);
    }
  };

  const handleExternalRedirect = (destinationLat, destinationLng) => {
    if (!coords) return;
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${coords.lat},${coords.lng}&destination=${destinationLat},${destinationLng}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl w-full flex flex-col gap-8 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-clinical-border pb-6">
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <MapPin className="text-clinical-teal w-6 h-6" />
            Nearby Dermatologists
          </h3>
          <p className="text-sm text-clinical-slate mt-2">Locate certified professionals close to you</p>
          
          {coords && (
            <div className="mt-4 p-3 bg-[#090e1c]/50 border border-clinical-border rounded-xl inline-block">
              <div className="flex items-center gap-2 text-clinical-teal font-semibold text-sm">
                <Navigation className="w-4 h-4" />
                Your Current Location
              </div>
              <div className="text-xs text-clinical-slate mt-1">
                Lat: {coords.lat.toFixed(5)}, Lng: {coords.lng.toFixed(5)}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-3 min-w-[200px]">
          <button
            onClick={() => fetchGeolocation(5000)}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-clinical-blue to-clinical-teal text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-clinical-teal/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            {coords ? 'Refresh Location' : 'Use Geolocation'}
          </button>
        </div>
      </div>

      {/* Error & Notifications */}
      {errorMsg && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
          <div className="flex items-center gap-3 text-sm text-red-400">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="py-12 flex flex-col items-center justify-center gap-4 border border-clinical-border border-dashed rounded-2xl bg-[#090e1c]/30">
          <RefreshCw className="w-10 h-10 text-clinical-teal animate-spin" />
          <span className="text-sm font-medium text-clinical-slate">Finding dermatologists near you...</span>
        </div>
      )}

      {/* Results State */}
      {!loading && coords && clinics.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-white">Nearby Results</h4>
            <span className="text-xs text-clinical-slate bg-[#090e1c] px-3 py-1 rounded-full border border-clinical-border">
              Searching within {searchRadius} km
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clinics.map(c => (
              <div
                key={c.id}
                className="p-5 border border-clinical-border bg-[#090e1c]/60 hover:bg-[#111a2f] hover:border-clinical-teal/50 rounded-2xl flex flex-col transition-all shadow-sm"
              >
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h4 className="text-base font-bold text-white flex-1 leading-tight">
                    {c.name}
                  </h4>
                  <span className="text-xs font-bold text-clinical-teal bg-clinical-teal/10 px-2.5 py-1 rounded-lg whitespace-nowrap">
                    {c.distance < 1000 ? `${c.distance} m away` : `${(c.distance/1000).toFixed(1)} km away`}
                  </span>
                </div>
                
                <div className={`text-xs font-semibold mb-3 ${c.is_dermatologist ? 'text-[#00f2fe]' : 'text-amber-400'}`}>
                  {c.speciality}
                </div>

                <div className="text-sm text-clinical-slate/90 leading-relaxed mb-4 flex-1">
                  📍 {c.address}
                </div>

                {(c.phone || c.website) && (
                  <div className="flex flex-wrap gap-4 text-xs text-clinical-slate mb-4 pb-4 border-b border-clinical-border/50">
                    {c.phone && <span>☎ {c.phone}</span>}
                    {c.website && <span className="truncate">🌐 {c.website}</span>}
                  </div>
                )}

                <div className="flex gap-3 mt-auto pt-2">
                  <button
                    onClick={() => handleExternalRedirect(c.latitude, c.longitude)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-clinical-teal/10 border border-clinical-teal/30 hover:bg-clinical-teal text-clinical-teal hover:text-black rounded-xl text-sm font-semibold transition-all shadow-sm"
                  >
                    Get Directions <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Initial Empty State */}
      {!loading && !coords && !errorMsg && (
        <div className="py-16 border border-dashed border-clinical-border rounded-2xl flex flex-col items-center justify-center text-center p-6 bg-[#090e1c]/30 shadow-inner">
          <MapPin className="w-12 h-12 text-clinical-slate/40 mb-4" />
          <p className="text-base text-clinical-slate">Click <strong className="text-white">Use Geolocation</strong> above to securely find dermatologists near your real location.</p>
        </div>
      )}
    </div>
  );
};
