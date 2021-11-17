import { useState } from 'react';
import Link from 'next/link';
import { IPerformer } from '@interface/performer';
import { IUser } from '@interface/user';
import MessageIcon from '@components/icons/message';
import { OutlineButton } from '@components/buttons';

type Props = {
  currentUser: IUser | IPerformer;
  performer: IPerformer;
};

const ChatButton = ({ currentUser, performer }: Props) => {
  // const [isModalOpen, setModalOpen] = useState(false);

  if (
    currentUser._id === performer._id ||
    !performer.enableChat ||
    !performer.isSubscribed
  ) {
    return null;
  }

  // if (performer.hasChat) {
  return (
    <Link
      href={{
        pathname: '/messages',
        query: {
          toSource: 'performer',
          toId: performer?._id || ''
        }
      }}
    >
      <OutlineButton as="a">
        <MessageIcon /> Chat with me
      </OutlineButton>
    </Link>
  );
  // }

  // return (
  //   <OutlineButton onClick={() => setModalOpen(true)}>
  //     <MessageIcon /> Chat with me
  //   </OutlineButton>
  // );
};

export default ChatButton;
