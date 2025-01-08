/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { deleteUser } from "../features/redux-slice/userSlice";
import { useNavigate, useParams } from "react-router-dom";

const DeleteUser = ({ isOpen, setIsOpen }) => {
  // initializing the dispatch function
  const dispatch = useDispatch();

  // function to handle the cancel button
  const handleCancel = (e) => {
    e.preventDefault();
    return setIsOpen();
  };
  // initializing the navigate function
  const navigate = useNavigate();
  // getting the userId from the url through the useParams hook
  const { userId } = useParams();

  // function to handle the deleting of the user account
  const handleOnDelete = (e) => {
    e.preventDefault();
    dispatch(deleteUser(String(userId)));
    navigate("/");
  };

  return (
    <div>
      {isOpen && (
        <>
          {/* first div is the overlay created for the deletion */}
          <div
            className="overlay  left-[0] top-[0]  w-screen opacity-[0.5] fixed h-screen border-[1px] border-red-800 z-40 bg-gray-700"
            onClick={handleOnDelete}
          ></div>
          {/* Modal for the delete component */}
          <div className="modal z-50 absolute top-[8rem] left-[2rem] right-[2rem] sm:left-[8rem] sm:right-[8rem] md:left-[9rem] md:right-[9rem] bottom-0">
            <div className="py-[2rem] px-[1rem]  bg-white rounded-[5px] ">
              <h3 className="text-xl mb-[0.4rem]">Delete Account</h3>
              <div className="confirm-delete">
                <p className="text-[14px] sm:text-[15px] md:text-[16px] text-gray-500">
                  Confirm to delete your account
                </p>
                <div className="btns flex gap-4 justify-end mt-[1.5rem]">
                  <button className=" rounded-[5px]" onClick={handleCancel}>
                    CANCEL
                  </button>
                  <button
                    className="text-red-500 rounded-[5px]"
                    onClick={handleOnDelete}
                  >
                    CONFIRM
                  </button>
                </div>
              </div>
            </div>
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default DeleteUser;
