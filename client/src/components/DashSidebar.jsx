import React from "react";
import { Sidebar } from "flowbite-react";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { signOut } from "../api/auth";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";
import Toast from "../shared/Toast";

function DashSidebar({ tab }) {
  const dispatch = useDispatch();
  const { mutate: mutateSignout, isLoading: signoutLoading } = useMutation(
    signOut,
    {
      onSuccess: () => {
        dispatch(signOutSuccess());
        Toast({ message: "Signed out!!!", type: "SUCCESS" });
      },
      onError: (error) => {
        Toast({ message: error.message, type: "ERROR" });
      },
    }
  );
  const hanldeSignOut = () => {
    mutateSignout();
  };
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item
              labelColor="dark"
              active={tab === "profile"}
              icon={FaUser}
              label="User"
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={MdLogout}>
            <p className="hover:cursor-pointer" onClick={hanldeSignOut}>
              Sign Out
            </p>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSidebar;
