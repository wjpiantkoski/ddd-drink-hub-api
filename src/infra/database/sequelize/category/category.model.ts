import { Column, Model, PrimaryKey, Table, HasMany } from "sequelize-typescript"

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
}