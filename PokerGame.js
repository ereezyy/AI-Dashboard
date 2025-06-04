import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import casinoService from './CasinoService';

const PokerContainer = styled.div`
  background-color: ${props => props.theme.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadowLight};
`;

const PokerTitle = styled.h3`
  font-size: ${props => props.theme.fontSize.lg};
  font-weight: ${props => props.theme.fontWeight.semiBold};
  margin-bottom: ${props => props.theme.spacing.md};
  text-align: center;
`;

const PokerHeader = styled.div`
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
  background-color: #0a5c36; /* Classic poker table color */
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
  position: relative;
`;

const CommunityCardsArea = styled.div`
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

const AreaLabel = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-weight: ${props => props.theme.fontWeight.medium};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const PotDisplay = styled.div`
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

const CardPlaceholder = styled.div`
  width: 80px;
  height: 120px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  border: 1px dashed rgba(255, 255, 255, 0.3);
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

const HandRanking = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-weight: ${props => props.theme.fontWeight.semiBold};
  margin-top: ${props => props.theme.spacing.md};
  text-align: center;
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

const PokerGame = () => {
  const [balance, setBalance] = useState(0);
  const [bet, setBet] = useState(1);
  const [gameState, setGameState] = useState('betting'); // betting, preFlop, flop, turn, river, showdown
  const [playerHand, setPlayerHand] = useState([]);
  const [communityCards, setCommunityCards] = useState([]);
  const [pot, setPot] = useState(0);
  const [handRanking, setHandRanking] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);
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
    const newBet = Math.min(bet + 0.5, 10);
    setBet(parseFloat(newBet.toFixed(1)));
  };
  
  const handleDecreaseBet = () => {
    const newBet = Math.max(bet - 0.5, 1);
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
  
  const isRedSuit = (suit) => {
    return suit === '♥' || suit === '♦';
  };
  
  const dealCards = (count, existingCards = []) => {
    const deck = createDeck();
    // Remove existing cards from the deck
    const filteredDeck = deck.filter(card => 
      !existingCards.some(existingCard => 
        existingCard.suit === card.suit && existingCard.value === card.value
      )
    );
    
    return filteredDeck.slice(0, count);
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
    const betResult = await casinoService.placeBet('poker', bet);
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
    setPot(bet * 2); // Player bet + dealer match
    
    // Deal player cards
    const playerCards = dealCards(2);
    setPlayerHand(playerCards);
    setNewCardIndex(0);
    
    setTimeout(() => {
      setNewCardIndex(1);
      setGameState('preFlop');
    }, 300);
  };
  
  const handleFold = () => {
    setMessage('You folded. Dealer wins.');
    setGameState('showdown');
  };
  
  const handleCheck = () => {
    advanceGame();
  };
  
  const handleRaise = async () => {
    if (bet > balance) {
      setStatus({
        type: 'error',
        message: 'Insufficient balance'
      });
      return;
    }
    
    // Place additional bet
    const betResult = await casinoService.placeBet('poker', bet);
    if (!betResult.success) {
      setStatus({
        type: 'error',
        message: betResult.error
      });
      return;
    }
    
    setBalance(betResult.remainingBalance);
    setPot(pot + bet * 2); // Player bet + dealer match
    
    advanceGame();
  };
  
  const advanceGame = () => {
    switch (gameState) {
      case 'preFlop':
        // Deal flop (3 community cards)
        const flopCards = dealCards(3, [...playerHand]);
        setCommunityCards(flopCards);
        setNewCardIndex(0);
        
        setTimeout(() => {
          setNewCardIndex(1);
          setTimeout(() => {
            setNewCardIndex(2);
            setGameState('flop');
            evaluateHand([...playerHand, ...flopCards]);
          }, 300);
        }, 300);
        break;
        
      case 'flop':
        // Deal turn (1 more community card)
        const turnCard = dealCards(1, [...playerHand, ...communityCards]);
        setCommunityCards([...communityCards, ...turnCard]);
        setNewCardIndex(3);
        setGameState('turn');
        evaluateHand([...playerHand, ...communityCards, ...turnCard]);
        break;
        
      case 'turn':
        // Deal river (1 more community card)
        const riverCard = dealCards(1, [...playerHand, ...communityCards]);
        setCommunityCards([...communityCards, ...riverCard]);
        setNewCardIndex(4);
        setGameState('river');
        evaluateHand([...playerHand, ...communityCards, ...riverCard]);
        break;
        
      case 'river':
        // Go to showdown
        determineWinner();
        setGameState('showdown');
        break;
    }
  };
  
  const evaluateHand = (cards) => {
    // This is a simplified hand evaluation
    // In a real poker game, this would be much more complex
    
    // Count by value
    const valueCounts = {};
    cards.forEach(card => {
      valueCounts[card.value] = (valueCounts[card.value] || 0) + 1;
    });
    
    // Count by suit
    const suitCounts = {};
    cards.forEach(card => {
      suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
    });
    
    // Check for pairs, three of a kind, etc.
    const pairs = Object.values(valueCounts).filter(count => count === 2).length;
    const threeOfAKind = Object.values(valueCounts).some(count => count === 3);
    const fourOfAKind = Object.values(valueCounts).some(count => count === 4);
    const flush = Object.values(suitCounts).some(count => count >= 5);
    
    // Determine hand ranking
    if (fourOfAKind) {
      setHandRanking('Four of a Kind');
    } else if (threeOfAKind && pairs > 0) {
      setHandRanking('Full House');
    } else if (flush) {
      setHandRanking('Flush');
    } else if (threeOfAKind) {
      setHandRanking('Three of a Kind');
    } else if (pairs === 2) {
      setHandRanking('Two Pair');
    } else if (pairs === 1) {
      setHandRanking('Pair');
    } else {
      setHandRanking('High Card');
    }
  };
  
  const determineWinner = () => {
    // In a real game, this would compare player's hand with dealer's hand
    // For this demo, we'll use a simplified approach
    
    // Dealer has a 40% chance to win
    const dealerWins = Math.random() < 0.4;
    
    if (dealerWins) {
      setMessage('Dealer wins with a better hand.');
    } else {
      // Player wins
      const winAmount = pot;
      setMessage(`You win ${winAmount.toFixed(2)} SOL!`);
      
      // Add winnings to balance
      casinoService.claimWinnings('bet', winAmount).then(result => {
        if (result.success) {
          setBalance(result.newBalance);
          setStatus({
            type: 'success',
            message: `You won ${winAmount.toFixed(2)} SOL!`
          });
        }
      });
    }
  };
  
  const handleNewGame = () => {
    setPlayerHand([]);
    setCommunityCards([]);
    setPot(0);
    setHandRanking('');
    setGameState('betting');
    setMessage('');
    setStatus(null);
    setNewCardIndex(-1);
  };
  
  const renderCard = (card, index) => {
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
  
  const renderCommunityCards = () => {
    if (gameState === 'betting' || gameState === 'preFlop') {
      return (
        <CardsContainer>
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
        </CardsContainer>
      );
    }
    
    const visibleCards = communityCards.slice(0, 
      gameState === 'flop' ? 3 : 
      gameState === 'turn' ? 4 : 5
    );
    
    return (
      <CardsContainer>
        {visibleCards.map((card, index) => renderCard(card, index))}
        {Array(5 - visibleCards.length).fill().map((_, i) => (
          <CardPlaceholder key={`placeholder-${i}`} />
        ))}
      </CardsContainer>
    );
  };
  
  return (
    <PokerContainer>
      <PokerTitle>Crypto Poker</PokerTitle>
      
      <PokerHeader>
        <BalanceDisplay>Balance: {balance.toFixed(2)} SOL</BalanceDisplay>
    
(Content truncated due to size limit. Use line ranges to read in chunks)