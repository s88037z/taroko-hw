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
  setDialog: Dispatch<SetStateAction<DialogConfig>>;
};

const DialogContext = createContext<DialogContextType | {}>({});

export const DialogProvider = ({ children }: React.PropsWithChildren) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialog, setDialog] = useState<DialogConfig>({});
  const { content, ...resConfig } = dialog;
  return (
    <DialogContext.Provider value={{ setDialog, setDialogOpen }}>
      {children}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen} {...resConfig}>
        {content}
      </Dialog>
    </DialogContext.Provider>
  );
};
export const useDialog = () => {
  const { setDialog, setDialogOpen } = useContext(
    DialogContext
  ) as DialogContextType;

  return { setDialog, setDialogOpen };
};
