import { Container } from "react-bootstrap";
import NavBar from "./FileManager/NavBar";
import Sidebar from "./FileManager/SideBar";
import Data from "./FileManager/Data";

export default function HomePage() {
  return (
    <div>
        <NavBar />
        <Sidebar />
        <Data />
    </div>
  )
}
