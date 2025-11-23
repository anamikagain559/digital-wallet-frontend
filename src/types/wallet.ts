// src/types/wallet.ts
export type WalletStatus = "ACTIVE" | "BLOCKED";

export interface Wallet {
  _id: string;
  user: string | { _id: string; name?: string; phone?: string };
  balance: number;
  status: WalletStatus;
  createdAt?: string;
  updatedAt?: string;
}

export type TransactionType = "DEPOSIT" | "WITHDRAW" | "TRANSFER" | "CASH_IN" | "CASH_OUT";
export type TransactionStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface Transaction {
  _id: string;
  type: TransactionType;
  amount: number;
  fee?: number;
  fromWallet?: string;
  toWallet?: string;
  initiatedBy?: any;
  status: TransactionStatus;
  description?: string;
  createdAt?: string;
  meta?: Record<string, any>;
  agent?: string;
}
