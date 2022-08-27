import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '@app'
import { MongoMemoryServer } from 'mongodb-memory-server'
import * as mongoose from 'mongoose'
import { DataSource } from 'typeorm'
import { MongooseConfig, typeORMConfig } from '@database'

jest.mock('./../src/external/database/mongoose.config')
jest.mock('./../src/external/database/typeorm.config')
const mockMConf = jest.mocked(MongooseConfig)
const mockTConf = jest.mocked(typeORMConfig)

describe('AppController (e2e)', () => {
  let app: INestApplication
  let mongod: MongoMemoryServer
  let mysql: DataSource

  beforeAll(() => {
    mockMConf.connectionName = 'mongo'
    mockMConf.useFactory.mockImplementation(async () => {
      mongod = await MongoMemoryServer.create()
      return {
        uri: mongod.getUri()
      }
    })

    mockTConf.name = 'MySQL'
    mockTConf.useFactory.mockImplementation(() => {
      mysql = new DataSource({
        type: 'sqlite',
        database: ':memory:',
        entities: ['dist/src/models/mysql/**/*.entity.js'],
        synchronize: true,
        dropSchema: true
      })
      return mysql.options
    })
  })

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
  })
})
