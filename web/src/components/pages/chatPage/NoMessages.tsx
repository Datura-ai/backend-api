import { FC } from "react";
import { Container, Avatar } from "@mui/material";

const NoMessages: FC = () => {
  return (
    <Container sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <Avatar src="/taotensor_logo.svg" sx={{ width: 200, height: 200}}/>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center", marginTop: 0 }}>
        How can I help you?
      </p>
    </Container>
  );
}

export default NoMessages;