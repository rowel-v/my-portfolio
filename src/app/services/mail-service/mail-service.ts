import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MailService {
private readonly accessKey = 'ff78a6ee-8f70-4ed2-b2ae-77ea986821d3';

  sendEmail(formData: FormData): Promise<Response> {
    if (!this.accessKey.trim()) {
      return Promise.reject(new Error('Web3Forms access key is not configured.'));
    }

    formData.set('access_key', this.accessKey.trim());
    return fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });
  }
}
