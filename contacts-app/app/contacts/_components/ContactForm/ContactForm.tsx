"use client";
import { useForm, type FieldValues } from "react-hook-form";
import clsx from "clsx";
import styles from "./ContactForm.module.css";
import * as Dialog from "@radix-ui/react-dialog";
import { Contact } from "../../_types";
import { CamelCase, SnakeCase } from "@/utils/types";
import { createContact, updateContact } from "@/api/contact";
import { useRouter } from "next/navigation";
import { useDialog } from "@/app/_context/DialogContext";
import { toSnakeCaseKey } from "@/utils";
import { revalidatePath } from "next/cache";
import { useNotification } from "@/app/_context/NotificationContext";

type ContactFormProps = {
  contactInfo?: CamelCase<Contact>;
  type: FormType;
};

type ContactFields = Omit<CamelCase<Contact>, "id">;

export enum FormType {
  UPDATE = "update",
  CREATE = "create",
}

export default function ContactForm({ contactInfo, type }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<ContactFields>();
  const router = useRouter();
  const { setDialogOpen } = useDialog();
  const { setNotification, setNotificationOpen } = useNotification();
  const { firstName, lastName, job, description, id } = contactInfo || {};

  const onSubmit = async (data: ContactFields) => {
    switch (type) {
      case FormType.UPDATE:
        handleUpdate(data);
        break;
      case FormType.CREATE:
        handleCreate(data);
        break;
    }
  };
  const handleUpdate = async (data: ContactFields) => {
    try {
      const res = await updateContact(id!, toSnakeCaseKey(data));
      router.refresh();
      setDialogOpen(false);
      setNotification({
        title: "Updated successfully",
      });
      setNotificationOpen(true);
      reset();
    } catch (err: any) {
      console.log(err);
      setNotification({
        title: err?.message ?? "Something went wrong",
        confirmButton: (
          <button className={clsx(styles.button, styles.red)}>OK</button>
        ),
      });
      setNotificationOpen(true);
    }
  };

  const handleCreate = async (data: ContactFields) => {
    try {
      const res = await createContact(toSnakeCaseKey(data));
      router.refresh();
      setDialogOpen(false);
      setNotification({
        title: "Create successfully",
      });
      setNotificationOpen(true);
      reset();
    } catch (err: any) {
      console.log(err);
      setNotification({
        title: err?.message ?? "Something went wrong",
        confirmButton: (
          <button className={clsx(styles.button, styles.red)}>OK</button>
        ),
      });
      setNotificationOpen(true);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={styles.fieldset}>
          <label className={styles.label} htmlFor="firstName">
            First Name
          </label>
          <input
            {...register("firstName", {
              required: "First name is required",
            })}
            className={styles.input}
            id="firstName"
            defaultValue={firstName}
          />
        </fieldset>
        {errors.firstName && (
          <p className={styles.errorMsg}>{`${errors.firstName.message}`}</p>
        )}
        <fieldset className={styles.fieldset}>
          <label className={styles.label} htmlFor="lastName">
            Last Name
          </label>
          <input
            {...register("lastName", {
              required: "Last name is required",
            })}
            className={styles.input}
            id="lastName"
            defaultValue={lastName}
          />
        </fieldset>
        {errors.lastName && (
          <p className={styles.errorMsg}>{`${errors.lastName.message}`}</p>
        )}
        <fieldset className={styles.fieldset}>
          <label className={styles.label} htmlFor="job">
            Job
          </label>
          <input
            {...register("job", {
              required: "Job is required",
            })}
            className={styles.input}
            id="job"
            defaultValue={job}
          />
        </fieldset>
        {errors.job && (
          <p className={styles.errorMsg}>{`${errors.job.message}`}</p>
        )}
        <fieldset className={styles.fieldset}>
          <label className={styles.label} htmlFor="description">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className={styles.textarea}
            id="description"
            defaultValue={description}
          />
        </fieldset>
        {errors.description && (
          <p className={styles.errorMsg}>{`${errors.description.message}`}</p>
        )}
        <div className={styles.buttonGroup}>
          <Dialog.Close asChild>
            <button className={clsx(styles.button)}>Cancel</button>
          </Dialog.Close>
          <button type="submit" className={clsx(styles.button, styles.green)}>
            {type == FormType.CREATE ? "Create" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
