import { useState, useEffect } from 'react';
import { LoaderInner } from '@components/loader';
import { IPerformer } from '@interface/performer';
import Modal from '@components/modal';
import { Avatar, Title } from './styled';

type WindowWithAddThis = Window &
  // eslint-disable-next-line no-undef
  typeof globalThis & {
    addthis: {
      init: () => void;
      update: (fn: string, param: string, value: string) => void;
      layers: {
        initialized: boolean;
        refresh: () => void;
      };
    };
  };

type Props = {
  performer: IPerformer;
  isOpen: boolean;
  onClose: () => void;
};

const ShareModal = ({ isOpen, onClose, performer }: Props) => {
  const [isLoaded, setLoaded] = useState(false);

  const configure = () => {
    const addThis = (window as WindowWithAddThis).addthis;
    addThis.init();
    addThis.update('share', 'url', window.location.href);
    if (addThis.layers.initialized) {
      addThis.layers.refresh();
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (isLoaded) {
        setLoaded(true);
        configure();
      } else {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src =
          '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-6150216c00b50306';
        script.onload = () => {
          setLoaded(true);
          configure();
        };
        document.body.appendChild(script);
      }
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Avatar src={performer.avatar || '/no-avatar.png'} />
      <Title>
        Share <mark>{performer.username}</mark>&apos;s profile on social media:
      </Title>
      {!isLoaded && <LoaderInner />}
      <div className="addthis_inline_share_toolbox" />
    </Modal>
  );
};

export default ShareModal;
