import { PureComponent } from 'react';
import {
  Form, Button, Row, Col, Select
} from 'antd';
import { IBlockCountries, ICountry } from 'src/interfaces';

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
  blockCountries?: IBlockCountries;
  updating?: boolean;
  countries?: ICountry[];
}

const { Option } = Select;

export class PerformerBlockCountriesForm extends PureComponent<IProps> {
  render() {
    const {
      onFinish, blockCountries, updating, countries
    } = this.props;
    return (
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish.bind(this)}
        validateMessages={validateMessages}
        initialValues={blockCountries}
        labelAlign="left"
        className="account-form"
      >
        <Row>
          <Col md={12}>
            <Form.Item name="countries">
              <Select
                placeholder="Select your block countries"
                showSearch
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase())
                  >= 0}
                mode="multiple"
              >
                {countries
                  && countries.length > 0
                  && countries.map((c) => (
                    <Option value={c.code} key={c.code}>
                      {c.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
          <Button
            type="primary"
            htmlType="submit"
            className="primary"
            loading={updating}
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
