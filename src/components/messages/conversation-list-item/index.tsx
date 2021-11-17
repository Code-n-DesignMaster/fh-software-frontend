import { IPerformer } from '@interface/performer';
import ChevronIcon from '@components/icons/chevron';
import {
  Wrapper,
  AvatarWrapper,
  Avatar,
  Info,
  Username,
  Unseen
} from './styled';

export type Props = {
  data: {
    recipientInfo?: IPerformer;
    lastMessage: any;
    _id: string;
    totalNotSeenMessages?: number;
  };
  setActive: Function;
  selected: boolean;
};

const ConversationListItem = ({ data, setActive, selected }: Props) => {
  const { recipientInfo, _id, totalNotSeenMessages = 0 } = data;

  return (
    <Wrapper active={selected} onClick={() => setActive(_id)}>
      <AvatarWrapper>
        <Avatar
          className="conversation-photo"
          src={recipientInfo?.avatar || '/no-avatar.png'}
          alt="conversation"
        />
        {totalNotSeenMessages > 0 && <Unseen />}
      </AvatarWrapper>
      <Info>
        <Username>@{recipientInfo?.username}</Username>
      </Info>
      <ChevronIcon />
    </Wrapper>
  );
};

export default ConversationListItem;
