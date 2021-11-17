import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { logout } from '@redux/auth/actions';
import useDisableInspect from 'src/hooks/use-disable-inspect';
import GuestNav from './guest-nav';
import UserNav from './user-nav';
import { Wrapper, Inner, Logo } from './styled';

type Props = {
  transparent?: boolean;
};

const Header = ({ transparent }: Props) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.current);
  useDisableInspect(!(user?.roles && user.roles.includes('admin')));

  const handleLogout = () => {
    localStorage.removeItem('loginUrl');
    dispatch(logout());
  };

  return (
    <Wrapper transparent={transparent}>
      <Inner>
        <Link href="/home">
          <a>
            <Logo src="/logo.png" />
          </a>
        </Link>
        {user ? (
          <UserNav
            gender={user.gender}
            isPerformer={user.isPerformer}
            onLogout={handleLogout}
          />
        ) : (
          <GuestNav />
        )}
      </Inner>
    </Wrapper>
  );
};

export default Header;
