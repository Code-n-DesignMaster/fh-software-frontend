import { useState } from 'react';
import Link from 'next/link';
import SearchIcon from '@components/icons/search';
import MessageIcon from '@components/icons/message';
import HamburgerIcon from '@components/icons/hamburger';
import CartIcon from '@components/icons/cart';
import ProfileMale from '@components/icons/profile-male';
import ProfileFemale from '@components/icons/profile-female';
import { useCartContext } from 'src/context/cart';
import Notifications from './notifications';
import Links from './links';
import ModalMenu from './modal-menu';
import {
  LinkList,
  LinkItem,
  UserMenu,
  Menu,
  Backdrop,
  MobileLinks,
  MobileButtons,
  MobileButton,
  CartLink,
  Badge
} from './styled';

type Props = {
  onLogout: () => void;
  gender: 'male' | 'female';
  isPerformer: boolean;
};

const UserNav = ({ onLogout, gender, isPerformer }: Props) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { total, itemCount } = useCartContext();

  const toggleProfileOpen = () => setProfileOpen((prev) => !prev);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <LinkList>
        <LinkItem>
          <Link
            href={{ pathname: '/model', query: { type: 'all' } }}
            as="/model?type=all"
          >
            <a>
              <SearchIcon />
              Discover
            </a>
          </Link>
        </LinkItem>
        <LinkItem>
          <Link href="/messages">
            <a>
              <MessageIcon />
              Messages
            </a>
          </Link>
        </LinkItem>
        <LinkItem>
          <Notifications />
        </LinkItem>
        <LinkItem>
          <Link href="/cart">
            <CartLink>
              <CartIcon /> {itemCount} item{itemCount === 1 ? '' : 's'}{' '}
              <mark>${total.toFixed(2)}</mark>
            </CartLink>
          </Link>
        </LinkItem>
        <LinkItem>
          <UserMenu>
            {gender === 'male' ? (
              <ProfileMale onClick={toggleProfileOpen} />
            ) : (
              <ProfileFemale onClick={toggleProfileOpen} />
            )}

            {profileOpen && (
              <>
                <Menu>
                  <Links isPerformer={isPerformer} />
                  <li>
                    <button type="button" onClick={onLogout}>
                      Log out
                    </button>
                  </li>
                </Menu>
                <Backdrop onClick={() => setProfileOpen(false)} />
              </>
            )}
          </UserMenu>
        </LinkItem>
      </LinkList>
      <MobileButtons>
        <Link href="/cart">
          <MobileButton as="a">
            <CartIcon />
            <Badge>{itemCount || 0}</Badge>
          </MobileButton>
        </Link>
        <MobileButton onClick={() => setDrawerOpen(true)}>
          <HamburgerIcon />
        </MobileButton>
      </MobileButtons>
      <ModalMenu isOpen={drawerOpen} onClose={closeDrawer}>
        <MobileLinks>
          <li onClick={closeDrawer}>
            <Link href="/model">
              <a>Discover</a>
            </Link>
          </li>
          <li onClick={closeDrawer}>
            <Link href="/messages">
              <a>Messages</a>
            </Link>
          </li>
          <Links isPerformer={isPerformer} onClick={closeDrawer} />
          <li>
            <button type="button" onClick={onLogout}>
              Log out
            </button>
          </li>
        </MobileLinks>
      </ModalMenu>
    </>
  );
};

export default UserNav;
