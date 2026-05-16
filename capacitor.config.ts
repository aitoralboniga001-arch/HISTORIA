import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'eus.historia.usap.trainer',
  appName: 'Historia USaP',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
