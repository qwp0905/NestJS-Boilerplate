import { ConfigModuleOptions } from '@nestjs/config'

export const configuration: ConfigModuleOptions = {
  isGlobal: true,
  ignoreEnvFile: false,
  envFilePath: [
    '.env',
    process.env.NODE_ENV === 'development'
      ? '.env.development'
      : '.env.production',
    process.platform === 'win32' || process.platform === 'darwin'
      ? '.env.public'
      : '.env.private'
  ]
}
