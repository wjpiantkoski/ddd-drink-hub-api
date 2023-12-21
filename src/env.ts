import dotenv from 'dotenv'

dotenv.config()

export const PASSWORD_HASH_SALT_ROUNDS = process.env.PASSWORD_HASH_SALT_ROUNDS
export const JWT_SECRET = process.env.JWT_SECRET
export const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME
export const SERVER_PORT = process.env.SERVER_PORT || 3000
export const DATABASE_NAME = process.env.DATABASE_NAME
export const DATABASE_USER = process.env.DATABASE_USER
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
export const DATABASE_HOST = process.env.DATABASE_HOST
