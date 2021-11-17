import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import nextCookie from 'next-cookies';
import withReduxSaga from '@redux/withReduxSaga';
import { Store } from 'redux';
import BaseLayout from '@layouts/base-layout';
import {
  authService,
  userService,
  performerService,
  settingService
} from '@services/index';
import Router from 'next/router';
import { NextPageContext } from 'next';
import { loginSuccess, logout } from '@redux/auth/actions';
import { updateCurrentUser } from '@redux/user/actions';
import { updateUIValue } from '@redux/ui/actions';
import '../style/index.less';
import { Socket } from 'src/socket';
import Head from 'next/head';
import env from 'src/env';
import routes from 'server/routes';
import { unauthorizedEvent } from '@services/api-request';

declare global {
  interface Window {
    ReactSocketIO: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

// function redirectLogin(ctx: any) {
//   if (process.browser) {
//     authService.removeToken();
//     routes.Router.pushRoute('/');
//     return;
//   }

//   fix for production build
//   ctx.res.clearCookie && ctx.res.clearCookie('token');
//   ctx.res.clearCookie && ctx.res.clearCookie('role');
//   ctx.res.writeHead && ctx.res.writeHead(302, { Location: '/' });
//   ctx.res.end && ctx.res.end();
// }

async function auth(
  ctx: NextPageContext,
  noredirect: boolean,
  onlyPerformer: boolean
): Promise<boolean> {
  let isLogout: boolean = false;
  try {
    const { store } = ctx;
    const state = store.getState();
    if (state.auth && state.auth.loggedIn) {
      return false;
    }
    // TODO - move to a service
    const { token, role } = nextCookie(ctx);
    if (token) {
      authService.setAuthHeaderToken(token);
      let user = null;
      if (role === 'performer') {
        user = await performerService.me({
          Authorization: token
        });
      } else {
        user = await userService.me({
          Authorization: token
        });
      }
      // TODO - check permission
      store.dispatch(loginSuccess());
      store.dispatch(updateCurrentUser(user.data));
      if (!user.data.isPerformer && onlyPerformer) {
        isLogout = true;
        // redirectLogin(ctx);
      }
    } else {
      if (noredirect) {
        return false;
      }
      isLogout = true;
      // redirectLogin(ctx);
    }
  } catch (e) {
    isLogout = true;
    // redirectLogin(ctx);
  }
  return isLogout;
}

async function updateSettingsStore(ctx: NextPageContext, settings) {
  try {
    const { store } = ctx;

    store.dispatch(
      updateUIValue({
        shopCartSwitch: settings.shopCartSwitch,
        tipSwitch: settings.tipSwitch,
        nudirtyMinScore: settings.nudirtyMinScore,
        nudirtySwitch: settings.nudirtySwitch,
        rightClickPrintSwitch: settings.rightClickPrintSwitch,
        couponSwitch: settings.couponSwitch,
        logo: settings.logoUrl,
        siteName: settings.siteName,
        menus: settings.menus,
        minVisibleSubscribersCount: settings.minVisibleSubscribersCount
      })
    );

    // TODO - update others like meta data
  } catch (e) {
    // TODO - implement me
    console.log(e);
  }
}

interface AppComponent extends NextPageContext {
  layout: string;
}

interface IApp {
  store: Store;
  layout: string;
  authenticate: boolean;
  Component: AppComponent;
  settings: any;
  geoBlocked: boolean;
  isLogout: boolean;
  token: string | null;
}

class Application extends App<
  IApp,
  {},
  { reSetToken: ReturnType<typeof setTimeout> }
> {
  static settingQuery = false;

  // TODO - consider if we need to use get static props in children component instead?
  // or check in render?
  static async getInitialProps({ Component, ctx }) {
    // won't check auth for un-authenticated page such as login, register
    // use static field in the component
    const { token } = nextCookie(ctx);
    ctx.token = token || '';

    let isLogout = false;
    if (Component.authenticate !== false) {
      const { noredirect, onlyPerformer } = Component;
      isLogout = await auth(ctx, noredirect, onlyPerformer);
    }
    if (!isLogout && token && ctx.res && ctx.pathname === '/') {
      ctx.res.writeHead(302, { Location: '/home' });
      ctx.res.end();
    }
    // server side to load settings, once time only
    let settings = {};
    let geoBlocked = false;
    if (!process.browser) {
      const checkBlock = (await userService.checkCountryBlock()) as any;
      if (checkBlock && checkBlock.data && checkBlock.data.blocked) {
        geoBlocked = true;
      }
      const resp = await settingService.all(true);
      // TODO encrypt, decypt header script, footer script or other info if needed
      settings = resp.data;
      await updateSettingsStore(ctx, settings);
    }
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }
    return {
      geoBlocked,
      settings,
      pageProps,
      token,
      layout: Component.layout,
      isLogout
    };
  }

  componentDidMount() {
    if (this.props.isLogout) {
      authService.removeToken();
      this.props.store.dispatch(logout());
      routes.Router.pushRoute('/');
    }
    if (!this.props.token && authService.getToken()) {
      const reSetToken = setTimeout(() => {
        authService.reSetToken();
      }, 3000);
      this.setState({ reSetToken });
    }
    // listen the token expired
    unauthorizedEvent.on((status: number) => {
      if (status === 401) {
        authService.removeToken();
        this.props.store.dispatch(logout());
        routes.Router.pushRoute('/');
      }
    });
    Router.events.on('routeChangeStart', this.handleRouteChange.bind(this));
  }

  handleRouteChange(url) {
    if (url && url.match(/^(\/video|\/gallery|\/store)/g)) {
      localStorage.setItem('loginUrl', url);
    }
  }

  componentWillUnmount() {
    if (this?.state?.reSetToken) {
      clearTimeout(this.state.reSetToken);
    }
    Router.events.off('routeChangeStart', this.handleRouteChange.bind(this));
  }

  render() {
    const { Component, pageProps, store, settings, geoBlocked } = this.props;
    const { layout } = Component;
    return (
      <Provider store={store}>
        <Head>
          <title>HoneyDrip</title>
          <meta name="keywords" content={settings && settings.metaKeywords} />
          <meta
            name="description"
            content={settings && settings.metaDescription}
          />
          <meta
            name="viewport"
            content={settings && settings.viewPortContent}
          />
          <meta
            httpEquiv="ScreenOrientation"
            content={settings && settings.screenOrientation}
          />
          {/* OG tags */}
          <meta property="og:title" content="HoneyDrip" key="title" />
          <meta property="og:image" content={settings && settings.logoUrl} />
          <meta
            property="og:keywords"
            content={settings && settings.metaKeywords}
          />
          <meta
            property="og:description"
            content={settings && settings.metaDescription}
          />
          {/* GA code */}
          {settings && settings.gaCode && (
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${settings.gaCode}');`
              }}
            />
          )}
          {/* extra script */}
          {settings && settings.headerScript && (
            // eslint-disable-next-line react/no-danger
            <div dangerouslySetInnerHTML={{ __html: settings.headerScript }} />
          )}

          {/* google map API */}
          {settings && (
            <script
              async
              src={`https://maps.googleapis.com/maps/api/js?key=${env.apiKey}&libraries=places`}
            />
          )}
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `document.addEventListener("keyup", function (e) {
              var keyCode = e.keyCode ? e.keyCode : e.which;
              if (keyCode == 44) {
                stopPrntScr();
              }
            });
            function stopPrntScr() {
              var inpFld = document.createElement("input");
              inpFld.setAttribute("value", ".");
              inpFld.setAttribute("width", "0");
              inpFld.style.height = "0px";
              inpFld.style.width = "0px";
              inpFld.style.border = "0px";
              document.body.appendChild(inpFld);
              inpFld.select();
              document.execCommand("copy");
              inpFld.remove(inpFld);
            }`
            }}
          />
        </Head>
        <Socket>
          <BaseLayout
            layout={layout}
            maintenance={settings.maintenanceMode}
            geoBlocked={geoBlocked}
          >
            <Component {...pageProps} />
          </BaseLayout>
        </Socket>
        {/* extra script */}
        {settings && settings.afterBodyScript && (
          // eslint-disable-next-line react/no-danger
          <div dangerouslySetInnerHTML={{ __html: settings.afterBodyScript }} />
        )}
      </Provider>
    );
  }
}

export default withReduxSaga(Application);
