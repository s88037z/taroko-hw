"use client";
import Link from "next/link";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import { useDialog } from "@/app/_context/DialogContext";
import ContactForm, {
  FormType,
} from "@/app/contacts/_components/ContactForm/ContactForm";
import Boop from "../Boop";
import Dropdown from "./Dropdown";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const isMobileSize = useMediaQuery({ query: "(max-width: 768px)" });
  const { setDialog, setDialogOpen } = useDialog();
  const handlerAddContactClick = () => {
    setDialog({
      content: <ContactForm type={FormType.CREATE} />,
      withDefaultButton: false,
    });
    setDialogOpen(true);
  };

  return (
    <header className={styles.container}>
      {isMobileSize && (
        <div className={styles.prefixItem}>
          <Dropdown />
        </div>
      )}
      <Boop rotation={10}>
        <nav className={styles.brand}>
          <Link href={"/"}>Contact List</Link>
        </nav>
      </Boop>

      {isMobileSize ? (
        <div className={styles.suffixItem} />
      ) : (
        <div className={styles.addContact}>
          <button
            className={clsx("touchable", "button")}
            onClick={handlerAddContactClick}
          >
            Add Contact
          </button>
        </div>
      )}
    </header>
  );
}
