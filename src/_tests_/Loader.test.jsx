import {render,screen} from "@testing-library/react";
import Loader from "../components/Loader";


describe("Loader",()=>{
    test("checking if Loader is found", ()=>{
        render(<Loader/>);
        const loaderContainer = screen.getByTestId("loader-container");
        expect(loaderContainer).toBeInTheDocument();
        const loader = screen.getByTestId("loader");
        expect(loader).toBeInTheDocument();
    })
})