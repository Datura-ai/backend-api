type Message = {
  author: "user" | "ChatBot";
  text: string;
  type: "text" | "image" | "image-loading" | "text-loading" | "error";

};

export default Message;
