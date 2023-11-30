import axios from "axios";
import {
  EventSourceMessage,
  fetchEventSource,
} from "@microsoft/fetch-event-source";
import Message from '../types/Message';
import { MessageApiAdapter } from "../adapters/messages";


export const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_HOST;
export const generateImage = (prompt: string) => {
  return axios.post(`${BACKEND_BASE_URL}/generate-image`, { prompt: prompt });
};

export const fetchTextMessage = async (
  messages: Message[],
  onopen: (res: Response) => void,
  onmessage: (event: EventSourceMessage) => void,
  onerror: (err: any) => void,
  onclose: () => void,
) => {
  await fetchEventSource(`${BACKEND_BASE_URL}/generate-text`, {
    method: "POST",
    headers: { Accept: "text/event-stream" },
    body: JSON.stringify(MessageApiAdapter.toServer(messages)),
    // @ts-ignore
    onopen(res) {
      onopen(res);
    },
    onmessage(event) {
      onmessage(event);
    },
    onclose() {
      onclose();
    },
    onerror(err) {
      onerror(err);
    },
  });
};
