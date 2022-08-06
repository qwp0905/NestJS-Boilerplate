export interface SlackImage {
  url: string
  name: string
}

export interface SlackFile {
  columns: Array<string>
  initial_comment?: string
  data: Array<Array<string>>
  file_name?: string
}

export interface SlackMessageBuilder {
  image: (url: string, name: string) => SlackMessageBuilder
  text: (string: string) => SlackMessageBuilder
  bold: (string: string) => SlackMessageBuilder
  italic: (string: string) => SlackMessageBuilder
  strikethrough: (string: string) => SlackMessageBuilder
  code: (string: string) => SlackMessageBuilder
  quotes: (array: Array<string>) => SlackMessageBuilder
  codeBlock: (array: Array<string>) => SlackMessageBuilder
  orderedList: (array: Array<string>) => SlackMessageBuilder
  unorderedList: (array: Array<string>) => SlackMessageBuilder
  link: (text: string, url: string) => SlackMessageBuilder
  mention: (user_name: string) => SlackMessageBuilder
  tsv: (file: SlackFile) => SlackMessageBuilder
  csv: (file: SlackFile) => SlackMessageBuilder
  send: () => Promise<boolean>
}
