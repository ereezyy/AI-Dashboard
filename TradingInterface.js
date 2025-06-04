import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import solanaWalletService from './SolanaWalletService';

const TradingContainer = styled.div`
  background-color: ${props => props.theme.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadowLight};
`;

const TradingTitle = styled.h3`
  font-size: ${props => props.theme.fontSize.lg};
  font-weight: ${props => props.theme.fontWeight.semiBold};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const TradingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartContainer = styled.div`
  background-color: ${props => props.theme.backgroundSecondary};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  height: 300px;
  display: flex;
  flex-direction: column;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const PairSelector = styled.select`
  background-color: ${props => props.theme.backgroundTertiary};
  border: 1px solid ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.text};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSize.sm};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
`;

const TimeframeSelector = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const TimeframeButton = styled.button`
  background-color: ${props => props.active ? props.theme.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.textSecondary};
  border: 1px solid ${props => props.active ? props.theme.primary : props.theme.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSize.xs};
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.active ? props.theme.primaryHover : 'rgba(255, 255, 255, 0.05)'};
  }
`;

const ChartPlaceholder = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.backgroundTertiary};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.textSecondary};
  font-size: ${props => props.theme.fontSize.lg};
`;

const OrderFormContainer = styled.div`
  background-color: ${props => props.theme.backgroundSecondary};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.border};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Tab = styled.button`
  background-color: transparent;
  border: none;
  color: ${props => props.active ? props.theme.primary : props.theme.textSecondary};
  font-size: ${props => props.theme.fontSize.md};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  cursor: pointer;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${props => props.active ? props.theme.primary : 'transparent'};
  }
  
  &:hover {
    color: ${props => props.theme.text};
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.spacing.sm};
  font-weight: ${props => props.theme.fontWeight.medium};
`;

const Input = styled.input`
  width: 100%;
  background-color: ${props => props.theme.backgroundTertiary};
  border: 1px solid ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.text};
  padding: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSize.md};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
`;

const RangeSlider = styled.input`
  width: 100%;
  margin: ${props => props.theme.spacing.md} 0;
  -webkit-appearance: none;
  background: ${props => props.theme.backgroundTertiary};
  height: 6px;
  border-radius: 3px;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props => props.theme.primary};
    cursor: pointer;
  }
`;

const SliderLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${props => props.theme.fontSize.xs};
  color: ${props => props.theme.textSecondary};
`;

const OrderButton = styled.button`
  width: 100%;
  background-color: ${props => props.buy ? props.theme.success : props.theme.error};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSize.md};
  font-weight: ${props => props.theme.fontWeight.medium};
  cursor: pointer;
  transition: background-color ${props => props.theme.transitionSpeed} ease;
  margin-top: ${props => props.theme.spacing.md};
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    background-color: ${props => props.theme.backgroundTertiary};
    color: ${props => props.theme.textSecondary};
    cursor: not-allowed;
  }
`;

const OrderSummary = styled.div`
  background-color: ${props => props.theme.backgroundTertiary};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSize.sm};
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
    padding-top: ${props => props.theme.spacing.sm};
    border-top: 1px solid ${props => props.theme.border};
    font-weight: ${props => props.theme.fontWeight.medium};
  }
`;

const MarketData = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

const DataCard = styled.div`
  background-color: ${props => props.theme.backgroundSecondary};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  text-align: center;
