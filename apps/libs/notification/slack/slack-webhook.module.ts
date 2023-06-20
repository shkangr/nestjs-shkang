import { Global, Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { SlackWebhookService } from './slack-webhook.service'

@Global()
@Module({
  imports: [
    HttpModule.register({
      timeout: 4000,
      maxRedirects: 5,
    }),
  ],
  exports: [SlackWebhookService],
  providers: [SlackWebhookService],
})
export class SlackWebhookModule {}
