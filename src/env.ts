import dotenv from 'dotenv'

dotenv.config()

export const PASSWORD_HASH_SALT_ROUNDS = process.env.PASSWORD_HASH_SALT_ROUNDS
export const JWT_SECRET = process.env.JWT_SECRET
export const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME
export const SERVER_PORT = process.env.SERVER_PORT || 3000