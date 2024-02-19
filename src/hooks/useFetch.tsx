import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { CountriesContextObject } from "../context/countriesContext";

const useFetch = (initialValue?: any) => {
  const { dispatchCountries } = useContext(CountriesContextObject);
  const [query, setQuery] = useState(initialValue);

  async function fetchCountries(query: string): Promise<void> {
    const endpoint = "https://countries.trevorblades.com/graphql";

    try {
      const response: AxiosResponse = await axios.post(endpoint, {
        query: query,
      });

      const countriesData = response.data.data.countries;
      dispatchCountries({ type: "SET_COUNTRIES", payload: countriesData });
    } catch (error) {
      console.error(error);
      window.alert(
        "We are facing a problem connecting to the server. Please try again."
      );
    }
  }

  useEffect(() => {
    if (query) {
      fetchCountries(query);
    }
  }, [query]);

  return [setQuery];
};

export default useFetch;
