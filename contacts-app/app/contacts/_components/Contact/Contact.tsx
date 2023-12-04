"use client";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useDialog } from "@/app/_context/DialogContext";
import { useNotification } from "@/app/_context/NotificationContext";
import styles from "./Contact.module.css";
import ContactForm, { FormType } from "../ContactForm/ContactForm";
import { deleteContact } from "@/api/contact";
import { useRouter } from "next/navigation";

type ContactProp = {
  id: number;
  firstName: string;
  lastName: string;
  job: string;
  description: string;
};

export default function Contact({
  id,
  firstName,
  lastName,
  job,
  description,
}: ContactProp) {
  const { setDialog, setDialogOpen } = useDialog();
  const router = useRouter();
  const { setNotification, setNotificationOpen } = useNotification();

  const contactInfo = { firstName, lastName, job, description, id };

  const handleEditClick = () => {
    setDialog({
      content: <ContactForm contactInfo={contactInfo} type={FormType.UPDATE} />,
      withDefaultButton: false,
    });
    setDialogOpen(true);
  };

  const handleDeleteClick = () => {
    setDialog({
      description: "Are you sure you want to DELETE it?",
      confirmButton: (
        <button className={styles.confirmDelete} onClick={handleDeleteConfirm}>
          Confirm
        </button>
      ),
    });
    setDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const res = await deleteContact(id);
      router.refresh();
      setNotification({
        title: "Delete successfully",
      });
      setNotificationOpen(true);
    } catch (err: any) {
      console.log(err);
      setNotification({
        title: err?.message ?? "Something went wrong",
        confirmButton: (
          <button className={clsx(styles.button, styles.red)}>OK</button>
        ),
      });
      setNotificationOpen(true);
    }
  };

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
            <li>{`Description: ${description}`}</li>
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
