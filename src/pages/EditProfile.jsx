import { useState} from "react";
import {  useSelector } from "react-redux";
import { toast } from "react-toastify";
import {  useNavigate,useParams } from "react-router-dom";
import axios from "axios"

const EditProfile = () => {
  
// initializing vaiables for the user, useNavigate and useParams
  const navigate = useNavigate();
  const { userId } = useParams();
  const {eachUser} = useSelector((state)=> state.user);



  // setting the updated name to the current name of the user
  const [updatedName, setUpdatedName] = useState(eachUser.name);

  // function to handle the change of the input field
  const onChangeHandler = (e) => {
    setUpdatedName(e.target.value);
  }

  // function to handle the update of the user profile
  const handleUpdate = async (e) => {
try{
  e.preventDefault();
  if(updatedName === ""){
    return toast.error("Name is required");
  }

  const userData = {
    name: updatedName,
  };
 const token = JSON.parse(localStorage.getItem("user")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
    
}
const response = await axios.patch(`https://friendzone-backend-5l78.onrender.com/api/users/${userId}`, userData ,config);
 
if(response.data){
  navigate(`/user/${userId}`);
  toast.success("Profile Updated Successfully");
  
}
return response.data;
}catch(err){
  console.log(err)
}
}
  
  return (
    <div className="mx-[5rem] mt-[2rem]">
      <div className="flex items-center justify-center">
        <h3 className="text-xl text-red-500">Edit Profile</h3>
      </div>
      <form >
        <div className="form-control py-[0.5rem] mb-[0.3rem] sm:mb-[0.7rem] md:mb-[0.7rem] flex flex-col md:flex-row gap-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={updatedName}
            id= "name"
            onChange={onChangeHandler}
            className="sm:flex-1 md:flex-1 pl-[1rem] outline-none border-[1px] border-gray-400 rounded-[5px]"
          />
        </div>
        <div className="btn-container flex justify-center items-center mt-[2rem]">
          <button
           
            className="rounded-[5px] bg-blue-800 text-white py-[0.5rem] px-[1rem]"
            onClick={handleUpdate}
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
