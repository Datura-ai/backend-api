import axios from "axios";
import {
  EventSourceMessage,
  fetchEventSource,
} from "@microsoft/fetch-event-source";

export const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_HOST;
console.log(BACKEND_BASE_URL);
export const generateImage = (uuid: string, prompt: string) => {
  return axios.post(`${BACKEND_BASE_URL}/generate-image`, { uuid, prompt });
};

export const fetchTextMessage = async (
  uuid: string,
  prompt: string,
  onopen: (res: Response) => void,
  onmessage: (event: EventSourceMessage) => void,
  onerror: (err: any) => void,
  onclose: () => void,
) => {
  await fetchEventSource(`${BACKEND_BASE_URL}/generate-text`, {
    method: "POST",
    headers: { Accept: "text/event-stream" },
    body: JSON.stringify({ uuid, prompt }),
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

export const fetchConversation = (uuid: string) => {
  return axios.get(`${BACKEND_BASE_URL}/conversation/${uuid}`);
};
