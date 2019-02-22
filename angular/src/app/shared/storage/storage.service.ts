import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {
    if (this.getDeviceId() === null) {
      const deviceId = this.makeDeviceId();
      this.setItem('deviceId', deviceId);
    }
  }

  private makeDeviceId() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const deviceId = [];
    for (let index = 32; index ; index--) {
      deviceId.push(alphabet[Math.floor(Math.random() * 62)]);
    }
    return deviceId.join('');
  }

  getDeviceId() {
    return this.getItem('deviceId');
  }

  getAccessToken() {
    return this.getItem('accessToken');
  }

  private getItem(item: string) {
    return localStorage.getItem('fusionauth.' + item);
  }

  setAccessToken(value: string) {
    this.setItem('accessToken', value);
  }

  private setItem(key: string, value: string) {
    const fullKey = 'fusionauth.' + key;
    if (value !== null && typeof value !== 'undefined') {
      localStorage.setItem(fullKey, value);
    } else {
      localStorage.removeItem(fullKey);
    }
  }
}
