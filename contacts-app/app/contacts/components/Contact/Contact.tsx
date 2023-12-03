"use client";
import { useEffect } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useDialog } from "@/app/context/DialogContext";
import { useNotification } from "@/app/context/NotificationContext";
import styles from "./Contact.module.css";

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
  const { setDialogConfig, setDialogOpen } = useDialog();
  const { setNotificationOpen, setNotificationConfig } = useNotification();

  const handleEditClick = () => {
    setDialogOpen(true);
  };
  const handleDeleteClick = () => {
    setNotificationOpen(true);
  };

  useEffect(
    function setupDialogAndNotification() {
      setDialogConfig({
        title: "Test Dialog",
        description: "mock Dialog description",
        confirmButton: <button className="button-danger">OK</button>,
      });
      setNotificationConfig({
        title: "Test Notification",
        description: "mock Notification description",
      });
    },
    [setDialogConfig, setNotificationConfig]
  );

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
        <button
          className={clsx(styles.button, styles.edit, "touchable")}
          onClick={handleEditClick}
        >
          Edit
        </button>
        <button className={clsx("button-danger")} onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </section>
  );
}
