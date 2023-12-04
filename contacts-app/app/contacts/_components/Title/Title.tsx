"use client";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownAZ,
  faArrowDownZA,
} from "@fortawesome/free-solid-svg-icons";
import Boop from "@/components/Boop";
import { SortOrder } from "../ContactList";
import styles from "./Title.module.css";

type PropType = {
  order: SortOrder;
};

export default function Title({ order }: PropType) {
  const router = useRouter();
  const handleSortClick = () => {
    router.push(
      `/contacts?sort=${
        order == SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC
      }`
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.prefixItem}></div>
      <div className={styles.title}>
        <h2>Contacts</h2>
      </div>

      <div className={styles.suffixItem}>
        <Boop rotation={45} timing={100}>
          <span className="touchable" onClick={handleSortClick}>
            {order == SortOrder.ASC ? (
              <SortIconAZ data-testid="asc-sort-icon" />
            ) : (
              <SortIconZA data-testid="desc-sort-icon" />
            )}
          </span>
        </Boop>
      </div>
    </div>
  );
}

const SortIconAZ = () => {
  return <FontAwesomeIcon icon={faArrowDownAZ} size="xl" />;
};
const SortIconZA = () => {
  return <FontAwesomeIcon icon={faArrowDownZA} size="xl" />;
};
