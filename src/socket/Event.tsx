import { Component } from 'react';
import { SocketContext } from './SocketContext';
import { warning } from './utils';

interface IEventProps {
  event: string;
  handler: Function;
}

class Event extends Component<IEventProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { event, handler } = this.props;
    const socket = this.context;

    if (!socket) {
      warning('Socket IO connection has not been established.');
      return;
    }

    socket.on(event, handler);
  }

  componentWillUnmount() {
    const { event, handler } = this.props;
    const socket = this.context;

    if (!socket) {
      warning('Socket IO connection has not been established.');
      return;
    }

    socket.off(event, handler);
  }

  render() {
    return false;
  }
}

Event.contextType = SocketContext;

export default Event;
