const darkTheme = {
  // Color palette
  background: '#121212',
  backgroundSecondary: '#1E1E1E',
  backgroundTertiary: '#2D2D2D',
  text: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textTertiary: 'rgba(255, 255, 255, 0.5)',
  primary: '#6E45E2',
  primaryHover: '#5A36C9',
  secondary: '#88D3CE',
  accent1: '#FF9800',
  accent2: '#00BCD4',
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FFC107',
  info: '#2196F3',
  border: 'rgba(255, 255, 255, 0.1)',
  card: '#1A1A1A',
  scrollbar: 'rgba(255, 255, 255, 0.3)',
  scrollbarHover: 'rgba(255, 255, 255, 0.5)',
  
  // Gradients
  gradientPrimary: 'linear-gradient(135deg, #6E45E2 0%, #88D3CE 100%)',
  gradientSecondary: 'linear-gradient(135deg, #FF9800 0%, #F44336 100%)',
  gradientCasino: 'linear-gradient(135deg, #FF9800 0%, #F44336 100%)',
  
  // Shadows
  shadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
  shadowLight: '0 2px 10px rgba(0, 0, 0, 0.15)',
  shadowHeavy: '0 8px 30px rgba(0, 0, 0, 0.3)',
  
  // Typography
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    md: '1rem',       // 16px
    lg: '1.25rem',    // 20px
    xl: '1.5rem',     // 24px
    xxl: '2rem'       // 32px
  },
  
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700
  },
  
  // Spacing
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    xxl: '3rem'       // 48px
  },
  
  // Border radius
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    round: '50%'
  },
  
  // Transitions
  transitionSpeed: '0.2s',
  transitionSpeedSlow: '0.5s',
  transitionSpeedFast: '0.1s',
  
  // Z-index
  zIndex: {
    base: 1,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500
  },
  
  // Animations
  animations: {
    pulse: 'pulse 2s infinite ease-in-out',
    fadeIn: 'fadeIn 0.3s ease-out forwards',
    slideIn: 'slideIn 0.3s ease-out forwards'
  }
};

export { darkTheme };
