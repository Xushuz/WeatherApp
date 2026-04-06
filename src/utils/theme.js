export const lightTheme = {
  background: '#F0F4F8', card: '#FFFFFF', text: '#1A1A2E',
  textSecondary: '#666680', primary: '#4A90D9', accent: '#FF6B6B',
  border: '#E0E0E0', inputBg: '#F5F5F5', tabBar: '#FFFFFF',
};

export const darkTheme = {
  background: '#1A1A2E', card: '#16213E', text: '#E0E0E0',
  textSecondary: '#A0A0B0', primary: '#4A90D9', accent: '#FF6B6B',
  border: '#2A2A4A', inputBg: '#16213E', tabBar: '#16213E',
};

export const getTheme = (darkMode) => (darkMode ? darkTheme : lightTheme);
