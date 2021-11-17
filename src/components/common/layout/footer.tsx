import React, { Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { IUser, IUIConfig } from 'src/interfaces';
interface IProps {
  currentUser: IUser;
  ui: IUIConfig;
}
class Footer extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const linkAuth = (
      <>
        <li>
          <Link href="/auth/fan-register">
            <a>Fan Signup</a>
          </Link>
        </li>
        <li>
          <Link href="/auth/model-register">
            <a>Creator Signup</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Login</a>
          </Link>
        </li>
      </>
    );
    const { ui } = this.props;
    const menus = ui.menus && ui.menus.length > 0 ? ui.menus.filter(m => m.section === 'footer') : [];
    return (

      <div className="main-footer">
        <div className="main-container">
          <ul>
            <li></li>
            {menus &&
              menus.length > 0 &&
              menus.map((item) => {
                return (
                  <li key={item._id}>
                    {!item.internal ?
                      <a href={item.path}>{item.title}</a>
                      : <Link
                        href={{
                          pathname: '/page',
                          query: { id: item.path.replace('/page/', '') }
                        }} as={item.path}>
                        <a>{item.title}</a>
                      </Link>}
                  </li>
                )
              })}
            {!this.props.currentUser._id ? linkAuth : null}
          </ul>
          <div className="copyright-text"><span>WOH Brands LLC, Santa Monica, California, USA © Copyright 2020</span></div>                               
        </div>
      </div>
    );
  }
}
const mapState = (state: any) => ({
  currentUser: state.user.current,
  ui: state.ui
});
export default connect(mapState)(Footer) as any;
