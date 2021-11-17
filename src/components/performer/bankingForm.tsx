import { createRef, PureComponent } from 'react';
import {
  Form, Input, Button, Row, Col, Select, Divider, Switch, InputNumber, Space
} from 'antd';
import { IPerformer, ICountry } from 'src/interfaces';
import { maskFormat } from '@lib/string';
import { FormInstance } from 'antd/lib/form';
import { CloseCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
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
  countries?: ICountry[];
}

export class PerformerBankingForm extends PureComponent<IProps> {

  state = {
    bankAccountEdit: false,
    bankRoutingEdit: false,
    bankSwiftCodeEdit: false,
    SSNEdit: false,
    agentBankAccountEdit: false,
    agentBankRoutingEdit: false,
    agentBankSwiftCodeEdit: false,
    agentSSNEdit: false,
    bankManageSwitch: false
  }
  formRef: any;

  componentDidMount() {
    if (!this.formRef) this.formRef = createRef();
  }
  update = (type: string) => {
    const instance = this.formRef.current as FormInstance;
    if (type === 'bankAccount') {
      instance.setFieldsValue({
        [type]: ''
      });
      this.setState({ bankAccountEdit: true });
    }
    else if (type === 'bankRouting') {
      instance.setFieldsValue({
        [type]: ''
      });
      this.setState({ bankRoutingEdit: true });
    }
    else if (type === 'bankSwiftCode') {
      instance.setFieldsValue({
        [type]: ''
      });
      this.setState({ bankSwiftCodeEdit: true });
    }
    else if (type === 'SSN') {
      instance.setFieldsValue({
        [type]: ''
      });
      this.setState({ SSNEdit: true });
    }
    else if (type === 'agentBankAccount') {
      instance.setFieldsValue({
        [type]: ''
      });
      this.setState({ agentBankAccountEdit: true });
    }
    else if (type === 'agentBankRouting') {
      instance.setFieldsValue({
        [type]: ''
      });
      this.setState({ agentBankRoutingEdit: true });
    }
    else if (type === 'agentBankSwiftCode') {
      instance.setFieldsValue({
        [type]: ''
      });
      this.setState({ agentBankSwiftCodeEdit: true });
    }
    else if (type === 'agentSSN') {
      instance.setFieldsValue({
        [type]: ''
      });
      this.setState({ agentSSNEdit: true });
    }
  }

  cancel = (type: string) => {
    const instance = this.formRef.current as FormInstance;
    const { user } = this.props;
    if (type === 'bankAccount') {
      instance.setFieldsValue({
        [type]: user.bankingInformation?.bankAccount
      });
      this.setState({ bankAccountEdit: false });
    }
    else if (type === 'bankRouting') {
      instance.setFieldsValue({
        [type]: user.bankingInformation?.bankRouting
      });
      this.setState({ bankRoutingEdit: false });
    }
    else if (type === 'bankSwiftCode') {
      instance.setFieldsValue({
        [type]: user.bankingInformation?.bankSwiftCode
      });
      this.setState({ bankSwiftCodeEdit: false });
    }
    else if (type === 'SSN') {
      instance.setFieldsValue({
        [type]: user.bankingInformation?.SSN
      });
      this.setState({ SSNEdit: false });
    }
    else if (type === 'agentBankAccount') {
      instance.setFieldsValue({
        [type]: user.bankingInformation?.agentBankAccount
      });
      this.setState({ agentBankAccountEdit: false });
    }
    else if (type === 'agentBankRouting') {
      instance.setFieldsValue({
        [type]: user.bankingInformation?.agentBankRouting
      });
      this.setState({ agentBankRoutingEdit: false });
    }
    else if (type === 'agentBankSwiftCode') {
      instance.setFieldsValue({
        [type]: user.bankingInformation?.agentBankSwiftCode
      });
      this.setState({ agentBankSwiftCodeEdit: false });
    }
    else if (type === 'agentSSN') {
      instance.setFieldsValue({
        [type]: user.bankingInformation?.agentSSN
      });
      this.setState({ agentSSNEdit: false });
    }
  }

  onSwitch(checked: boolean) {
    this.setState({
        bankManageSwitch: checked
    });
  }

