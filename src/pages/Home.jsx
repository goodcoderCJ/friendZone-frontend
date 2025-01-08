import friendPix from "../assets/beautiful-young-girls-posing-outdoors.jpg"



const Home = () => {
  return (
    <div className="mt-[2rem] mb-[2rem]">
      <div className="home-content mx-[3rem]">
        <div className="text-caption mx-[1rem] py-[1rem]">
          <p>Home page</p>
        </div>
        <div className="home-image">
          <img src={friendPix} alt="two girl friends together" />
        </div>
      </div>
    </div>
  );
};

export default Home;
