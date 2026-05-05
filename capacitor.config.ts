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
      // Tiempo que se muestra la imagen (2-3 segundos es lo ideal)
      launchShowDuration: 2000, 
      
      // Se oculta automáticamente después del tiempo arriba definido
      launchAutoHide: true, 
      
      // Color de fondo del splash
      backgroundColor: "#1d4ed8", 
      
      // Cómo se ajusta la imagen a la pantalla
      androidScaleType: "CENTER_CROP", 
      
      // Evita que se vea un spinner genérico de Android sobre tu logo
      showSpinner: false,
      
      // Permite que el splash screen se desvanezca suavemente
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;