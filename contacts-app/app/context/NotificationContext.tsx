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
  setNotificationConfig: Dispatch<SetStateAction<NotificationConfig>>;
};

const NotificationContext = createContext<NotificationContextType | {}>({});

export const NotificationProvider = ({ children }: React.PropsWithChildren) => {
  const [NotificationOpen, setNotificationOpen] = useState(false);
  const [NotificationConfig, setNotificationConfig] =
    useState<NotificationConfig>({});
  return (
    <NotificationContext.Provider
      value={{ setNotificationConfig, setNotificationOpen }}
    >
      {children}
      <Notification
        open={NotificationOpen}
        onOpenChange={setNotificationOpen}
        {...NotificationConfig}
      />
    </NotificationContext.Provider>
  );
};
export const useNotification = () => {
  const { setNotificationConfig, setNotificationOpen } = useContext(
    NotificationContext
  ) as NotificationContextType;

  return { setNotificationConfig, setNotificationOpen };
};
