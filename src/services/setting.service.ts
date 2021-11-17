import { ISetting, IContact, IContactResponse } from 'src/interfaces';
import { APIRequest, IResponse } from './api-request';

export class SettingService extends APIRequest {
  private _settings = {} as any;

  async all(forceReload = false, group = ''): Promise<IResponse<ISetting>> {
    const settingGroup = group || 'all';
    if (this._settings[settingGroup] && !forceReload) {
      return this._settings[settingGroup];
    }
    const resp = await this.get(this.buildUrl('/settings/public', { group }));
    this._settings[settingGroup] = resp;
    return resp;
  }

  contact(data: IContact) {
    return this.post<IContactResponse>('/contact', data);
  }
}

export const settingService = new SettingService();
