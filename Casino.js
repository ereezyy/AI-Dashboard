import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SlotsGame from '../casino/SlotsGame';
import BlackjackGame from '../casino/BlackjackGame';
import PokerGame from '../casino/PokerGame';
import casinoService from '../casino/CasinoService';
import solanaWalletService from '../crypto/SolanaWalletService';

const CasinoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const CasinoPageTitle = styled.h2`
  font-size: ${props => props.theme.fontSize.xl};
  font-weight: ${props => props.theme.fontWeight.bold};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const GameSelector = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const GameButton = styled.button`
  background-color: ${props => props.active ? props.theme.primary : props.theme.backgroundSecondary};
  color: ${props => props.active ? 'white' : props.theme.text};
  border: 1px solid ${props => props.active ? props.theme.primary : props.theme.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  font-size: ${props => props.theme.fontSize.md};
  font-weight: ${props => props.theme.fontWeight.medium};
  cursor: pointer;
  transition: all ${props => props.theme.transitionSpeed} ease;
  
  &:hover {
    background-color: ${props => props.active ? props.theme.primaryHover : props.theme.backgroundTertiary};
  }
`;

const WalletWarning = styled.div`
  background-color: rgba(255, 152, 0, 0.1);
  border: 1px solid ${props => props.theme.warning};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
`;

const ConnectButton = styled.button`
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  font-size: ${props => props.theme.fontSize.md};
  font-weight: ${props => props.theme.fontWeight.medium};
  cursor: pointer;
  margin-top: ${props => props.theme.spacing.md};
  
  &:hover {
    background-color: ${props => props.theme.primaryHover};
  }
`;

const CasinoPage = () => {
  const [activeGame, setActiveGame] = useState('slots');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  
  useEffect(() => {
    // Check if wallet is already connected
    if (solanaWalletService.isConnected) {
      setIsWalletConnected(true);
    }
  }, []);
  
  const handleConnectWallet = async () => {
    const result = await solanaWalletService.connectWallet('atomic');
    if (result.success) {
      setIsWalletConnected(true);
    }
  };
  
  const renderGame = () => {
    if (!isWalletConnected) {
      return (
        <WalletWarning>
          <h3>Wallet Connection Required</h3>
          <p>You need to connect your Solana wallet to play casino games.</p>
          <ConnectButton onClick={handleConnectWallet}>
            Connect Wallet
          </ConnectButton>
        </WalletWarning>
      );
    }
    
    switch (activeGame) {
      case 'slots':
        return <SlotsGame />;
      case 'blackjack':
        return <BlackjackGame />;
      case 'poker':
        return <PokerGame />;
      default:
        return <SlotsGame />;
    }
  };
  
  return (
    <CasinoContainer>
      <CasinoPageTitle>Solana Casino</CasinoPageTitle>
      
      <GameSelector>
        <GameButton 
          active={activeGame === 'slots'} 
          onClick={() => setActiveGame('slots')}
        >
          Slots
        </GameButton>
        <GameButton 
          active={activeGame === 'blackjack'} 
          onClick={() => setActiveGame('blackjack')}
        >
          Blackjack
        </GameButton>
        <GameButton 
          active={activeGame === 'poker'} 
          onClick={() => setActiveGame('poker')}
        >
          Poker
        </GameButton>
      </GameSelector>
      
      {renderGame()}
    </CasinoContainer>
  );
};

export default CasinoPage;
