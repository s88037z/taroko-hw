import ContactList, { SortOrder } from "@/app/contacts/_components/ContactList";
import Title from "./_components/Title";
import { Suspense } from "react";
import Loading from "./loading";

type PageProp = {
  searchParams: { sort: string };
};
export default async function Contacts({ searchParams }: PageProp) {
  const randomId = crypto.randomUUID();
  const { sort: order } = searchParams;

  const validateOrder: (order: string) => SortOrder = (order) =>
    Object.values(SortOrder).includes(order as SortOrder)
      ? (order as SortOrder)
      : SortOrder.ASC;

  const validOrder = validateOrder(order);
  return (
    <section>
      <Title order={validOrder} />
      {/*It's a workaround for now. ref:https://github.com/vercel/next.js/discussions/50563*/}
      <Suspense key={randomId} fallback={<Loading />}>
        <ContactList order={validOrder} />
      </Suspense>
    </section>
  );
}
