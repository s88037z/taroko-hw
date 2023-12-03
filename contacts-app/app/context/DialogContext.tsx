"use client";
import {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import Dialog, { CustomDialogProp as DialogProp } from "@/components/Dialog";

type DialogConfig = {
  content?: JSX.Element;
} & Omit<DialogProp, "open" | "onOpenChange">;

type DialogContextType = {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  setDialogConfig: Dispatch<SetStateAction<DialogConfig>>;
};

const DialogContext = createContext<DialogContextType | {}>({});

export const DialogProvider = ({ children }: React.PropsWithChildren) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState<DialogConfig>({});
  const { content, ...resConfig } = dialogConfig;
  return (
    <DialogContext.Provider value={{ setDialogConfig, setDialogOpen }}>
      {children}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen} {...resConfig}>
        {content}
      </Dialog>
    </DialogContext.Provider>
  );
};
export const useDialog = () => {
  const { setDialogConfig, setDialogOpen } = useContext(
    DialogContext
  ) as DialogContextType;

  return { setDialogConfig, setDialogOpen };
};
