import Link from 'next/link';
import { Wrapper, Links, LinkItem, Copyright } from './styled';

const links: readonly { title: string; href: string }[] = [
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
  { title: 'Terms of Service', href: '/legal/terms' },
  { title: 'Privacy Policy', href: '/legal/privacy' },
  { title: 'Custodian of Records', href: '/legal/records' }
];

const Footer = () => (
  <Wrapper>
    <Links>
      {links.map((link) => (
        <LinkItem key={link.href}>
          <Link href={link.href}>
            <a>{link.title}</a>
          </Link>
        </LinkItem>
      ))}
    </Links>
    <Copyright>
      WOH Brands LLC, Santa Monica, California, USA © Copyright 2021
    </Copyright>
  </Wrapper>
);

export default Footer;
