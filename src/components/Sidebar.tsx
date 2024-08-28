import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Switch, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import NoteIcon from '@mui/icons-material/Note'; // Added import for NoteIcon

interface SidebarProps {
  activeComponent: 'summary' | 'form' | 'list' | 'debts' | 'chat' | 'notes';
  setActiveComponent: (component: 'summary' | 'form' | 'list' | 'debts' | 'chat' | 'notes') => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeComponent, setActiveComponent, isDarkMode, toggleDarkMode }) => {
  const menuItems = [
    { text: 'Summary', icon: <DashboardIcon />, value: 'summary' },
    { text: 'Add Transaction', icon: <AddIcon />, value: 'form' },
    { text: 'Transactions', icon: <ListIcon />, value: 'list' },
    { text: 'Family Debts', icon: <PeopleIcon />, value: 'debts' },
    { text: 'Chat', icon: <ChatIcon />, value: 'chat' },
    { text: 'Notes', icon: <NoteIcon />, value: 'notes' }, // Add this line
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component="div"
            onClick={() => setActiveComponent(item.value as 'summary' | 'form' | 'list' | 'debts' | 'chat' | 'notes')}
            sx={{ backgroundColor: activeComponent === item.value ? 'action.selected' : 'inherit' }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ marginTop: 'auto', padding: 2 }}>
        <ListItem>
          <ListItemIcon>
            <Brightness4Icon />
          </ListItemIcon>
          <ListItemText primary="Dark Mode" />
          <Switch
            edge="end"
            onChange={toggleDarkMode}
            checked={isDarkMode}
          />
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default Sidebar;