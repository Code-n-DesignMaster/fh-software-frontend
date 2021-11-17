import Link from 'next/link';

type LinkType = { title: string; href: string };

const performerLinks: readonly LinkType[] = [
  { title: 'My Account', href: '/model/account' },
  { title: 'My Videos', href: '/model/video-manager' },
  { title: 'My Galleries', href: '/model/gallery-manager/listing' },
  { title: 'My Subscribers', href: '/model/my-subscriber' },
  { title: 'My Subscription', href: '/user/my-subscription' },
  { title: 'Earnings', href: '/model/earning' },
  { title: 'Payment History', href: '/user/payment-history' },
  { title: 'Top Models', href: '/top-models' }
];

const fanLinks: readonly LinkType[] = [
  { title: 'My Account', href: '/user/account' },
  { title: 'My Favorites', href: '/user/my-favourite' },
  { title: 'My Subscriptions', href: '/user/my-subscription' },
  { title: 'Payment History', href: '/user/payment-history' }
];

type Props = {
  isPerformer: boolean;
  onClick?: () => void;
};

const Links = ({ isPerformer, onClick = () => ({}) }: Props) => (
  <>
    {(isPerformer ? performerLinks : fanLinks).map((link) => (
      <li key={link.href} onClick={onClick}>
        <Link href={link.href}>
          <a>{link.title}</a>
        </Link>
      </li>
    ))}
  </>
);

export default Links;
