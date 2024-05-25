import { AppContextProps, AppState, Tokens, UserObject } from "./types";
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  getIdToken,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../../config/firebaseConfig";
import httpInstance from "../../services/httpInstance";

const AppContext = createContext<AppState | undefined>(undefined);

export const AppContextProvider = ({ children }: AppContextProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingContext, setLoadingContext] = useState<boolean>(true);
  const [accountType, setAccountType] = useState<string>("");
  const [tokens, setTokens] = useState<Tokens | undefined>(undefined);

  // Función para guardar los tokens en el estado
  const setTokensState = (accessToken: string, refreshToken: string) => {
    setTokens({ access_token: accessToken, refresh_token: refreshToken });
  };

  const signUp = (email: string, password: string): Promise<UserCredential> => {
    // console.log(email, password);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Función para limpiar los datos del usuario y los tokens
  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
      setLoadingContext(false);
      if (currentUser) {
        httpInstance.interceptors.request.use(
          async (config) => {
            onAuthStateChanged(auth, async (currentUser) => {
              if (currentUser) {
                const token = await getIdToken(currentUser);
                config.headers.Authorization = `Bearer ${token}`;
              }
            });
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );
      }
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        accountType,
        setAccountType,
        tokens,
        setTokens: setTokensState,
        logOut: logOut,
        signUp: signUp,
        login: login,
        loadingContext: loadingContext,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
