import PopulateCategoriesService from "./populate-categories.service"
import PopulateCategoriesServiceFactory from "./populate-categories.service.factory"

describe('PopulateCategoriesServiceFactory', () =>{
  it('should create PopulateCategoresService', () => {
    const service = PopulateCategoriesServiceFactory.create()
    expect(service).toBeInstanceOf(PopulateCategoriesService)
  })
})