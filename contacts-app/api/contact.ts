import { Contact } from "@/app/contacts/_types";

type UpdateBody = {
  info: Omit<Contact, "id">;
};
type CreateBody = {
  contact: Omit<Contact, "id">;
};

export const getContacts = async () => {
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
export const createContact = async (data: Omit<Contact, "id">) => {
  const requestBody: CreateBody = { contact: data };
  const res = await fetch("http://localhost:3000/api/contacts/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  if (!res.ok) {
    throw new Error("Failed to update topic");
  }
  return res.json();
};

export const updateContact = async (id: number, data: Omit<Contact, "id">) => {
  const requestBody: UpdateBody = { info: data };

  const res = await fetch(`http://localhost:3000/api/contacts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  if (!res.ok) {
    throw new Error("Failed to update topic");
  }
  return res.json();
};

export const deleteContact = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/contacts/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to update topic");
  }
  return res.json();
};
