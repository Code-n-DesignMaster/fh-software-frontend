import { createRef, PureComponent } from 'react';
import {
  Form, InputNumber, Button, Row, Col, Switch, Space, FormInstance
} from 'antd';
import { IPerformer } from 'src/interfaces';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
};

const validateMessages = {
  required: 'This field is required!',
  types: {
    email: 'Not a validate email!',
    number: 'Not a validate number!'
  },
  number: {
    // eslint-disable-next-line no-template-curly-in-string
    range: 'Must be between ${min} and ${max}'
  }
};

interface IProps {
  onFinish: Function;
  user: IPerformer;
  updating?: boolean;
}

export class PerformerSubscriptionForm extends PureComponent<IProps> {

  formRef: any;

  componentDidMount() {
      if (!this.formRef) this.formRef = createRef();
  }

  onSwitch(field: string, checked: boolean) {
    const instance = this.formRef.current as FormInstance;
    if (field === 'subsribeSwitch') {
      instance.setFieldsValue({
        [field]: checked
      });
      if (checked == true && instance.getFieldValue("freeSubsribeSwitch") == true) {
        instance.setFieldsValue({
          freeSubsribeSwitch: false
        });
      }
    } else if (field === 'freeSubsribeSwitch') {
      instance.setFieldsValue({
        [field]: checked
      });
      if (checked == true && instance.getFieldValue("subsribeSwitch") == true) {
        instance.setFieldsValue({
          subsribeSwitch: false
        });
      }
    }
  }

  render() {
    if (!this.formRef) this.formRef = createRef();
    const { onFinish, user, updating } = this.props;
    return (
      <Form
        {...layout}
        ref={this.formRef}
        name="nest-messages"
        onFinish={onFinish.bind(this)}
        validateMessages={validateMessages}
        initialValues={user}
        labelAlign="left"
        className="account-form"
      >
        <Row>
          <Col xl={12} md={12} xs={24}>
            <Form.Item name="subsribeSwitch" label="Enable Paid Subscriptions" valuePropName="checked">
              <Switch checkedChildren="ON" unCheckedChildren="OFF" onChange={this.onSwitch.bind(this, 'subsribeSwitch')}/>
            </Form.Item>
          </Col>
          <Col xl={12} md={12} xs={24}>
            <Form.Item name="freeSubsribeSwitch" label="Enable Free Subscriptions" valuePropName="checked">
              <Switch checkedChildren="ON" unCheckedChildren="OFF" onChange={this.onSwitch.bind(this, 'freeSubsribeSwitch')}/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
         
          <Col xl={12} md={12} xs={24}>
          <Space size={3}>           
            <Form.Item name="monthlyPrice" label="Monthly Subscription Price">
              <InputNumber min={1} />
            </Form.Item>
              USD
            </Space>
          </Col>
        </Row>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
          <Button
            className="primary"
            type="primary"
            htmlType="submit"
            loading={updating}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
