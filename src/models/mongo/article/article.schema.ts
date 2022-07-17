import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose'

@Schema({ collection: '123' })
export class Article {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: string

  @Prop()
  context: string
}

export type ArticleDocument = Article & Document

export const ArticleSchema = SchemaFactory.createForClass(Article)
