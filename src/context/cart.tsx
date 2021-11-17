import { message } from 'antd';
import { CartResponse, Resource, cartService } from '@services/cart.service';
import React, {
  createContext,
  FC,
  useState,
  useEffect,
  useContext,
  useMemo
} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';

export type State = {
  total: number;
  itemCount: number;
  items: Resource[];
  addItem: (item: Resource) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  hasItem: (id: string) => boolean;
  clear: () => Promise<void>;
  checkout: (paymentToken: string) => Promise<void>;
};

export const CartContext = createContext<State>({
  total: 0,
  itemCount: 0,
  items: [],
  addItem: () => Promise.resolve(),
  removeItem: () => Promise.resolve(),
  hasItem: () => false,
  clear: () => Promise.resolve(),
  checkout: () => Promise.resolve()
});

const emptyCart: CartResponse = {
  items: [],
  totalPrice: 0,
  _id: ''
};

const CartContextProvider: FC = ({ children }) => {
  const user = useSelector((state: RootState) => state.user.current);
  const [cart, setCart] = useState<CartResponse>(emptyCart);

  const itemCount = useMemo(() => {
    return cart.items.length;
  }, [cart]);

  const total = useMemo(() => {
    return cart.totalPrice;
  }, [cart]);

  const loadCart = async () => {
    const response = await cartService.getCart();
    setCart(response.data);
  };

  const addItem = async (item: Resource) => {
    const response = await cartService.addItem(
      cart._id,
      item._id,
      'isSaleGallery' in item ? 'gallery' : 'video'
    );
    setCart(response.data);
  };

  const removeItem = async (id: string) => {
    const response = await cartService.removeItem(cart._id, id);
    setCart(response.data);
  };

  const hasItem = (id: string) => {
    return !!cart.items.find((i) => i._id === id);
  };

  const clear = async () => {
    const response = await cartService.clear(cart._id);
    setCart(response.data);
  };

  const checkout = async (paymentToken: string) => {
    try {
      const response = await cartService.checkout(cart._id, paymentToken);
      if (response.data.success) {
        message.success('Purchase has been successful!');
        await loadCart();
      } else {
        message.error('Hm, something went wrong...');
      }
    } catch (err) {
      message.error('Hm, something went wrong...');
    }
  };

  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCart(emptyCart);
    }
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        items: cart.items,
        itemCount,
        total,
        addItem,
        removeItem,
        hasItem,
        clear,
        checkout
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

export const useCartContext = () => {
  return useContext(CartContext);
};
