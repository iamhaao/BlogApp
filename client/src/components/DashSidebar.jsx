import React from "react";
import { Sidebar } from "flowbite-react";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";

function DashSidebar({ tab }) {
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
          <Sidebar.Item icon={MdLogout}>Sign Out</Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSidebar;
