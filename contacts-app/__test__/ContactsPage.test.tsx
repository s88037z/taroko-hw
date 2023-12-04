import { render, screen } from "@testing-library/react";
import { describe } from "node:test";
import HomePage from "@/app/page";
import ContactsPage from "@/app/contacts/page";
import { DialogProvider } from "@/app/_context/DialogContext";
import { NotificationProvider } from "@/app/_context/NotificationContext";
import { SortOrder } from "@/app/contacts/_components/ContactList";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

const mockContacts = [
  {
    id: 1,
    first_name: "Hank",
    last_name: "Wu",
    job: "teacher",
    description: "hello",
  },
  {
    id: 2,
    first_name: "Leo",
    last_name: "Lee",
    job: "coach",
    description: "Meow~",
  },
  {
    id: 3,
    first_name: "Han",
    last_name: "Solo",
    job: "Smuggler",
    description: "Partnered with a famous Wookie",
  },
];

const mockSearchParams = {
  sort: SortOrder.ASC,
};

const crypto = require("crypto");

Object.defineProperty(globalThis, "crypto", {
  value: {
    randomUUID: () => crypto.randomUUID(),
  },
});

(global.fetch as any) = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: mockContacts }),
  })
);
describe("ContactsPage", async () => {
  it("happy path", async () => {
    // TODO:the integration with async server comp and react-testing-library need to investigating
    // ref:https://github.com/testing-library/react-testing-library/issues/1209
    // const Result = await ContactsPage({ searchParams: mockSearchParams });

    // render(Result);
    // screen.debug();

    expect(true).toBe(true);
  });
});
