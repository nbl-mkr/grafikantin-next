declare module "midtrans-client" {
  export interface SnapConfig {
    isProduction: boolean;
    serverKey: string;
    clientKey: string;
  }

  export interface SnapTransactionResponse {
    token: string;
    redirect_url: string;
  }

  export interface TransactionStatusResponse {
    transaction_id?: string;
    order_id?: string;
    gross_amount?: string;
    payment_type?: string;
    transaction_time?: string;
    transaction_status?: string;
    fraud_status?: string;
    status_code?: string;
    status_message?: string;
    settlement_time?: string;
    acquirer?: string;
  }

  export class Transaction {
    status(transactionId?: string): Promise<TransactionStatusResponse>;
  }

  export class Snap {
    constructor(config: SnapConfig);
    createTransaction(parameter: Record<string, unknown>): Promise<SnapTransactionResponse>;
    createTransactionToken(parameter: Record<string, unknown>): Promise<string>;
    createTransactionRedirectUrl(parameter: Record<string, unknown>): Promise<string>;
  }

  export class CoreApi {
    constructor(config: SnapConfig);
    transaction: Transaction;
  }

  const Midtrans: { Snap: typeof Snap; CoreApi: typeof CoreApi };
  export default Midtrans;
}
