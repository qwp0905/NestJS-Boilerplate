import { Inject, Injectable } from '@nestjs/common'
import { S3 } from 'aws-sdk'
import { readFile } from 'fs'
import { promisify } from 'util'

@Injectable()
export class AwsService {
  constructor(@Inject('AWS-S3') private readonly s3: S3) {}

  async createObjectS3(
    path: string,
    options: S3.PutObjectAclRequest
  ): Promise<string> {
    const file = await promisify(readFile)(path)
    const { Location } = await this.s3
      .upload({ ...options, Body: file })
      .promise()
    return Location
  }

  async deleteObjectS3(options: S3.DeleteObjectRequest): Promise<boolean> {
    await this.s3.deleteObject(options).promise()
    return true
  }
}
