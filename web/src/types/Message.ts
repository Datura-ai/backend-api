export enum AuthorType {
  USER = "user",
  BOT = "bot",
}

export enum Mode {
  TEXT = "text",
  IMAGE = "image"
}

export enum MessageType {
  TEXT = "text",
  IMAGE = "image",
  IMAGE_LOADING = "image-loading",
  TEXT_LOADING = "text-loading",
  ERROR = "error",
}

export type Message = {
  author: AuthorType;
  text: string;
  type: MessageType;
};

