import Link from "next/link";
import clsx from "clsx";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.container}>
      <nav className={styles.brand}>
        <Link href={"/"} className={clsx(styles.item, "touchable")}>
          Contact List
        </Link>
      </nav>
      <div className={styles.interactive}>
        <button
          className={clsx(styles.item, "touchable", "button", "navbar-item")}
        >
          Add Contact
        </button>
      </div>
    </header>
  );
}
