import { PureComponent } from 'react';
import { message } from 'antd';
import { connect } from 'react-redux';
import { IUser } from 'src/interfaces/user';
import { getResponseError } from '@lib/utils';
import SEO from './seo';
import UpdatePasswordForm from './update-password';
import UpdateProfileForm from './update-profile';
import { Wrapper, Inner, Title } from './styled';

interface IProps {
  user: IUser;
  updateCurrentUserAvatar: Function;
  updateSuccess: boolean;
  error: any;
}

class UserAccountSettingPage extends PureComponent<IProps> {
  static authenticate = true;

  constructor(props: IProps) {
    super(props);
  }

  componentDidUpdate(preProps: IProps) {
    if (this.props.error !== preProps.error) {
      message.error(getResponseError(this.props.error));
    }
    if (
      this.props.updateSuccess &&
      this.props.updateSuccess !== preProps.updateSuccess
    ) {
      message.success('Changes saved.');
    }
  }

  render() {
    const { user } = this.props;
    return (
      <>
        <SEO />
        <Wrapper>
          <Inner>
            <Title>My Account</Title>
            <UpdateProfileForm user={user} />
            <UpdatePasswordForm />
          </Inner>
        </Wrapper>
      </>
    );
  }
}
const mapStates = (state) => ({
  user: state.user.current,
  error: state.user.error,
  updateSuccess: state.user.updateSuccess
});
export default connect(mapStates)(UserAccountSettingPage);
