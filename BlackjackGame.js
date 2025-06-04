import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import casinoService from './CasinoService';

const BlackjackContainer = styled.div`
  background-color: ${props => props.theme.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadowLight};
`;

const BlackjackTitle = styled.h3`
  font-size: ${props => props.theme.fontSize.lg};
  font-weight: ${props => props.theme.fontWeight.semiBold};
  margin-bottom: ${props => props.theme.spacing.md};
  text-align: center;
`;

const BlackjackHeader = styled.div`
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

const GameTable = styled.div`
  background-color: #0a5c36; /* Classic blackjack table color */
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
  position: relative;
`;

const DealerArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  padding-bottom: ${props => props.theme.spacing.lg};
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
`;

const PlayerArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HandLabel = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-weight: ${props => props.theme.fontWeight.medium};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const HandValue = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-weight: ${props => props.theme.fontWeight.semiBold};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CardsContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  flex-wrap: wrap;
  justify-content: center;
  min-height: 120px;
`;

const Card = styled.div`
  width: 80px;
  height: 120px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  position: relative;
  font-family: 'Arial', sans-serif;
  color: ${props => props.isRed ? '#D40000' : '#000000'};
  animation: ${props => props.isNew ? 'dealCard 0.3s ease-out' : 'none'};
  
  @keyframes dealCard {
    from {
      transform: translateY(-50px) rotate(-10deg);
      opacity: 0;
    }
    to {
      transform: translateY(0) rotate(0);
      opacity: 1;
    }
  }
`;

const CardCorner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isBottom ? 'flex-end' : 'flex-start'};
  transform: ${props => props.isBottom ? 'rotate(180deg)' : 'none'};
`;

const CardValue = styled.div`
  font-size: 18px;
  font-weight: bold;
  line-height: 1;
`;

const CardSuit = styled.div`
  font-size: 16px;
  line-height: 1;
`;

