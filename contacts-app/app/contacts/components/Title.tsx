import styles from "./Title.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownAZ } from "@fortawesome/free-solid-svg-icons";

export default function Title() {
  return (
    <div className={styles.container}>
      <div className={styles.prefixItem}></div>
      <div className={styles.title}>
        <h2>Contacts</h2>
      </div>
      <div className={styles.suffixItem}>
        <span className="touchable">
          <SortIcon />
        </span>
      </div>
    </div>
  );
}

const SortIcon = () => {
  return <FontAwesomeIcon icon={faArrowDownAZ} size="xl" />;
};
