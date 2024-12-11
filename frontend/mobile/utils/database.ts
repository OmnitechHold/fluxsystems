import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'Khayelihle.db', location: 'default' });

export const initDatabase = async () => {
  return new Promise<void>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Policies (
          id INTEGER PRIMARY KEY NOT NULL,
          clientName TEXT NOT NULL,
          premium REAL NOT NULL,
          status TEXT NOT NULL
        );`,
        [],
        () => {
          console.log('Policies table created successfully');
          resolve();
        },
        (_, error) => {
          console.log('Error creating Policies table:', error);
          reject(error);
          return false;
        }
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Transactions (
          id INTEGER PRIMARY KEY NOT NULL,
          type TEXT NOT NULL,
          amount REAL NOT NULL,
          timestamp TEXT NOT NULL,
          synced INTEGER DEFAULT 0
        );`,
        [],
        () => {
          console.log('Transactions table created successfully');
          resolve();
        },
        (_, error) => {
          console.log('Error creating Transactions table:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

export const insertPolicy = (clientName: string, premium: number, status: string) => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO Policies (clientName, premium, status) VALUES (?, ?, ?);`,
      [clientName, premium, status],
      (_, result) => {
        console.log('Policy inserted successfully:', result.insertId);
      },
      (_, error) => {
        console.log('Error inserting policy:', error);
        return false;
      }
    );
  });
};

export const insertTransaction = (type: string, amount: number, timestamp: string) => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO Transactions (type, amount, timestamp) VALUES (?, ?, ?);`,
      [type, amount, timestamp],
      (_, result) => {
        console.log('Transaction inserted successfully:', result.insertId);
      },
      (_, error) => {
        console.log('Error inserting transaction:', error);
        return false;
      }
    );
  });
};

export const getUnsyncedTransactions = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM Transactions WHERE synced = 0;`,
        [],
        (_, { rows }) => {
          const transactions = [];
          for (let i = 0; i < rows.length; i++) {
            transactions.push(rows.item(i));
          }
          resolve(transactions);
        },
        (_, error) => {
          console.log('Error fetching unsynced transactions:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

export const markTransactionAsSynced = (id: number) => {
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE Transactions SET synced = 1 WHERE id = ?;`,
      [id],
      () => {
        console.log('Transaction marked as synced:', id);
      },
      (_, error) => {
        console.log('Error marking transaction as synced:', error);
        return false;
      }
    );
  });
};
