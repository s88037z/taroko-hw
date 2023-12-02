import ContactList from "@/app/contacts/components/ContactList";
import Title from "./components/Title";
import styles from "./page.module.css";

const mockArr = new Array(6).fill(crypto.randomUUID());

export default async function Contacts() {
  return (
    <section>
      <Title />
      <ContactList />
    </section>
  );
}
