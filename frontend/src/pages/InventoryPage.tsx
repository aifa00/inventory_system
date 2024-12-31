import Inventory from "../components/Inventory";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";

function InventoryPage() {
  return (
    <div>
      <Navbar />
      <SideBar />
      <Inventory />
    </div>
  );
}

export default InventoryPage;