`;

const DataLabel = styled.div`
  font-size: ${props => props.theme.fontSize.sm};
  color: ${props => props.theme.textSecondary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const DataValue = styled.div`
  font-size: ${props => props.theme.fontSize.lg};
  font-weight: ${props => props.theme.fontWeight.semiBold};
  color: ${props => 
    props.positive ? props.theme.success : 
    props.negative ? props.theme.error : 
    props.theme.text};
`;

const TradingInterface = () => {
  const [tradingPair, setTradingPair] = useState('SOL/USDC');
  const [timeframe, setTimeframe] = useState('1h');
  const [orderType, setOrderType] = useState('market');
  const [side, setSide] = useState('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [sliderValue, setSliderValue] = useState(50);
  
  // Mock market data
  const [marketData, setMarketData] = useState({
    price: 103.45,
    change24h: 5.2,
    high24h: 105.78,
    low24h: 98.23,
    volume24h: 1245789
  });
  
  // Update price based on mock data
  useEffect(() => {
    setPrice(marketData.price.toFixed(2));
  }, [marketData]);
  
  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 2;
      setMarketData(prev => {
        const newPrice = prev.price + change;
        return {
          ...prev,
          price: newPrice,
          change24h: prev.change24h + change * 0.1,
          high24h: Math.max(prev.high24h, newPrice),
          low24h: Math.min(prev.low24h, newPrice)
        };
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
    // In a real app, this would calculate the amount based on available balance
  };
  
  const handleSubmitOrder = () => {
    // In a real app, this would submit the order to an exchange API
    alert(`Order submitted: ${side} ${amount} SOL at ${price} USDC`);
  };
  
  return (
    <TradingContainer>
      <TradingTitle>Trading</TradingTitle>
      
      <TradingGrid>
        <ChartContainer>
          <ChartHeader>
            <PairSelector 
              value={tradingPair}
              onChange={(e) => setTradingPair(e.target.value)}
            >
              <option value="SOL/USDC">SOL/USDC</option>
              <option value="SOL/USDT">SOL/USDT</option>
              <option value="SOL/BTC">SOL/BTC</option>
            </PairSelector>
            
            <TimeframeSelector>
              <TimeframeButton 
                active={timeframe === '15m'}
                onClick={() => setTimeframe('15m')}
              >
                15m
              </TimeframeButton>
              <TimeframeButton 
                active={timeframe === '1h'}
                onClick={() => setTimeframe('1h')}
              >
                1h
              </TimeframeButton>
              <TimeframeButton 
                active={timeframe === '4h'}
                onClick={() => setTimeframe('4h')}
              >
                4h
              </TimeframeButton>
              <TimeframeButton 
                active={timeframe === '1d'}
                onClick={() => setTimeframe('1d')}
              >
                1d
              </TimeframeButton>
            </TimeframeSelector>
          </ChartHeader>
          
          <ChartPlaceholder>
            📈 Price Chart
          </ChartPlaceholder>
        </ChartContainer>
        
        <OrderFormContainer>
          <TabContainer>
            <Tab 
              active={orderType === 'market'} 
              onClick={() => setOrderType('market')}
            >
              Market
            </Tab>
            <Tab 
              active={orderType === 'limit'} 
              onClick={() => setOrderType('limit')}
            >
              Limit
            </Tab>
          </TabContainer>
          
          <TabContainer>
            <Tab 
              active={side === 'buy'} 
              onClick={() => setSide('buy')}
              style={{ color: side === 'buy' ? '#4CAF50' : undefined }}
            >
              Buy
            </Tab>
            <Tab 
              active={side === 'sell'} 
              onClick={() => setSide('sell')}
              style={{ color: side === 'sell' ? '#F44336' : undefined }}
            >
              Sell
            </Tab>
          </TabContainer>
          
          <FormGroup>
            <Label htmlFor="price">Price (USDC)</Label>
            <Input 
              id="price"
              type="number" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={orderType === 'market'}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="amount">Amount (SOL)</Label>
            <Input 
              id="amount"
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Order Size</Label>
            <RangeSlider 
              type="range" 
              min="0" 
              max="100" 
              value={sliderValue}
              onChange={handleSliderChange}
            />
            <SliderLabels>
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </SliderLabels>
          </FormGroup>
          
          <OrderSummary>
            <SummaryRow>
              <span>Order Type</span>
              <span>{orderType.charAt(0).toUpperCase() + orderType.slice(1)}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Price</span>
              <span>{orderType === 'market' ? 'Market Price' : `${price} USDC`}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Amount</span>
              <span>{amount || '0'} SOL</span>
            </SummaryRow>
            <SummaryRow>
              <span>Total</span>
              <span>{amount && price ? (parseFloat(amount) * parseFloat(price)).toFixed(2) : '0'} USDC</span>
            </SummaryRow>
          </OrderSummary>
          
          <OrderButton 
            buy={side === 'buy'}
            onClick={handleSubmitOrder}
            disabled={!amount || (orderType === 'limit' && !price)}
          >
            {side === 'buy' ? 'Buy' : 'Sell'} SOL
          </OrderButton>
        </OrderFormContainer>
      </TradingGrid>
      
      <MarketData>
        <DataCard>
          <DataLabel>Price</DataLabel>
          <DataValue>{marketData.price.toFixed(2)} USDC</DataValue>
        </DataCard>
        <DataCard>
          <DataLabel>24h Change</DataLabel>
          <DataValue positive={marketData.change24h > 0} negative={marketData.change24h < 0}>
            {marketData.change24h > 0 ? '+' : ''}{marketData.change24h.toFixed(2)}%
          </DataValue>
        </DataCard>
        <DataCard>
          <DataLabel>24h Volume</DataLabel>
          <DataValue>{(marketData.volume24h / 1000).toFixed(1)}K USDC</DataValue>
        </DataCard>
      </MarketData>
    </TradingContainer>
  );
};

export default TradingInterface;
