import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Select, TextInput } from "flowbite-react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import { getPosts } from "../api/post.api";
import { getSearchPost } from "../redux/postSlice/postSlice";
import PostCard from "../components/PostCard";
function SearchPage() {
  const location = useLocation();
  const [sideBarData, setSiderBarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "",
  });
  const dispatch = useDispatch();
  const { postsSearch } = useSelector((state) => state.post);

  const { mutate, isLoading } = useMutation(getPosts, {
    onSuccess: (data) => {
      dispatch(getSearchPost(data));
    },
  });
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sort = urlParams.get("sort");
    const category = urlParams.get("category");
    if (searchTermFromUrl || sort || category) {
      setSiderBarData({
        ...sideBarData,
        searchTerm: searchTermFromUrl,
        sort,
        category,
      });
    }
  }, [location.search]);
  useEffect(() => {
    mutate(sideBarData);
  }, [sideBarData]);
  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        <div className="p-7 border-b md:border-r rounded-r-md md:min-h-screen border-slate-500-500">
          <form className="flex flex-col gap-8">
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap font-semibold">
                Search Term:
              </label>
              <TextInput
                placeholder="Search"
                type="text"
                value={sideBarData.searchTerm}
                onChange={(e) =>
                  setSiderBarData({
                    ...sideBarData,
                    searchTerm: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="font-semibold">Sort:</label>
              <Select
                onChange={(e) =>
                  setSiderBarData({
                    ...sideBarData,
                    sort: e.target.value,
                  })
                }
                defaultValue={sideBarData.sort}
              >
                <option value="desc">Lastest</option>
                <option value="asc">Oldest</option>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <label className="font-semibold">Category:</label>
              <Select
                onChange={(e) =>
                  setSiderBarData({
                    ...sideBarData,
                    category: e.target.value,
                  })
                }
                defaultValue={sideBarData.category}
              >
                <option value="">Select Category</option>
                <option value="js">JavaScrip</option>
                <option value="reactjs">ReactJS</option>
                <option value="nodejs">NodeJs</option>
              </Select>
            </div>
          </form>
        </div>
        <div className="w-full">
          <h1 className="p-3 mt-5 text-3xl font-semibold sm:border-b border-slate-500">
            Posts Result : {postsSearch.length || 0}
          </h1>
          <div className="p-7 flex flex-wrap gap-4">
            {postsSearch.length === 0 && <p>Not Post Founds</p>}
            {isLoading && <p className="text-xl text-gray-500">Loading...</p>}
            {postsSearch &&
              postsSearch.map((post, index) => (
                <PostCard key={index} post={post} />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SearchPage;
