import ContactList from "@/app/contacts/components/ContactList";
import { DialogProvider } from "../context/DialogContext";
import { NotificationProvider } from "../context/NotificationContext";
import Title from "./components/Title";
import styles from "./page.module.css";

export default async function Contacts() {
  return (
    <section>
      <Title />
      <DialogProvider>
        <NotificationProvider>
          <ContactList />
        </NotificationProvider>
      </DialogProvider>
    </section>
  );
}
