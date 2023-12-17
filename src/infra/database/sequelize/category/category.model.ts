import { Column, Model, PrimaryKey, Table, HasMany } from "sequelize-typescript"
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

  @Column({
    allowNull: false,
    unique: true
  })
  declare name: string

  @HasMany(() => BeverageModel)
  declare beverages: Beverage[]
}