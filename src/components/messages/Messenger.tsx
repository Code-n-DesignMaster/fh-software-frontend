import { PureComponent } from 'react';
import './Messenger.less';
import { connect } from 'react-redux';
import { deactiveConversation } from '@redux/message/actions';
import { Button } from 'antd';
import { MessageFilled } from '@ant-design/icons';
import ConversationList from './ConversationList';
import MessageList from './MessageList';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';

interface IProps {
  toSource?: string;
  toId?: string;
  activeConversation?: any;
  deactiveConversation: Function;
}
class Messenger extends PureComponent<IProps> {
  componentDidMount() {
    const { toSource, toId, deactiveConversation: handleDeactive } = this.props;
    if (!toSource && !toId) {
      handleDeactive();
    }
  }

  onClose() {
    const { deactiveConversation: handleDeactive } = this.props;
    handleDeactive();
  }

  render() {
    const { toSource, toId, activeConversation } = this.props;
    return (
      <Layout className="messenger">
        <Header>
          <MessageFilled />
          Messages
          <Button
            onClick={this.onClose.bind(this)}
            className={
              !activeConversation._id ? 'close-btn' : 'close-btn active'
            }
          >
            Back
          </Button>
        </Header>
        <Layout className="conversation">
          <Sider
            className={!activeConversation._id ? 'sidebar' : 'sidebar active'}
            width={300}
          >
            <ConversationList toSource={toSource} toId={toId} />
          </Sider>
          <Layout
            className={
              !activeConversation._id ? 'chat-content' : 'chat-content active'
            }
          >
            <Content className="message-content">
              {/* @ts-ignore */}
              <MessageList />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
const mapStates = (state: any) => {
  const { activeConversation } = state.conversation;
  return {
    activeConversation
  };
};

const mapDispatch = { deactiveConversation };
export default connect(mapStates, mapDispatch)(Messenger);
