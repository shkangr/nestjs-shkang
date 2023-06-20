import { Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../../entities/user.entity'
import { UserCreateDto } from './dto/user-create.dto'
import axios from 'axios'
import { EtherScanAction } from '../../../shared/constant/etherscan-action'
import { Decimal18OutType, UtilsService } from '../../../shared/utils/utils.service'
import axiosRetry from 'axios-retry'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly utilsService: UtilsService,
    readonly configService: ConfigService,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find()
  }

  async countUsers(): Promise<number> {
    return await this.userRepository.count()
  }

  async findByAddress(address: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        address: address,
      },
    })

    if (!user) {
      throw new NotFoundException(`User (address: ${address}) is  not found`)
    }

    return user
  }

  async create(request: UserCreateDto): Promise<UserEntity> {
    const creatableUser = this.userRepository.create(request)
    const createdUser = await this.userRepository.save(creatableUser)
    return createdUser
  }

  async deleteUser(address: string): Promise<UserEntity> {
    const user = await this.findByAddress(address)
    return await this.userRepository.softRemove(user)
  }

  async updateUserBalance(userId: string): Promise<UserEntity> {
    Logger.log('updateUserBalance')

    axiosRetry(axios, { retries: Number(process.env.AXIOS_RETRY_COUNT) })

    const existUser = await this.userRepository.findOne({ where: { id: userId } })

    let res
    try {
      res = await axios.get(this.configService.get<string>('ETHERSCAN_API_ENDPOINT'), {
        params: {
          module: 'account',
          action: EtherScanAction.ACTION_BALANCE,
          address: existUser.address,
          tag: 'latest',
          apikey: this.configService.get<string>('ETHERSCAN_API_KEY'),
        },
      })
    } catch (e) {
      throw new InternalServerErrorException(`get address' balance error`)
    }

    const latestUserBalance = res.data.result
    const decimal18Balance = this.utilsService.toDecimal18(latestUserBalance, Decimal18OutType.STRING)

    if (existUser.balance !== decimal18Balance) {
      Logger.log(`users's balances is update to ${latestUserBalance}`)
      existUser.balance = decimal18Balance
      return await this.userRepository.save(existUser)
    }

    return existUser
  }
}
