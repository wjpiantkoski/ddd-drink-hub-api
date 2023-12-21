import Beverage from "../beverage/beverage.entity"
import Category from "../category/category.entity"
import {v4 as uuidv4} from 'uuid'
import Bookmark from "./bookmark.entity"
import InvalidPropertyError from "../../../../@shared/domain/errors/invalid-property.error"

describe('Bookmark', () => {

  const category = new Category('Test category', '1')

  const props = {
    category,
    name: 'Test',
    description: 'Description',
    userId: uuidv4(),
    image: `${uuidv4()}.png`
  }

  const beverage = new Beverage(props)

  it('should create a bookmark', () => {
    const bookmark = new Bookmark(beverage.userId, beverage, '1')

    expect(bookmark.id).toEqual('1')
    expect(bookmark.userId).toEqual(beverage.userId)
    expect(bookmark.beverage).toEqual(beverage)
  })

  it('should throw error when userId is not a valid uuid', () => {
    expect(() => {
      new Bookmark('123', beverage, '1')
    }).toThrow(InvalidPropertyError)
  })

  it('should throw error when userId is not equal beverage userId', () => {
    const props = {
      id: '1',
      category,
      name: 'Test',
      description: 'Description',
      userId: uuidv4(),
      image: `${uuidv4()}.png`
    }
  
    const beverage = new Beverage(props)

    expect(() => {
      new Bookmark(uuidv4(), beverage, '1')
    }).toThrow(InvalidPropertyError)
  })

})