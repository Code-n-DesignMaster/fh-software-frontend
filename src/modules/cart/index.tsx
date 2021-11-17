import { useState } from 'react';
import Link from 'next/link';
import { OutlineButton } from '@components/buttons';
import Loader from '@components/loader';
import { useCartContext } from 'src/context/cart';
import SEO from './seo';
import Table from './table';
import CardForm from './card-form';
import {
  Wrapper,
  Inner,
  Title,
  Paragraph,
  TableWrapper,
  Footer
} from './styled';

const CartPage = () => {
  const [isProcessing, setProcessing] = useState(false);

  const {
    items,
    itemCount,
    clear,
    removeItem,
    total,
    checkout
  } = useCartContext();

  const handleComplete = async (token: string) => {
    setProcessing(true);
    await checkout(token);
    setProcessing(false);
  };

  return (
    <>
      <SEO />
      <Wrapper>
        <Inner>
          <TableWrapper>
            <Title>Shopping cart</Title>
            <Paragraph>{itemCount} items in your cart</Paragraph>
            <Table items={items} onClear={clear} onRemove={removeItem} />
            <Footer>
              <Link href="/home">
                <OutlineButton as="a">Continue searching</OutlineButton>
              </Link>
            </Footer>
          </TableWrapper>
          {itemCount > 0 && (
            <CardForm total={total} onComplete={handleComplete} />
          )}
        </Inner>
      </Wrapper>
      {isProcessing && <Loader />}
    </>
  );
};

CartPage.authenticate = true;

export default CartPage;
