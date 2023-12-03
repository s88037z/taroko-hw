import Contact from "../Contact";
import styles from "./ContactList.module.css";

export default async function ContactList() {
  const { data }: { data: Contact[] } = await getContacts();

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        {data.map(({ id, first_name, last_name, job, description }) => (
          <Contact
            key={id}
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

const getContacts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/contacts", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Contacts");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};
