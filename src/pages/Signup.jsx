import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../features/redux-slice/userSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // initializing the dispatch function and the navigate function
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // getting the isError from the redux store
  const { isError } = useSelector((state) => state.user);

  // setting the user data to an empty object
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // destructuring the name, email and password from the userData
  const { name, email, password } = userData;

  // function to handle the change of the input field
  const onChangeHandler = (e) => {
    e.preventDefault();
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // function to handle the submission of the form
  const onSubmitForm = (e) => {
    e.preventDefault();
    if (name.length === 0 || email.length === 0 || password.length === 0) {
      return toast.error("Please fill all the fields");
    } else {
      dispatch(createUser(userData));
      toast.success("Signup sucessfully");
      setUserData({
        name: "",
        email: "",
        password: "",
      });
      navigate("/signin");
      if (isError) toast.error("Signup failed");
    }
  };

  return (
    <div className="mx-[5rem] mt-[2rem]">
      <div className="flex items-center justify-center">
        <h3 className="text-xl">Signup</h3>
      </div>

      <form onSubmit={onSubmitForm}>
        <div className="form-control py-[0.5rem]   mb-[0.3rem] sm:mb-[0.7rem] md:mb-[0.7rem] flex flex-col sm:flex-row md:flex-row gap-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={onChangeHandler}
            className="sm:flex-1 md:flex-1 pl-[1rem] outline-none border-[1px] border-gray-400 rounded-[5px]"
          />
        </div>

        <div className="form-control py-[0.5rem]   mb-[0.3rem] sm:mb-[0.7rem] md:mb-[0.7rem] flex flex-col sm:flex-row md:flex-row gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={onChangeHandler}
            className="sm:flex-1 md:flex-1 pl-[1rem] outline-none border-[1px] border-gray-400 rounded-[5px]"
          />
        </div>

        <div className="form-control py-[0.5rem]   mb-[0.3rem] sm:mb-[0.7rem] md:mb-[0.7rem] flex flex-col sm:flex-row md:flex-row gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            id="password"
            value={password}
            onChange={onChangeHandler}
            className="sm:flex-1 md:flex-1 pl-[1rem] outline-none border-[1px] border-gray-400 rounded-[5px]"
          />
        </div>
        <div className="btn-container flex justify-center items-center mt-[2rem]">
          <button
            type="submit"
            className="rounded-[5px] bg-blue-800 text-white py-[0.5rem] px-[1rem]"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
