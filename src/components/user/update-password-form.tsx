import React from 'react';
import {
  Form, Button, Input, Row, Col
} from 'antd';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
};

interface IProps {
  onFinish: Function;
  updating: boolean;
}

export const UpdatePaswordForm = ({ onFinish, updating = false }: IProps) => (
  <Form
    name="nest-messages"
    className="account-form"
    onFinish={onFinish.bind(this)}
    {...layout}
  >
    <Row>
      <Col md={12} xs={24}>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please input your password!', min: 6 }
          ]}
        >
          <Input
            type="password"
            placeholder="Password must contain at least 6 characters."
          />
        </Form.Item>
      </Col>
      <Col md={12} xs={24}>
        <Form.Item
          name="confirm"
          validateTrigger={['onChange', 'onBlur']}
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!'
            },
            {
              min: 6,
              message: 'Password must contain at least 6 characters.'
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject('Passwords do not match together!');
              }
            })
          ]}
        >
          <Input type="password" placeholder="Confirm password" />
        </Form.Item>
      </Col>
    </Row>
    <Form.Item wrapperCol={{ offset: 4 }}>
      <Button className="primary" htmlType="submit" loading={updating}>
        Update Password
      </Button>
    </Form.Item>
  </Form>
);
