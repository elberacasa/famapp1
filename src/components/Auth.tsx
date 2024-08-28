import React from 'react';
import { signInWithGoogle, signOut } from '../firebase';

interface Props {
  user: any | null;
}

const Auth: React.FC<Props> = ({ user }) => {
  const handleSignIn = () => {
    signInWithGoogle().catch(error => console.error("Error signing in:", error));
  };

  const handleSignOut = () => {
    signOut().catch(error => console.error("Error signing out:", error));
  };

  return (
    <div className="auth">
      {user ? (
        <div>
          <img src={user.photoURL} alt={user.displayName} />
          <p>Welcome, {user.displayName}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <button onClick={handleSignIn}>Sign In with Google</button>
        </div>
      )}
    </div>
  );
};

export default Auth;
