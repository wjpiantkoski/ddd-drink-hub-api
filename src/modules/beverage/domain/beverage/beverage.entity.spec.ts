import {v4 as uuidv4} from 'uuid'
import Beverage from './beverage.entity'
import Category from '../category/category.entity'
import InvalidPropertyError from '../../../../@shared/domain/errors/invalid-property.error'
import RequiredPropertyError from '../../../../@shared/domain/errors/required-property.error'

describe('Beverage', () => {

  const category = new Category('Test category', '1')
  const props = {
    category,
    name: 'Test',
    description: 'Description',
    userId: uuidv4(),
    image: `${uuidv4()}.png`
  }

  it('should create beverage', () => {
    const beverage = new Beverage(props)

    expect(beverage.id).toBeDefined()
    expect(beverage.name).toEqual(props.name)
    expect(beverage.category).toEqual(category)
    expect(beverage.userId).toEqual(props.userId)
    expect(beverage.description).toEqual(props.description)
  })

  it('should change beverage name', () => {
    const beverage = new Beverage(props)

    beverage.name = 'Another Name'

    expect(beverage.name).toEqual('Another Name')
  })

  it('should not set beverage empty name', () => {
    const beverage = new Beverage(props)

    expect(() => {
      beverage.name = ''
    }).toThrow(RequiredPropertyError)
  })

  it('should not set beverage too short name', () => {
    const beverage = new Beverage(props)

    expect(() => {
      beverage.name = 'Na'
    }).toThrow(InvalidPropertyError)
  })

  it('should not set beverage too long name', () => {
    const beverage = new Beverage(props)

    expect(() => {
      beverage.name = 'This is a too long name for categories it should thrown an error'
    }).toThrow(InvalidPropertyError)
  })

  it('should change beverage description', () => {
    const beverage = new Beverage(props)

    beverage.description = 'Another description'

    expect(beverage.description).toEqual('Another description')
  })

  it('should not set beverage empty description', () => {
    const beverage = new Beverage(props)

    expect(() => {
      beverage.description = ''
    }).toThrow(RequiredPropertyError)
  })

  it('should not set beverage too short description', () => {
    const beverage = new Beverage(props)

    expect(() => {
      beverage.description = 'Na'
    }).toThrow(InvalidPropertyError)
  })

  it('should not set beverage too long description', () => {
    const beverage = new Beverage(props)

    expect(() => {
      beverage.description = 'This is a too long description for categories it should thrown an error This is a too long description for categories it should thrown an error This is a too long description for categories it should thrown an error This is a too long description for categories it should thrown an error'
    }).toThrow(InvalidPropertyError)
  })

  it('should set beverage category', () => {
    const beverage = new Beverage(props)

    const anotherCategory = new Category('Another Test category', '2')
    beverage.category = anotherCategory

    expect(beverage.category).toEqual(anotherCategory)
  })
})