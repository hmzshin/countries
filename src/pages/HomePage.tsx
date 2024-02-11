import { useContext, useEffect, useMemo } from "react";
import Content from "../components/Content";
import Header from "../components/Header";
import { useSearchParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { CountriesContextObject } from "../context/countiresContext";

const HomePage = () => {
  const { dispatchCountries, countries } = useContext(CountriesContextObject);
  const [searchParams] = useSearchParams();
  const memoizedSearchParams = useMemo(() => searchParams, [searchParams]);

  async function fetchCountries(query: string): Promise<void> {
    const endpoint = "https://countries.trevorblades.com/graphql";

    try {
      const response: AxiosResponse = await axios.post(endpoint, {
        query: query,
      });

      const countriesData = response.data.data.countries;
      dispatchCountries({ type: "SET_COUNTRIES", payload: countriesData });
      console.log("Countries Data:", countriesData);
    } catch (error) {
      console.error(error);
      window.alert(
        "Sunucuya bağlanırken bir sorunla karştık. Lüstfen tekrar deneyin."
      );
    }
  }

  useEffect(() => {
    if (memoizedSearchParams.has("filter")) {
      const urlParams: any = {};
      for (const entry of searchParams.entries()) {
        urlParams[entry[0]] = entry[1];
      }
      const query = `
    query Countries {
      countries(filter: { name: { regex: "${urlParams.filter}" } }) {
        name
        capital
        code
      }
    }
    `;
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
        <div>yükleniyor</div>
      )}
    </>
  );
};

export default HomePage;
