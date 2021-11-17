import { PureComponent } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import { IPerformer, ICountry } from 'src/interfaces';
import { htmlDecode } from '@lib/string';
import { ImageUpload } from '@components/file';

const { Option } = Select;

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
};

const { TextArea } = Input;

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
  countries?: ICountry[];
  updating?: boolean;
  options?: {
    uploadHeaders?: any;
    idVerificationUploadUrl?: string;
    onIdVerificationUploaded?: Function;
  };
}

export class PerformerAccountForm extends PureComponent<IProps> {
  render() {
    const { onFinish, user, countries, updating, options } = this.props;
    const {
      uploadHeaders,
      idVerificationUploadUrl,
      onIdVerificationUploaded
    } = options;
    return (
      <Form
        {...layout}
        name="nest-messages"
        onFinish={(values) => {
          // eslint-disable-next-line no-param-reassign
          onFinish(values);
        }}
        validateMessages={validateMessages}
        initialValues={{
          ...user,
          quote: user?.quote ? htmlDecode(user.quote) : ''
        }}
        labelAlign="left"
        className="account-form"
      >
        <Row>
          <Col md={12}>
            <Form.Item
              name="firstName"
              validateTrigger={['onChange', 'onBlur']}
              rules={[
                { required: true, message: 'Please input your first name!' },
                {
                  pattern: new RegExp(
                    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
                  ),
                  message:
                    'First name can not contain number and special character'
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item
              name="lastName"
              validateTrigger={['onChange', 'onBlur']}
              rules={[
                { required: true, message: 'Please input your last name!' },
                {
                  pattern: new RegExp(
                    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
                  ),
                  message:
                    'Last name can not contain number and special character'
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item name="username">
              <Input placeholder="username" />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item name="email">
              <Input disabled placeholder="email" />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item name="country" rules={[{ required: true }]}>
              <Select
                placeholder="Select your country"
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {countries &&
                  countries.length > 0 &&
                  countries.map((c) => (
                    <Option value={c.code} key={c.code}>
                      {c.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item name="city">
              <Input placeholder="Enter the city" />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item name="state">
              <Input placeholder="Enter the state" />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item name="address">
              <Input placeholder="Enter the address" />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item name="zipcode">
              <Input placeholder="Zip code" />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item name="gender">
              <Select>
                <Select.Option value="male" key="male">
                  Male
                </Select.Option>
                <Select.Option value="female" key="female">
                  Female
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col md={24}>
            <Form.Item
              labelCol={{ span: 24 }}
              name="upload"
              label="Photo ID verification"
              valuePropName="fileList"
              className="model-photo-verification"
            >
              <ImageUpload
                headers={uploadHeaders}
                uploadUrl={idVerificationUploadUrl}
                onUploaded={onIdVerificationUploaded}
                options={{ fieldName: 'idVerification' }}
                imageUrl={user.idVerification?.url}
              />
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
