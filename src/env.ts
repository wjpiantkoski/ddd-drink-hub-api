import dotenv from 'dotenv'

dotenv.config()

export const PASSWORD_HASH_SALT_ROUNDS = process.env.PASSWORD_HASH_SALT_ROUNDS