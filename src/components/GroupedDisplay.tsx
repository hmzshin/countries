import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { CountriesContextObject } from "../context/countriesContext";
import ListItem from "./ListItem";
import useFetch from "../hooks/useFetch";
type PropTypes = {
  randomColor: string;
  group: "languages" | "continents";
};
type Continent = {
  name: string;
};
type CountryType = {
  name: string;
  code: string;
  currencies: string[];
  continent: Continent;
  languages: Continent[];
};

type FilteredData = {
  lang: string;
  countries: CountryType[];
};

const GroupedDisplay = ({ randomColor, group }: PropTypes) => {
  const { countries, dispatchCountries } = useContext(CountriesContextObject);
  const [filteredData, setFilteredData] = useState<FilteredData[]>([]);
  const [fetchCountries] = useFetch();

  async function fetchData(): Promise<void> {
    const endpoint = "https://countries.trevorblades.com/graphql";

    try {
      const response: AxiosResponse = await axios.post(endpoint, {
        query: `query Continents {
            ${group} {
                name
            }
        }`,
      });
      const data = response.data.data[group];
      if (group === "languages") {
        dispatchCountries({ type: "SET_LANGUAGES", payload: data });
      } else {
        dispatchCountries({ type: "SET_CONTINENTS", payload: data });
      }
    } catch (error) {
      console.error(error);
      window.alert(
        "We are facing a problem connecting to the server. Please try again."
      );
    }
  }

  useEffect(() => {
    if (countries.countries.length === 0) {
      const query = `
        query Countries {
        countries {
        name
        code
        currencies
        continent {
            name
        }
        languages {
          name
      }
      }}`;
      fetchCountries(query);
    }
  }, []);

  useEffect(() => {
    if (countries[group].length === 0) {
      fetchData();
    }
  }, [group]);

  useEffect(() => {
    const array = [];
    const data = countries[group];
    let arrayForTenthItem: any[] = [];
    if (group === "languages" && data) {
      for (let i = 0; i < data.length; i++) {
        const filteredCounties = countries.countries.filter((country) =>
          country.languages.map((lang) => lang.name).includes(data[i].name)
        );
        if (arrayForTenthItem.length <= 10) {
          arrayForTenthItem = arrayForTenthItem.concat(filteredCounties);
        }

        if (filteredCounties.length > 0) {
          array.push({ lang: data[i].name, countries: filteredCounties });
        }
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        const filteredCounties = countries.countries.filter(
          (country) => country.continent.name === data[i].name
        );
        if (arrayForTenthItem.length <= 10) {
          arrayForTenthItem = arrayForTenthItem.concat(filteredCounties);
        }
        if (filteredCounties.length > 0) {
          array.push({ lang: data[i].name, countries: filteredCounties });
        }
      }
    }
    setFilteredData([...array]);
    if (arrayForTenthItem.length >= 10) {
      dispatchCountries({
        type: "SET_ACTIVE_COUNTRY",
        payload: arrayForTenthItem[9],
      });
    } else {
      dispatchCountries({
        type: "SET_ACTIVE_COUNTRY",
        payload: arrayForTenthItem[arrayForTenthItem.length - 1],
      });
    }
  }, [group, countries[group]]);

  return (
    <>
      {countries?.countries ? (
        <div className="w-full flex flex-col justify-between items-center gap-2">
          {filteredData?.map((item, i) => (
            <div key={i} className={`w-full ${i === 1 ? "hidden" : "block"}`}>
              <p className="text-left bg-gray-200 w-full py-1 pl-3 ">
                {group === "languages" ? "Language" : "Continent"}: {item.lang}
              </p>
              <div className="border w-full flex flex-col justify-between items-center gap-2">
                {item.countries.map((country, i) => (
                  <ListItem
                    key={i}
                    country={country}
                    randomColor={randomColor}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default GroupedDisplay;
