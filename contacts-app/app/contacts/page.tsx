import ContactList from "@/app/contacts/_components/ContactList";
import Title from "./_components/Title";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Contacts() {
  const randomId = crypto.randomUUID();

  return (
    <section>
      <Title />
      {/*It's a workaround for now. ref:https://github.com/vercel/next.js/discussions/50563*/}
      <Suspense key={randomId} fallback={<Loading />}>
        <ContactList />
      </Suspense>
    </section>
  );
}
