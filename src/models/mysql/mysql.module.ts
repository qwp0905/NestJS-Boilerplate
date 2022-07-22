import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MysqlService } from './mysql.service'

@Module({
  imports: [TypeOrmModule.forFeature([], 'MySQL')],
  providers: [MysqlService],
  exports: [MysqlService]
})
export class MysqlModule {}
