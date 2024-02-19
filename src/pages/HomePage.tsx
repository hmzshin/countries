import { useContext } from "react";
import Content from "../components/Content";
import Header from "../components/Header";
import { CountriesContextObject } from "../context/countriesContext";

const HomePage = () => {
  const { countries } = useContext(CountriesContextObject);

  return (
    <>
      {countries.countries ? (
        <>
          <Header />
          <Content />
        </>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default HomePage;
