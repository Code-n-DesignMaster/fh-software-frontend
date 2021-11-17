import { PureComponent } from 'react';
import {
  Row, Col, Button, Select
} from 'antd';

interface IProps {
  onSubmit?: Function;
  statuses?: {
    key: string;
    text?: string;
  }[];
}

export class OrderSearchFilter extends PureComponent<IProps> {
  performerRef: any;

  state = {
    deliveryStatus: ''
  };

  render() {
    const { statuses = [], onSubmit } = this.props;
    return (
      <Row gutter={24}>
        {statuses.length ? (
          <Col xl={{ span: 4 }} md={{ span: 8 }} xs={{ span: 10 }}>
            <Select
              onChange={(val) => this.setState({ deliveryStatus: val })}
              style={{ width: '100%' }}
              placeholder="Select delivery status"
              defaultValue=""
            >
              {statuses.map((s) => (
                <Select.Option key={s.key} value={s.key}>
                  {s.text || s.key}
                </Select.Option>
              ))}
            </Select>
          </Col>
        ) : null}
        <Col xl={{ span: 4 }} md={{ span: 8 }}>
          <Button type="primary" onClick={() => onSubmit(this.state)}>
            Search
          </Button>
        </Col>
      </Row>
    );
  }
}
