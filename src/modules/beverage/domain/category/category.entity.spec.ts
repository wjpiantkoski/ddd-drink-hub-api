import InvalidPropertyError from "../../../../@shared/domain/errors/invalid-property.error"
import RequiredPropertyError from "../../../../@shared/domain/errors/required-property.error"
import Category from "./category.entity"

describe('Category', () => {
  it('should create a category', () => {
    const category = new Category('Test')

    expect(category.id).toBeDefined()
    expect(category.name).toEqual('Test')
  })

  it('should not create a category with an empty name', () => {
    expect(() => {
      new Category('')
    }).toThrow(RequiredPropertyError)
  })

  it('should not create a category with a too long name', () => {
    expect(() => {
      new Category('This a too long name for a category it must be shorter or an error will be throwned')
    }).toThrow(InvalidPropertyError)
  })
  
  it('should set a name for category', () => {
    const category = new Category('Test')

    category.name = 'Another name'

    expect(category.name).toEqual('Another name')
  })

  it('should not set an empty name for category', () => {
    const category = new Category('Test')

    expect(() => {
      category.name = ''
    }).toThrow(RequiredPropertyError)
  })

  it('should not set a too long name for category', () => {
    const category = new Category('Test')

    expect(() => {
      category.name = 'This a too long name for a category it must be shorter or an error will be throwned'
    }).toThrow(InvalidPropertyError)
  })
})