import { Inject, Injectable } from '@nestjs/common'
import { WebClient } from '@slack/web-api'
import { SlackFile, SlackImage } from '@interfaces/slack.interface'
import { MessageBuilder } from '@utils/slack'

@Injectable()
export class SlackService {
  constructor(@Inject('Slack') private readonly web: WebClient) {}

  toUser(user_name: string) {
    return MessageBuilder(user_name, 'user', this)
  }

  toChannel(channel_name: string) {
    return MessageBuilder(channel_name, 'channel', this)
  }

  async send(
    name: string,
    type: 'user' | 'channel',
    context: Array<string>,
    mention: Array<string>,
    tsv: Array<SlackFile>,
    csv: Array<SlackFile>,
    image: SlackImage
  ) {
    const target =
      type === 'user'
        ? await this.getUserID(name)
        : await this.getChannelID(name)

    const mentions = await this.getMention(mention)
    const text = [...context, ...mentions].join('\n')
    const ts = await this.sendText(target, text, image)

    if (tsv.length) {
      for (const file of tsv) {
        await this.sendFile(target, ts, 'tsv', file)
      }
    }

    if (csv.length) {
      for (const file of csv) {
        await this.sendFile(target, ts, 'csv', file)
      }
    }

    return true
  }

  private async getMention(targets: Array<string>): Promise<Array<string>> {
    const mentions = await Promise.all(
      targets.map(async (user_name) => {
        const user_id = await this.getUserID(user_name)
        return `<@${user_id}>`
      })
    )
    return mentions
  }

  private async getChannelID(channel: string) {
    const list = (await this.web.conversations.list()).channels
    const target_channel = list.find((e) => e.name === channel)
    return target_channel?.id || ''
  }

  private async getUserID(user_name: string) {
    const users = await this.web.users.list()
    const target_user = users.members.find((e) => e.real_name === user_name)
    return target_user?.id || ''
  }

  private async sendText(channel: string, context: string, image?: SlackImage) {
    const result = await this.web.chat.postMessage({
      channel,
      text: context,
      attachments: [
        {
          image_url: image?.url,
          text: image?.name
        }
      ]
    })
    return result.message.ts
  }

  private async sendFile(
    channel: string,
    thread_ts: string,
    filetype: 'tsv' | 'csv',
    file: SlackFile
  ) {
    const file_concat = [file.columns, ...file.data]
      .map((e) => e.join(filetype === 'tsv' ? '\t' : ','))
      .join('\n')
    const result = await this.web.files.upload({
      channels: channel,
      filename: file.file_name || 'file',
      initial_comment: file.initial_comment || '',
      file: Buffer.from(file_concat),
      filetype,
      thread_ts
    })
    return result
  }
}
