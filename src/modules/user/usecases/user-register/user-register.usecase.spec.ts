import { Sequelize } from "sequelize-typescript"
import { UserModel } from "../../../../infra/database/sequelize/user/user.model"
import UserRegisterUsecaseFactory from "./user-register.usecase.factory"

describe('UserRegisterUsecase', () => {
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

  it('should register user', async () => {
    const input = {
      name: 'Name',
      email: 'any@email.com',
      password: 'any-password'
    }

    const usecase = UserRegisterUsecaseFactory.create()

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

    const usecase = UserRegisterUsecaseFactory.create()

    await usecase.execute(input)
    
    try {
      await usecase.execute(input)
    } catch (err) {
      expect(err).toBeInstanceOf(Error)
    }
  })
})