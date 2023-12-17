import { Sequelize } from "sequelize-typescript"
import { UserModel } from "../../../../infra/database/sequelize/user/user.model"
import UserRegisterUsecase from "./user-register.usecase"
import UserRepository from "../../../../infra/database/sequelize/user/user.repository"
import HashUserPasswordService from "../../services/hash-user-password/hash-user-password.service"

describe('UserRegisterUsecase', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([ UserModel ])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should register user', async () => {
    const input = {
      name: 'Name',
      email: 'any@email.com',
      password: 'any-password'
    }

    const usecase = new UserRegisterUsecase(
      new UserRepository(),
      new HashUserPasswordService()
    )

    const result = await usecase.execute(input)

    expect(result.id).toBeDefined()
    expect(result.name).toEqual(input.name)
    expect(result.email).toEqual(input.email)
  })

  it('should not register duplicated user', async () => {
    const input = {
      name: 'Name',
      email: 'any@email.com',
      password: 'any-password'
    }

    const usecase = new UserRegisterUsecase(
      new UserRepository(),
      new HashUserPasswordService()
    )

    await usecase.execute(input)
    
    try {
      await usecase.execute(input)
    } catch (err) {
      expect(err).toBeInstanceOf(Error)
    }
  })
})