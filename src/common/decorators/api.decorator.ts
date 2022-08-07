import { applyDecorators, Type } from '@nestjs/common'
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  ApiPropertyOptions,
  getSchemaPath
} from '@nestjs/swagger'

export const Response = <T extends Type>(model: T, is_array = false) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        properties: {
          code: {
            type: 'number',
            example: 200
          },
          result: {
            type: 'boolean',
            example: true
          },
          data: is_array
            ? { type: 'array', items: { $ref: getSchemaPath(model) } }
            : {
                $ref: getSchemaPath(model)
              },
          timestamp: {
            example: new Date().toISOString()
          }
        }
      }
    })
  )
}

export const ApiArrayProperty = <T extends Type>(
  model: T,
  options?: Omit<Omit<ApiPropertyOptions, 'type'>, 'isArray'>
) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiProperty({
      ...options,
      type: 'array',
      items: {
        $ref: getSchemaPath(model)
      }
    })
  )
}
