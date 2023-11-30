import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { MessageItemProps } from "./chatPage/MessageItem";



const MessageItemContainer: React.FC<MessageItemProps> = ({ message, contentElem, Icon }) => {
    return (

        <Stack direction={"row"} spacing={1}
            style={{
                padding: 20,
                borderRadius: 10,
                boxShadow: "gb(211 211 211) 1px 8px 3px",
                maxWidth: "60%",
                maxHeight: 400,
                overflowY: "auto",
                margin: 'auto',
                border:"1px solid #787878"

            }}>
            <Stack direction={"column"}>
                <Box borderRadius={100} p={"4px"} >
                    <Icon size={15} style={{
                        color: "#000",
                        background: "#fff", borderRadius: 100, border: "1px solid #e8e8e8", padding: 3
                    }} />

                </Box>
            </Stack>
            <Stack direction={"column"} width={"100%"}>

                <Typography fontWeight={"bold"}color={"#C5C5D2"}>
                    {message.author}
                </Typography>
                <Typography color={"#d1d1d1"}>
                    {contentElem}
                </Typography>

            </Stack>
        </Stack>

        

    )
}
export default MessageItemContainer