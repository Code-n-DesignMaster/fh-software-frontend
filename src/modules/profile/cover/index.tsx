import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import { Upload, message, Image } from 'antd';
import ShareIcon from '@components/icons/share';
import { updateCurrentUserCover } from 'src/redux/user/actions';
import { performerService, authService } from 'src/services';
import { getBase64 } from 'src/common/utils';
import { IPerformer } from '@interface/performer';
import { validateFile } from '../utils';
import ShareModal from './share-modal';
import {
  Wrapper,
  Overlay,
  ShareWrapper,
  ShareButton,
  WrapperPreviewCover
} from './styled';

type Props = {
  canEdit: boolean;
  performer: IPerformer;
};

const Cover = ({ canEdit, performer }: Props) => {
  const dispatch = useDispatch();
  const [shareModalOpen, openShareModal] = useState(false);

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, () => {
        message.success('Changes saved.');
        dispatch(updateCurrentUserCover(info.file.response.data.url));
      });
    }
  };

  return (
    <>
      <Wrapper
        editable={canEdit}
        imageUrl={performer.cover || '/banner-image.jpg'}
      >
        {canEdit ? (
          <Overlay>
            <Upload
              accept="image/*"
              name="cover"
              showUploadList={false}
              action={performerService.getCoverUploadUrl()}
              beforeUpload={validateFile}
              onChange={handleChange}
              headers={{
                authorization: authService.getToken()
              }}
            >
              <div style={{ color: 'white', fontSize: '18px' }}>
                <EditOutlined /> Edit Cover Photo
              </div>
            </Upload>
          </Overlay>
        ) : (
          <WrapperPreviewCover>
            <Image src={performer.cover} fallback="/banner-image.jpg" />
            <ShareWrapper>
              <ShareButton onClick={() => openShareModal(true)}>
                <ShareIcon />
              </ShareButton>
            </ShareWrapper>
          </WrapperPreviewCover>
        )}
      </Wrapper>
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => openShareModal(false)}
        performer={performer}
      />
    </>
  );
};

export default Cover;
