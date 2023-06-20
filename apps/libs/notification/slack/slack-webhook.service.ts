import { Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class SlackWebhookService {
  constructor() {}

  public async instanceMsgWithWebhookUrl(webhookUrl: string, data: string): Promise<any> {
    let slackMsg = 'over 1000000 value transactions.\r\n'
    slackMsg = slackMsg + '```' + JSON.stringify(data, null, 2) + '```'

    const payload = {
      text: slackMsg,
    }

    return await axios.post(webhookUrl, payload)
  }
}
