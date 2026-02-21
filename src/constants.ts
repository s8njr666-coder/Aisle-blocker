import { RetailApp } from './types';

export const RETAIL_APPS: RetailApp[] = [
  {
    id: 'walmart',
    name: 'Walmart',
    icon: 'shopping-cart',
    permissions: ['Background Location', 'Nearby Devices', 'Bluetooth'],
    vulnerability: 'High',
  },
  {
    id: 'target',
    name: 'Target',
    icon: 'target',
    permissions: ['Precise Location', 'Bluetooth Scanning'],
    vulnerability: 'High',
  },
  {
    id: 'kroger',
    name: 'Kroger',
    icon: 'store',
    permissions: ['Location', 'Camera'],
    vulnerability: 'Medium',
  },
  {
    id: 'amazon',
    name: 'Amazon Shopping',
    icon: 'package',
    permissions: ['Location', 'Microphone', 'Bluetooth'],
    vulnerability: 'Medium',
  }
];

export const PRIVACY_GUIDES = {
  storeMode: `
### How to manually enable Store Mode
1. **Disable Wi-Fi Scanning**: Go to Settings > Location > Location Services > Wi-Fi Scanning (Toggle OFF).
2. **Disable Bluetooth Scanning**: Go to Settings > Location > Location Services > Bluetooth Scanning (Toggle OFF).
3. **Keep Cellular ON**: Ensure mobile data is active for connectivity.
  `,
  adId: `
### Resetting Android Advertising ID
1. Open **Settings**.
2. Navigate to **Google**.
3. Select **Ads**.
4. Tap **Reset advertising ID**.
5. Confirm the reset to generate a new anonymous identifier.
  `,
  secureBrowsing: `
### Secure Browsing Tips
*   **Use a VPN**: Encrypt your traffic to prevent local eavesdropping.
*   **Avoid Sensitive Sites**: Don't log into banking or personal accounts on public Wi-Fi.
*   **Check HTTPS**: Ensure websites use encryption (look for the padlock icon).
*   **Forget Networks**: Remove public Wi-Fi networks from your saved list after use.
  `
};

export const EXAMPLE_GEOFENCES = [
  { id: '1', name: 'Downtown Retail District', radius: 500, enabled: true, active: false },
  { id: '2', name: 'Northside Mall', radius: 300, enabled: false, active: false }
];
