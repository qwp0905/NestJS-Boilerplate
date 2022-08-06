import { SlackService } from '@slack/slack.service'
import {
  SlackFile,
  SlackImage,
  SlackMessageBuilder
} from '@interfaces/slack.interface'

export const MessageBuilder = (
  name: string,
  type: 'user' | 'channel',
  slackService: SlackService
): SlackMessageBuilder => {
  const context: Array<string> = []
  const mention: Array<string> = []
  const tsv: Array<SlackFile> = []
  const csv: Array<SlackFile> = []
  let image: SlackImage
  return {
    image(url: string, name: string) {
      image = { url, name }
      return this
    },
    text(string: string) {
      context.push(string)
      return this
    },
    bold(string: string) {
      if (!string) return this
      context.push(`*${string}*`)
      return this
    },
    italic(string: string) {
      if (!string) return this
      context.push(`_${string}_`)
      return this
    },
    strikethrough(string: string) {
      if (!string) return this
      context.push(`~${string}~`)
      return this
    },
    code(string: string) {
      if (!string) return this
      context.push(`\`${string}\``)
      return this
    },
    quotes(array: Array<string>) {
      if (!array || !array.length) return this
      context.push(array.reduce((a, c) => a + `>${c}\n`, ''))
      return this
    },
    codeBlock(array: Array<string>) {
      if (!array || !array.length) return this
      context.push(`\`\`\`\n${array.reduce((a, c) => a + `${c}\n`, '')}\`\`\``)
      return this
    },
    orderedList(array: Array<string>) {
      if (!array || !array.length) return this
      context.push(array.reduce((a, c, i) => a + `${i + 1}.  ${c}\n`, ''))
      return this
    },

    unorderedList(array: Array<string>) {
      if (!array || !array.length) return this
      context.push(array.reduce((a, c) => a + `-  ${c}\n`, ''))
      return this
    },
    link(text: string, url: string) {
      if (!text && !url) return this
      context.push(`<${url}|${text}>`)
      return this
    },
    mention(user_name: string) {
      if (!user_name) return this
      mention.push(user_name)
      return this
    },
    tsv(file: SlackFile) {
      if (!file) return this
      tsv.push(file)
      return this
    },
    csv(file: SlackFile) {
      if (!file) return this
      csv.push(file)
      return this
    },
    async send() {
      return await slackService.send(
        name,
        type,
        context,
        mention,
        tsv,
        csv,
        image
      )
    }
  }
}
