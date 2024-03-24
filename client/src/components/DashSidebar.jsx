import React from "react";
import { Sidebar } from "flowbite-react";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import {
  HiAnnotation,
  HiDocumentText,
  HiOutlineUserGroup,
  HiUserGroup,
} from "react-icons/hi";

import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { signOut } from "../api/auth";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";
import Toast from "../shared/Toast";

function DashSidebar({ tab }) {
  const { currentUser } = useSelector((state) => state.user);
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
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item
              labelColor="dark"
              active={tab === "profile"}
              icon={FaUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <>
              <Link to={"/dashboard?tab=posts"}>
                <Sidebar.Item
                  labelColor="dark"
                  active={tab === "posts"}
                  icon={HiDocumentText}
                >
                  Post
                </Sidebar.Item>
              </Link>
              <Link to={"/dashboard?tab=users"}>
                <Sidebar.Item
                  labelColor="dark"
                  active={tab === "users"}
                  icon={HiOutlineUserGroup}
                >
                  Users
                </Sidebar.Item>
              </Link>
              <Link to={"/dashboard?tab=comments"}>
                <Sidebar.Item
                  labelColor="dark"
                  active={tab === "comments"}
                  icon={HiAnnotation}
                >
                  Comments
                </Sidebar.Item>
              </Link>
            </>
          )}

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
