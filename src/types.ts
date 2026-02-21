
export interface RetailApp {
  id: string;
  name: string;
  icon: string;
  permissions: string[];
  vulnerability: 'High' | 'Medium' | 'Low';
}

export type StoreModeState = 'INACTIVE' | 'ACTIVATING' | 'ACTIVE';
export type VPNState = 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED';

export interface StoreSchedule {
  id: string;
  days: number[]; // 0-6 (Sun-Sat)
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  enabled: boolean;
}

export interface Geofence {
  id: string;
  name: string;
  radius: number; // meters
  enabled: boolean;
  active: boolean;
}

export interface NetworkStatus {
  ssid: string;
  security: 'Secure' | 'Open' | 'Unsecured';
  risk: 'None' | 'Low' | 'High';
}
