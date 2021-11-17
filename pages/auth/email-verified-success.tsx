import { PureComponent } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Layout } from 'antd';

const { Content } = Layout;

class EmailVerifiedSuccess extends PureComponent {
  static authenticate: boolean = false;

  render() {
    return (
      <>
        <Head>
          <title>HoneyDrip| Email Verify </title>
          <meta
            property="og:title"
            content="honeydrip.com - Email Verify"
            key="title"
          />
          <meta
            property="og:description"
            content="honeydrip.com - Email Verify"
          />
          <meta property="og:image" content="https://honeydrip.com/logo.png" />
        </Head>
        <Layout>
          <Content>
            <div className="email-verify-succsess">
              <p>
                Your email has been verified,
                <Link href="/">
                  <a> click here to login</a>
                </Link>
              </p>
            </div>
          </Content>
        </Layout>
      </>
    );
  }
}

export default EmailVerifiedSuccess;
