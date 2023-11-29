import { FC, SVGProps } from "react";

export const SendIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 11L12 6L17 11M12 18V7"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  );
};

export default SendIcon;
