import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import solanaWalletService from './SolanaWalletService';

const WalletConnectContainer = styled.div`
  background-color: ${props => props.theme.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadowLight};
`;

const ConnectTitle = styled.h3`
  font-size: ${props => props.theme.fontSize.lg};
  font-weight: ${props => props.theme.fontWeight.semiBold};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const WalletOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
`;

const WalletOption = styled.div`
  background-color: ${props => props.theme.backgroundSecondary};
  border: 1px solid ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  cursor: pointer;
  transition: all ${props => props.theme.transitionSpeed} ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  
  &:hover {
    border-color: ${props => props.theme.primary};
    transform: translateY(-2px);
  }
`;

const WalletIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.backgroundTertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const WalletName = styled.div`
  font-weight: ${props => props.theme.fontWeight.medium};
`;

const WalletDescription = styled.div`
  font-size: ${props => props.theme.fontSize.sm};
  color: ${props => props.theme.textSecondary};
  text-align: center;
`;

const ConnectedWallet = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.backgroundSecondary};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
`;

const WalletInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const WalletAddress = styled.div`
  font-family: monospace;
  background-color: ${props => props.theme.backgroundTertiary};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSize.sm};
`;

const DisconnectButton = styled.button`
  background-color: transparent;
  color: ${props => props.theme.error};
  border: 1px solid ${props => props.theme.error};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSize.sm};
  cursor: pointer;
  transition: all ${props => props.theme.transitionSpeed} ease;
  
  &:hover {
    background-color: ${props => props.theme.error};
    color: white;
  }
`;

const WalletConnect = ({ onConnect }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletType, setWalletType] = useState('');
  
  useEffect(() => {
    // Check if wallet is already connected
    if (solanaWalletService.isConnected) {
      setIsConnected(true);
      setWalletAddress(solanaWalletService.address);
      setWalletType(solanaWalletService.walletType);
    }
  }, []);
  
  const handleConnect = async (type) => {
    const result = await solanaWalletService.connectWallet(type);
    
    if (result.success) {
      setIsConnected(true);
      setWalletAddress(result.address);
      setWalletType(type);
      
      if (onConnect) {
        onConnect(result);
      }
    } else {
      console.error('Failed to connect wallet:', result.error);
      // In a real app, show an error message to the user
    }
  };
  
  const handleDisconnect = () => {
    const result = solanaWalletService.disconnect();
    
    if (result.success) {
      setIsConnected(false);
      setWalletAddress('');
      setWalletType('');
    }
  };
  
  return (
    <WalletConnectContainer>
      <ConnectTitle>
        {isConnected ? 'Connected Wallet' : 'Connect Your Wallet'}
      </ConnectTitle>
      
      {!isConnected ? (
        <>
          <p>Connect your Solana wallet to access crypto features, casino games, and more.</p>
          
          <WalletOptions>
            <WalletOption onClick={() => handleConnect('atomic')}>
              <WalletIcon>⚛️</WalletIcon>
              <WalletName>Atomic Wallet</WalletName>
              <WalletDescription>Recommended for best integration</WalletDescription>
            </WalletOption>
            
            <WalletOption onClick={() => handleConnect('phantom')}>
              <WalletIcon>👻</WalletIcon>
              <WalletName>Phantom</WalletName>
              <WalletDescription>Popular Solana wallet</WalletDescription>
            </WalletOption>
            
            <WalletOption onClick={() => handleConnect('solflare')}>
              <WalletIcon>🔆</WalletIcon>
              <WalletName>Solflare</WalletName>
              <WalletDescription>Feature-rich Solana wallet</WalletDescription>
            </WalletOption>
          </WalletOptions>
        </>
      ) : (
        <ConnectedWallet>
          <WalletInfo>
            <WalletIcon>
              {walletType === 'atomic' ? '⚛️' : 
               walletType === 'phantom' ? '👻' : '🔆'}
            </WalletIcon>
            <div>
              <WalletName>
                {walletType === 'atomic' ? 'Atomic Wallet' : 
                 walletType === 'phantom' ? 'Phantom' : 'Solflare'}
              </WalletName>
              <WalletAddress>{walletAddress}</WalletAddress>
            </div>
          </WalletInfo>
          
          <DisconnectButton onClick={handleDisconnect}>
            Disconnect
          </DisconnectButton>
        </ConnectedWallet>
      )}
    </WalletConnectContainer>
  );
};

export default WalletConnect;
