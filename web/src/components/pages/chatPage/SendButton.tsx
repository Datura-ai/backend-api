import styled from "@emotion/styled";
import { ButtonHTMLAttributes, FC } from "react";
import SendIcon from "../../../assets/SendIcon";

const Button = styled.button`
  all: unset;
  box-sizing: border-box;
  cursor: default;
  padding: 2px;
  background-color: rgba(0, 0, 0, 1);
  border-radius: 8px;
  width: 30px;
  height: 30px;

  opacity: 0.1;

  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:disabled) {
    opacity: 1;
    cursor: pointer;
  }

  & svg {
    color: white;
  }
`;

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {};

export const SendButton: FC<Props> = (props) => {
  return (
    <Button {...props}>
      <SendIcon />
    </Button>
  );
};

export default SendButton;
