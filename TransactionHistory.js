import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import solanaWalletService from './SolanaWalletService';

const TransactionHistoryContainer = styled.div`
  background-color: ${props => props.theme.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadowLight};
`;

const HistoryTitle = styled.h3`
  font-size: ${props => props.theme.fontSize.lg};
  font-weight: ${props => props.theme.fontWeight.semiBold};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  max-height: 400px;
  overflow-y: auto;
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.backgroundSecondary};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: background-color ${props => props.theme.transitionSpeed} ease;
  
  &:hover {
    background-color: ${props => props.theme.backgroundTertiary};
  }
`;

const TransactionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const TransactionIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.round};
  background-color: ${props => 
    props.type === 'receive' ? props.theme.success : 
    props.type === 'send' ? props.theme.error :
    props.type === 'swap' ? props.theme.secondary :
    props.theme.accent2};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSize.lg};
  color: white;
`;

const TransactionDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const TransactionType = styled.div`
  font-weight: ${props => props.theme.fontWeight.medium};
  text-transform: capitalize;
`;

const TransactionAddress = styled.div`
  font-size: ${props => props.theme.fontSize.sm};
  color: ${props => props.theme.textSecondary};
  font-family: monospace;
`;

const TransactionDate = styled.div`
  font-size: ${props => props.theme.fontSize.sm};
  color: ${props => props.theme.textSecondary};
`;

const TransactionAmount = styled.div`
  font-weight: ${props => props.theme.fontWeight.semiBold};
  color: ${props => 
    props.type === 'receive' ? props.theme.success : 
    props.type === 'send' ? props.theme.error :
    props.theme.text};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
  color: ${props => props.theme.textSecondary};
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const RefreshButton = styled.button`
  background-color: transparent;
  color: ${props => props.theme.primary};
  border: 1px solid ${props => props.theme.primary};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSize.sm};
  cursor: pointer;
  transition: all ${props => props.theme.transitionSpeed} ease;
  align-self: flex-end;
  margin-bottom: ${props => props.theme.spacing.md};
  
  &:hover {
    background-color: ${props => props.theme.primary};
    color: white;
  }
`;

const getTransactionIcon = (type) => {
  switch (type) {
    case 'receive':
      return '↓';
    case 'send':
      return '↑';
    case 'swap':
      return '⇄';
    case 'stake':
      return '⚓';
    default:
      return '•';
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchTransactions = async () => {
    if (!solanaWalletService.isConnected) {
      return;
    }
    
    setLoading(true);
    const result = await solanaWalletService.getTransactionHistory();
    setLoading(false);
    
    if (result.success) {
      setTransactions(result.transactions);
    } else {
      console.error('Failed to get transaction history:', result.error);
      // In a real app, show an error message to the user
    }
  };
  
  useEffect(() => {
    fetchTransactions();
  }, []);
  
  return (
    <TransactionHistoryContainer>
      <HistoryTitle>Transaction History</HistoryTitle>
      
      <RefreshButton onClick={fetchTransactions} disabled={loading}>
        {loading ? 'Loading...' : 'Refresh'}
      </RefreshButton>
      
      {transactions.length > 0 ? (
        <TransactionList>
          {transactions.map(transaction => (
            <TransactionItem key={transaction.id}>
              <TransactionInfo>
                <TransactionIcon type={transaction.type}>
                  {getTransactionIcon(transaction.type)}
                </TransactionIcon>
                <TransactionDetails>
                  <TransactionType>{transaction.type}</TransactionType>
                  <TransactionAddress>{transaction.address}</TransactionAddress>
                  <TransactionDate>{formatDate(transaction.date)}</TransactionDate>
                </TransactionDetails>
              </TransactionInfo>
              <TransactionAmount type={transaction.type}>
                {transaction.type === 'receive' ? '+' : 
                 transaction.type === 'send' ? '-' : ''}
                {transaction.amount} SOL
              </TransactionAmount>
            </TransactionItem>
          ))}
        </TransactionList>
      ) : (
        <EmptyState>
          <EmptyIcon>📜</EmptyIcon>
          <p>No transactions found</p>
          {!solanaWalletService.isConnected && (
            <p>Connect your wallet to view transaction history</p>
          )}
        </EmptyState>
      )}
    </TransactionHistoryContainer>
  );
};

export default TransactionHistory;
