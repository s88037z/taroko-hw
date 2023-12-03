import { getContacts } from "@/api/contact";
import Contact from "../Contact";
import styles from "./ContactList.module.css";
import { Contact as tContact } from "@/app/contacts/_types";

export default async function ContactList() {
  console.log("ContactList run ");
  const res: { data: tContact[] } = await getContacts();

  // Just to mimic the loading
  await new Promise((res) => {
    setTimeout(() => {
      res("");
    }, 300);
  });
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        {res?.data.map(({ id, first_name, last_name, job, description }) => (
          <Contact
            key={id}
            id={id}
            firstName={first_name}
            lastName={last_name}
            job={job}
            description={description}
          />
        ))}
      </div>
    </div>
  );
}
