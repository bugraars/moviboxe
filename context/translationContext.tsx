'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface TranslationContextProps {
  locale: string;
  messages: Messages;
  setLocale: (locale: string) => void;
}

interface Messages {
  [key: string]: any;
  genres: {
    [key: string]: string;
  };
  // Diğer çeviri anahtarları burada tanımlanabilir
}

const TranslationContext = createContext<TranslationContextProps | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState(Cookies.get('NEXT_LOCALE') || 'en');
  const [messages, setMessages] = useState<Messages>({ genres: {} });

  useEffect(() => {
    const loadMessages = async () => {
      const messages = await import(`../messages/${locale}.json`);
      setMessages(messages.default);
    };
    loadMessages();
  }, [locale]);

  const value = {
    locale,
    messages,
    setLocale: (newLocale: string) => {
      Cookies.set('NEXT_LOCALE', newLocale);
      setLocale(newLocale);
    },
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};
