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

    const {data} = await usecase.execute(input)

    expect(data.id).toBeDefined()
    expect(data.name).toEqual(input.name)
    expect(data.email).toEqual(input.email)
  })

  it('should not register user with invalid data', async () => {
    const input = {
      name: 'Name',
      email: 'any@email.com',
      password: 'any-password'
    }

    const usecase = UserRegisterUsecaseFactory.create()

    await usecase.execute(input)
    
    const {status} = await usecase.execute(input)

    expect(status).toEqual(400)
  })

  it('should not register duplicated user', async () => {
    const input = {
      name: 'Name',
      email: 'anyemail.com',
      password: 'any-password'
    }

    const usecase = UserRegisterUsecaseFactory.create()
    const {status} = await usecase.execute(input)

    expect(status).toEqual(422)
  })
})