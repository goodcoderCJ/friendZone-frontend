/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { getUser } from "../features/redux-slice/userSlice";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import { FaUser, FaPen, FaTrash } from "react-icons/fa6";
import { Link, useParams, useNavigate } from "react-router-dom";
import DeleteUser from "../components/DeleteUser";

const Profile = () => {
  // initializing the dispatch function and the navigate function
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // getting the user, isLoading, isError and message from the redux store
  const { isLoading, user, isError, message } = useSelector(
    (state) => state.user
  );

  // getting the userId from the url through the useParams hook
  const { userId } = useParams();
  // getting the eachUser from the redux store
  const { eachUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        navigate("/signin");
      }

      dispatch(getUser(String(userId)));

      if (isError) {
        console.log(message);
      }
    };
    fetchData();
  }, [dispatch, isError, message, user, navigate, userId]);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  {
    isLoading && <Loader />;
  }
  return (
    <>
      <div className="p-[3rem]">
        <h3 className="text-red-800 font-bold text-2xl">Profile</h3>

        {/* user info for the signed in user  and  get that of others to show if they are not the signed in user*/}
        {String(user.id) === String(eachUser._id) ? (
          <div className="pt-[1.5rem] pb-[1rem] ">
            <div className="border-b-[1px] border-gray-300 flex flex-col sm:flex-row md:flex-row p-[0.3rem] sm:p-[1rem] md:p-[1rem] sm:items-center md:items-center sm:justify-between md:justify-between gap-4 sm:gap-0 md:gap-0">
              <div className="enclose flex gap-3 sm:gap-4 md:gap-4">
                <div className="profileIcon w-8 h-8 rounded-full bg-gray-400 flex justify-center items-center">
                  <FaUser className="text-white" />
                </div>
                <div className="userinfo flex flex-col gap-1">
                  <p className="font-bold text-[14px] sm:text-[16px] md:text-[16px]">
                    {eachUser.name}
                  </p>
                  <p className="text-gray-600 text-[14px] sm:text-[16px] md:text-[16px]">
                    {eachUser.email}
                  </p>
                </div>
              </div>
              <div className="edit-delete-icons-wrappper flex gap-3 sm:gap-4 md:gap-4 mb-[1rem] sm:mb-[0rem] md:mb-[0rem] ml-[3rem] sm:ml-[0rem] md:ml-[0rem]">
                <Link to={`/user/edit/${eachUser._id}`}>
                  {" "}
                  <FaPen className="text-[0.9rem] sm:text-[1rem] md:text-[1rem]" />
                </Link>
                <button>
                  {" "}
                  <FaTrash
                    className="text-red-700 text-[0.8rem] sm:text-[1rem] md:text-[1rem]"
                    onClick={handleOpen}
                  />
                </button>
              </div>
            </div>
            <div className="userdate-info mt-[0.7rem]">
              <p>Joined {new Date(eachUser.createdAt).toDateString()}</p>
            </div>
          </div>
        ) : (
          <div className="">
            <div className="border-b-[1px] border-gray-300 flex  gap-5 sm:gap-8 md:gap-12 p-[1rem] items-center">
              <div className="profileIcon w-8 h-8 rounded-full bg-gray-400  flex justify-center items-center">
                <FaUser className="text-white" />
              </div>
              <div className="userinfo flex flex-col gap-1">
                <p className="font-bold text-[14px] sm:text-[16px] md:text-[16px]">
                  {eachUser.name}
                </p>
                <p className="text-gray-600 text-[14px] sm:text-[16px] md:text-[16px]">
                  {eachUser.email}
                </p>
              </div>
            </div>
            <div className="userdate-info mt-[0.7rem]">
              <p>Joined {new Date(eachUser.createdAt).toDateString()}</p>
            </div>
          </div>
        )}
      </div>
      <DeleteUser isOpen={isOpen} setIsOpen={handleOpen} />
    </>
  );
};

export default Profile;
