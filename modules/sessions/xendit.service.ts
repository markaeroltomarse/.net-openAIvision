import axios from 'axios';
import { IXenditInvoiceBodyData, IXenditPayoutDto } from '@/dto/xendit.dto';

export default class XenditService {
  private readonly API_GATEWAY_URL = 'https://api.xendit.co';
  private readonly CHANNEL_CODE = 'PH_GCASH';
  private readonly CURRENCY = 'PHP';

  public async createInvoice(data: IXenditInvoiceBodyData) {
    try {
      const response = await axios.post(
        this.API_GATEWAY_URL + '/v2/invoices',
        {
          external_id: data.external_id!,
          currency: data.currency!,
          amount: data.amount!,
          failure_redirect_url: data.failure_redirect_url!,
          success_redirect_url: data.success_redirect_url!,
          payer_email: data.payer_email!,
          description: data.description!,
        },
        {
          timeout: 10000,
          auth: {
            username: process.env.XENDIT_API_KEY,
            password: '',
          },
        }
      );
      return response.data.invoice_url;
    } catch (error) {
      console.error('HTTP Request Error:', error);
      throw error;
    }
  }

  public async createPayout(data: IXenditPayoutDto) {
    try {
      const response = await axios.post(
        this.API_GATEWAY_URL + '/v2/payouts',
        {
          ...data,
          channel_code: this.CHANNEL_CODE,
          currency: this.CURRENCY,
        },
        {
          timeout: 10000,
          headers: {
            'Idempotency-key': `payout-${data.reference_id}`,
          },
          auth: {
            username: process.env.XENDIT_API_KEY,
            password: '',
          },
        }
      );
      console.log('payout response', response.data);
      return response.data;
    } catch (error) {
      console.error('HTTP Request Error:', error);
      throw error;
    }
  }
}
