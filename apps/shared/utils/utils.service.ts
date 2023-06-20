import { Injectable } from '@nestjs/common'

const DECIMAL_NUM = 18

export enum Decimal18OutType {
  NUMBER = 'number',
  STRING = 'string',
}

@Injectable()
export class UtilsService {
  toDecimal18(value: any, outType?: Decimal18OutType): any {
    // number or string
    outType = outType || Decimal18OutType.STRING

    const originLength = value.length
    if (originLength < DECIMAL_NUM) {
      const diffLength = DECIMAL_NUM - originLength

      let addedZeroStr = ''
      for (let i = 0; i < diffLength; i++) {
        addedZeroStr += 0
      }

      value = addedZeroStr + value
    }

    let outputStr = value.substring(0, value.length - DECIMAL_NUM) + '.' + value.substring(value.length - DECIMAL_NUM)
    if (outputStr[0] === '.') {
      outputStr = '0' + outputStr
    }

    return outType === Decimal18OutType.NUMBER ? Number(outputStr) : removeLastZeros(outputStr)
  }

  reformatDate(value: string): string {
    return value.substring(0, 4) + '-' + value.substring(4, 6) + '-' + value.substring(6)
  }

  getEpochTimeStamp(date: string): string {
    const epoch = Math.floor(new Date(`${this.reformatDate(date)} 00:00:00`).getTime() / 1000)
    return epoch.toString()
  }
}

function removeLastZeros(value: string): string {
  if (value[value.length - 1] !== '0') {
    return value
  }

  const zeroRemovedStr = value.slice(0, -1)
  return removeLastZeros(zeroRemovedStr)
}
