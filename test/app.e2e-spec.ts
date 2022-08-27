import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '@app'
import { MongoMemoryServer } from 'mongodb-memory-server'
import * as mongoose from 'mongoose'

describe('AppController (e2e)', () => {
  let app: INestApplication
  let mongod: MongoMemoryServer

  beforeAll(() => {
    jest.mock('./../src/external/database/mongoose.config', () => ({
      connectionName: 'mongo',
      async useFactory() {
        mongod = await MongoMemoryServer.create()
        return {
          uri: mongod.getUri()
        }
      }
    }))

    jest.mock('./../src/external/database/typeorm.config', () => ({
      name: 'MySQL',
      useFactory: () => ({
        type: 'sqlite',
        database: ':memory:',
        entities: ['dist/src/models/mysql/**/*.entity.js'],
        synchronize: false
      })
    }))
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
