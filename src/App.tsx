/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Wifi, 
  Bluetooth, 
  Smartphone, 
  Lock, 
  AlertTriangle, 
  ChevronRight, 
  Info, 
  X,
  ExternalLink,
  RefreshCw,
  Zap,
  Clock,
  MapPin,
  WifiOff,
  ShieldAlert,
  Calendar,
  Plus,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Markdown from 'react-markdown';
import { RETAIL_APPS, PRIVACY_GUIDES, EXAMPLE_GEOFENCES } from './constants';
import { StoreModeState, VPNState, StoreSchedule, Geofence, NetworkStatus } from './types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [storeMode, setStoreMode] = useState<StoreModeState>('INACTIVE');
  const [vpnState, setVpnState] = useState<VPNState>('DISCONNECTED');
  const [isAndroid, setIsAndroid] = useState(false);
  const [activeGuide, setActiveGuide] = useState<string | null>(null);
  const [scannedApps, setScannedApps] = useState(false);
  
  // New features state
  const [schedules, setSchedules] = useState<StoreSchedule[]>([
    { id: '1', days: [1, 2, 3, 4, 5], startTime: '09:00', endTime: '17:00', enabled: true }
  ]);
  const [geofences, setGeofences] = useState<Geofence[]>(EXAMPLE_GEOFENCES);
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    ssid: 'Retail_Guest_WiFi',
    security: 'Open',
    risk: 'High'
  });
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  useEffect(() => {
    setIsAndroid(/Android/i.test(navigator.userAgent));
    
    // Simulate geofence detection after a delay
    const timer = setTimeout(() => {
      setGeofences(prev => prev.map(g => g.id === '1' ? { ...g, active: true } : g));
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleStoreMode = () => {
    if (storeMode === 'INACTIVE') {
      setStoreMode('ACTIVATING');
      setTimeout(() => setStoreMode('ACTIVE'), 2000);
    } else {
      setStoreMode('INACTIVE');
    }
  };

  const toggleVPN = () => {
    if (vpnState === 'DISCONNECTED') {
      setVpnState('CONNECTING');
      setTimeout(() => setVpnState('CONNECTED'), 1500);
    } else {
      setVpnState('DISCONNECTED');
    }
  };

  const addSchedule = () => {
    const newSched: StoreSchedule = {
      id: Math.random().toString(36).substr(2, 9),
      days: [1, 2, 3, 4, 5],
      startTime: '08:00',
      endTime: '18:00',
      enabled: true
    };
    setSchedules([...schedules, newSched]);
  };

  const deleteSchedule = (id: string) => {
    setSchedules(schedules.filter(s => s.id !== id));
  };

  const toggleSchedule = (id: string) => {
    setSchedules(schedules.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  const toggleGeofence = (id: string) => {
    setGeofences(geofences.map(g => g.id === id ? { ...g, enabled: !g.enabled } : g));
  };

  return (
    <div className="min-h-screen max-w-md mx-auto p-6 flex flex-col gap-6 select-none pb-24">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-hw-accent/20 flex items-center justify-center border border-hw-accent/30">
            <Shield className="text-hw-accent w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">AisleShield</h1>
            <p className="hw-label">Privacy Guard v1.1.0</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className={cn(
            "w-2 h-2 rounded-full glow-indicator",
            storeMode === 'ACTIVE' ? "bg-hw-accent" : "bg-hw-muted"
          )} />
          <span className="hw-label mt-1">{storeMode === 'ACTIVE' ? 'Protected' : 'Standby'}</span>
        </div>
      </header>

      {/* Security Alert Banner */}
      {networkStatus.risk === 'High' && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-hw-danger/10 border border-hw-danger/30 rounded-xl p-4 flex items-start gap-4"
        >
          <ShieldAlert className="text-hw-danger shrink-0 mt-1" size={20} />
          <div className="flex-1">
            <h3 className="text-sm font-bold text-hw-danger uppercase tracking-wider">Unsecured Network Detected</h3>
            <p className="text-xs text-hw-text/80 mt-1 leading-relaxed">
              You are connected to <span className="font-mono font-bold">"{networkStatus.ssid}"</span>. This network is open and poses a high risk of eavesdropping.
            </p>
            <button 
              onClick={() => setActiveGuide('secureBrowsing')}
              className="mt-2 text-[10px] font-bold uppercase tracking-widest text-hw-danger hover:underline flex items-center gap-1"
            >
              View Security Tips <ChevronRight size={10} />
            </button>
          </div>
        </motion.div>
      )}

      {/* Store Mode Section */}
      <section className="hw-panel p-8 flex flex-col items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-hw-border">
          <motion.div 
            className="h-full bg-hw-accent"
            initial={{ width: 0 }}
            animate={{ width: storeMode === 'ACTIVE' ? '100%' : storeMode === 'ACTIVATING' ? '50%' : '0%' }}
          />
        </div>

        <div className="text-center">
          <h2 className="text-lg font-semibold">Store Mode</h2>
          <p className="hw-label">Automated Radio Lockdown</p>
        </div>

        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Radial Track */}
          <div className="absolute inset-0 dashed-track" />
          
          {/* Animated Ring */}
          <AnimatePresence>
            {storeMode !== 'INACTIVE' && (
              <motion.div 
                className="absolute inset-2 border-2 border-hw-accent rounded-full"
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: 360, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            )}
          </AnimatePresence>

          <button 
            onClick={toggleStoreMode}
            className={cn(
              "relative z-10 w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-500",
              storeMode === 'ACTIVE' 
                ? "bg-hw-accent text-hw-bg shadow-[0_0_30px_rgba(16,185,129,0.4)]" 
                : "bg-hw-border text-hw-muted hover:text-hw-text"
            )}
          >
            <Zap className={cn("w-10 h-10 mb-1", storeMode === 'ACTIVE' && "fill-current")} />
            <span className="font-mono text-[10px] font-bold uppercase tracking-tighter">
              {storeMode === 'ACTIVE' ? 'Active' : storeMode === 'ACTIVATING' ? 'Syncing' : 'Engage'}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 w-full mt-2">
          <StatusItem icon={<Bluetooth size={14} />} label="BT" active={storeMode !== 'ACTIVE'} />
          <StatusItem icon={<Wifi size={14} />} label="WiFi" active={storeMode !== 'ACTIVE'} />
          <StatusItem icon={<Smartphone size={14} />} label="Cell" active={true} />
        </div>

        <div className="flex flex-col items-center gap-2">
          {geofences.some(g => g.active) && (
            <div className="flex items-center gap-2 px-3 py-1 bg-hw-accent/10 border border-hw-accent/30 rounded-full">
              <MapPin size={10} className="text-hw-accent animate-pulse" />
              <span className="hw-label text-[9px] text-hw-accent">Geofence Active: {geofences.find(g => g.active)?.name}</span>
            </div>
          )}
          <button 
            onClick={() => setActiveGuide('storeMode')}
            className="hw-label flex items-center gap-1 hover:text-hw-text transition-colors"
          >
            <Info size={10} /> Manual Configuration Required
          </button>
        </div>
      </section>

      {/* Automation Section */}
      <section className="hw-panel p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Automation</h3>
            <p className="hw-label">Schedules & Geofences</p>
          </div>
          <button 
            onClick={() => setShowScheduleModal(true)}
            className="hw-button hw-button-secondary p-2"
          >
            <Plus size={14} />
          </button>
        </div>

        <div className="space-y-3">
          {/* Schedules */}
          {schedules.map(s => (
            <div key={s.id} className="flex items-center justify-between p-3 bg-hw-bg/50 rounded-lg border border-hw-border/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-hw-border flex items-center justify-center">
                  <Clock size={16} className="text-hw-muted" />
                </div>
                <div>
                  <p className="text-xs font-medium">{s.startTime} - {s.endTime}</p>
                  <p className="hw-label text-[8px]">Weekdays</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => toggleSchedule(s.id)}
                  className={cn(
                    "w-8 h-4 rounded-full relative transition-colors",
                    s.enabled ? "bg-hw-accent" : "bg-hw-muted"
                  )}
                >
                  <div className={cn(
                    "absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all",
                    s.enabled ? "left-4.5" : "left-0.5"
                  )} />
                </button>
                <button onClick={() => deleteSchedule(s.id)} className="text-hw-muted hover:text-hw-danger">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

          {/* Geofences */}
          {geofences.map(g => (
            <div key={g.id} className="flex items-center justify-between p-3 bg-hw-bg/50 rounded-lg border border-hw-border/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-hw-border flex items-center justify-center">
                  <MapPin size={16} className={cn(g.active ? "text-hw-accent" : "text-hw-muted")} />
                </div>
                <div>
                  <p className="text-xs font-medium">{g.name}</p>
                  <p className="hw-label text-[8px]">{g.radius}m Radius</p>
                </div>
              </div>
              <button 
                onClick={() => toggleGeofence(g.id)}
                className={cn(
                  "w-8 h-4 rounded-full relative transition-colors",
                  g.enabled ? "bg-hw-accent" : "bg-hw-muted"
                )}
              >
                <div className={cn(
                  "absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all",
                  g.enabled ? "left-4.5" : "left-0.5"
                )} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Permission Auditor */}
      <section className="hw-panel p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Retail App Auditor</h3>
            <p className="hw-label">Scanning for data leaks</p>
          </div>
          <button 
            onClick={() => {
              setScannedApps(false);
              setTimeout(() => setScannedApps(true), 1000);
            }}
            className="hw-button hw-button-secondary p-2"
          >
            <RefreshCw size={14} className={cn(!scannedApps && "animate-spin")} />
          </button>
        </div>

        <div className="space-y-3">
          {RETAIL_APPS.map((app) => (
            <div key={app.id} className="flex items-center justify-between p-3 bg-hw-bg/50 rounded-lg border border-hw-border/50 group hover:border-hw-accent/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-hw-border flex items-center justify-center">
                  <Lock size={18} className="text-hw-muted group-hover:text-hw-accent transition-colors" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">{app.name}</h4>
                  <div className="flex gap-2">
                    <span className={cn(
                      "text-[9px] font-mono px-1.5 py-0.5 rounded border",
                      app.vulnerability === 'High' ? "text-hw-danger border-hw-danger/30 bg-hw-danger/5" : "text-hw-warning border-hw-warning/30 bg-hw-warning/5"
                    )}>
                      {app.vulnerability} Risk
                    </span>
                  </div>
                </div>
              </div>
              <button className="text-hw-muted hover:text-hw-text p-1">
                <ChevronRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* System Tools */}
      <div className="grid grid-cols-2 gap-4">
        <div className="hw-panel p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Lock size={16} className="text-hw-muted" />
            <div className={cn(
              "w-1.5 h-1.5 rounded-full",
              vpnState === 'CONNECTED' ? "bg-hw-accent" : "bg-hw-muted"
            )} />
          </div>
          <div>
            <p className="hw-label">VPN Tunnel</p>
            <p className="hw-value">{vpnState === 'CONNECTED' ? 'Encrypted' : vpnState === 'CONNECTING' ? 'Linking...' : 'Disabled'}</p>
          </div>
          <button 
            onClick={toggleVPN}
            className={cn(
              "hw-button w-full mt-1",
              vpnState === 'CONNECTED' ? "hw-button-primary" : "hw-button-secondary"
            )}
          >
            {vpnState === 'CONNECTED' ? 'Disconnect' : 'Connect'}
          </button>
        </div>

        <div className="hw-panel p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <AlertTriangle size={16} className="text-hw-muted" />
            <span className="hw-label text-[8px]">{isAndroid ? 'Android' : 'iOS'}</span>
          </div>
          <div>
            <p className="hw-label">MAC Cloaker</p>
            <p className="hw-value">Ad ID Reset</p>
          </div>
          <button 
            onClick={() => setActiveGuide('adId')}
            className="hw-button hw-button-secondary w-full mt-1"
          >
            Reset ID
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="mt-auto py-4 text-center">
        <p className="hw-label text-[8px] opacity-50">
          AisleShield uses local-only processing. No data leaves this device.
        </p>
      </footer>

      {/* Guide Modal */}
      <AnimatePresence>
        {activeGuide && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="hw-panel w-full max-w-md p-6 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Info className="text-hw-accent" /> Privacy Guide
                </h3>
                <button onClick={() => setActiveGuide(null)} className="p-2 hover:bg-hw-border rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="prose prose-invert prose-sm max-w-none">
                <div className="markdown-body">
                  <Markdown>
                    {activeGuide === 'storeMode' 
                      ? PRIVACY_GUIDES.storeMode 
                      : activeGuide === 'adId' 
                        ? PRIVACY_GUIDES.adId 
                        : PRIVACY_GUIDES.secureBrowsing}
                  </Markdown>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-hw-border flex flex-col gap-3">
                <button 
                  onClick={() => setActiveGuide(null)}
                  className="hw-button hw-button-primary w-full py-3"
                >
                  I've Configured This
                </button>
                <button 
                  className="hw-button hw-button-secondary w-full py-3 flex items-center justify-center gap-2"
                  onClick={() => window.open('https://support.google.com/android/answer/3467281', '_blank')}
                >
                  System Settings <ExternalLink size={14} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Schedule Modal */}
      <AnimatePresence>
        {showScheduleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="hw-panel w-full max-w-sm p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Calendar className="text-hw-accent" /> New Schedule
                </h3>
                <button onClick={() => setShowScheduleModal(false)} className="p-2 hover:bg-hw-border rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="hw-label mb-2 block">Start Time</label>
                  <input type="time" className="w-full bg-hw-bg border border-hw-border rounded p-2 font-mono text-sm" defaultValue="09:00" />
                </div>
                <div>
                  <label className="hw-label mb-2 block">End Time</label>
                  <input type="time" className="w-full bg-hw-bg border border-hw-border rounded p-2 font-mono text-sm" defaultValue="17:00" />
                </div>
                <div>
                  <label className="hw-label mb-2 block">Repeat Days</label>
                  <div className="flex gap-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                      <button key={i} className={cn(
                        "w-8 h-8 rounded border text-[10px] font-bold",
                        [1,2,3,4,5].includes(i) ? "bg-hw-accent/20 border-hw-accent text-hw-accent" : "border-hw-border text-hw-muted"
                      )}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  onClick={() => setShowScheduleModal(false)}
                  className="hw-button hw-button-secondary flex-1 py-3"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    addSchedule();
                    setShowScheduleModal(false);
                  }}
                  className="hw-button hw-button-primary flex-1 py-3"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusItem({ icon, label, active }: { icon: React.ReactNode, label: string, active: boolean }) {
  return (
    <div className={cn(
      "flex flex-col items-center gap-1 p-2 rounded-lg border transition-all duration-300",
      active ? "border-hw-border bg-hw-bg/30 text-hw-text" : "border-hw-danger/30 bg-hw-danger/5 text-hw-danger"
    )}>
      {icon}
      <span className="hw-label text-[8px]">{label}</span>
      <span className="text-[8px] font-mono uppercase">{active ? 'ON' : 'OFF'}</span>
    </div>
  );
}
