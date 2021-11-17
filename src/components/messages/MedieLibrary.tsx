import { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { MediaCard } from './MediaCard';

interface IProps {
  medias?: any;
  setActiveMediaItem?: Function; 
  drawerVisible: boolean;
}

export class MediaLibrary extends PureComponent<IProps> {

  state = { 
    activeMediaId: ''
  }

  static getDerivedStateFromProps(nextProps) {
    const { drawerVisible } = nextProps;
    if(!drawerVisible){
      return {activeMediaId: ''}
    } 
    return null;
  }

  setActive = (activeMedia: any) => {
    const { setActiveMediaItem } = this.props;
    setActiveMediaItem(activeMedia)
    this.setState({activeMediaId: activeMedia.mediaId})
  }

  render() {
    const { medias } = this.props;
    const { activeMediaId } = this.state;
    return (
      <Row>
        {medias.length > 0
          && medias.map((media: any, index) => (
            <Col xs={12} sm={12} md={12} lg={6} key={index}>
              <MediaCard
                media={media}
                selected={media._id === activeMediaId}
                setActive={this.setActive} />
            </Col>
          ))}
      </Row>
    );
  }
}
