import { IPaymentIntegration } from 'src/internal/application/ports/integrations/payment';
import { Payment } from 'src/internal/domain/payment/entities/payment.entity';
import { IHttp } from 'src/internal/application/ports/http/http';
import { Inject, Injectable } from '@nestjs/common';
import { env } from 'src/internal/application/configs/env';

interface IRefreshToken {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  scope: string;
  userId: number;
  refreshToken: string;
  publicKey: string;
}

@Injectable()
export class PaymentMercadoPago implements IPaymentIntegration {
  private baseUrl: string;
  private clientSecret: string;
  private grantType: string;
  private refreshTokenDefault: string;

  constructor(@Inject('Http') private httpClient: IHttp) {
    this.baseUrl = env.paymentIntegrationUrl;
    this.clientSecret = env.paymentIntegrationClientSecret;
    this.grantType = env.paymentIntegrationGrantType;
    this.refreshTokenDefault = env.paymentIntegrationRefreshToken;
  }

  private async refreshToken(): Promise<IRefreshToken> {
    const requestData = {
      url: `${this.baseUrl}/oauth/token`,
      body: {
        client_secret: this.clientSecret,
        grant_type: this.grantType,
        refresh_token: this.refreshTokenDefault,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { body } = await this.httpClient.post(requestData);

    return {
      accessToken: body.access_token,
      tokenType: body.token_type,
      expiresIn: body.expires_in,
      scope: body.scope,
      userId: body.user_id,
      refreshToken: body.refresh_token,
      publicKey: body.public_key,
    } as IRefreshToken;
  }

  async createPayment(payment: Payment): Promise<any> {
    const { accessToken } = await this.refreshToken();

    const { body } = await this.httpClient.post({
      url: `${this.baseUrl}/v1/payments`,
      body: {
        transaction_amount: payment.value,
        payment_method_id: payment.paymentType,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Idempotency-Key': `12345`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return {
      id: body?.id,
      status: body?.status,
      qrCode: body?.point_of_interaction?.transaction_data?.qr_code,
    };
  }
  // https://auth.mercadopago.com/authorization?client_id=APP_ID&response_type=code&platform_id=mp&state=RANDOM_ID&redirect_uri=YOUR_REDIRECT_URI
}
