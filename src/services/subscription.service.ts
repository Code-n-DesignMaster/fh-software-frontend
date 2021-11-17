import { APIRequest } from './api-request';

class SubscriptionService extends APIRequest {
  search(query?: { [key: string]: any }) {
    return this.get(this.buildUrl('/subscriptions/performer/search', query));
  }

  userSearch(query?: { [key: string]: any }) {
    return this.get(this.buildUrl('/subscriptions/user/search', query));
  }

  freeSubscribed(payload) {
    return this.post('/subscriptions/user', payload);
  }

  deleteFreeSubscribed(payload) {
    return this.del('/subscriptions/user/delete', payload);
  }
}
export const subscriptionService = new SubscriptionService();
