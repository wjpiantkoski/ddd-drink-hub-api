import InvalidPropertyError from "../../../@shared/domain/errors/invalid-property.error"
import RequiredPropertyError from "../../../@shared/domain/errors/required-property.error"
import User from "./user.entity"

describe('User', () => {
  it('should create user', () => {
    const user = new User('Name', 'email@email.com', 'password')

    expect(user).toBeDefined()
    expect(user.name).toEqual('Name')
    expect(user.password).toEqual('password')
    expect(user.email).toEqual('email@email.com')
  })

  it('should not create user without name', () => {
    expect(() => {
      new User('', 'email@email.com', 'password')
    }).toThrow(RequiredPropertyError)
  })

  it('should not create user with too short name', () => {
    expect(() => {
      new User('Na', 'email@email.com', 'password')
    }).toThrow(InvalidPropertyError)
  })

  it('should not create user with too long name', () => {
    expect(() => {
      new User(
        'This a too long name that shouldnt be never used like this This a too long name that shouldnt be never used like this', 
        'email@email.com', 
        'password'
      )
    }).toThrow(InvalidPropertyError)
  })

  it('should not create user without email', () => {
    expect(() => {
      new User('Name', '', 'password')
    }).toThrow(RequiredPropertyError)
  })

  it('should not create user with invalid email', () => {
    expect(() => {
      new User('Name', 'email-email.com', 'password')
    }).toThrow(InvalidPropertyError)
  })

  it('should not create user with too long email', () => {
    expect(() => {
      new User(
        'Name', 
        'emailemailemailemailemailemailemailemailemailemailemailemailemailemailemailemailemailemailemailemailemailemail@email.com', 
        'password'
      )
    }).toThrow(InvalidPropertyError)
  })

  it('should not create user without password', () => {
    expect(() => {
      new User('Name', 'email@email.com', '')
    }).toThrow(RequiredPropertyError)
  })
})