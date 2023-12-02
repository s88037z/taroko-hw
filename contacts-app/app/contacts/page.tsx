import ContactCard from "@/components/ContactCard";
import Title from "./components/Title";
import styles from "./page.module.css";

crypto;
const mockArr = new Array(6).fill(crypto.randomUUID());
export default function ContactList() {
  return (
    <div>
      <Title />
      <div className={styles.container}>
        {mockArr.map((key) => (
          <ContactCard key={key} />
        ))}
      </div>
    </div>
  );
}
