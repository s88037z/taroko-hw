import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function Home() {
  return (
    <main>
      <h1>Home</h1>
      <h2>Hello~There</h2>
      <Link href="/contacts">{`-> ContactList`}</Link>
    </main>
  );
}
