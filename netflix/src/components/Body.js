import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormComponent from "./Login";
import Browser from "./Browser";
import { FormProvider } from "../context/FormContext";
// import Registration from "./Registration";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import { MovieProvider } from "../context/MovieContext";
import { SearchProvider } from "../context/useSearchContext";
import MovieDialog from "./MovieDialog";
function Body() {
  return (
    <MovieProvider>
    <FormProvider>
      <BrowserRouter>
      <SearchProvider>
        <div>
          <Header />
          <Toaster />
          <Routes>
            <Route path="/" element={<FormComponent />} />
            <Route path="/Browse" element={<Browser />} />
          </Routes>
          <MovieDialog />
        </div>
      </SearchProvider>
      </BrowserRouter>
    </FormProvider>
    </MovieProvider>
  );
}

export default Body;
