import React, { useState } from 'react';
import { Bell, BoxArrowInLeft, Gear, Palette } from 'react-bootstrap-icons';
import { Icon, MenuItem, NotificationsPopup, Sidebar, ThemeIndicator } from '../assets/styles/navbar';
import { auth } from '@/config/firebaseConfig';
import { deleteUserAndEvents } from '../config/deleteUser';

interface NavbarProps {
  handleColorChange: (color: 'rose' | 'green' | 'blue') => void;
  notifications: { id: number; text: string; time: string }[];
}

const Navbar: React.FC<NavbarProps> = ({ handleColorChange, notifications }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showConfiguration, setShowConfiguration] = useState(false);
  const [showTheme, setShowTheme] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<'rose' | 'green' | 'blue'>('rose');

  const handleThemeClick = () => {
    setShowTheme(!showTheme);
    setShowNotifications(false);
  };

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
    setShowConfiguration(false);
  };

  const handleConfigurationClick = async () => {
    setShowConfiguration(!showConfiguration);
    setShowNotifications(false);
  };

  const handleThemeChange = (theme: 'rose' | 'green' | 'blue') => {
    setSelectedTheme(theme);
    handleColorChange(theme);
  };

  const handleDeleteAccount = async () => {
    if (auth.currentUser) {
      const confirmDelete = window.confirm("Tem certeza que deseja excluir sua conta?");
      if (confirmDelete) {
        try {
          await deleteUserAndEvents(auth.currentUser.uid);

          await auth.signOut();

        } catch (error) {
          console.error('Erro ao excluir conta:', error);
        }
      }
    }
  };

  return (
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
          <MenuItem className="menu-item" onClick={() => handleThemeChange('blue')}>
            <ThemeIndicator color={selectedTheme === 'blue' ? 'purple' : 'transparent'} />
            <h3>blue</h3>
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
          <MenuItem className="menu-item" onClick={handleDeleteAccount}>
            <Icon><BoxArrowInLeft /></Icon><h3>Excluir Conta</h3>
          </MenuItem>
        </>
      )}
    </Sidebar>
  );
};

export default Navbar;