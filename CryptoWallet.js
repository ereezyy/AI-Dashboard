import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import WalletConnect from '../crypto/WalletConnect';
import TransactionHistory from '../crypto/TransactionHistory';
import SendReceive from '../crypto/SendReceive';
import TradingInterface from '../crypto/TradingInterface';
import solanaWalletService from '../crypto/SolanaWalletService';

const CryptoWalletContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const WalletPageTitle = styled.h2`
  font-size: ${props => props.theme.fontSize.xl};
  font-weight: ${props => props.theme.fontWeight.bold};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const WalletGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const CryptoWalletPage = ({ setUserProfile }) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  
  useEffect(() => {
    // Check if wallet is already connected
    if (solanaWalletService.isConnected) {
      setIsWalletConnected(true);
      if (setUserProfile) {
        setUserProfile(prev => ({
          ...prev,
          walletConnected: true
        }));
      }
    }
  }, [setUserProfile]);
  
  const handleWalletConnect = (result) => {
    setIsWalletConnected(true);
    if (setUserProfile) {
      setUserProfile(prev => ({
        ...prev,
        walletConnected: true
      }));
    }
  };
  
  return (
    <CryptoWalletContainer>
      <WalletPageTitle>Crypto Wallet & Trading</WalletPageTitle>
      
      <WalletConnect onConnect={handleWalletConnect} />
      
      {isWalletConnected && (
        <>
          <WalletGrid>
            <SendReceive />
            <TransactionHistory />
          </WalletGrid>
          
          <TradingInterface />
        </>
      )}
    </CryptoWalletContainer>
  );
};

export default CryptoWalletPage;
