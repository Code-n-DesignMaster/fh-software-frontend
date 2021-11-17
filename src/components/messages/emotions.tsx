/* eslint-disable react/destructuring-assignment */
import { PureComponent } from 'react';
import dynamic from 'next/dynamic';
import './Compose.less';

let Picker;
if (typeof window !== 'undefined') {
  Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });
}

interface IProps {
  onEmojiClick: Function;
}

export default class Emotions extends PureComponent<IProps> {
  onEmojiClick(event, emoji) {
    this.props.onEmojiClick(emoji);
  }

  render() {
    return (
      <>
        <Picker
          onEmojiClick={this.onEmojiClick.bind(this)}
          disableAutoFocus
          disableSearchBar
          disableSkinTonePicker
        />
      </>
    );
  }
}
