import Avatar, { ConfigProvider } from "react-avatar";

type AvatarGeneratorProps = {
  name: string;
  size: number;
  isRound?: boolean;
  textSizeRatio?: number;
  avatar?: string;
};

const AVATAR_COLORS = ["#292929", "#8e8e8e", "#8e8e8e"];

const AvatarGenerator = ({
  name,
  size,
  isRound = true,
  textSizeRatio = 3,
  avatar,
}: AvatarGeneratorProps) => {
  return (
    // @ts-expect-error https://github.com/ambassify/react-avatar/issues/258
    <ConfigProvider colors={AVATAR_COLORS}>
      <Avatar
        name={name}
        size={`${size}`}
        textSizeRatio={textSizeRatio}
        round={isRound}
        src={avatar}
      />
    </ConfigProvider>
  );
};

export default AvatarGenerator;
