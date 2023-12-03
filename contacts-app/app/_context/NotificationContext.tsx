"use client";
import {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import Notification, { NotificationProps } from "@/components/Notification";

type NotificationConfig = Omit<NotificationProps, "open" | "onOpenChange">;

type NotificationContextType = {
  setNotificationOpen: Dispatch<SetStateAction<boolean>>;
  setNotification: Dispatch<SetStateAction<NotificationConfig>>;
};

const NotificationContext = createContext<NotificationContextType | {}>({});

export const NotificationProvider = ({ children }: React.PropsWithChildren) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notification, setNotification] = useState<NotificationConfig>({});

  return (
    <NotificationContext.Provider
      value={{ setNotification, setNotificationOpen }}
    >
      {children}
      <Notification
        open={notificationOpen}
        onOpenChange={setNotificationOpen}
        {...notification}
      />
    </NotificationContext.Provider>
  );
};
export const useNotification = () => {
  const { setNotification, setNotificationOpen } = useContext(
    NotificationContext
  ) as NotificationContextType;

  return { setNotification, setNotificationOpen };
};
