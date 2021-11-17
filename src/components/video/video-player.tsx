/* eslint-disable no-return-assign */
import { PureComponent } from 'react';
import videojs from '@mux/videojs-kit';
import 'node_modules/video.js/dist/video-js.css';

export class VideoPlayer extends PureComponent<any> {
  videoNode: HTMLVideoElement;

  player: any;

  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, () => {
      // console.log('onPlayerReady');
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
      <div className="videojs-player">
        <div data-vjs-player>
          <video ref={(node) => (this.videoNode = node)} className="video-js" />
        </div>
      </div>
    );
  }
}
