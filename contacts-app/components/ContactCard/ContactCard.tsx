import styles from "./ContactCard.module.css";
export default function ContactCard() {
  return (
    <div className={styles.container}>
      <div className={styles.infos}>
        <div className={styles.profile}>
          <div className={styles.avatar}>Avatar</div>
          <div className={styles.name}>name</div>
        </div>
        <div className={styles.bio}>
          <ul>
            <li>Job:Teacher</li>
            <li>Description:Hi There</li>
          </ul>
        </div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.button}>Edit</div>
        <div className={styles.button}>Delete</div>
      </div>
    </div>
  );
}
