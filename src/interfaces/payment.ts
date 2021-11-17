export class PaymentProductModel {
  name: string;
  description?: string;
  price: number;
  extraInfo?: any;
  productType?: string;
  productId?: string;
}

export interface ITransaction {
  paymentGateway: string;
  source: string;
  sourceId: string;
  target: string;
  targetId: string;
  type: string;
  paymentResponseInfo: any;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  products: PaymentProductModel[];
}

export interface ICoupon {
  _id: string;
  name: string;
  description: string;
  code: string;
  value: number;
  expiredDate: string | Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrder {
  _id: string;
  transactionId: string;
  performerId: string;
  performerInfo?: any;
  userId: string;
  userInfo?: any;
  orderNumber: string;
  shippingCode: string;
  productIds: string[];
  productsInfo: any[];
  quantity: number;
  totalPrice: number;
  deliveryAddress?: string;
  deliveryStatus: string;
  postalCode?: string;
  createdAt: Date;
  updatedAt: Date;
}