type Message = {
  author: "user" | "bot";
  text: string;
  type: "text" | "image" | "image-loading" | "text-loading" | "error";
};

export default Message;
