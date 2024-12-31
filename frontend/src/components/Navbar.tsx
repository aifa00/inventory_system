import { BiAlignMiddle } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { openSidebar } from "../redux/sidebarSlice";
import React from "react";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../redux/userSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenSidbar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(openSidebar());
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(removeUser());
    navigate("/login");
  };
  return (
    <div className="fixed flex justify-between items-center top-0 left-0 right-0 h-16 shadow px-[5%] bg-bgLightGray">
      <div className="flex w-full items-center">
        <button
          onClick={handleOpenSidbar}
          className="rounded-full p-3 outline-0 hover:bg-gray-200"
        >
          <BiAlignMiddle size={25} />
        </button>
        <div className="flex items-center pl-[5%]">
          <div className="w-10 sm:w-12">
            <img src={"/logo.png"} alt="logo" />
          </div>
          &nbsp;
          <h1 className="font-bold text-lg sm:text-2xl">Inventory System</h1>
        </div>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="rounded-full bg-gray-200 hover:bg-gray-300 p-3"
        >
          <AiOutlineLogout size={25} />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
