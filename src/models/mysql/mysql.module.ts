import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MysqlService } from '@models/mysql/mysql.service'

@Module({
  imports: [TypeOrmModule.forFeature([], 'MySQL')],
  providers: [MysqlService],
  exports: [MysqlService]
})
export class MysqlModule {}
