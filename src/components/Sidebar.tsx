import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Switch } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import NoteIcon from '@mui/icons-material/Note';
import InsightsIcon from '@mui/icons-material/Insights';

interface SidebarProps {
  activeComponent: 'summary' | 'form' | 'list' | 'debts' | 'chat' | 'notes' | 'insights';
  setActiveComponent: (component: 'summary' | 'form' | 'list' | 'debts' | 'chat' | 'notes' | 'insights') => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeComponent, setActiveComponent, isDarkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { text: 'Summary', icon: <DashboardIcon />, value: 'summary' },
    { text: 'Add Transaction', icon: <AddIcon />, value: 'form' },
    { text: 'Transactions', icon: <ListIcon />, value: 'list' },
    { text: 'Family Debts', icon: <PeopleIcon />, value: 'debts' },
    { text: 'Chat', icon: <ChatIcon />, value: 'chat' },
    { text: 'Notes', icon: <NoteIcon />, value: 'notes' },
    { text: 'Financial Insights', icon: <InsightsIcon />, value: 'insights' },
  ];

  return (
    <motion.div
      initial={false}
      animate={{ width: isOpen ? 240 : 60 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <Drawer
        variant="permanent"
        sx={{
          width: isOpen ? 240 : 60,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isOpen ? 240 : 60,
            boxSizing: 'border-box',
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={toggleDrawer}>
            {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              onClick={() => setActiveComponent(item.value as 'summary' | 'form' | 'list' | 'debts' | 'chat' | 'notes' | 'insights')}
              sx={{ backgroundColor: activeComponent === item.value ? 'action.selected' : 'inherit' }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <motion.div
                initial={false}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen && <ListItemText primary={item.text} />}
              </motion.div>
            </ListItem>
          ))}
        </List>
        <Box sx={{ marginTop: 'auto', padding: 2 }}>
          <ListItem>
            <ListItemIcon>
              <Brightness4Icon />
            </ListItemIcon>
            <motion.div
              initial={false}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen && <ListItemText primary="Dark Mode" />}
            </motion.div>
            <Switch
              edge="end"
              onChange={toggleDarkMode}
              checked={isDarkMode}
            />
          </ListItem>
        </Box>
      </Drawer>
    </motion.div>
  );
};

export default Sidebar;