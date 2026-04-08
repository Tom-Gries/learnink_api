import type { VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  framework: 'nextjs',
  functions: {
    'api/**/*.ts': {
      includeFiles: 'lib/**'
    }
  }
};