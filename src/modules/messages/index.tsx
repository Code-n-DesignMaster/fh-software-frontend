import { PureComponent } from 'react';
import { connect } from 'react-redux';
import Messenger from '@components/messages/Messenger';
import { resetMessageState } from '@redux/message/actions';
import SEO from './seo';
import { Wrapper, Inner, Title } from './styled';

interface IProps {
  getList: Function;
  performerState: any;
  query: Record<string, string>;
  resetMessageState: Function;
}

class Messages extends PureComponent<IProps> {
  static authenticate = true;

  componentWillUnmount() {
    const { resetMessageState: resetStateHandler } = this.props;
    resetStateHandler();
  }

  render() {
    const { query = {} } = this.props;
    return (
      <>
        <SEO />
        <Wrapper>
          <Inner>
            <Title>Messenger</Title>
            <Messenger toSource={query.toSource} toId={query.toId} />
          </Inner>
        </Wrapper>
      </>
    );
  }
}

const mapDispatch = { resetMessageState };
export default connect(null, mapDispatch)(Messages);
