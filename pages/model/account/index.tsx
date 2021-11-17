import { PureComponent } from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import { Tabs, message } from 'antd';
import Page from '@components/common/layout/page';
import { PerformerAccountForm } from '@components/performer/accountForm';
import { PerformerBankingForm } from '@components/performer/bankingForm';
import { ChatSettingsForm } from '@components/performer/chatSettingsForm';
import {
  IPerformer,
  IUpdatePerformer,
  IBanking,
  IUIConfig,
  ICountry,
  IBlockCountries
} from 'src/interfaces';
import {
  updatePerformer,
  updateCurrentUserAvatar,
  updateBanking,
  updateCurrentUserCover,
  updateCurrentUserIdVerification,
  updateCurrentUserWelcomeImg,
  updateCurrentUserWelcomeMVideo,
  updateCurrentUserWelcomeVideo,
  updateCurrentUserIsActivateWV,
  updateBlockCountries
} from 'src/redux/user/actions';
import { authService, performerService, utilsService } from '@services/index';
import { UpdatePaswordForm } from '@components/user/update-password-form';
import {
  PerformerSubscriptionForm,
  PerformerBlockCountriesForm
} from '@components/performer';
import _ from 'lodash';
import Router from 'next/router';
import { getResponseError } from '@lib/utils';
import { htmlEncode } from '@lib/string';
import { Base64 } from 'js-base64';
import { PerformerProfileForm } from '@components/performer/profileForm';
import { detection } from '@lib/deepai';

interface IProps {
  currentUser: IPerformer;
  updatePerformer: Function;
  updating?: boolean;
  updateCurrentUserAvatar: Function;
  updateBanking: Function;
  ui: IUIConfig;
  updateCurrentUserCover: Function;
  updateCurrentUserIdVerification: Function;
  updateCurrentUserWelcomeImg: Function;
  updateCurrentUserWelcomeMVideo: Function;
  updateCurrentUserWelcomeVideo: Function;
  updateCurrentUserIsActivateWV: Function;
  countries: ICountry[];
  updateBlockCountries: Function;
  selectKey: string;
}
class AccountSettings extends PureComponent<IProps> {
  static authenticate: boolean = true;

  static onlyPerformer = true;

  state = {
    pwUpdating: false
  };

  static async getInitialProps({ ctx }) {
    const { query } = ctx;
    const [countries] = await Promise.all([await utilsService.countriesList()]);
    return {
      countries: countries.data,
      selectKey: query?.selectKey ? query?.selectKey : 'basic'
    };
  }

  componentDidMount() {
    const { currentUser } = this.props;
    if (!currentUser || (currentUser && !currentUser.isPerformer)) {
      message.error('You have no permission on this page!');
      Router.push(
        { pathname: '/home', query: { id: currentUser._id } },
        '/home'
      );
    }
  }

  async onAvatarDeleted() {
    const {
      updateCurrentUserAvatar: updateCurrentUserAvatarHandler
    } = this.props;

    try {
      const deleted = await (await performerService.deleteAvatar()).data;
      if (deleted) {
        updateCurrentUserAvatarHandler('');
      }
    } catch (error) {
      const e = await error;
      message.error(
        e && e.message ? e.message : 'Error occured, please try again later'
      );
    }
  }

  async onCoverDeleted() {
    const {
      updateCurrentUserCover: updateCurrentUserCoverHandler
    } = this.props;

    try {
      const deleted = await (await performerService.deleteCover()).data;
      if (deleted) {
        updateCurrentUserCoverHandler('');
      }
    } catch (error) {
      const e = await error;
      message.error(
        e && e.message ? e.message : 'Error occured, please try again later'
      );
    }
  }

  onIdVerificationUploaded(data: any) {
    const {
      updateCurrentUserIdVerification: updateCurrentUserIdVerificationHandler
    } = this.props;
    message.success('Changes saved.');
    updateCurrentUserIdVerificationHandler(data.response.data);
  }

  async onAvatarUploaded(data: any) {
    const {
      ui,
      updateCurrentUserAvatar: updateCurrentUserAvatarHandler
    } = this.props;
    if (ui.nudirtySwitch) {
      const resp = (await detection(data.base64)) as any;
      if (
        resp &&
        resp.output &&
        resp.output.nsfw_score &&
        resp.output.nsfw_score * 100 > ui.nudirtyMinScore
      ) {
        message.error('Nudity detected. Please select another picture!');
        this.onAvatarDeleted();
        return;
      }
    }
    message.success('Changes saved.');
    updateCurrentUserAvatarHandler(data.response.data.url);
  }

