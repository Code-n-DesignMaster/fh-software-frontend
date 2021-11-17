import BuyButton from '@components/buy-button';
import { htmlEncode } from '@lib/string';
import { Button, Col, Form, Input, InputNumber, Modal, Row } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { createRef, PureComponent } from 'react';

const { TextArea } = Input;

type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus'];

interface IProps {
  visibleSendTip: boolean;
  closeSendTip: Function;
  sendTip: Function;
  isMessage: boolean;
  minAmount: number;
}

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
};

export class SendTip extends PureComponent<IProps> {
  state = {
    validateStatus: 'success' as ValidateStatus,
    errorMsg: ''
  };

  formRef: any;

  componentDidMount() {
    if (!this.formRef) this.formRef = createRef();
  }

  handleSendTip = async (token: string) => {
    const values = this.formRef.current.getFieldsValue();
    this.props.sendTip({
      amount: parseFloat(values.amount),
      note: htmlEncode(values.note),
      paymentToken: token
    });
  };

  handleClose() {
    const { closeSendTip: HandleCloseSendTip } = this.props;
    this.formRef.current.resetFields();
    HandleCloseSendTip();
  }

  validatePrimeNumber(number) {
    const { minAmount } = this.props;
    if (number >= minAmount) {
      return {
        validateStatus: 'success',
        errorMsg: null
      };
    }
    return {
      validateStatus: 'error',
      errorMsg: `Please tip between ${minAmount} and $200 USD`
    };
  }

  setFormVal(field: string, val: any) {
    const instance = this.formRef.current as FormInstance;
    if (field === 'note') {
      instance.setFieldsValue({
        [field]: val.target.value
      });
    } else if (field === 'amount') {
      this.setState({ ...this.validatePrimeNumber(val) });
      instance.setFieldsValue({
        [field]: val
      });
    }
  }

  render() {
    if (!this.formRef) this.formRef = createRef();
    const { visibleSendTip, isMessage, minAmount } = this.props;
    const { validateStatus, errorMsg } = this.state;
    return (
      <Modal
        className="send-tip"
        title={null}
        visible={visibleSendTip}
        footer={null}
        maskClosable
        centered
        width={350}
        onCancel={this.handleClose.bind(this)}
        style={{ textAlign: 'center' }}
        bodyStyle={{ padding: '40px 20px 10px' }}
      >
        <Form
          {...layout}
          ref={this.formRef}
          initialValues={{ note: '', amount: minAmount }}
        >
          <Row>
            <Col xl={24} md={24} xs={24}>
              <Form.Item label={<h3>Message</h3>} name="note">
                <TextArea
                  rows={4}
                  placeholder="Write your message..."
                  onChange={(val) => this.setFormVal('note', val)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xl={24} md={24} xs={24} className={'amount'}>
              <Form.Item
                label={<h3>Tip Amount</h3>}
                name="amount"
                validateStatus={validateStatus}
                help={errorMsg || `*$${minAmount} - $200 USD`}
              >
                <InputNumber
                  style={{ width: '100px' }}
                  min={minAmount}
                  max={200}
                  size={'large'}
                  onChange={(val) => this.setFormVal('amount', val)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xl={24} md={24} xs={24}>
              <Form.Item>
                <BuyButton onComplete={this.handleSendTip.bind(this)}>
                  <Button style={{ width: '100%' }} type="primary" size="large">
                    {isMessage ? 'Send Message' : 'Send Tip'}
                  </Button>
                </BuyButton>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
