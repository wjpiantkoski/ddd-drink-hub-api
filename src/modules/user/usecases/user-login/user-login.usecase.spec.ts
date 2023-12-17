import { Sequelize } from "sequelize-typescript"
import { UserModel } from "../../../../infra/database/sequelize/user/user.model"
import {v4 as uuidv4} from 'uuid'
import UserLoginUsecase from "./user-login.usecase"
import UserRepository from "../../../../infra/database/sequelize/user/user.repository"
import CompareUserPasswordService from "../../services/compare-user-password/compare-user-password.service"
import GenerateUserTokenService from "../../services/generate-user-token/generate-user-token.service"
import HashUserPasswordService from "../../services/hash-user-password/hash-user-password.service"

describe('UserLoginUsecase', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false
    })

    await sequelize.addModels([ UserModel ])
    await sequelize.sync({force: true})
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should login user', async () => {
    const hashUserPasswordService = new HashUserPasswordService()
    const password = 'any-password'
    const hashedPassword = await hashUserPasswordService.run(password)

    const userData = {
      id: uuidv4(),
      name: 'Name',
      email: 'email@email.com',
      password: hashedPassword
    }

    await UserModel.create(userData)

    const usecase = new UserLoginUsecase(
      new UserRepository(),
      new CompareUserPasswordService(),
      new GenerateUserTokenService()
    )

    const result = await usecase.execute({
      password,
      email: userData.email,
    })

    expect(result.token).toBeDefined()
  })

  it('should not login user when wrong email', async () => {
    const usecase = new UserLoginUsecase(
      new UserRepository(),
      new CompareUserPasswordService(),
      new GenerateUserTokenService()
    )

    await expect(usecase.execute({
      password: 'any',
      email: 'any@email.com'
    })).rejects.toThrow('Invalid credentials')
  })

  it('should not login user with wrong password', async () => {
    const userData = {
      id: uuidv4(),
      name: 'Name',
      email: 'email@email.com',
      password: '12345'
    }

    await UserModel.create(userData)

    const usecase = new UserLoginUsecase(
      new UserRepository(),
      new CompareUserPasswordService(),
      new GenerateUserTokenService()
    )

    await expect(usecase.execute({
      password: 'any',
      email: 'any@email.com'
    })).rejects.toThrow('Invalid credentials')
  })
})