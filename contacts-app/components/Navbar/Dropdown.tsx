import { useDialog } from "@/app/_context/DialogContext";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./Dropdown.module.css";
import ContactForm, {
  FormType,
} from "@/app/contacts/_components/ContactForm/ContactForm";

export default function Dropdown() {
  const { setDialog, setDialogOpen } = useDialog();
  const handlerAddContactClick = () => {
    setDialog({
      content: <ContactForm type={FormType.CREATE} />,
      withDefaultButton: false,
    });
    setDialogOpen(true);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={styles.dropdownIcon} aria-label="dropdown">
          <HamburgerMenuIcon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.dropdownContent}>
          <DropdownMenu.Item
            className={styles.dropdownMenuItem}
            onClick={handlerAddContactClick}
          >
            Add Contact
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={styles.dropdownMenuItem}
          ></DropdownMenu.Item>
          <DropdownMenu.Item
            className={styles.dropdownMenuItem}
          ></DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
