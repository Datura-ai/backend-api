type Message = {
  author: "User" | "Bot";
  text: string;
  type: "text" | "image" | "image-loading" | "text-loading" | "error";
};

export default Message;
