import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  publicKeyCredential: Credential;
  constructor() {}

  async enableSignInBimetricalData() {
    const options: CredentialCreationOptions = {
      publicKey: {
        rp: { name: 'rn-m.formulabi.ru' },
        user: {
          name: 'john.appleseed@example.com',
          id: new Uint8Array(16),
          displayName: 'John Appleseed',
        },
        pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
        challenge: new Uint8Array([
          // must be a cryptographically random number sent from a server
          0x8c, 0x0a, 0x26, 0xff, 0x22, 0x91, 0xc1, 0xe9, 0xb9, 0x4e, 0x2e,
          0x17, 0x1a, 0x98, 0x6a, 0x73, 0x71, 0x9d, 0x43, 0x48, 0xd5, 0xa7,
          0x6a, 0x15, 0x7e, 0x38, 0x94, 0x52, 0x77, 0x97, 0x0f, 0xef,
        ]).buffer,
        authenticatorSelection: { authenticatorAttachment: 'platform' },
      },
    };

    this.publicKeyCredential = await navigator.credentials.create(options);
  }
  async onSignInBimetricalData() {
    const options: CredentialRequestOptions = {
      publicKey: {
        challenge: new Uint8Array([
          // must be a cryptographically random number sent from a server
          0x8c, 0x0a, 0x26, 0xff, 0x22, 0x91, 0xc1, 0xe9, 0xb9, 0x4e, 0x2e,
          0x17, 0x1a, 0x98, 0x6a, 0x73, 0x71, 0x9d, 0x43, 0x48, 0xd5, 0xa7,
          0x6a, 0x15, 0x7e, 0x38, 0x94, 0x52, 0x77, 0x97, 0x0f, 0xef,
        ]).buffer,
        allowCredentials: [
          {
            type: 'public-key',
            id: new Uint8Array(16),
            transports: ['internal'],
          },
        ],
      },
    };

    const publicKeyCredential = await navigator.credentials.get(options);
  }
}
