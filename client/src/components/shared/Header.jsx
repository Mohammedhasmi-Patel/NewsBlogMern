import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import defaultUser from "../../assets/defaultuser.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  let { currentUser } = useSelector((state) => state.user);
  currentUser = currentUser?.user;

  return (
    <header className=" shadow-lg sticky">
      <div className="flex justify-between items-center max-w-6xl lg:max-7xl mx-auto p-4">
        <Link
          to={"/"}
          className="self-center whitespace-nowrap text-sm sm:text-lg font-semibold"
        >
          <h1 className="font-bold text-xl sm:text-2xl flex flex-wrap">
            <span className="text-slate-500">Yashwi</span>
            <span className="text-slate-900">News</span>
          </h1>
        </Link>

        <form
          action=""
          className="p-3 bg-slate-100 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search"
            className="focus:outline-none bg-transparent w-24 sm:w-64 "
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>

        <ul className="flex gap-4">
          <Link
            to={"/"}
            className="hidden lg:inline text-slate-700 hover:underline"
          >
            Home
          </Link>
          <Link
            to={"/about"}
            className="hidden lg:inline text-slate-700 hover:underline"
          >
            About
          </Link>
          <Link
            to={"/news"}
            className="hidden lg:inline text-slate-700 hover:underline"
          >
            News Articles
          </Link>
        </ul>
        {currentUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <img
                  src={currentUser?.profilePicture || defaultUser}
                  alt="User photo"
                  className="w-10 h-10 rounded-full cursor-pointer object-cover"
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-400" />
              <DropdownMenuItem className="block font-semibold text-sm">
                <div className="flex flex-col gap-1 ">
                  <span>@{currentUser?.username}</span>
                  <span className="text-sm text-gray-500">
                    {currentUser?.email || ""}
                  </span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className=" font-semibold mt-2">
                <Link to="/dashboard?tab=profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className=" font-semibold mt-2">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to={"/login"}>
            <Button className="hidden lg:inline">Login</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
