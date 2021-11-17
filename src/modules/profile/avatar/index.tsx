import { useDispatch, useSelector } from 'react-redux';
import { Upload, message, Image } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { detection } from '@lib/deepai';
import { performerService, authService } from 'src/services';
import { updateCurrentUserAvatar } from 'src/redux/user/actions';
import { RootState } from '@redux/store';
import { getBase64 } from 'src/common/utils';
import { validateFile } from '../utils';
import { Wrapper, Overlay } from './styled';

type Props = {
  imageUrl: string;
  canEdit: boolean;
};

const Avatar = ({ imageUrl, canEdit }: Props) => {
  const dispatch = useDispatch();
  const { nudirtyMinScore, nudirtySwitch } = useSelector(
    (state: RootState) => state.ui
  );

  const onAvatarDeleted = async () => {
    try {
      const deleted = await (await performerService.deleteAvatar()).data;
      if (deleted) {
        dispatch(updateCurrentUserAvatar(''));
      }
    } catch (error) {
      const e = await error;
      message.error(
        e && e.message ? e.message : 'Error occured, please try again later'
      );
    }
  };

  const onAvatarUploaded = async (data: any) => {
    if (nudirtySwitch) {
      const resp = (await detection(data.base64)) as any;
      if (
        resp
        && resp.output
        && resp.output.nsfw_score
        && resp.output.nsfw_score * 100 > nudirtyMinScore
      ) {
        message.error('Nudity detected. Please select another picture!');
        onAvatarDeleted();
        return;
      }
    }
    message.success('Changes saved.');
    dispatch(updateCurrentUserAvatar(data.response.data.url));
  };

  const handleAvatarChange = (info: any) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (base64) => {
        onAvatarUploaded({
          response: info.file.response,
          base64
        });
      });
    }
  };

  return (
    <Wrapper
      style={{
        backgroundImage: `url('${imageUrl || '/no-avatar.png'}')`
      }}
    >
      {canEdit ? (
        <Overlay>
          <Upload
            accept="image/*"
            name="avatar"
            showUploadList={false}
            beforeUpload={validateFile}
            onChange={handleAvatarChange}
            headers={{
              authorization: authService.getToken()
            }}
            action={performerService.getAvatarUploadUrl()}
          >
            <EditOutlined />
          </Upload>
        </Overlay>
      ) : (
        <Image src={imageUrl} fallback="/no-avatar.png" />
      )}
    </Wrapper>
  );
};

export default Avatar;
