"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "./Dialog.module.css";
import { useState } from "react";

export type CustomDialogProp = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: JSX.Element | string;
  description?: JSX.Element | string;
  confirmButton?: JSX.Element;
  confirmText?: string;
  withDefaultButton?: boolean;
  crossIconScale?: number;
} & React.PropsWithChildren;

export default function CustomDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  confirmText,
  confirmButton,
  withDefaultButton = true,
  crossIconScale,
}: CustomDialogProp) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.dialogContent}>
          {title && <Dialog.Title>{title}</Dialog.Title>}
          {description && (
            <Dialog.Description>{description}</Dialog.Description>
          )}
          {children}
          {withDefaultButton && (
            <div className={styles.confirmButton}>
              <Dialog.Close asChild>
                {confirmButton ?? <button>{confirmText}</button>}
              </Dialog.Close>
            </div>
          )}
          <Dialog.Close asChild>
            <button className={styles.iconClose} aria-label="Close">
              <Cross2Icon style={{ scale: crossIconScale }} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
