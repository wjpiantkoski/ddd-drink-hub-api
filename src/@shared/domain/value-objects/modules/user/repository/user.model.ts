import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: 'users',
  timestamps: false
})
export class UserModel extends Model {

  @PrimaryKey
  @Column({allowNull: false})
  declare id: string

  @Column({allowNull: false})
  declare name: string

  @Column({allowNull: false})
  declare email: string

}