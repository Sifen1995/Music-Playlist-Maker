
import React, {
  createContext,
  useContext,
  useState,
  useEffect,  
} from 'react';
import type{ ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type{ User } from 'firebase/auth';
import { auth } from '../../../utility/firebase';// Your Firebase auth instance


interface AuthContextType {
  user: User | null;
  loading: boolean; 
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
   
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
      setLoading(false); 
    });

   
    return () => unsubscribe();
  }, []); 
  const value = { user, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};