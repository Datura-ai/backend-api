import axios from "axios";
import {
  EventSourceMessage,
  fetchEventSource,
} from "@microsoft/fetch-event-source";

export const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_HOST;
export const generateImage = (prompt: string) => {
  return axios.post(`${BACKEND_BASE_URL}/generate-image`, { prompt: prompt });
};
export const getShowcaseImages = (sortBy: string) => {
  return axios.get(`${BACKEND_BASE_URL}/showcase-images?sortBy=${sortBy}`);
};

export const fetchTextMessage = async (
  prompt: string,
  onopen: (res: Response) => void,
  onmessage: (event: EventSourceMessage) => void,
  onerror: (err: any) => void,
  onclose: () => void,
) => {
  await fetchEventSource(`${BACKEND_BASE_URL}/generate-text`, {
    method: "POST",
    headers: { Accept: "text/event-stream" },
    body: JSON.stringify({ prompt: prompt }),
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
