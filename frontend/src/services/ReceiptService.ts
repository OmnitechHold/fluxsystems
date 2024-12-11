import jsPDF from 'jspdf';
import axios from 'axios';

export class ReceiptService {
  private static instance: ReceiptService;

  private constructor() {}

  public static getInstance(): ReceiptService {
    if (!ReceiptService.instance) {
      ReceiptService.instance = new ReceiptService();
    }
    return ReceiptService.instance;
  }

  async generateReceipt(receiptData: {
    transactionId: string;
    amount: number;
    currency: string;
    customerName: string;
    email: string;
    policyDetails: any;
  }): Promise<Blob> {
    const doc = new jsPDF();
    
    // Add company logo
    // doc.addImage('logo.png', 'PNG', 15, 15, 30, 30);
    
    // Add receipt title
    doc.setFontSize(20);
    doc.text('Payment Receipt', 105, 30, { align: 'center' });
    
    // Add receipt details
    doc.setFontSize(12);
    doc.text(`Transaction ID: ${receiptData.transactionId}`, 20, 50);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 60);
    doc.text(`Customer: ${receiptData.customerName}`, 20, 70);
    
    // Add policy details
    doc.text('Policy Details:', 20, 90);
    doc.text(`Policy ID: ${receiptData.policyDetails.policyId}`, 30, 100);
    doc.text(`Coverage: ${receiptData.policyDetails.coverage}`, 30, 110);
    
    // Add payment details
    doc.text('Payment Details:', 20, 130);
    doc.text(`Amount: ${receiptData.currency} ${receiptData.amount}`, 30, 140);
    doc.text(`Status: Paid`, 30, 150);
    
    // Add footer
    doc.setFontSize(10);
    doc.text('Thank you for your business!', 105, 270, { align: 'center' });
    doc.text('This is a computer-generated receipt.', 105, 280, { align: 'center' });
    
    return doc.output('blob');
  }

  async emailReceipt(email: string, receiptBlob: Blob, transactionId: string) {
    try {
      const formData = new FormData();
      formData.append('receipt', receiptBlob, `receipt_${transactionId}.pdf`);
      formData.append('email', email);
      
      await axios.post('/api/email-receipt', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return true;
    } catch (error) {
      console.error('Failed to email receipt:', error);
      throw error;
    }
  }

  async downloadReceipt(receiptBlob: Blob, transactionId: string) {
    const url = window.URL.createObjectURL(receiptBlob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `receipt_${transactionId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }
}
