import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import solanaWalletService from './SolanaWalletService';

const SendReceiveContainer = styled.div`
  background-color: ${props => props.theme.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadowLight};
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.border};
  margin-bottom: ${props => props.theme.spacing.lg};
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

const BalanceInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.backgroundSecondary};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const BalanceLabel = styled.div`
  color: ${props => props.theme.textSecondary};
`;

const BalanceAmount = styled.div`
  font-weight: ${props => props.theme.fontWeight.semiBold};
`;

const MaxButton = styled.button`
  background-color: transparent;
  color: ${props => props.theme.primary};
  border: none;
  font-size: ${props => props.theme.fontSize.sm};
  cursor: pointer;
  margin-left: ${props => props.theme.spacing.sm};
  
  &:hover {
    text-decoration: underline;
  }
`;

const ActionButton = styled.button`
  width: 100%;
  background-color: ${props => props.theme.primary};
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
    background-color: ${props => props.theme.primaryHover};
  }
  
  &:disabled {
    background-color: ${props => props.theme.backgroundTertiary};
    color: ${props => props.theme.textSecondary};
    cursor: not-allowed;
  }
`;

const ReceiveQRContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const QRCode = styled.div`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  margin: ${props => props.theme.spacing.lg} 0;
`;

const AddressDisplay = styled.div`
  background-color: ${props => props.theme.backgroundSecondary};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  font-family: monospace;
  width: 100%;
  text-align: center;
  word-break: break-all;
`;

const CopyButton = styled.button`
  background-color: transparent;
  color: ${props => props.theme.primary};
  border: 1px solid ${props => props.theme.primary};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  font-size: ${props => props.theme.fontSize.sm};
  cursor: pointer;
  transition: all ${props => props.theme.transitionSpeed} ease;
  
  &:hover {
    background-color: ${props => props.theme.primary};
    color: white;
  }
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

const SendReceive = () => {
  const [activeTab, setActiveTab] = useState('send');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const [status, setStatus] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  
  useEffect(() => {
    if (solanaWalletService.isConnected) {
      setBalance(solanaWalletService.balance);
      setWalletAddress(solanaWalletService.address);
    }
    
    const fetchBalance = async () => {
      const result = await solanaWalletService.getBalance();
      if (result.success) {
        setBalance(result.balance);
      }
    };
    
    fetchBalance();
  }, []);
  
  const handleSend = async () => {
    if (!recipient || !amount) {
      setStatus({
        type: 'error',
        message: 'Please fill in all fields'
      });
      return;
    }
    
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid amount'
      });
      return;
    }
    
    if (amountNum > balance) {
      setStatus({
        type: 'error',
        message: 'Insufficient balance'
      });
      return;
    }
    
    setStatus({
      type: 'info',
      message: 'Processing transaction...'
    });
    
    const result = await solanaWalletService.sendTransaction(recipient, amountNum);
    
    if (result.success) {
      setStatus({
        type: 'success',
        message: `Successfully sent ${amountNum} SOL to ${recipient}`
      });
      setBalance(result.newBalance);
      setRecipient('');
      setAmount('');
    } else {
      setStatus({
        type: 'error',
        message: result.error || 'Transaction failed'
      });
    }
  };
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setStatus({
      type: 'success',
      message: 'Address copied to clipboard'
    });
    
    // Clear status after 3 seconds
    setTimeout(() => {
      setStatus(null);
    }, 3000);
  };
  
  const handleSetMax = () => {
    setAmount(balance.toString());
  };
  
  return (
    <SendReceiveContainer>
      <TabContainer>
        <Tab 
          active={activeTab === 'send'} 
          onClick={() => setActiveTab('send')}
        >
          Send
        </Tab>
        <Tab 
          active={activeTab === 'receive'} 
          onClick={() => setActiveTab('receive')}
        >
          Receive
        </Tab>
      </TabContainer>
      
      {activeTab === 'send' ? (
        <>
          <BalanceInfo>
            <BalanceLabel>Available Balance:</BalanceLabel>
            <BalanceAmount>{balance} SOL</BalanceAmount>
          </BalanceInfo>
          
          <FormGroup>
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input 
              id="recipient"
              type="text" 
              placeholder="Enter Solana address" 
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="amount">
              Amount (SOL)
              <MaxButton onClick={handleSetMax}>MAX</MaxButton>
            </Label>
            <Input 
              id="amount"
              type="number" 
              placeholder="0.00" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </FormGroup>
          
          <ActionButton 
            onClick={handleSend}
            disabled={!solanaWalletService.isConnected}
          >
            Send SOL
          </ActionButton>
        </>
      ) : (
        <ReceiveQRContainer>
          <p>Share your address to receive SOL</p>
          
          <QRCode>QR</QRCode>
          
          <AddressDisplay>
            {walletAddress || 'Connect wallet to view address'}
          </AddressDisplay>
          
          <CopyButton 
            onClick={handleCopyAddress}
            disabled={!walletAddress}
          >
            Copy Address
          </CopyButton>
        </ReceiveQRContainer>
      )}
      
      {status && (
        <StatusMessage type={status.type}>
          {status.message}
        </StatusMessage>
      )}
    </SendReceiveContainer>
  );
};

export default SendReceive;
