import styles from "./Contact.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

type ContactProp = {
  firstName: string;
  lastName: string;
  job: string;
  description: string;
};

export default function Contact({
  firstName,
  lastName,
  job,
  description,
}: ContactProp) {
  return (
    <section className={styles.container}>
      <div className={styles.infos}>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            {<FontAwesomeIcon icon={faUser} size="2xl" />}
          </div>
          <div className={styles.name}>{`${firstName} ${lastName}`}</div>
        </div>
        <div className={styles.bio}>
          <ul>
            <li>{`Job:${job}`}</li>
            <li>{`Description:${description}`}</li>
          </ul>
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={clsx(styles.button, styles.edit, "touchable")}>
          Edit
        </button>
        <button className={clsx(styles.button, styles.delete, "touchable")}>
          Delete
        </button>
      </div>
    </section>
  );
}
