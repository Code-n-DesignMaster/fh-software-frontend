import { PureComponent, createRef } from 'react';
import { Form, Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { IUser } from 'src/interfaces';
import { ICreateComment } from '../../interfaces/comment';
import './comment.less';

interface IProps {
  objectId: string;
  onSubmit: Function;
  creator: IUser;
  requesting?: boolean;
}

const { TextArea } = Input;

export class CommentForm extends PureComponent<IProps> {
  formRef: any;

  componentDidMount() {
    if (!this.formRef) this.formRef = createRef();
  }

  onFinish = (values: ICreateComment) => {
    const { objectId, onSubmit } = this.props;
    // eslint-disable-next-line no-param-reassign
    values.objectId = objectId;
    onSubmit(values);
    this.formRef.current.resetFields();
  };

  render() {
    const { creator, requesting, objectId } = this.props;
    if (!this.formRef) this.formRef = createRef();
    return (
      <Form
        ref={this.formRef}
        name="comment-form"
        onFinish={this.onFinish}
        initialValues={{
          objectId,
          content: ''
        }}
      >
        <div className="comment-form">
          <div className="cmt-user">
            <img
              alt="avatar"
              src={creator.avatar ? creator.avatar : '/no-avatar.png'}
            />
            {/* <span>@{creator.username}</span> */}
          </div>
          <div className="cmt-area">
            <Form.Item
              name="content"
              validateTrigger={['onChange', 'onBlur']}
              rules={[
                {
                  min: 2,
                  message: 'Please input at least 2 characters'
                }
              ]}
            >
              <TextArea rows={2} placeholder="Leave your thinking here" />
            </Form.Item>
          </div>
          <Button
            className="submit-btn"
            htmlType="submit"
            disabled={requesting}
          >
            <SendOutlined />
          </Button>
        </div>
      </Form>
    );
  }
}
