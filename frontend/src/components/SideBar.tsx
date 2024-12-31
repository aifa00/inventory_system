import { BiAlignMiddle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { closeSidebar } from "../redux/sidebarSlice";

function SideBar() {
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const email = useSelector((state: RootState) => state.user.email);
  const dispatch = useDispatch();

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };
  return (
    <div
      className={`fixed top-0 bottom-0 shadow-2xl bg-bgLightGray w-56 p-3 pt-20 
        transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-56"
        }`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={handleCloseSidebar}
        className="absolute top-5 right-5 rounded-full p-3 outline-0 hover:bg-gray-200"
      >
        <BiAlignMiddle size={25} />
      </button>
      <ul>
        <li
          className="bg-gray-200 rounded p-2 w-full cursor-pointer 
        hover:bg-gray-300 border-s-4 border-primary"
        >
          Inventories
        </li>
      </ul>
      <span className="absolute bottom-10">{email}</span>
    </div>
  );
}

export default SideBar;
