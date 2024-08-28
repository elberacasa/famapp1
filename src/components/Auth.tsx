import React from 'react';
import { signInWithGoogle, signOut } from '../firebase';
import { Button, Avatar, Typography, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

interface Props {
  user: any | null;
}

const Auth: React.FC<Props> = ({ user }) => {
  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {user ? (
        <>
          <Avatar src={user.photoURL} alt={user.displayName} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle2">{user.displayName}</Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={handleSignOut}
              sx={{ mt: 1 }}
            >
              Sign Out
            </Button>
          </Box>
        </>
      ) : (
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={handleSignIn}
        >
          Sign In
        </Button>
      )}
    </Box>
  );
};

export default Auth;
