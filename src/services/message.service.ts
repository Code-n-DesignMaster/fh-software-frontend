import config from 'src/common/config';
import { APIRequest } from './api-request';

export class MessageService extends APIRequest {
  getConversations(query?: Record<string, any>) {
    return this.get(this.buildUrl('/conversations', query));
  }

  searchConversations(query?: Record<string, any>) {
    return this.get(this.buildUrl('/conversations/search', query));
  }

  createConversation(data: Record<string, string>) {
    return this.post('/conversations', data);
  }

  getConversationDetail(id: string) {
    return this.get(`/conversations/${id}`);
  }

  getMessages(conversationId: string, query?: Record<string, any>) {
    return this.get(
      this.buildUrl(`/messages/conversations/${conversationId}`, query)
    );
  }

  sendMessage(payload: any) {
    return this.post('/messages/conversations', payload);
  }

  countTotalNotRead() {
    return this.get('/messages/counting-not-read-messages');
  }

  readAllInConversation(conversationId: string, recipientId: string) {
    return this.post('/messages/read-all', { conversationId, recipientId });
  }

  getMessageUploadUrl() {
    return `${config.apiEndpoint}/messages/private/file`;
  }

  readAllInSystemMessage(recipientId: string, isPerformer: boolean) {
    return this.post('/messages/read-all-system-message', {
      recipientId,
      isPerformer
    });
  }

  countSystemNotRead() {
    return this.get('/messages/counting-not-read-system-messages');
  }

  getMediaLibraryData(param?: any) {
    return this.get(
      this.buildUrl('/performer/performer-assets/media-library/search', param)
    );
  }

  sendMediaMessage(payload: any) {
    return this.post('/messages/private/media', payload);
  }

  getMediaUploadUrl(performerId: string) {
    return `${config.apiEndpoint}/performer/performer-assets/media-library/${performerId}/private`;
  }
}

export const messageService = new MessageService();