  async onCoverUploaded(data: any) {
    const {
      ui,
      updateCurrentUserCover: updateCurrentUserCoverHandler
    } = this.props;
    if (ui.nudirtySwitch) {
      const resp = (await detection(data.base64)) as any;
      if (
        resp &&
        resp.output &&
        resp.output.nsfw_score &&
        resp.output.nsfw_score * 100 > ui.nudirtyMinScore
      ) {
        message.error('Nudity detected. Please select another picture!');
        this.onCoverDeleted();
        return;
      }
    }
    message.success('Changes saved.');
    updateCurrentUserCoverHandler(data.response.data.url);
  }

  onWelcomeImgUploaded(data: any) {
    const {
      updateCurrentUserWelcomeImg: updateCurrentUserWelcomeImgHandler
    } = this.props;
    message.success('Changes saved.');
    updateCurrentUserWelcomeImgHandler(data.response.data);
  }

  onWelcomeMVideoUploaded(data: any) {
    const {
      updateCurrentUserWelcomeMVideo: updateCurrentUserWelcomeVideoHandler
    } = this.props;
    message.success('Changes saved.');
    updateCurrentUserWelcomeVideoHandler(data.response.data);
  }

  async handleUpdateBlockCountries(data: IBlockCountries) {
    try {
      const {
        currentUser,
        updateBlockCountries: updateBlockCountriesHandler
      } = this.props;
      const info = Object.assign(data, {
        performerId: currentUser._id
      });
      const resp = await performerService.updateBlockCountries(
        currentUser._id,
        info
      );
      if (resp.data) {
        updateBlockCountriesHandler(resp.data);
      }
      message.success('Changes saved.');
    } catch (error) {
      message.error(
        getResponseError(error) || 'An error orccurred, please try again.'
      );
    }
  }

  async handleUpdateBanking(data: IBanking) {
    try {
      const { currentUser, updateBanking: updateBankingHandler } = this.props;
      data.bankAccount = Base64.encode(data.bankAccount);
      data.bankRouting = Base64.encode(data.bankRouting);
      data.bankSwiftCode = Base64.encode(data.bankSwiftCode);
      data.SSN = Base64.encode(data.SSN);
      data.agentBankAccount = Base64.encode(data.agentBankAccount);
      data.agentBankRouting = Base64.encode(data.agentBankRouting);
      data.agentBankSwiftCode = Base64.encode(data.agentBankSwiftCode);
      data.agentSSN = Base64.encode(data.agentSSN);
      const bankInfo = Object.assign(data, {
        performerId: currentUser._id
      });
      await updateBankingHandler(bankInfo);
      message.success('Changes saved.');
    } catch (error) {
      message.error(
        getResponseError(error) || 'An error orccurred, please try again.'
      );
    }
  }

  async submit(type: string, data: any) {
    try {
      const {
        currentUser,
        updatePerformer: updatePerformerHandler
      } = this.props;
      if (type === 'subscription') {
        const performer = _.pick(currentUser, [
          '_id',
          'email',
          'gender',
          'monthlyPrice',
          'yearlyPrice',
          'subsribeSwitch',
          'freeSubsribeSwitch'
        ]) as IUpdatePerformer;
        performer.monthlyPrice = parseFloat(data.monthlyPrice);
        performer.yearlyPrice = parseFloat(data.yearlyPrice);
        performer.subsribeSwitch = data.subsribeSwitch;
        performer.freeSubsribeSwitch = data.freeSubsribeSwitch;
        await updatePerformerHandler(performer);
      }
      if (type === 'basic') {
        const performer = _.omit(currentUser, [
          'age',
          'avatar',
          'cover',
          'welcomeVideoId',
          'welcomeVideoPath',
          'enableChat',
          'enableWelcomeMessage',
          'welcomeMessageMimeType'
        ]) as IPerformer;
        await updatePerformerHandler({
          ...performer,
          ...data,
          name: `${data.firstName} ${data.lastName}`
        });
      }
      if (type === 'profile') {
        const performer = _.pick(currentUser, [
          '_id',
          'email',
          'gender',
          'avatar',
          'cover',
          'welcomeVideoId',
          'welcomeVideoPath'
        ]) as IPerformer;
        performer.quote = htmlEncode(data.quote);
        await updatePerformerHandler({
          ...performer,
          ...data
        });
      }

      if (type === 'chat') {
        const performer = _.pick(currentUser, [
          '_id',
          'email',
          'gender',
          'welcomeImgPath',
          'welcomeMessageVideoPath'
        ]) as IUpdatePerformer;
        const chatSettings = _.omit(data, [
          'welcomeImgPath',
          'welcomeMessageVideoPath'
        ]);
        chatSettings.welcomeMessage = htmlEncode(data.welcomeMessage);
        await updatePerformerHandler({
          ...performer,
          ...chatSettings
        });
      }
    } catch (error) {
      const err = await Promise.resolve(error);
      message.error(
        err && err.message
          ? err.message
          : 'Something went wrong, please try again.'
      );
    }
  }

