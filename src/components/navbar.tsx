import React, { useState } from 'react';
import { Bell, BoxArrowInLeft, Dash, Gear, Palette } from 'react-bootstrap-icons';
import {Container, Icon, LeftContainer, MenuItem, NotificationsPopup, Sidebar, ThemeIndicator, } from '../assets/styles/navbar'




const  Navbar = ({ handleColorChange }: { handleColorChange: (color: 'rose' | 'green') => void }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showConfiguration, setShowConfiguration] = useState(false);
  const [showTheme, setShowTheme] = useState(false); 
  const [selectedTheme, setSelectedTheme] = useState<'rose' | 'green'>('rose');

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "Inicio das Aulas-Faculdade ",
      time: "2 DAYS"
    },
    {
      id: 2,
      text: "trabalho de Banco de Dados ",
      time: "4 DAYS"
    },

  ]);

  const handleThemeClick = () => {
    setShowTheme(!showTheme); 
    setShowNotifications(false); 
 };

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
    setShowConfiguration(false); 
  };

  const handleConfigurationClick = () => {
    setShowConfiguration(!showConfiguration);
    setShowNotifications(false); 
  };

  const handleThemeChange = (theme: 'rose' | 'green' ) => {
    setSelectedTheme(theme);
    handleColorChange(theme);
  };

  return (
    <Container>
      <LeftContainer>
        <Sidebar>
          <MenuItem className="menu-item" onClick={handleThemeClick}>
            <Icon><Palette /></Icon><h3>Theme</h3>
          </MenuItem>
          {showTheme && (
            <>
              <MenuItem className="menu-item" onClick={() => handleThemeChange('rose')}>
              <ThemeIndicator color={selectedTheme === 'rose' ? 'pink' : 'transparent'} />
                <h3>rose</h3>
              </MenuItem>
              <MenuItem className="menu-item" onClick={() => handleThemeChange('green')}>
                <ThemeIndicator color={selectedTheme === 'green' ? 'green' : 'transparent'} />
                <h3>green</h3>
              </MenuItem>
            </>
          )}
          <MenuItem className="menu-item" id="notifications" onClick={handleNotificationsClick}>
            <Icon><Bell /><small className="notification-count">{notifications.length}</small></Icon><h3>Notifications</h3>
            <NotificationsPopup show={showNotifications}>
              {notifications.map(notification => (
                <div key={notification.id}>
                  <div className="notification-body">
                    <b>{notification.text}</b>
                    <small className="text-muted">{notification.time}</small>
                  </div>
                </div>
              ))}
            </NotificationsPopup>
          </MenuItem>
          <MenuItem className="menu-item" onClick={handleConfigurationClick}>
            <Icon><Gear /></Icon><h3>Configuration</h3>
          </MenuItem>
          {showConfiguration && (
            <>
              <MenuItem className="menu-item">
                <Icon><BoxArrowInLeft /></Icon><h3>Sair</h3>
              </MenuItem>
            </>
          )}
        </Sidebar>
      </LeftContainer>
    </Container>
  );
};

export default Navbar;

