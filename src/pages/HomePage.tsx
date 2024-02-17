import { useContext, useEffect, useMemo } from "react";
import Content from "../components/Content";
import Header from "../components/Header";
import { useSearchParams } from "react-router-dom";
import { CountriesContextObject } from "../context/countriesContext";
import useFetch from "../hooks/useFetch";

const HomePage = () => {
  const { countries } = useContext(CountriesContextObject);
  const [searchParams] = useSearchParams();
  const memoizedSearchParams = useMemo(() => searchParams, [searchParams]);
  const [fetchCountries] = useFetch();

  useEffect(() => {
    if (memoizedSearchParams.has("filter")) {
      const urlParams: any = {};
      for (const entry of searchParams.entries()) {
        urlParams[entry[0]] = entry[1];
      }
      const query = `query Countries {
        countries(filter: { name: { regex: "${urlParams.filter}" } }) {
        name
        capital
        code
      }}`;
      fetchCountries(query);
      console.log(query);
    }

    if (
      !memoizedSearchParams.has("filter") &&
      !memoizedSearchParams.has("group")
    ) {
      const query = `
    query Countries {
    countries {
      name
      capital
      code
    }
     }
   `;
      fetchCountries(query);
    }
  }, [memoizedSearchParams]);

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
