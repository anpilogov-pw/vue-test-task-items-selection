import { ru } from './messages/ru'

type Messages = typeof ru
export type MessageKey = keyof Messages

export const t = (key: MessageKey): string => ru[key]
