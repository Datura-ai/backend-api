import React, { useEffect, useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import MessagesContainer from "./MessagesContainer";
import Message from "../../../types/Message";
import InputBar from "./InputBar";
import { fetchTextMessage, generateImage } from "../../../services/api";
import { EventSourceMessage } from "@microsoft/fetch-event-source";
import { RiRobot2Line } from "react-icons/ri";

import { mockData } from "../../../mockData";

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [mode, setMode] = useState<"image" | "text">("text");
  const [inputEnabled, setInputEnabled] = useState<boolean>(true);
  const handleSendMessage = (newMessage: string) => {
    setMessages((prevState) => [
      ...prevState,
      { author: "User", text: newMessage, type: "text" },
    ]);

    switch (mode) {
      case "text":
        setMessages((prevState) => [
          ...prevState,
          {
            author: "Bot",
            text: "",
            type: "text-loading",
          },
        ]);
        break;
      case "image":
        setMessages((prevState) => [
          ...prevState,
          { author: "Bot", text: "", type: "image-loading" },
        ]);
        setInputEnabled(false);
        generateImage(newMessage)
          .then((data) => {
            setMessages((prevState) => [
              ...prevState.slice(0, -1),
              { author: "Bot", text: data.data, type: "image" },
            ]);
          })
          .catch(() => {
            setMessages((prevState) => [
              ...prevState.slice(0, -1),
              {
                author: "Bot",
                text: "Can't generate image. Please try again",
                type: "error",
              },
            ]);
          })
          .finally(() => {
            setInputEnabled(true);
          });
        break;
    }
  };

  useEffect(() => {
    const onopen = (res: Response) => {
      if (res.ok && res.status === 200) {
        setMessages((prevState) => [
          ...prevState.slice(0, -1),
          {
            author: "Bot",
            text: "",
            type: "text",
          },
        ]);
        setInputEnabled(false);
      } else {
        setMessages((prevState) => [
          ...prevState.slice(0, -1),
          {
            author: "Bot",
            text: "Can't generate text. Please try again",

            type: "error",
          },
        ]);
      }
    };

    const onmessage = (event: EventSourceMessage) => {
      setMessages((prevState) => [
        ...prevState.slice(0, -1),
        {
          ...prevState[prevState.length - 1],
          text: prevState[prevState.length - 1].text + event.data,
        },
      ]);
    };

    const onerror = (err: any) => {
      if (messages[messages.length - 1]?.type === "text-loading") {
        setMessages((prevState) => [
          ...prevState.slice(0, -1),
          {
            author: "Bot",
            text: "Error during text generation. Please try again",
            type: "error",
          },
        ]);
      } else {
        setMessages((prevState) => [
          ...prevState,
          {
            author: "Bot",
            text: "Error during text generation. Please try again",
            type: "error",
          },
        ]);
      }
      throw new Error();
    };

    const onclose = () => {
      setInputEnabled(true);
    };

    if (
      messages[messages.length - 1]?.author === "Bot" &&
      messages[messages.length - 1]?.type === "text-loading"
    ) {
      fetchTextMessage(
        messages[messages.length - 2].text,
        onopen,
        onmessage,
        onerror,
        onclose,
      ).catch(() => setInputEnabled(true));
    }
  }, [messages]);

  return (
      <Stack direction={"column"} spacing={2} height={"100vh"} position={"relative"}>

<Box pt={2}>
 <Typography color={"#fff"} fontWeight={"bold"} fontSize={"larger"}>ChaTBoT 3.5</Typography>

 </Box> 

        {messages.length > 0 ? (
          <MessagesContainer messages={messages} mode={mode} />
        ) : (
          <>
            <Grid container sx={{ paddingTop: 13 }}>
              <Grid item xs={2} >

              </Grid>
              <Grid item xs={8} display={"flex"} justifyContent={"center"}>
                <Stack direction={"column"} textAlign={"center"} color={"#fff"}>
                  <Typography align="center" >

                    <RiRobot2Line fontSize={70} style={{background:"#fff",color:"#000",borderRadius:100,padding:5}}/>
                  </Typography>
                  <Typography variant="h5" mt={2}>
                    How may I assist You ?
                  </Typography>

                </Stack>
              </Grid>
              <Grid item xs={2} >

              </Grid>
            </Grid>
            <Grid container sx={{ paddingTop: 10 }}>
              <Grid item xs={2} >

              </Grid>
              <Grid item xs={8} display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"}>
                {mockData?.map((data,index) => (
                  <Box key={index+1} width={"44%"} border={"1px solid #787878"} pl={2} py={1} mb={2}
                  borderRadius={4}>
                    <Stack direction={"column"}>
                      <Typography color={"#C5C5D2"}>{data.title}</Typography>
                      <Typography color={"#929292"} fontSize={14}>{data.description}</Typography>

                    </Stack>
                  </Box>
                ))}


              </Grid>
              <Grid item xs={2} >

              </Grid>
            </Grid>
          </>
        )}

      <InputBar
        onSendMessage={handleSendMessage}
        enabled={inputEnabled}
        mode={mode}
        setMode={setMode}
        messages={messages}
      />
      </Stack>
  );
};

export default ChatWindow;
