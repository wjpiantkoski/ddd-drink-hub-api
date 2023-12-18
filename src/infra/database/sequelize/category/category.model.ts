import { Column, Model, PrimaryKey, Table, HasMany, AllowNull, DataType, Unique } from "sequelize-typescript"
import BeverageModel from "../beverage/beverage.model"
import Beverage from "../../../../modules/beverage/domain/beverage/beverage.entity"

@Table({
  tableName: 'categories',
  timestamps: false
})
export default class CategoryModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string

  @AllowNull(false)
  @Unique({ name: 'cat_name_unique', msg: 'category name should be unique' })
  @Column({ type: DataType.STRING(100) })
  declare name: string

  @HasMany(() => BeverageModel)
  declare beverages: Beverage[]
}