  onVideoUploaded(data: any) {
    message.success('Changes saved.');
    this.props.updateCurrentUserWelcomeVideo(data);
  }

  updateActivate(data: any) {
    message.success('Changes saved.');
    this.props.updateCurrentUserIsActivateWV(data);
  }

  async updatePassword(data: any) {
    try {
      this.setState({ pwUpdating: true });
      await authService.updatePassword(data.password, 'email', 'performer');
      message.success('Changes saved.');
    } catch (e) {
      message.error('An error occurred, please try again!');
    } finally {
      this.setState({ pwUpdating: false });
    }
  }

  render() {
    const { currentUser, updating, countries, selectKey } = this.props;
    const { pwUpdating } = this.state;
    const uploadHeaders = {
      authorization: authService.getToken()
    };
    return (
      <>
        <Head>
          <title>HoneyDrip | My Account </title>
          <meta
            property="og:title"
            content="honeydrip.com - My Account"
            key="title"
          />
          <meta
            property="og:description"
            content="honeydrip.com - My Account"
          />
          <meta property="og:image" content="https://honeydrip.com/logo.png" />
        </Head>
        <Page>
          <div className="main-container">
            <Tabs
              defaultActiveKey={selectKey}
              tabPosition="top"
              className="nav-tabs"
            >
              <Tabs.TabPane tab={<span>Basic Information</span>} key="basic">
                <PerformerAccountForm
                  onFinish={this.submit.bind(this, 'basic')}
                  user={currentUser}
                  countries={countries}
                  updating={updating}
                  options={{
                    uploadHeaders,
                    onIdVerificationUploaded: this.onIdVerificationUploaded.bind(
                      this
                    ),
                    idVerificationUploadUrl: performerService.getIdVerificationUploadUrl()
                  }}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab={<span>Edit Profile</span>} key="profile">
                <PerformerProfileForm
                  onFinish={this.submit.bind(this, 'profile')}
                  user={currentUser}
                  updating={updating}
                  options={{
                    uploadHeaders,
                    avatarUploadUrl: performerService.getAvatarUploadUrl(),
                    onAvatarUploaded: this.onAvatarUploaded.bind(this),
                    onAvatarDeleted: this.onAvatarDeleted.bind(this),
                    coverUploadUrl: performerService.getCoverUploadUrl(),
                    onCoverUploaded: this.onCoverUploaded.bind(this),
                    onCoverDeleted: this.onCoverDeleted.bind(this),
                    videoUploadUrl: performerService.getVideoUploadUrl(),
                    onVideoUploaded: this.onVideoUploaded.bind(this),
                    updateActivate: this.updateActivate.bind(this)
                  }}
                />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={<span>Banking Information</span>}
                key="bankInfo"
              >
                <PerformerBankingForm
                  onFinish={this.handleUpdateBanking.bind(this)}
                  updating={updating}
                  user={currentUser}
                  countries={countries}
                />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={<span>Subscription Information</span>}
                key="subscription"
              >
                <PerformerSubscriptionForm
                  onFinish={this.submit.bind(this, 'subscription')}
                  updating={updating}
                  user={currentUser}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab={<span>Change Password</span>} key="password">
                <UpdatePaswordForm
                  onFinish={this.updatePassword.bind(this)}
                  updating={pwUpdating}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab={<span>Chat Settings</span>} key="chat">
                <ChatSettingsForm
                  onFinish={this.submit.bind(this, 'chat')}
                  updating={updating}
                  user={currentUser}
                  options={{
                    uploadHeaders,
                    welcomeImgUploadUrl: performerService.getWelcomeImgUploadUrl(),
                    onwelcomeImgUploaded: this.onWelcomeImgUploaded.bind(this),
                    onwelcomeMVideoUploaded: this.onWelcomeMVideoUploaded.bind(
                      this
                    )
                  }}
                />
              </Tabs.TabPane>
            </Tabs>
          </div>
        </Page>
      </>
    );
  }
}

const mapStates = (state: any) => ({
  currentUser: state.user.current,
  updating: state.user.updating,
  ui: state.ui
});
const mapDispatch = {
  updatePerformer,
  updateCurrentUserAvatar,
  updateBanking,
  updateCurrentUserCover,
  updateCurrentUserIdVerification,
  updateCurrentUserWelcomeImg,
  updateCurrentUserWelcomeMVideo,
  updateCurrentUserWelcomeVideo,
  updateCurrentUserIsActivateWV,
  updateBlockCountries
};
export default connect(mapStates, mapDispatch)(AccountSettings);
