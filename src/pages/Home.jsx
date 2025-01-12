import friendPix from "../assets/beautiful-young-girls-posing-outdoors.jpg";
import interRace from "../assets/interracial-students-has-fun-laughs-cheerfully-park.jpg";
import {Link} from "react-router-dom";


const Home = () => {
  return (
    <div className="mt-[2rem] mb-[2rem]">
      <div className="home-content mx-[3rem]">
        <div className="text-caption my-[3rem] py-[1rem]">
          <h1 className="text-xl font-bold md:w-[500px]">FriendZone your arena to catch that pal of yours. Yeah tell them you got them</h1>
        </div>
        <div className="home-image py-[1rem] my-[2rem]">
          <img src={friendPix} alt="two girl friends together" className=""/>
        </div>
        <div className="join-btn my-[2rem] sm:my-[3rem] md:my-[3rem]">
         <Link to="/signup" className="py-[0.6rem] px-[1rem] text-white bg-blue-700 rounded-[5px]">Join FriendZone</Link>
        </div>

        <section>
          <div className="text-caption mx-[1rem] py-[1rem] flex gap-4 flex-col sm:flex-row lg:flex-row">
            <div className="sm:w-[50%] md:w-[50%] md:flex md:items-center sm:flex sm:items-center">
            <h3 className="text-lg">FriendZone is a social media platform that connects you with friends and family. We know you by your name not colour</h3>
            </div>
            <div className="md:w-[50%] sm:w-[50%]">
            <img src={interRace} alt="two friends of dffent race" className="rounded-md"/>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
