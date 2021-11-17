import { IGallery } from '@interface/gallery';
import { IVideo } from '@interface/video';
import { APIRequest } from './api-request';

export type Resource = IGallery | IVideo;

export type CartResponse = {
  _id: string;
  totalPrice: number;
  items: Resource[];
};

export type CheckoutResponse = {
  success: boolean;
};

export class CartService extends APIRequest {
  getCart() {
    return this.get<CartResponse>('/cart/current');
  }

  addItem(cartId: string, productId: string, productType: string) {
    return this.put<CartResponse>(`/cart/${cartId}`, {
      _id: productId,
      type: productType
    });
  }

  removeItem(cartId: string, productId: string) {
    return this.del<CartResponse>(`/cart/${cartId}/${productId}`);
  }

  clear(cartId: string) {
    return this.put<CartResponse>(`/cart/${cartId}/clear`);
  }

  checkout(cartId: string, paymentToken: string, couponCode?: string) {
    return this.post<CheckoutResponse>('/payment/purchase-cart', {
      cartId,
      paymentToken,
      couponCode
    });
  }
}

export const cartService = new CartService();
