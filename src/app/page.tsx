import Image from "next/image";
import styles from "./page.module.css";
import Banner from "@/components/Banner/Banner";
import SearchBox from "@/components/SearchBox/SearchBox";
import MapView from "@/components/MapView/MapView";
export default function Home() {
  return (
    <div>
      <MapView />
      <SearchBox />
    </div>
  );
}
