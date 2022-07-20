import { ConfigService } from '@nestjs/config'
import { createConnection } from 'mysql'

export const MySQLProvider = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return createConnection({
      host: configService.get<string>('DATABASE_HOST'),
      port: configService.get<number>('DATABASE_PORT'),
      user: configService.get<string>('DATABASE_USERNAME'),
      password: configService.get<string>('DATABASE_PASSWORD'),
      database: configService.get<string>('DATABASE_NAME')
    })
  },
  provide: 'sql'
}
