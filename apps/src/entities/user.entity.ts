import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { TransactionEntity } from './transaction.entity'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: string

  @OneToMany(() => TransactionEntity, (transaction) => transaction.user)
  transactions?: TransactionEntity[]

  @Column({
    unique: true,
  })
  address: string

  @Column({
    nullable: true,
    comment: 'current balance of address',
  })
  balance: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
