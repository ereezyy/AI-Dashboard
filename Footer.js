import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  height: 50px;
  background-color: ${props => props.theme.backgroundSecondary};
  border-top: 1px solid ${props => props.theme.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${props => props.theme.spacing.lg};
  color: ${props => props.theme.textSecondary};
  font-size: ${props => props.theme.fontSize.sm};
`;

const FooterLeft = styled.div`
  display: flex;
  align-items: center;
`;

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const FooterLink = styled.a`
  color: ${props => props.theme.textSecondary};
  text-decoration: none;
  transition: color ${props => props.theme.transitionSpeed} ease;
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const Version = styled.span`
  background-color: ${props => props.theme.backgroundTertiary};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.fontSize.xs};
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLeft>
        <span>© 2025 AI Dashboard</span>
      </FooterLeft>
      
      <FooterRight>
        <FooterLink href="#">Privacy</FooterLink>
        <FooterLink href="#">Terms</FooterLink>
        <FooterLink href="#">Support</FooterLink>
        <Version>v1.0.0</Version>
      </FooterRight>
    </FooterContainer>
  );
};

export default Footer;
