const Footer = () => {
  return (
    <div className="mt-[2rem] py-[1rem] bg-blue-700 text-white text-[0.4rem] sm:text-[0.6rem] md:text-[0.8rem]">
      <div className="footer-text mx-[3rem] text-[14px] sm:text-[16px] md:text-[16px] flex flex-col gap-1 items-center justify-center sm:flex-row sm:justify-between sm:gap-0 md:flex-row md:justify-between md:gap-0 ">
        <p>Welcome to friendZone web arena</p>
        <p>Powered by friendZond {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default Footer;
