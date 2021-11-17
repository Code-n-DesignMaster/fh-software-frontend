import { IPerformer } from 'src/interfaces';
import { Button, Col, Divider, Form, InputNumber, message, Progress, Radio, Row, Switch, Upload } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, { PureComponent } from 'react'
import { LoadingOutlined, PaperClipOutlined } from '@ant-design/icons';
import { ImageMessageUpload } from '@components/messages/uploadPhoto';
import { htmlDecode } from '@lib/string';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    if(file.type.includes('image')){
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
        message.error('Image must smaller than 5MB!');
    }
    }
    return true;
}

interface IState {
    uploadType: string;
    loading: boolean;
    uploadVideoPercentage: number;
    imageUrl: string;
    enableWelcomeMessage: boolean;
}

interface IProps {
    onFinish: Function;
    user: IPerformer;
    updating?: boolean;
    options?: {
        uploadHeaders?: any;
        welcomeImgUploadUrl?: string;
        onwelcomeImgUploaded?: Function;
        onwelcomeMVideoUploaded?: Function;
    };
    onFileReaded?: Function;
}

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 }
};

export class ChatSettingsForm extends PureComponent<IProps, IState> {

    state = {
        uploadType: this.props.user.welcomeMessageMimeType && this.props.user.welcomeMessageMimeType.indexOf("video") > -1 ?  'video' : 'image' ,
        loading: false,
        uploadVideoPercentage: 0,
        enableWelcomeMessage: !!this.props.user.enableWelcomeMessage,
        imageUrl: this.props.user.welcomeMessageMimeType && this.props.user.welcomeMessageMimeType.indexOf("image") > -1 ? this.props.user.welcomeImgPath : (this.props.user.welcomeMessageMimeType && this.props.user.welcomeMessageMimeType.indexOf("video") > -1) ? '/videothumbnail.png' : ''
    }; 

    onChange = (e) => {
        this.setState({
            uploadType: e.target.value,
            imageUrl: e.target.value === 'image' ? (this.props.user.welcomeImgPath ? this.props.user.welcomeImgPath : '') : (this.props.user.welcomeMessageVideoPath ? '/videothumbnail.png' : '')
        });
    }

    
    onSwitch(checked: boolean) {
        this.setState({
            enableWelcomeMessage: checked
        });
    }

    handleChange = (info: any) => {
        info.file
      && info.file.percent
      && info.file.originFileObj.type.indexOf('video/') > -1
      && this.setState({ uploadVideoPercentage: info.file.percent });
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          this.props.onFileReaded
            && this.props.onFileReaded(info.file.originFileObj);
          // Get this url from response in real world.
          if(info.file.originFileObj.type.indexOf('image/') > -1){
             getBase64(info.file.originFileObj, (imageUrl) => {
            this.setState({
              imageUrl,
              loading: false,
            });
            this.props.options.onwelcomeImgUploaded
              && this.props.options.onwelcomeImgUploaded({
                response: info.file.response,
                base64: imageUrl
              });
          }); 
          }else if (info.file.originFileObj.type.indexOf('video/') > -1){
            this.setState({
                imageUrl: '/videothumbnail.png',
                loading: false,
              });
              this.props.options.onwelcomeMVideoUploaded
              && this.props.options.onwelcomeMVideoUploaded({
                response: info.file.response,
              });
          }
        }
      };

    render() {
        const { onFinish, user, updating, options } = this.props;
        const { uploadHeaders, welcomeImgUploadUrl} = options;
        const { imageUrl, uploadType, uploadVideoPercentage, enableWelcomeMessage } = this.state;
        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PaperClipOutlined />}
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div>
                <Form
                    {...layout}
                    onFinish={onFinish.bind(this)}
                    initialValues={{
                        enableChat: !!user.enableChat,
                        tipAmount: user.tipAmount,
                        enableWelcomeMessage: !!enableWelcomeMessage,
                        welcomeMessage: user.welcomeMessage ? htmlDecode(user.welcomeMessage) : '',
                        welcomeMessageMimeType: uploadType,
                        welcomeImgPath: user.welcomeImgPath,
                        welcomeMessageVideoPath: user.welcomeMessageVideoPath
                    }}
                    name="nest-messages"
                    labelAlign="left"
                    className="account-form">
                    <Row>
                        <Col>
                            <p style={{ fontWeight: 'bold', fontSize: '24px' }}>Chats</p>
                        </Col>
                        <Col md={24}>
                            <Form.Item label="Allow non-subscribers to send you messages with a tip" name="enableChat" valuePropName="checked">
                                <Switch checkedChildren="ON" unCheckedChildren="OFF" />
                            </Form.Item>
                        </Col>
                        <Col md={24}>
                            <Form.Item label="Minimum Tip Amount" name="tipAmount">
                                <InputNumber min={1} max={200} />
                            </Form.Item>
                        </Col>
                        <Divider dashed style={{ borderColor: "black"}}></Divider>
                        <Col>
                            <p style={{ fontWeight: 'bold', fontSize: '24px' }}>Welcome Message</p>
                        </Col>
                        <Col md={24}>
                            <Form.Item label="Send a welcome message to new subscribers" name="enableWelcomeMessage" valuePropName="checked">
                                <Switch checked={enableWelcomeMessage} checkedChildren="ON" unCheckedChildren="OFF" onChange={this.onSwitch.bind(this)}/>
                            </Form.Item>
                        </Col>
                        <Col md={24}>
                            <Form.Item name="welcomeMessage">
                                <TextArea placeholder="Welcome Message..."></TextArea>
                            </Form.Item>
                        </Col>
                        <Col md={24}>
                            <Form.Item label="Attach video or image" name="welcomeMessageMimeType">
                                <Radio.Group
                                    options={[{ label: 'Image', value: 'image' },{ label: 'Video', value: 'video' }]}
                                    onChange={this.onChange}
                                    value={uploadType}
                                    optionType="button"
                                    buttonStyle="solid"
                                />
                            </Form.Item>
                            <Form.Item name={uploadType === 'image' ? "welcomeImgPath" : "welcomeMessageVideoPath"}>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <div>
                                        <Upload
                                            accept={`${uploadType}/*`}
                                            name={uploadType === 'image' ? 'message-photo' : 'message-video'}
                                            headers={uploadHeaders}
                                            action={welcomeImgUploadUrl}
                                            beforeUpload={beforeUpload}
                                            onChange={this.handleChange}
                                            showUploadList={false}
                                            listType="picture-card"
                                            className="avatar-uploader"
                                        >
                                            {imageUrl !== '' ? (
                                                <img src={imageUrl} alt="file" style={{ width: '100%' }} />
                                            ) : (
                                                    uploadButton
                                                )}
                                        </Upload>
                                    </div>
                                    {uploadVideoPercentage && uploadType === 'video' ? (
                                            <Progress percent={Math.round(uploadVideoPercentage)} />
                                        ) : null}
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                        <Button className="primary" type="primary" htmlType="submit" loading={updating}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
