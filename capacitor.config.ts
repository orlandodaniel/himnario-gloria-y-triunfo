import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sariodev.himnario',
  appName: 'Himnario Gloria y Triunfo',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000, 
      launchAutoHide: true, 
      backgroundColor: "#1d4ed8", 
      androidScaleType: "CENTER_CROP", 
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;