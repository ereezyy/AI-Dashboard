import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import casinoService from './CasinoService';

const SlotsContainer = styled.div`
  background-color: ${props => props.theme.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadowLight};
`;

const SlotsTitle = styled.h3`
  font-size: ${props => props.theme.fontSize.lg};
  font-weight: ${props => props.theme.fontWeight.semiBold};
  margin-bottom: ${props => props.theme.spacing.md};
  text-align: center;
`;

const SlotsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const BalanceDisplay = styled.div`
  background: ${props => props.theme.gradientPrimary};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  color: white;
  font-weight: ${props => props.theme.fontWeight.medium};
`;

const JackpotDisplay = styled.div`
  background: ${props => props.theme.gradientCasino};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  color: white;
  font-weight: ${props => props.theme.fontWeight.medium};
`;

const SlotsGame = styled.div`
  background-color: ${props => props.theme.backgroundSecondary};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReelsContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.backgroundTertiary};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
`;

const Reel = styled.div`
  width: 100px;
  height: 120px;
  background-color: ${props => props.theme.backgroundSecondary};
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const ReelContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.5s cubic-bezier(0.45, 0.05, 0.55, 0.95);
  transform: translateY(${props => props.offset}px);
`;

const ReelSymbol = styled.div`
  width: 100px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
`;

const BetControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const BetLabel = styled.div`
  font-weight: ${props => props.theme.fontWeight.medium};
`;

const BetAmount = styled.div`
  background-color: ${props => props.theme.backgroundTertiary};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  min-width: 80px;
  text-align: center;
`;

const BetButton = styled.button`
  background-color: transparent;
  color: ${props => props.theme.textSecondary};
  border: 1px solid ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius.md};
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSize.md};
  cursor: pointer;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: ${props => props.theme.text};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SpinButton = styled.button`
  background-color: ${props => props.theme.accent1};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  font-size: ${props => props.theme.fontSize.lg};
  font-weight: ${props => props.theme.fontWeight.semiBold};
  cursor: pointer;
  transition: background-color ${props => props.theme.transitionSpeed} ease;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    background-color: ${props => props.theme.backgroundTertiary};
    color: ${props => props.theme.textSecondary};
    cursor: not-allowed;
  }
`;

const WinDisplay = styled.div`
  font-size: ${props => props.theme.fontSize.xl};
  font-weight: ${props => props.theme.fontWeight.bold};
  color: ${props => props.theme.success};
  margin-top: ${props => props.theme.spacing.lg};
  text-align: center;
  height: 40px;
`;

const PayTable = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.backgroundSecondary};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
`;

const PayTableTitle = styled.h4`
  font-size: ${props => props.theme.fontSize.md};
  font-weight: ${props => props.theme.fontWeight.semiBold};
  margin-bottom: ${props => props.theme.spacing.md};
  text-align: center;
`;

const PayTableRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.sm} 0;
  border-bottom: 1px solid ${props => props.theme.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const PayTableSymbols = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const PayTableMultiplier = styled.div`
  font-weight: ${props => props.theme.fontWeight.medium};
  color: ${props => props.theme.accent1};
`;

const StatusMessage = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-top: ${props => props.theme.spacing.md};
  text-align: center;
  background-color: ${props => 
    props.type === 'success' ? 'rgba(76, 175, 80, 0.1)' : 
    props.type === 'error' ? 'rgba(244, 67, 54, 0.1)' : 
    'rgba(33, 150, 243, 0.1)'};
  color: ${props => 
    props.type === 'success' ? props.theme.success : 
    props.type === 'error' ? props.theme.error : 
    props.theme.info};
`;

const SlotsGame = () => {
  const [balance, setBalance] = useState(0);
  const [jackpot, setJackpot] = useState(25.5);
  const [bet, setBet] = useState(0.5);
  const [isSpinning, setIsSpinning] = useState(false);
  const [reelPositions, setReelPositions] = useState([0, 0, 0]);
  const [symbols, setSymbols] = useState([[], [], []]);
  const [winAmount, setWinAmount] = useState(0);
  const [status, setStatus] = useState(null);
  
  const allSymbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎', '7️⃣', '🚀'];
  const symbolValues = {
    '🍒': 2,
    '🍋': 3,
    '🍊': 4,
    '🍇': 5,
    '🔔': 10,
    '💎': 15,
    '7️⃣': 20,
    '🚀': 50
  };
  
  // Initialize reels
  useEffect(() => {
    const initReels = () => {
      const newSymbols = [[], [], []];
      
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 20; j++) {
          const randomIndex = Math.floor(Math.random() * allSymbols.length);
          newSymbols[i].push(allSymbols[randomIndex]);
        }
      }
      
      setSymbols(newSymbols);
    };
    
    initReels();
    fetchBalance();
  }, []);
  
  const fetchBalance = async () => {
    const result = await casinoService.getBalance();
    if (result.success) {
      setBalance(result.balance);
    }
  };
  
  const handleIncreaseBet = () => {
    const newBet = Math.min(bet + 0.1, 10);
    setBet(parseFloat(newBet.toFixed(1)));
  };
  
  const handleDecreaseBet = () => {
    const newBet = Math.max(bet - 0.1, 0.1);
    setBet(parseFloat(newBet.toFixed(1)));
  };
  
  const handleSpin = async () => {
    if (isSpinning || bet > balance) return;
    
    // Place bet
    const betResult = await casinoService.placeBet('slots', bet);
    if (!betResult.success) {
      setStatus({
        type: 'error',
        message: betResult.error
      });
      return;
    }
    
    setBalance(betResult.remainingBalance);
    setIsSpinning(true);
    setWinAmount(0);
    setStatus(null);
    
    // Spin animation
    const newPositions = [0, 0, 0];
    const finalSymbols = [0, 0, 0];
    
    // Determine outcome (random for demo)
    const win = Math.random() < 0.3; // 30% win rate
    
    if (win) {
      // For a win, make at least 2 symbols the same
      const winSymbolIndex = Math.floor(Math.random() * allSymbols.length);
      const winSymbol = allSymbols[winSymbolIndex];
      
      // Decide if it's a 2-symbol or 3-symbol win
      const isJackpot = Math.random() < 0.1; // 10% chance for 3 of a kind
      
      if (isJackpot) {
        finalSymbols[0] = winSymbolIndex;
        finalSymbols[1] = winSymbolIndex;
        finalSymbols[2] = winSymbolIndex;
      } else {
        // 2 of a kind
        const matchingPositions = [0, 1, 2];
        const nonMatchingPosition = matchingPositions.splice(Math.floor(Math.random() * 3), 1)[0];
        
        finalSymbols[matchingPositions[0]] = winSymbolIndex;
        finalSymbols[matchingPositions[1]] = winSymbolIndex;
        finalSymbols[nonMatchingPosition] = Math.floor(Math.random() * allSymbols.length);
        
        // Make sure the non-matching symbol is different
        while (finalSymbols[nonMatchingPosition] === winSymbolIndex) {
          finalSymbols[nonMatchingPosition] = Math.floor(Math.random() * allSymbols.length);
        }
      }
    } else {
      // For a loss, make all symbols different
      finalSymbols[0] = Math.floor(Math.random() * allSymbols.length);
      
      do {
        finalSymbols[1] = Math.floor(Math.random() * allSymbols.length);
      } while (finalSymbols[1] === finalSymbols[0]);
      
      do {
        finalSymbols[2] = Math.floor(Math.random() * allSymbols.length);
      } while (finalSymbols[2] === finalSymbols[0] || finalSymbols[2] === finalSymbols[1]);
    }
    
    // Calculate final positions
    for (let i = 0; i < 3; i++) {
      // Random number of full rotations plus the final position
      const rotations = 3 + Math.floor(Math.random() * 3); // 3-5 full rotations
      const symbolHeight = 120;
      const totalSymbols = symbols[i].length;
      
      // Position the reel to show the final symbol
      newPositions[i] = -(rotations * totalSymbols * symbolHeight + finalSymbols[i] * symbolHeight);
    }
    
    // Update positions with a delay between reels
    setReelPositions([newPositions[0], 0, 0]);
    
    setTimeout(() => {
      setReelPositions([newPositions[0], newPositions[1], 0]);
    }, 500);
    
    setTimeout(() => {
      setReelPositions(newPositions);
    }, 1000);
    
    // Check for wins after animation
    setTimeout(() => {
      setIsSpinning(false);
      
      // Get the visible symbols
      const visibleSymbols = [
        allSymbols[finalSymbols[0]],
        allSymbols[finalSymbols[1]],
        allSymbols[finalSymbols[2]]
      ];
      
      // Check for wins
      const symbolCounts = {};
      visibleSymbols.forEach(symbol => {
        symbolCounts[symbol] = (symbolCounts[symbol] || 0) + 1;
      });
      
      let winMultiplier = 0;
      let winningSymbol = '';
      
      Object.entries(symbolCounts).forEach(([symbol, count]) => {
        if (count >= 2) {
          const multiplier = symbolValues[symbol] * (count === 3 ? 5 : 1);
          if (multiplier > winMultiplier) {
            winMultiplier = multiplier;
            winningSymbol = symbol;
          }
        }
      });
      
      if (winMultiplier > 0) {
        const amount = bet * winMultiplier;
        setWinAmount(amount);
        
        // Add winnings to balance
        casinoService.claimWinnings('bet', amount).then(result => {
          if (result.success) {
            setBalance(result.newBalance);
            setStatus({
              type: 'success',
              message: `You won ${amount.toFixed(2)} SOL!`
            });
          }
        });
      }
    }, 2500);
  };
  
  return (
    <SlotsContainer>
      <SlotsTitle>Solana Slots</SlotsTitle>
      
      <SlotsHeader>
        <BalanceDisplay>Balance: {balance.toFixed(2)} SOL</BalanceDisplay>
        <JackpotDisplay>Jackpot: {jackpot.toFixed(2)} SOL</JackpotDisplay>
      </SlotsHeader>
      
      <SlotsGame>
        <ReelsContainer>
          {[0, 1, 2].map((reel, index) => (
            <Reel key={index}>
              <ReelContent offset={reelPositions[index]}>
                {symbols[index].map((symbol, symbolIndex) => (
                  <ReelSymbol key={symbolIndex}>{symbol}</ReelSymbol>
                ))}
              </ReelContent>
            </Reel>
          ))}
        </ReelsContainer>
        
        <BetControls>
          <BetLabel>Bet:</BetLabel>
          <BetButton onClick={handleDecreaseBet} disabled={bet <= 0.1 || isSpinning}>-</BetButton>
          <BetAmount>{bet.toFixed(1)} SOL</BetAmount>
          <BetButton onClick={handleIncreaseBet} disabled={bet >= 10 || isSpinning}>+</BetButton>
        </BetControls>
        
        <SpinButton 
          onClick={handleSpin} 
          disabled={isSpinning || bet > balance}
        >
          {isSpinning ? 'Spinning...' : 'SPIN'}
        </SpinButton>
        
        {winAmount > 0 && (
          <WinDisplay>Win: {winAmount.toFixed(2)} SOL!</WinDisplay>
        )}
        
        {status && (
          <StatusMessage type={status.type}>
            {status.message}
          </StatusMessage>
        )}
      </SlotsGame>
      
      <PayTable>
        <PayTableTitle>Pay Table</PayTableTitle>
        <PayTableRow>
          <PayTableSymbols>🚀 🚀 🚀</PayTableSymbols>
          <PayTableMultiplier>x250</PayTableMultiplier>
        </PayTableRow>
        <PayTableRow>
          <PayTableSymbols>7️⃣ 7️⃣ 7️⃣</PayTableSymbols>
          <PayTableMultiplier>x100</PayTableMultiplier>
        </PayTableRow>
        <PayTableRow>
          <PayTableSymbols>💎 💎 💎</PayTableSymbols>
          <PayTableMultiplier>x75</PayTableMultiplier>
        </PayTableRow>
        <PayTableRow>
          <PayTableSymbols>🔔 🔔 🔔</PayTableSymbols>
          <PayTableMultiplier>x50</PayTableMultiplier>
        </PayTableRow>
        <PayTableRow>
          <PayTableSymbols>Any 2 matching</PayTableSymbols>
          <PayTableMultiplier>x Symbol Value</PayTableMultiplier>
        </PayTableRow>
      </PayTable>
    </SlotsContainer>
  );
};

export default SlotsGame;
