"use client";
import { useEffect, useRef, useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import { SwipeDirection } from "@radix-ui/react-toast";
import styles from "./Notification.module.css";
import clsx from "clsx";

export type NotificationProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: JSX.Element | string;
  description?: JSX.Element | string;
  swipeDirection?: SwipeDirection;
  actionButton?: JSX.Element;
  actionAltText?: string;
  confirmButton?: JSX.Element;
  duration?: number;
};

export default function Notification({
  open,
  onOpenChange,
  title,
  description,
  swipeDirection = "right",
  duration = 3000,
  actionButton,
  actionAltText = "",
  confirmButton,
}: NotificationProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(
    function setTimerToEaseOutNotification() {
      if (open) {
        timerRef.current = setTimeout(() => {
          onOpenChange(false);
        }, duration);
      }
      const isUserAlreadyCancelNotification = !open && timerRef.current;
      if (isUserAlreadyCancelNotification) {
        clearTimeout(timerRef.current!);
        timerRef.current = null;
      }
    },
    [open, duration, onOpenChange]
  );
  const isTitleString = typeof title == "string";
  const isDescriptionString = typeof description == "string";

  return (
    <Toast.Provider swipeDirection={swipeDirection}>
      <Toast.Root
        className={styles.toastRoot}
        open={open}
        onOpenChange={onOpenChange}
      >
        <Toast.Title>
          {isTitleString ? <div className={styles.title}>{title}</div> : title}
        </Toast.Title>
        <Toast.Description>
          {isDescriptionString ? (
            <div className={styles.description}>{description}</div>
          ) : (
            description
          )}
        </Toast.Description>
        {actionButton && (
          <Toast.Action asChild altText={actionAltText}>
            {actionButton}
          </Toast.Action>
        )}
        <Toast.Close asChild>
          <div className={styles.confirm}>
            {confirmButton ?? (
              <button className={clsx(styles.button, styles.green)}>OK</button>
            )}
          </div>
        </Toast.Close>
      </Toast.Root>

      <Toast.Viewport className={styles.toastViewport} />
    </Toast.Provider>
  );
}
