import type { VercelConfig } from '@vercel/config';
export const config: VercelConfig = {
  // TypeScript-Funktionen im api-Ordner
  functions: {
    'api/**/*.ts': {
      // Lib-Ordner mit allen Dateien ins Deployment packen
      includeFiles: 'lib/**'
      // Keine Runtime-Angabe nötig, Vercel wählt automatisch Node aus
    }
  },
  // Optional: falls du environment-spezifische Einstellungen brauchst
  // env: {
  //   MONGO_URI: process.env.MONGO_URI,
  // },
};