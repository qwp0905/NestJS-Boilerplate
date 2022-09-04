import { AggregateRoot } from '@nestjs/cqrs'

export interface UserEssentialProperties {
  id: number
  email: string
  password: string
}

export interface UserOptionalProperties {
  statusMessage?: string
  profileImage?: string
}

export interface UserProperties
  extends UserEssentialProperties,
    Required<UserOptionalProperties> {}

export interface User {
  properties: () => UserProperties
  commit: () => void
}

export class UserImplement extends AggregateRoot implements User {
  private id: number
  private email: string
  private password: string
  private statusMessage = ''
  private profileImage = ''

  constructor(properties: UserEssentialProperties & UserOptionalProperties) {
    super()
    Object.assign(this, properties)
  }

  properties() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      statusMessage: this.statusMessage,
      profileImage: this.profileImage
    }
  }
}
