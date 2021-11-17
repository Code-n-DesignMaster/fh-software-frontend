import { PureComponent } from 'react';
import { Pagination } from 'antd';

interface IProps {
  showQuickJumper: boolean;
  defaultCurrent: number;
  total: number;
  pageSize: number;
  onChange: Function;
}

export class ProPagination extends PureComponent<IProps> {
  handleChange = (page: number) => {
    const { onChange } = this.props;
    onChange && onChange(page);
  };

  render() {
    const {
      showQuickJumper, defaultCurrent, total, pageSize
    } = this.props;
    return (
      <div>
        <Pagination
          showQuickJumper={showQuickJumper}
          defaultCurrent={defaultCurrent}
          total={total}
          pageSize={pageSize}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
