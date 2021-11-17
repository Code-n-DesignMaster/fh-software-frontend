import cookie from 'js-cookie';
import { APIRequest, TOKEN } from './api-request';
import { ILogin, IFanRegister, IForgot } from 'src/interfaces';

export class AuthService extends APIRequest {
  public async login(data: ILogin) {
    if (data.loginUsername) {
      return this.post('/auth/users/login/username', data);
    }
    return this.post('/auth/users/login/email', data);
  }

  public async loginPerformer(data: ILogin) {
    if (data.loginUsername) {
      return this.post('/auth/performers/login/username', data);
    }
    return this.post('/auth/performers/login/email', data);
  }

  public async resendEmail(url: string) {
    return await this.post(url);
  }

  setToken(token: string, role: string): void {
    process.browser && localStorage.setItem(TOKEN, token);
    process.browser && localStorage.setItem('role', role);
    // https://github.com/js-cookie/js-cookie
    // since Safari does not support, need a better solution
    const date = new Date();
    date.setDate(date.getDate() + 365);
    cookie.set(TOKEN, token, { expires: date, path: '/' });
    cookie.set('role', role, { expires: date, path: '/' });
    cookie.set(TOKEN, token);
    cookie.set('role', role);
    this.setAuthHeaderToken(token);
  }

  getToken(): string {
    const token = cookie.get(TOKEN);
    if (token) {
      return token;
    }
    return !token && process.browser ? localStorage.getItem(TOKEN) : null;
  }

  getUserRole() {
    const role = cookie.get('role');
    if (role) {
      return role;
    }
    return !role && process.browser ? localStorage.getItem('role') : null;
  }

  getAgeConfirmed() {
    const ageConfirmed = cookie.get('ageConfirmed');
    if (ageConfirmed) {
      return ageConfirmed;
    }
    return !ageConfirmed && process.browser ? localStorage.getItem('ageConfirmed') : null;
  }

  reSetToken() {
    const date = new Date();
    date.setDate(date.getDate() + 365);
    const token = this.getToken();
    const role = this.getUserRole();
    const ageConfirmed = this.getAgeConfirmed();
    if (role) {
      cookie.set('role', role, { expires: date, path: '/' });
    }
    if (ageConfirmed) {
      cookie.set('ageConfirmed', role, { expires: date, path: '/' });
    }
    if (token) {
      cookie.set(TOKEN, token, { expires: date, path: '/' });
    }
    window.location.reload();
  }

  removeToken(): void {
    cookie.remove(TOKEN);
    process.browser && localStorage.removeItem(TOKEN);
  }

  updatePassword(password: string, type?: string, source?: string) {
    return this.put('/auth/users/me/password', { type, password, source });
  }

  resetPassword(data: IForgot) {
    return this.post('/auth/users/forgot', data);
  }

  public changePassword(token: string, password: string) {
    return this.post(`/auth/password-change?token=${token}`, { password });
  }

  public async register(data: IFanRegister) {
    return this.post('/auth/users/register', data);
  }

  public async registerPerformer(
    documents: {
      file: File;
      fieldname: string;
    }[],
    data: any,
    onProgress?: Function
  ) {
    return this.upload('/auth/performers/register', documents, {
      onProgress,
      customData: data
    });
  }
}

export const authService = new AuthService();
