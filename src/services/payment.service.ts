// import { IGalleryCreate } from 'src/interfaces';
import { APIRequest } from './api-request';

export class PaymentService extends APIRequest {
  subscribe(payload: any) {
    return this.post('/payment/subscribe/performers', payload);
  }

  getListTransactions(payload) {
    return this.get(this.buildUrl('/payment/transactions', payload));
  }

  userSearchTransactions(payload) {
    return this.get(this.buildUrl('/transactions/user/search', payload));
  }
  purchaseGallery(id, payload) {
    return this.post('/payment/purchase-gallery/' + id, payload);
  }
  purchaseVideo(id, payload) {
    return this.post(`/payment/purchase-video/${id}`, payload);
  }

  purchaseProducts(products: any) {
    return this.post('/payment/purchase-products', products);
  }

  applyCoupon(code: any) {
    return this.post(`/coupons/${code}/apply-coupon`);
  }

  cancelSubscription(performerId: string) {
    return this.post(`/payment/ccbill/cancel-subscription/${performerId}`);
  }

  tip(performerId: string, payload) {
    return this.post(`/payment/send-tip-model/${performerId}`, payload);
  }

}

export const paymentService = new PaymentService();
