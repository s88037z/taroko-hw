import clsx from "clsx";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.brand}>
        <a className={styles.item}>Contact List</a>
      </div>
      <div className={styles.interactive}>
        <a className={clsx(styles.item, "touchable")}>Add Contact</a>
      </div>
    </div>
  );
}