  render() {
    if (!this.formRef) this.formRef = createRef();
    const {
      onFinish, user, updating, countries
    } = this.props;
    const {
      bankAccountEdit,
      bankRoutingEdit,
      bankSwiftCodeEdit,
      SSNEdit,
      agentBankAccountEdit,
      agentBankRoutingEdit,
      agentBankSwiftCodeEdit,
      agentSSNEdit,
      bankManageSwitch
    } = this.state;
    return (
      <Form
        {...layout}
        ref={this.formRef}
        name="nest-messages"
        onFinish={(values) => {
          onFinish(values);
          this.setState({
            bankAccountEdit: false,
            bankRoutingEdit: false,
            bankSwiftCodeEdit: false,
            SSNEdit: false,
            agentBankAccountEdit: false,
            agentBankRoutingEdit: false,
            agentBankSwiftCodeEdit: false,
            agentSSNEdit: false
          })
        }
        }
        validateMessages={validateMessages}
        initialValues={user.bankingInformation}
        labelAlign="left"
        className="account-form"
      >
        <Row>
          <Col xl={12} md={12} xs={24}>
            <Form.Item
              name="bankName"
              rules={[
                { required: true, message: 'Please input your bank name!' }
              ]}
            >
              <Input placeholder="Bank name" />
            </Form.Item>
          </Col>
          {user.bankingInformation && user.bankingInformation?.bankAccount && !bankAccountEdit &&
            <Col xl={12} md={12} xs={24}>
              <div className='bank-content'>
              <p className='bankinfo'>{maskFormat(user.bankingInformation?.bankAccount)}<a onClick={() => this.update('bankAccount')}> edit</a></p> 
              </div>
            </Col>
          }
          <Col xl={12} md={12} xs={24} hidden={bankAccountEdit || !user.bankingInformation?.bankAccount ? false : true}>
            <Form.Item
              name="bankAccount"
              rules={[
                { required: true, message: 'Please input your bank account!' }
              ]}
            >
              <Input placeholder="Bank account" />
            </Form.Item>
            {!!user.bankingInformation?.bankAccount && <CloseCircleOutlined onClick={() => this.cancel('bankAccount')} />}
          </Col>
          {user.bankingInformation && user.bankingInformation?.bankRouting && !bankRoutingEdit &&
            <Col xl={12} md={12} xs={24}>
              <div className='bank-content'>
              <p className='bankinfo'>{maskFormat(user.bankingInformation?.bankRouting)}<a onClick={() => this.update('bankRouting')}> edit</a></p> 
              </div>
            </Col>
          }
          <Col xl={12} md={12} xs={24} hidden={bankRoutingEdit || !user.bankingInformation?.bankRouting ? false : true}>
            <Form.Item name="bankRouting">
              <Input placeholder="Bank routing" />
            </Form.Item>
            {!!user.bankingInformation?.bankRouting && <CloseCircleOutlined onClick={() => this.cancel('bankRouting')} />}
          </Col>
          {user.bankingInformation && user.bankingInformation?.bankSwiftCode && !bankSwiftCodeEdit &&
            <Col xl={12} md={12} xs={24}>
              <div className='bank-content'>
              <p className='bankinfo'>{maskFormat(user.bankingInformation?.bankSwiftCode)}<a onClick={() => this.update('bankSwiftCode')}> edit</a></p> 
              </div>
            </Col>
          }
          <Col xl={12} md={12} xs={24} hidden={bankSwiftCodeEdit || !user.bankingInformation?.bankSwiftCode ? false : true}>
            <Form.Item name="bankSwiftCode">
              <Input placeholder="Bank swift code" />
            </Form.Item>
            {!!user.bankingInformation?.bankSwiftCode && <CloseCircleOutlined onClick={() => this.cancel('bankSwiftCode')}/>}
          </Col>
          <Col xl={12} md={12} xs={24}>
            <Form.Item
              name="firstName"
              rules={[
                { required: true, message: 'Please input your first name!' }
              ]}
            >
              <Input placeholder="First name" />
            </Form.Item>
          </Col>
          <Col xl={12} md={12} xs={24}>
            <Form.Item
              name="lastName"
              rules={[
                { required: true, message: 'Please input your last name!' }
              ]}
            >
              <Input placeholder="Last name" />
            </Form.Item>
          </Col>
          {user.bankingInformation && user.bankingInformation?.SSN && !SSNEdit &&
            <Col xl={12} md={12} xs={24}>
              <div className='bank-content'>
              <p className='bankinfo'>{maskFormat(user.bankingInformation?.SSN)}<a onClick={() => this.update('SSN')}> edit</a></p> 
              </div>
            </Col>
          }
          <Col xl={12} md={12} xs={24} hidden={SSNEdit || !user.bankingInformation?.SSN ? false : true}>
            <Form.Item name="SSN">
              <Input placeholder="SSN" />
            </Form.Item>
            {!!user.bankingInformation?.SSN && <CloseCircleOutlined onClick={() => this.cancel('SSN')}/>}
          </Col>
          <Col xl={12} md={12} xs={24}>
            <Form.Item name="address">
              <Input placeholder="Bank address" />
            </Form.Item>
          </Col>
          <Col xl={12} md={12} xs={24}>
            <Form.Item
              name="city"
              rules={[{ required: true, message: 'Please input city!' }]}
            >
              <Input placeholder="City" />
            </Form.Item>
          </Col>
          <Col xl={12} md={12} xs={24}>
            <Form.Item name="state">
              <Input placeholder="State" />
            </Form.Item>
          </Col>
          <Col xl={12} md={12} xs={24}>
            <Form.Item
              name="country"
              rules={[{ required: true, message: 'Please choose country!' }]}
            >
              <Select
                showSearch
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase())
                  >= 0}
              >
                {countries
                  && countries.length > 0
                  && countries.map((c) => (
                    <Option key={c.code} value={c.code}>
                      {c.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xl={24} md={24} xs={24}>
            <p style={{ fontWeight: 'bold', fontSize: '24px' }}>Management Bank Information</p>
          </Col>
          <Col xl={12} md={12} xs={24}>
            <Form.Item name="bankManageSwitch" label="Enable Management" valuePropName="checked">
              <Switch checked={bankManageSwitch} checkedChildren="ON" unCheckedChildren="OFF" onChange={this.onSwitch.bind(this)} />
            </Form.Item>
          </Col>
          <Col xl={12} md={12} xs={24}>
            <Space size={3}>
              <Form.Item name="managePercentageFee" label="Manage Percentage Fee">
                <InputNumber
                  disabled={!bankManageSwitch}
                  min={0}
                  max={100}
                  formatter={value => `${value}%`}
                  parser={(value: any) => value.replace('%', '')} />
              </Form.Item>
            </Space>
          </Col>
          <Col xl={12} md={12} xs={24}>
            <Form.Item
              name="agentBankName"
              rules={[
                { required: bankManageSwitch, message: 'Please input your bank name!' }
              ]}
            >
              <Input disabled={!bankManageSwitch} placeholder="Bank name" />
            </Form.Item>
          </Col>
          {user.bankingInformation && user.bankingInformation?.agentBankAccount && !agentBankAccountEdit &&
            <Col xl={12} md={12} xs={24}>
              <div className='bank-content'>
                <p className='bankinfo'>{maskFormat(user.bankingInformation?.agentBankAccount)}
                  {bankManageSwitch && <a onClick={() => this.update('agentBankAccount')}> edit</a>}</p>
              </div>
            </Col>
          }
          <Col xl={12} md={12} xs={24} hidden={agentBankAccountEdit || !user.bankingInformation?.agentBankAccount ? false : true}>
            <Form.Item
              name="agentBankAccount"
              rules={[
                { required: bankManageSwitch, message: 'Please input your bank account!' }
              ]}
            >
              <Input disabled={!bankManageSwitch} placeholder="Bank account" />
            </Form.Item>
            {!!user.bankingInformation?.agentBankAccount && <CloseCircleOutlined onClick={() => this.cancel('agentBankAccount')} />}
          </Col>
          {user.bankingInformation && user.bankingInformation?.agentBankRouting && !agentBankRoutingEdit &&
            <Col xl={12} md={12} xs={24}>
              <div className='bank-content'>
                <p className='bankinfo'>{maskFormat(user.bankingInformation?.agentBankRouting)}
                  {bankManageSwitch && <a onClick={() => this.update('agentBankRouting')}> edit</a>}</p>
              </div>
            </Col>
          }
          <Col xl={12} md={12} xs={24} hidden={agentBankRoutingEdit || !user.bankingInformation?.agentBankRouting ? false : true}>
            <Form.Item name="agentBankRouting">
              <Input disabled={!bankManageSwitch} placeholder="Bank routing" />
            </Form.Item>
            {!!user.bankingInformation?.agentBankRouting && <CloseCircleOutlined onClick={() => this.cancel('agentBankRouting')} />}
          </Col>
          {user.bankingInformation && user.bankingInformation?.agentBankSwiftCode && !agentBankSwiftCodeEdit &&
            <Col xl={12} md={12} xs={24}>
              <div className='bank-content'>
                <p className='bankinfo'>{maskFormat(user.bankingInformation?.agentBankSwiftCode)}
                  {bankManageSwitch && <a onClick={() => this.update('agentBankSwiftCode')}> edit</a>}</p>
              </div>
            </Col>
          }
          <Col xl={12} md={12} xs={24} hidden={agentBankSwiftCodeEdit || !user.bankingInformation?.agentBankSwiftCode ? false : true}>
            <Form.Item name="agentBankSwiftCode">
              <Input disabled={!bankManageSwitch} placeholder="Bank swift code" />
            </Form.Item>
            {!!user.bankingInformation?.agentBankSwiftCode && <CloseCircleOutlined onClick={() => this.cancel('agentBankSwiftCode')} />}
          </Col>
          <Col xl={12} md={12} xs={24}>
            <Form.Item
              name="agentFirstName"
              rules={[
                { required: bankManageSwitch, message: 'Please input your first name!' }
              ]}
            >
              <Input disabled={!bankManageSwitch} placeholder="First name" />
            </Form.Item>
          </Col>
          <Col xl={12} md={12} xs={24}>
            <Form.Item
              name="agentlastName"
              rules={[
                { required: bankManageSwitch, message: 'Please input your last name!' }
              ]}
            >
              <Input disabled={!bankManageSwitch} placeholder="Last name" />
            </Form.Item>
          </Col>
          {user.bankingInformation && user.bankingInformation?.agentSSN && !agentSSNEdit &&
            <Col xl={12} md={12} xs={24}>
              <div className='bank-content'>
                <p className='bankinfo'>{maskFormat(user.bankingInformation?.agentSSN)}
                  {bankManageSwitch && <a onClick={() => this.update('agentSSN')}> edit</a>}</p>
              </div>
            </Col>
          }
          <Col xl={12} md={12} xs={24} hidden={agentSSNEdit || !user.bankingInformation?.agentSSN ? false : true}>
            <Form.Item name="agentSSN">
              <Input disabled={!bankManageSwitch} placeholder="SSN" />
            </Form.Item>
            {!!user.bankingInformation?.agentSSN && <CloseCircleOutlined onClick={() => this.cancel('agentSSN')} />}
          </Col>
          <Col xl={12} md={12} xs={24}>
            <Form.Item name="agentAddress">
              <Input disabled={!bankManageSwitch} placeholder="Bank address" />
            </Form.Item>
          </Col>
          <Col xl={12} md={12} xs={24}>
            <Form.Item
              name="agentCity"
              rules={[{ required: bankManageSwitch, message: 'Please input city!' }]}
            >
              <Input disabled={!bankManageSwitch} placeholder="City" />
            </Form.Item>
          </Col>
          <Col xl={12} md={12} xs={24}>
            <Form.Item name="agentState">
              <Input disabled={!bankManageSwitch} placeholder="State" />
            </Form.Item>
          </Col>
          <Col xl={12} md={12} xs={24}>
            <Form.Item
              name="agentCountry"
              rules={[{ required: bankManageSwitch, message: 'Please choose country!' }]}
            >
              <Select
                disabled={!bankManageSwitch}
                showSearch
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase())
                  >= 0}
              >
                {countries
                  && countries.length > 0
                  && countries.map((c) => (
                    <Option key={c.code} value={c.code}>
                      {c.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
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
