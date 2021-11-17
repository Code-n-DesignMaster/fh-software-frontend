import CloseIcon from '@components/icons/close';
import { Resource } from '@services/cart.service';
import Routes from 'server/routes';
import Product from './product';
import {
  Table,
  Head,
  Body,
  ClearButton,
  PerformerLink,
  PriceLabel,
  RemoveButton
} from './styled';

type Props = {
  items: Resource[];
  onClear: () => void;
  onRemove: (id: string) => void;
};

const CartTable = ({ items, onClear, onRemove }: Props) => {
  return (
    <Table>
      <Head>
        <tr>
          <th>Product</th>
          <th>Owner</th>
          <th>Total price</th>
          <th>
            {Object.keys(items).length > 0 && (
              <ClearButton onClick={onClear}>Clear all</ClearButton>
            )}
          </th>
        </tr>
      </Head>
      <Body>
        {items.map((item) => (
          <tr key={item._id}>
            <td>
              <Product item={item} />
            </td>
            <td>
              <Routes.Link
                route={`/model/${item.performer.username}`}
                params={{ username: item.performer.username }}
              >
                <PerformerLink>@{item.performer.username}</PerformerLink>
              </Routes.Link>
            </td>
            <td>
              <PriceLabel>${item.price.toFixed(2)}</PriceLabel>
            </td>
            <td>
              <RemoveButton onClick={() => onRemove(item._id)}>
                <CloseIcon />
              </RemoveButton>
            </td>
          </tr>
        ))}
      </Body>
    </Table>
  );
};

export default CartTable;
