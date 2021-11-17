/* eslint-disable react/no-array-index-key */
import { PureComponent } from 'react';
import {
  Input, Row, Col, Button, Select, DatePicker
} from 'antd';
import { SelectPerformerDropdown } from '@components/performer/common/select-performer-dropdown';

const { RangePicker } = DatePicker;
interface IProps {
  onSubmit?: Function;
  statuses?: {
    key: string;
    text?: string;
  }[];
  type?: {
    key: string;
    text?: string;
  }[];
  searchWithPerformer?: boolean;
  searchWithKeyword?: boolean;
  performerId?: string;
  dateRange?: boolean;
}

export class SearchFilter extends PureComponent<IProps> {
  performerRef: any;

  constructor(props) {
    super(props);

    this.state = {
      q: '',
      performerId: '',
      status: '',
      type: ''
    };
  }

  render() {
    const {
      statuses = [],
      type = [],
      searchWithPerformer,
      searchWithKeyword,
      dateRange,
      onSubmit
    } = this.props;
    return (
      <Row gutter={24} className="filter-block">
        {searchWithKeyword && (
          <Col xl={{ span: 4 }} md={{ span: 8 }} xs={{ span: 14 }}>
            {/* <label>Keyword</label> */}
            <Input
              placeholder="Enter keyword"
              onChange={(evt) => this.setState({ q: evt.target.value })}
              onPressEnter={() => onSubmit(this.state)}
            />
          </Col>
        )}
        {statuses && statuses.length ? (
          <Col xl={{ span: 4 }} md={{ span: 8 }} xs={{ span: 10 }}>
            {/* <label >Status</label> */}
            <Select
              onChange={(val) => this.setState({ status: val })}
              style={{ width: '100%' }}
              placeholder="Select status"
              defaultValue=""
            >
              {statuses.map((s, index) => (
                <Select.Option key={index} value={s.key}>
                  {s.text || s.key}
                </Select.Option>
              ))}
            </Select>
          </Col>
        ) : null}
        {type && type.length ? (
          <Col xl={{ span: 4 }} md={{ span: 8 }} xs={{ span: 10 }}>
            {/* <label >Type</label> */}
            <Select
              onChange={(val) => this.setState({ type: val })}
              style={{ width: '100%' }}
              placeholder="Select type"
              defaultValue=""
            >
              {type.map((s, index) => (
                <Select.Option key={index} value={s.key}>
                  {s.text || s.key}
                </Select.Option>
              ))}
            </Select>
          </Col>
        ) : null}
        {searchWithPerformer && (
          <Col xl={{ span: 6 }} md={{ span: 8 }} xs={{ span: 24 }}>
            {/* <label htmlFor="">Performer</label> */}
            <SelectPerformerDropdown
              placeholder="Search model here"
              style={{ width: '100%' }}
              onSelect={(val) => this.setState({ performerId: val || '' })}
            />
          </Col>
        )}
        {dateRange && (
          <Col xl={{ span: 6 }} md={{ span: 8 }}>
            <RangePicker
              onChange={(dates: [any, any], dateStrings: [string, string]) => this.setState({
                fromDate: dateStrings[0],
                toDate: dateStrings[1]
              })}
            />
          </Col>
        )}
        <Col xl={{ span: 4 }} md={{ span: 8 }}>
          {/* <label htmlFor=""></label> */}
          <Button type="primary" onClick={() => onSubmit(this.state)}>
            Search
          </Button>
        </Col>
      </Row>
    );
  }
}
