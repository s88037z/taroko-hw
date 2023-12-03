"use client";

import Link from "next/link";
import clsx from "clsx";
import { useDialog } from "@/app/_context/DialogContext";
import styles from "./Navbar.module.css";
import ContactForm, {
  FormType,
} from "@/app/contacts/_components/ContactForm/ContactForm";
import Boop from "../Boop";

export default function Navbar() {
  const { setDialog, setDialogOpen } = useDialog();
  const handlerAddContactClick = () => {
    setDialog({
      content: <ContactForm type={FormType.CREATE} />,
      withDefaultButton: false,
      crossIconScale: 1.5,
    });
    setDialogOpen(true);
  };
  return (
    <header className={styles.container}>
      <Boop rotation={10}>
        <nav className={styles.brand}>
          <Link href={"/"} className={clsx(styles.item, "touchable")}>
            Contact List
          </Link>
        </nav>
      </Boop>

      <div className={styles.interactive}>
        <button
          className={clsx(styles.item, "touchable", "button", "navbar-item")}
          onClick={handlerAddContactClick}
        >
          Add Contact
        </button>
      </div>
    </header>
  );
}
