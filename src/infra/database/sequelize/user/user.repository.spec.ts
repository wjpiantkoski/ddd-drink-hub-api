import { Sequelize } from "sequelize-typescript"
import { UserModel } from "./user.model"
import UserRepository from "./user.repository"
import User from "../../../../modules/user/domain/user.entity"
import {v4 as uuidv4} from 'uuid'
import setupSequelize from "../../../../tests/helpers/setup-sequelize"

describe('UserRepository', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = await setupSequelize()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create user', async () => {
    const repository = new UserRepository()

    const user = new User('Test', 'email@email.com', 'password')
    await repository.create(user)

    const result = await UserModel.findOne({
      where: { id: user.id }
    })

    expect(result).toBeDefined()
    expect(result.id).toEqual(user.id)
  })

  it('should get a user by email', async () => {
    const user = {
      id: uuidv4(),
      name: 'Name',
      email: 'email@email.com',
      password: 'any-pass'
    }

    await UserModel.create(user)

    const repository = new UserRepository()
    const result = await repository.findByEmail(user.email)

    expect(result).toBeDefined()
    expect(result.email).toEqual(user.email)
  })
})