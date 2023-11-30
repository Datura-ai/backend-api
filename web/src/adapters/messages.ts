import Message from '../types/Message';

const ROLES_MAP = {
  user: 'user',
  bot: 'assistant'
}

export namespace MessageApiAdapter {
  export function toServer(messages: Message[]) {
    return {
      messages: messages.map((message: Message) => ({
        role: ROLES_MAP[message.author],
        content: message.text,
      }))
    }
  }
}
