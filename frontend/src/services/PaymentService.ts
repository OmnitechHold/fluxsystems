import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { TransactionDB } from '../database/TransactionDB';

// Initialize Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

interface PaymentIntentResponse {
  clientSecret: string;
}

export class PaymentService {
  private static instance: PaymentService;
  private transactionDB: TransactionDB;

  private constructor() {
    this.transactionDB = new TransactionDB();
  }

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  async processPayment(amount: number, currency: string, policyDetails: any) {
    try {
      // Create payment intent
      const response = await axios.post<PaymentIntentResponse>('/api/create-payment-intent', {
        amount,
        currency,
        policyDetails
      });

      const { clientSecret } = response.data;
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      // Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: policyDetails.card,
          billing_details: {
            name: policyDetails.customerName,
            email: policyDetails.email
          }
        }
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      // Record transaction
      await this.recordTransaction({
        type: 'PREMIUM_PAYMENT',
        amount,
        currency,
        policyId: policyDetails.policyId,
        customerId: policyDetails.customerId,
        status: 'SUCCESS',
        paymentId: result.paymentIntent?.id,
        timestamp: new Date().toISOString()
      });

      // Generate receipt
      await this.generateReceipt({
        transactionId: result.paymentIntent?.id,
        amount,
        currency,
        customerName: policyDetails.customerName,
        email: policyDetails.email,
        policyDetails
      });

      return {
        success: true,
        paymentId: result.paymentIntent?.id
      };

    } catch (error: any) {
      await this.recordTransaction({
        type: 'PREMIUM_PAYMENT',
        amount,
        currency,
        policyId: policyDetails.policyId,
        customerId: policyDetails.customerId,
        status: 'FAILED',
        error: error.message,
        timestamp: new Date().toISOString()
      });

      throw error;
    }
  }

  private async recordTransaction(transactionData: any) {
    await this.transactionDB.insertTransaction(transactionData);
  }

  private async generateReceipt(receiptData: any) {
    // Generate PDF receipt
    const receiptHtml = `
      <html>
        <body>
          <h1>Payment Receipt</h1>
          <p>Transaction ID: ${receiptData.transactionId}</p>
          <p>Amount: ${receiptData.amount} ${receiptData.currency}</p>
          <p>Customer: ${receiptData.customerName}</p>
          <p>Policy Details:</p>
          <ul>
            <li>Policy ID: ${receiptData.policyDetails.policyId}</li>
            <li>Coverage: ${receiptData.policyDetails.coverage}</li>
            <li>Premium: ${receiptData.amount} ${receiptData.currency}</li>
          </ul>
          <p>Date: ${new Date().toLocaleDateString()}</p>
        </body>
      </html>
    `;

    // Send receipt via email
    await this.sendReceiptEmail(receiptData.email, receiptHtml);
  }

  private async sendReceiptEmail(email: string, receiptHtml: string) {
    try {
      await axios.post('/api/send-receipt', {
        email,
        receiptHtml
      });
    } catch (error) {
      console.error('Failed to send receipt email:', error);
    }
  }
}

export default PaymentService;
