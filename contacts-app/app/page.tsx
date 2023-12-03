"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import styles from "./page.module.css";
import Boop from "@/components/Boop";

config.autoAddCss = false;

export default function Home() {
  return (
    <main>
      <div className={styles.container}>
        <h1>Home</h1>
        <h2>Hello~There~</h2>
        <Boop rotation={10}>
          <div className={styles.link}>
            <Link href="/contacts?order=asc">
              <FontAwesomeIcon icon={faHandPointRight} />
              <span>ContactList</span>
            </Link>
          </div>
        </Boop>
      </div>
    </main>
  );
}
