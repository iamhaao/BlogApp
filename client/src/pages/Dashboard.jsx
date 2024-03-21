import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPost from "../components/DashPost";
import DashUser from "../components/DashUser";

function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <Layout>
      <div className="flex h-full flex-col md:flex-row">
        <div className="md:w-56">
          {/*SideBar */}
          <DashSidebar tab={tab} />
        </div>
        {tab === "profile" && <DashProfile />}
        {tab === "posts" && <DashPost />}
        {tab === "users" && <DashUser />}
        {/*Profile... */}
      </div>
    </Layout>
  );
}

export default Dashboard;
