import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { listUsers } from "../features/redux-slice/userSlice";
import Loader from "../components/Loader";
import { FaUser, FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Userslist = () => {
  // initializing the dispatch function
  const dispatch = useDispatch();

  // getting the isLoading, isSuccess, isError, message and allUsers from the redux store
  const { isLoading, isSuccess, isError, message, allUsers } = useSelector(
    (state) => state.user
  );

  // function to fetch the data of all the users from the backend incorporated into the redux store : listUsers()
  const fetchData = useCallback(async () => {
    dispatch(listUsers());

    if (isError) {
      console.log(message);
    }
  }, [dispatch, isError, message]);


  // useEffect hook to call the fetchData function
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="py-[1rem] px-[3rem] shadow-md">
      {isLoading && <Loader />}

      <h3 className="text-2xl mt-[1rem]" data-testid="userslist">All Users</h3>
      <div className="my-[1.5rem]">
        {/* show only when no user has been created */}
        {allUsers.length === 0 && (<><p className="text-xl text-red-700 font-bold">No user created yet</p></>)}
        {/* getting all the users */}
        {allUsers &&
          allUsers.map((user) => {
            return (
              <div key={user._id} className="flex  mt-[1rem] items-center">
                <Link
                  to={`/user/${user._id}`}
                  className="flex justify-between items-center flex-1"
                  key={user._id}
                >
                  <div className="flex gap-4 items-center">
                    <div className="userIcon py-4 w-8 h-8 rounded-full flex items-center justify-center bg-gray-400">
                      <FaUser className=" text-white" />
                    </div>
                    <p>{user.name}</p>
                  </div>
                  <div className="flex">
                    <FaArrowRightLong />
                  </div>
                </Link>
              </div>
            );
          })}
        {!isSuccess && (
          <p className="text-red-800 font-bold">Still fetching users data </p>
        )}
      </div>
    </div>
  );
};

export default Userslist;
