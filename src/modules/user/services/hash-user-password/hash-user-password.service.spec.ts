import HashUserPasswordService from "./hash-user-password.service"

describe('HashUserPasswordService', () => {
  it('should hash password', async () => {
    const service = new HashUserPasswordService()
    const password = 'any-password'
    const hashedPassword = await service.run(password)

    expect(hashedPassword).toBeDefined()
    expect(hashedPassword).not.toEqual(password)
  })
})