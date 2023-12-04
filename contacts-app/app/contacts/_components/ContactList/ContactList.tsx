import { getContacts } from "@/api/contact";
import Contact from "../Contact";
import styles from "./ContactList.module.css";
import { Contact as tContact } from "@/app/contacts/_types";

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

type ContactListProp = {
  order?: SortOrder;
};

export default async function ContactList({
  order = SortOrder.ASC,
}: ContactListProp) {
  const res: { data: tContact[] } = await getContacts();

  // Just to mimic the loading
  await new Promise((res) => {
    setTimeout(() => {
      res(true);
    }, 300);
  });

  const sortedContacts = sortByFirstName(order, res?.data ?? []);
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        {sortedContacts.map(
          ({ id, first_name, last_name, job, description }) => (
            <Contact
              key={id}
              id={id}
              firstName={first_name}
              lastName={last_name}
              job={job}
              description={description}
            />
          )
        )}
      </div>
    </div>
  );
}

function sortByFirstName(order: SortOrder, arr: tContact[]): tContact[] {
  arr.sort((a, b) => {
    const comparison = a?.first_name[0].localeCompare(b?.first_name[0]);
    return order == SortOrder.ASC ? comparison : -comparison;
  });
  return arr;
}
