import {
  CipherGCM,
  createCipheriv,
  createDecipheriv,
  DecipherGCM,
  randomBytes
} from 'crypto'

//! aes_key는 무조건 32자리!
export const decryptAES = (text: string, secret_key: string): string | null => {
  try {
    const text_to_buffer = Buffer.from(text, 'base64')
    const iv = text_to_buffer.slice(
      text_to_buffer.length - 32,
      text_to_buffer.length - 16
    )
    const auth_tag = text_to_buffer.slice(text_to_buffer.length - 16)
    const encrypted = text_to_buffer.slice(0, text_to_buffer.length - 32)

    const decipher: DecipherGCM = createDecipheriv(
      'aes-256-gcm',
      secret_key,
      iv
    )
    decipher.setAuthTag(auth_tag)
    const decrypted = decipher.update(encrypted, null, 'utf-8')

    return decrypted + decipher.final('utf-8')
  } catch {
    return null
  }
}

export const encryptAES = (text: string, secret_key: string): string => {
  const iv = randomBytes(16)
  const cipher: CipherGCM = createCipheriv('aes-256-gcm', secret_key, iv)

  const encrypted = cipher.update(text, 'utf-8')
  const final = cipher.final()
  return Buffer.concat([encrypted, final, iv, cipher.getAuthTag()]).toString(
    'base64'
  )
}
