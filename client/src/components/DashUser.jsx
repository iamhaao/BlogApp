import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../api/post.api";
import Toast from "../shared/Toast";
import { Button, Modal, ModalBody, ModalHeader, Table } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useMutation } from "react-query";
import { getUsersSuccess } from "../redux/user/userSlice";
import Pagination from "./Pagination";
import { deleteUser, getUsers } from "../api/user.api";
import { FcCheckmark } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";

function DashUser() {
  const { currentUser, users, page, pages } = useSelector(
    (state) => state.user
  );
  const [showModal, setShowModal] = useState(false);
  const [userIdDelete, setUserIdDelete] = useState();
  const dispatch = useDispatch();

  const { mutate: getUser } = useMutation(getUsers, {
    onSuccess: (data) => {
      dispatch(getUsersSuccess(data));
    },
  });
  const handleOnchagePage = (data) => {
    getUser({ page: data });
  };
  const { mutate, isSuccess } = useMutation(deleteUser, {
    onSuccess: () => {
      Toast({ message: "Delete User Success!", type: "SUCCESS" });
    },
    onError: (error) => {
      Toast({ message: error.message, type: "ERROR" });
    },
  });

  useEffect(() => {
    getUser({ page });
  }, [currentUser._id, isSuccess]);

  const handleDeleteUser = async () => {
    mutate(userIdDelete);
    setShowModal(false);
  };
  return (
    <div className="table-auto overflow-x-auto md:w-full p-3 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 scrollbar scrollbar-thumb-slate-300 scrollbar-track-slate-100">
      {currentUser.isAdmin > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Created At</Table.HeadCell>
              <Table.HeadCell>Avatar</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>
                <span className="hidden md:block">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body className="divide-y" key={user._id}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-14 h-14 object-cover object-center"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <p className="font-medium">{user.username}</p>
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      {user.isAdmin ? (
                        <FcCheckmark className="w-6 h-6" />
                      ) : (
                        <FcCancel className="w-6 h-6" />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setUserIdDelete(user._id);
                        }}
                        className="font-medium hover:underline cursor-pointer text-red-500"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
          <Pagination
            page={page}
            pages={pages}
            onPageChange={handleOnchagePage}
          />
        </>
      ) : (
        <p>Not Post Yet</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        size={"md"}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="w-14 h-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className=" mb-5 text-lg text-gray-500 dark:text-gray-200">
              Are you sure you want to delete this User ?
            </h3>
            <div className="flex justify-between">
              <Button onClick={handleDeleteUser} color="failure">
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default DashUser;
