import { Descriptions } from 'antd';
import { PureComponent } from 'react';
import { IPerformer } from 'src/interfaces';
import './performer.less';

interface IProps {
  performer: IPerformer;
}

export default class PerformerInfo extends PureComponent<IProps> {
  render() {
    const { performer } = this.props;
    return (
      <>
        <p>{performer.bio}</p>
        <Descriptions>
          <Descriptions.Item label="Country">
            {performer.country}
          </Descriptions.Item>
          <Descriptions.Item label="Zipcode">
            {performer.zipcode}
          </Descriptions.Item>
          <Descriptions.Item label="Height">
            {performer.height}
          </Descriptions.Item>
          <Descriptions.Item label="Weight">
            {performer.weight}
          </Descriptions.Item>
          <Descriptions.Item label="Eyes">{performer.eyes}</Descriptions.Item>
          <Descriptions.Item label="Sexual Reference">
            {performer.sexualPreference}
          </Descriptions.Item>
        </Descriptions>
      </>
    );
  }
}
