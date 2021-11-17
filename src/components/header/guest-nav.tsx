import { useState } from 'react';
import Link from 'next/link';
import ExploreIcon from '@components/icons/explore';
import LoginIcon from '@components/icons/login';
import SignupIcon from '@components/icons/signup';
import HamburgerIcon from '@components/icons/hamburger';
import ModalMenu from './modal-menu';
import {
  LinkList,
  LinkItem,
  MobileButtons,
  MobileButton,
  MobileLinks
} from './styled';

const GuestNav = () => {
  const [isOpen, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <LinkList>
        <LinkItem>
          <Link href="/home">
            <a>
              <ExploreIcon />
              Explore models
            </a>
          </Link>
        </LinkItem>
        <LinkItem>
          <Link href="/">
            <a>
              <LoginIcon />
              Login
            </a>
          </Link>
        </LinkItem>
        <LinkItem>
          <Link href="/auth/fan-register">
            <a>
              <SignupIcon />
              Sign up as a fan
            </a>
          </Link>
        </LinkItem>
        <LinkItem>
          <Link href="/auth/model-register">
            <a>
              <SignupIcon />
              Sign up as a creator
            </a>
          </Link>
        </LinkItem>
      </LinkList>
      <MobileButtons>
        <MobileButton onClick={() => setOpen(true)}>
          <HamburgerIcon />
        </MobileButton>
      </MobileButtons>
      <ModalMenu isOpen={isOpen} onClose={close}>
        <MobileLinks>
          <li onClick={close}>
            <Link href="/home">
              <a>Explore models</a>
            </Link>
          </li>
          <li onClick={close}>
            <Link href="/">
              <a>Login</a>
            </Link>
          </li>
          <li onClick={close}>
            <Link href="/auth/fan-register">
              <a>Sign up as a fan</a>
            </Link>
          </li>
          <li onClick={close}>
            <Link href="/auth/model-register">
              <a>Sign up as a creator</a>
            </Link>
          </li>
          <li onClick={close}>
            <Link href="/contact">
              <a>Contact</a>
            </Link>
          </li>
          <li onClick={close}>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
        </MobileLinks>
      </ModalMenu>
    </>
  );
};

export default GuestNav;
