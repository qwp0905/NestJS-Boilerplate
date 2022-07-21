import { Module } from '@nestjs/common'
import { getDataSourcePrefix, TypeOrmModule } from '@nestjs/typeorm'
import { DataSourceService } from './dataSource.service'

@Module({
  imports: [TypeOrmModule.forFeature([], getDataSourcePrefix('MySQL'))],
  providers: [DataSourceService],
  exports: [DataSourceService]
})
export class DataSourceModule {}