const CardCenter = styled.div`
  font-size: 32px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const HiddenCard = styled.div`
  width: 80px;
  height: 120px;
  background: linear-gradient(135deg, #6e45e2 0%, #88d3ce 100%);
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
`;

const GameControls = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

const ActionButton = styled.button`
  background-color: ${props => props.primary ? props.theme.primary : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  font-size: ${props => props.theme.fontSize.md};
  font-weight: ${props => props.theme.fontWeight.medium};
  cursor: pointer;
  transition: all ${props => props.theme.transitionSpeed} ease;
  
  &:hover {
    background-color: ${props => props.primary ? props.theme.primaryHover : 'rgba(255, 255, 255, 0.2)'};
  }
  
  &:disabled {
    background-color: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.3);
    cursor: not-allowed;
  }
`;

const BetControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const BetLabel = styled.div`
  font-weight: ${props => props.theme.fontWeight.medium};
  color: white;
`;

const BetAmount = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  min-width: 80px;
  text-align: center;
  color: white;
`;

const BetButton = styled.button`
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${props => props.theme.borderRadius.md};
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSize.md};
  cursor: pointer;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const GameMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSize.lg};
  font-weight: ${props => props.theme.fontWeight.semiBold};
  text-align: center;
  z-index: 10;
  min-width: 200px;
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

const BlackjackGame = () => {
  const [balance, setBalance] = useState(0);
  const [bet, setBet] = useState(1);
  const [gameState, setGameState] = useState('betting'); // betting, playing, dealerTurn, gameOver
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerValue, setPlayerValue] = useState(0);
  const [dealerValue, setDealerValue] = useState(0);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);
  const [showDealerCard, setShowDealerCard] = useState(false);
  const [newCardIndex, setNewCardIndex] = useState(-1);
  
  const suits = ['♠', '♥', '♦', '♣'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  
  useEffect(() => {
    fetchBalance();
  }, []);
  
  const fetchBalance = async () => {
    const result = await casinoService.getBalance();
    if (result.success) {
      setBalance(result.balance);
    }
  };
  
  const handleIncreaseBet = () => {
    const newBet = Math.min(bet + 0.5, 20);
    setBet(parseFloat(newBet.toFixed(1)));
  };
  
  const handleDecreaseBet = () => {
    const newBet = Math.max(bet - 0.5, 0.5);
    setBet(parseFloat(newBet.toFixed(1)));
  };
  
  const createDeck = () => {
    const deck = [];
    for (const suit of suits) {
      for (const value of values) {
        deck.push({ suit, value });
      }
    }
    return shuffleDeck(deck);
  };
  
  const shuffleDeck = (deck) => {
    const newDeck = [...deck];
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
    return newDeck;
  };
  
  const getCardValue = (card) => {
    if (['J', 'Q', 'K'].includes(card.value)) return 10;
    if (card.value === 'A') return 11;
    return parseInt(card.value);
  };
  
  const calculateHandValue = (hand) => {
    let value = 0;
    let aces = 0;
    
    for (const card of hand) {
      if (card.value === 'A') {
        aces++;
        value += 11;
      } else {
        value += getCardValue(card);
      }
    }
    
    // Adjust for aces
    while (value > 21 && aces > 0) {
      value -= 10;
      aces--;
    }
    
    return value;
  };
  
  const isRedSuit = (suit) => {
    return suit === '♥' || suit === '♦';
  };
  
  const dealCard = (hand) => {
    const deck = createDeck();
    const card = deck[0];
    return [...hand, card];
  };
  
  const handleDeal = async () => {
    if (bet > balance) {
      setStatus({
        type: 'error',
        message: 'Insufficient balance'
      });
      return;
    }
    
    // Place bet
    const betResult = await casinoService.placeBet('blackjack', bet);
    if (!betResult.success) {
      setStatus({
        type: 'error',
        message: betResult.error
      });
      return;
    }
    
    setBalance(betResult.remainingBalance);
    setStatus(null);
    setMessage('');
    setShowDealerCard(false);
    
    // Deal initial cards
    const newPlayerHand = [];
    const newDealerHand = [];
    
    // Deal first card to player
    const playerCard1 = dealCard([]);
    setPlayerHand(playerCard1);
    setNewCardIndex(0);
    
    setTimeout(() => {
      // Deal first card to dealer
      const dealerCard1 = dealCard([]);
      setDealerHand(dealerCard1);
      setNewCardIndex(0);
      
      setTimeout(() => {
        // Deal second card to player
        const playerCard2 = dealCard(playerCard1);
        setPlayerHand(playerCard2);
        setNewCardIndex(1);
        
        setTimeout(() => {
          // Deal second card to dealer
          const dealerCard2 = dealCard(dealerCard1);
          setDealerHand(dealerCard2);
          setNewCardIndex(1);
          
          // Calculate initial values
          const pValue = calculateHandValue(playerCard2);
          const dValue = calculateHandValue(dealerCard1); // Only count visible card
          
          setPlayerValue(pValue);
          setDealerValue(dValue);
          
          // Check for blackjack
          if (pValue === 21) {
            if (calculateHandValue(dealerCard2) === 21) {
              // Both have blackjack - push
              handleGameOver('push');
            } else {
              // Player has blackjack
              handleGameOver('blackjack');
            }
          } else {
            setGameState('playing');
          }
        }, 300);
      }, 300);
    }, 300);
  };
  
  const handleHit = () => {
    const newHand = dealCard(playerHand);
    setPlayerHand(newHand);
    setNewCardIndex(newHand.length - 1);
    
    const newValue = calculateHandValue(newHand);
    setPlayerValue(newValue);
    
    if (newValue > 21) {
      // Bust
      handleGameOver('bust');
    } else if (newValue === 21) {
      // Automatically stand on 21
      handleStand();
    }
  };
  
  const handleStand = () => {
    setGameState('dealerTurn');
    setShowDealerCard(true);
    
    // Calculate dealer's actual value
    const actualDealerValue = calculateHandValue(dealerHand);
    setDealerValue(actualDealerValue);
    
    // Dealer draws until 17 or higher
    setTimeout(() => {
      dealerDraw(dealerHand, actualDealerValue);
    }, 1000);
  };
  
  const dealerDraw = (currentHand, currentValue) => {
    if (currentValue >= 17) {
      // Dealer stands
      determineWinner(playerValue, currentValue);
      return;
    }
    
    // Dealer hits
    const newHand = dealCard(currentHand);
    setDealerHand(newHand);
    setNewCardIndex(newHand.length - 1);
    
    const newValue = calculateHandValue(newHand);
    setDealerValue(newValue);
    
    // Continue drawing after a delay
    setTimeout(() => {
      dealerDraw(newHand, newValue);
    }, 1000);
  };
  
  const determineWinner = (playerVal, dealerVal) => {
    if (dealerVal > 21) {
      // Dealer busts
      handleGameOver('win');
    } else if (playerVal > dealerVal) {
      // Player wins
      handleGameOver('win');
    } else if (playerVal < dealerVal) {
      // Dealer wins
      handleGameOver('lose');
    } else {
      // Push (tie)
      handleGameOver('push');
    }
  };
  
  const handleGameOver = (result) => {
    setGameState('gameOver');
    setShowDealerCard(true);
    
    // Calculate dealer's actual value if not already shown
    if (!showDealerCard) {
      const actualDealerValue = calculateHandValue(dealerHand);
      setDealerValue(actualDealerValue);
    }
    
    let winAmount = 0;
    
    switch (result) {
      case 'blackjack':
        winAmount = bet * 2.5;
        setMessage('Blackjack! You win!');
        break;
      case 'win':
        winAmount = bet * 2;
        setMessage('You win!');
        break;
      case 'lose':
        setMessage('Dealer wins');
        break;
      case 'bust':
        setMessage('Bust! You lose');
        break;
      case 'push':
        winAmount = bet;
        setMessage('Push - Bet returned');
        break;
    }
    
    if (winAmount > 0) {
      // Add winnings to balance
      casinoService.claimWinnings('bet', winAmount).then(result => {
        if (result.success) {
          setBalance(result.newBalance);
          setStatus({
            type: 'success',
            message: `You won ${(winAmount - (result === 'push' ? bet : 0)).toFixed(2)} SOL!`
          });
        }
      });
    }
  };
  
  const handleNewGame = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setPlayerValue(0);
    setDealerValue(0);
    setGameState('betting');
    setMessage('');
    setStatus(null);
    setShowDealerCard(false);
    setNewCardIndex(-1);
  };
  
  const renderCard = (card, index, isDealer = false) => {
    if (isDealer && index === 1 && !showDealerCard) {
      return <HiddenCard key={index}>?</HiddenCard>;
    }
    
    const isRed = isRedSuit(card.suit);
    const isNewCard = index === newCardIndex;
    
    return (
      <Card key={index} isRed={isRed} isNew={isNewCard}>
        <CardCorner>
          <CardValue>{card.value}</CardValue>
          <CardSuit>{card.suit}</CardSuit>
        </CardCorner>
        <CardCenter>{card.suit}</CardCenter>
        <CardCorner isBottom>
          <CardValue>{card.value}</CardValue>
          <CardSuit>{card.suit}</CardSuit>
        </CardCorner>
      </Card>
    );
  };
  
  return (
    <BlackjackContainer>
      <BlackjackTitle>Blackjack 21</BlackjackTitle>
      
      <BlackjackHeader>
        <BalanceDisplay>Balance: {balance.toFixed(2)} SOL</BalanceDisplay>
      </BlackjackHeader>
      
      <GameTable>
        <DealerArea>
          <HandLabel>Dealer</HandLabel>
          {gameState !== 'betting' && (
            <HandValue>{dealerValue}</HandValue>
          )}
          <CardsContainer>
            {dealerHand.map((card, index) => renderCard(card, index, true))}
          </CardsContainer>
        </DealerArea>
        
        <PlayerArea>
          <HandLabel>Your Hand</HandLabel>
          
          {gameState !== 'betting' && (
            <HandValue>{playerValue}</HandValue>
          )}
          <CardsContainer>
            {playerHand.map((card, index) => renderCard(card, index, false))}
          </CardsContainer>
          
          {message && <GameMessage type={message.type}>{message.text}</GameMessage>}

          {gameState === 'betting' && (
            <BettingControls>
              <BetInput 
                type="number" 
                value={betAmount}
                onChange={(e) => setBetAmount(Math.max(0, parseFloat(e.target.value)))}
                min="0"
                step="0.01"
              />
              <ActionButton onClick={handleDeal}>Deal</ActionButton>
            </BettingControls>
          )}
          
          {gameState === 'playerTurn' && (
            <ActionControls>
              <ActionButton onClick={handleHit}>Hit</ActionButton>
              <ActionButton onClick={handleStand}>Stand</ActionButton>
              {playerHand.length === 2 && balance >= betAmount && (
                <ActionButton onClick={handleDoubleDown}>Double Down</ActionButton>
              )}
            </ActionControls>
          )}
          
          {(gameState === 'dealerTurn' || gameState === 'gameOver') && message && (
            <ActionButton onClick={handleNewGame}>New Game</ActionButton>
          )}
          
        </PlayerArea>
      </GameTable>
    </BlackjackContainer>
  );