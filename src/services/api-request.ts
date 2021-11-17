import fetch from 'isomorphic-unfetch';
import cookie from 'js-cookie';
import { isUrl } from '@lib/string';
import { TypedEvent } from '@lib/event';
import config from 'src/common/config';

export interface IResponse<T> {
  status: number;
  data: T;
}

export const TOKEN = 'token';

export const unauthorizedEvent = new TypedEvent<401>();

export abstract class APIRequest {
  protected token: string = null;

  setAuthHeaderToken(token: string) {
    this.token = token;
  }

  /**
   * Parses the JSON returned by a network request
   *
   * @param  {object} response A response from a network request
   *
   * @return {object}          The parsed JSON from the request
   */
  private parseJSON(response: Response) {
    if (response.status === 204 || response.status === 205) {
      return null;
    }
    return response.json();
  }

  /**
   * Checks if a network request came back fine, and throws an error if not
   *
   * @param  {object} response   A response from a network request
   *
   * @return {object|undefined} Returns either the response, or throws an error
   */
  private checkStatus(response: Response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    if ([401, 403].indexOf(response.status) > -1) {
      if (process.browser) {
        unauthorizedEvent.emit(401);
      }

      throw new Error('Forbidden in the action!');
    }

    // const error = new Error(response.statusText) as any;
    // error.response = response;
    // throw error;
    throw response.clone().json();
  }

  request<T = any>(
    url: string,
    method?: string,
    body?: any,
    headers?: { [key: string]: string }
  ): Promise<IResponse<T>> {
    const verb = (method || 'get').toUpperCase();
    const updatedHeader = {
      'Content-Type': 'application/json',
      // TODO - check me
      Authorization:
        this.token || (process.browser ? localStorage.getItem(TOKEN) : ''),
      ...(headers || {})
    };
    return fetch(isUrl(url) ? url : `${'http://localhost:8080'}${url}`, {
      method: verb,
      headers: updatedHeader,
      body: body ? JSON.stringify(body) : null
    })
      .then(this.checkStatus)
      .then(this.parseJSON);
  }

  buildUrl(baseUrl: string, params?: { [key: string]: any }) {
    if (!params) {
      return baseUrl;
    }

    const queryString = Object.keys(params)
      .map((k) => {
        if (Array.isArray(params[k])) {
          return params[k]
            .map(
              (param) => `${encodeURIComponent(k)}=${encodeURIComponent(param)}`
            )
            .join('&');
        }
        return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
      })
      .join('&');
    return `${baseUrl}?${queryString}`;
  }

  get<T = any>(url: string, headers?: { [key: string]: string }) {
    return this.request<T>(url, 'get', null, headers);
  }

  post<T = any>(url: string, data?: any, headers?: { [key: string]: string }) {
    return this.request<T>(url, 'post', data, headers);
  }

  put<T = any>(url: string, data?: any, headers?: { [key: string]: string }) {
    return this.request<T>(url, 'put', data, headers);
  }

  del<T = any>(url: string, data?: any, headers?: { [key: string]: string }) {
    return this.request<T>(url, 'delete', data, headers);
  }

  upload(
    url: string,
    files: {
      file: File;
      fieldname: string;
    }[],
    options: {
      onProgress: Function;
      customData?: Record<any, any>;
      method?: string;
    } = {
      onProgress() {},
      method: 'POST'
    }
  ) {
    const uploadUrl = isUrl(url) ? url : `${config.apiEndpoint}${url}`;
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-undef
      const req = new XMLHttpRequest();

      req.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          options.onProgress({
            percentage: (event.loaded / event.total) * 100
          });
        }
      });

      req.addEventListener('load', () => {
        const success = req.status >= 200 && req.status < 300;
        const { response } = req;
        if (!success) {
          return reject(response);
        }
        return resolve(response);
      });

      req.upload.addEventListener('error', () => {
        reject(req.response);
      });

      // eslint-disable-next-line no-undef
      const formData = new FormData();
      files.forEach((f) => formData.append(f.fieldname, f.file, f.file.name));
      options.customData &&
        Object.keys(options.customData).forEach((fieldname) => {
          if (
            typeof options.customData[fieldname] !== 'undefined' &&
            !Array.isArray(options.customData[fieldname])
          )
            formData.append(fieldname, options.customData[fieldname]);
          if (
            typeof options.customData[fieldname] !== 'undefined' &&
            Array.isArray(options.customData[fieldname])
          ) {
            for (let i = 0; i < options.customData[fieldname].length; i += 1) {
              formData.append(fieldname, options.customData[fieldname][i]);
            }
          }
        });

      req.responseType = 'json';
      req.open(options.method || 'POST', uploadUrl);

      let token: any = cookie.get(TOKEN);
      if (!token) {
        token = process.browser ? localStorage.getItem(TOKEN) : '';
      }
      if (token) {
        req.setRequestHeader('Authorization', token);
      }
      req.send(formData);
    });
  }
}
