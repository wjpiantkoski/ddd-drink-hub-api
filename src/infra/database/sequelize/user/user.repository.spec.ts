import { Sequelize } from "sequelize-typescript"
import { UserModel } from "./user.model"
import UserRepository from "./user.repository"

describe('UserRepository', () => {
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

  it('should create user', async () => {
    const repository = new UserRepository()

    const data = {
      id: '123',
      name: 'Test',
      email: 'email@email.com'
    }

    await repository.create(data)

    const result = await UserModel.findOne({
      where: { id: data.id }
    })

    expect(result).toBeDefined()
    expect(result.id).toEqual(data.id)
  })
})