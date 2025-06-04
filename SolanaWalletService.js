import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Crypto wallet service for Solana integration
class SolanaWalletService {
  constructor() {
    this.isConnected = false;
    this.walletType = null;
    this.balance = 0;
    this.address = '';
  }

  async connectWallet(walletType = 'atomic') {
    try {
      // In a real implementation, this would connect to the actual wallet
      // For demo purposes, we'll simulate a connection
      this.isConnected = true;
      this.walletType = walletType;
      this.address = 'Sol' + Math.random().toString(36).substring(2, 10);
      this.balance = parseFloat((Math.random() * 10).toFixed(2));
      
      return {
        success: true,
        address: this.address,
        balance: this.balance
      };
    } catch (error) {
      console.error('Error connecting wallet:', error);
      return {
        success: false,
        error: 'Failed to connect wallet'
      };
    }
  }

  async getBalance() {
    if (!this.isConnected) {
      return {
        success: false,
        error: 'Wallet not connected'
      };
    }

    try {
      // Simulate balance update
      this.balance = parseFloat((Math.random() * 10).toFixed(2));
      
      return {
        success: true,
        balance: this.balance
      };
    } catch (error) {
      console.error('Error getting balance:', error);
      return {
        success: false,
        error: 'Failed to get balance'
      };
    }
  }

  async sendTransaction(recipient, amount) {
    if (!this.isConnected) {
      return {
        success: false,
        error: 'Wallet not connected'
      };
    }

    if (amount > this.balance) {
      return {
        success: false,
        error: 'Insufficient funds'
      };
    }

    try {
      // Simulate transaction
      this.balance -= amount;
      
      return {
        success: true,
        txId: 'tx' + Math.random().toString(36).substring(2, 15),
        newBalance: this.balance
      };
    } catch (error) {
      console.error('Error sending transaction:', error);
      return {
        success: false,
        error: 'Transaction failed'
      };
    }
  }

  async getTransactionHistory() {
    if (!this.isConnected) {
      return {
        success: false,
        error: 'Wallet not connected'
      };
    }

    try {
      // Generate mock transaction history
      const transactions = [];
      const types = ['send', 'receive', 'swap', 'stake'];
      const now = new Date();
      
      for (let i = 0; i < 10; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const amount = parseFloat((Math.random() * 5).toFixed(2));
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        transactions.push({
          id: 'tx' + Math.random().toString(36).substring(2, 10),
          type,
          amount,
          date: date.toISOString(),
          address: 'Sol' + Math.random().toString(36).substring(2, 10),
          status: 'confirmed'
        });
      }
      
      return {
        success: true,
        transactions
      };
    } catch (error) {
      console.error('Error getting transaction history:', error);
      return {
        success: false,
        error: 'Failed to get transaction history'
      };
    }
  }

  disconnect() {
    this.isConnected = false;
    this.walletType = null;
    this.balance = 0;
    this.address = '';
    
    return {
      success: true
    };
  }
}

// Create a singleton instance
const solanaWalletService = new SolanaWalletService();
export default solanaWalletService;
