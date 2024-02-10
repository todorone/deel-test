import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.deel.app',
  appName: 'Deel',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
}

export default config
