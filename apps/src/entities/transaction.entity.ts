import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm'
import { UserEntity } from './user.entity'

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: string

  @ManyToOne(() => UserEntity, (user) => user.transactions, {
    nullable: false,
  })
  user: UserEntity

  @Column()
  timeStamp: string

  @Column()
  from: string

  @Column()
  contractAddress: string

  @Column()
  to: string

  @Column()
  value: string

  @Column()
  tokenName: string

  @Column()
  tokenSymbol: string

  @Column()
  gas: string

  @Column()
  gasPrice: string

  @Column()
  gasUsed: string

  @Column()
  cumulativeGasUsed: string

  @Column()
  hash: string
}
