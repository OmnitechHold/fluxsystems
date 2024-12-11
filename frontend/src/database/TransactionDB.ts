import Dexie, { Table } from 'dexie';

export interface Transaction {
  id?: number;
  type: string;
  amount: number;
  currency: string;
  policyId: string;
  customerId: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  paymentId?: string;
  error?: string;
  timestamp: string;
  syncStatus?: 'SYNCED' | 'PENDING' | 'FAILED';
}

export class TransactionDB extends Dexie {
  transactions!: Table<Transaction, number>;

  constructor() {
    super('TransactionDB');
    
    this.version(1).stores({
      transactions: '++id, type, status, policyId, customerId, timestamp, syncStatus'
    });

    this.transactions = this.table('transactions');
  }

  async insertTransaction(transaction: Transaction): Promise<number> {
    try {
      const id = await this.transactions.add({
        ...transaction,
        syncStatus: 'PENDING'
      });

      // Attempt to sync with server
      this.syncTransaction(id).catch(console.error);

      return id;
    } catch (error) {
      console.error('Failed to insert transaction:', error);
      throw error;
    }
  }

  async getTransaction(id: number): Promise<Transaction | undefined> {
    return await this.transactions.get(id);
  }

  async getTransactionsByPolicy(policyId: string): Promise<Transaction[]> {
    return await this.transactions
      .where('policyId')
      .equals(policyId)
      .toArray();
  }

  async getTransactionsByCustomer(customerId: string): Promise<Transaction[]> {
    return await this.transactions
      .where('customerId')
      .equals(customerId)
      .toArray();
  }

  async getPendingSyncTransactions(): Promise<Transaction[]> {
    return await this.transactions
      .where('syncStatus')
      .equals('PENDING')
      .toArray();
  }

  private async syncTransaction(id: number) {
    try {
      const transaction = await this.getTransaction(id);
      if (!transaction) return;

      // Sync with server
      await fetch('/api/sync-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });

      // Update sync status
      await this.transactions.update(id, { syncStatus: 'SYNCED' });
    } catch (error) {
      console.error('Failed to sync transaction:', error);
      await this.transactions.update(id, { syncStatus: 'FAILED' });
    }
  }

  async syncPendingTransactions() {
    const pendingTransactions = await this.getPendingSyncTransactions();
    for (const transaction of pendingTransactions) {
      if (transaction.id) {
        await this.syncTransaction(transaction.id);
      }
    }
  }
}
