import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Notification, { NotificationType } from '@/components/Notification';
import { AnimatePresence } from 'framer-motion';

interface NotificationItem {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}

interface NotificationContextType {
  showNotification: (type: NotificationType, message: string, duration?: number) => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  const addNotification = useCallback((type: NotificationType, message: string, duration?: number) => {
    const id = uuidv4();
    setNotifications((prev) => [...prev, { id, type, message, duration }]);
  }, []);

  const showSuccess = useCallback((message: string, duration?: number) => {
    addNotification('success', message, duration);
  }, [addNotification]);

  const showError = useCallback((message: string, duration?: number) => {
    addNotification('error', message, duration);
  }, [addNotification]);

  const showInfo = useCallback((message: string, duration?: number) => {
    addNotification('info', message, duration);
  }, [addNotification]);

  const showWarning = useCallback((message: string, duration?: number) => {
    addNotification('warning', message, duration);
  }, [addNotification]);

  return (
    <NotificationContext.Provider
      value={{
        showNotification: addNotification,
        showSuccess,
        showError,
        showInfo,
        showWarning,
      }}
    >
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
        <AnimatePresence>
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              id={notification.id}
              type={notification.type}
              message={notification.message}
              duration={notification.duration}
              onClose={removeNotification}
            />
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

export default NotificationContext; 