import { Icon } from "@iconify/react/dist/iconify.js";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

type Country = {
  capital: string;
  code: string;
  currency: string;
  emoji: string;
  name: string;
  native: string;
  phone: string;
};

const initialData = {
  capital: "",
  code: "",
  currency: "",
  emoji: "",
  name: "",
  native: "",
  phone: "",
};

const DetailPage = () => {
  const { countryCode } = useParams();
  const [country, setCountry] = useState<Country>(initialData);
  const navigate = useNavigate();

  async function fetchCountries(query: string): Promise<void> {
    const endpoint = "https://countries.trevorblades.com/graphql";

    try {
      const response: AxiosResponse = await axios.post(endpoint, {
        query: query,
      });

      const countryData = response.data.data.country;
      setCountry(countryData);
      console.log("Countries Data:", countryData);
    } catch (error) {
      console.error(error);
      window.alert(
        "Sunucuya bağlanırken bir sorunla karştık. Lüstfen tekrar deneyin."
      );
    }
  }

  function resetCountry() {
    setCountry(initialData);
  }

  useEffect(() => {
    if (countryCode) {
      const query = `query Country {
      country(code: "${countryCode.toUpperCase()}") {
          capital
          code
          currency
          emoji
          name
          native
          phone
    
      }
  }`;
      fetchCountries(query);
    }
    return resetCountry;
  }, [countryCode]);

  return (
    <section className="w-[500px] flex flex-col justify-center items-center m-auto pt-10">
      <div className="self-start " onClick={() => navigate(-1)}>
        <Icon icon="ic:baseline-arrow-back-ios" className="w-7 h-7" />
      </div>
      {country.name ? (
        <div
          className="flex flex-col items-start justify-center w-full pl-40 gap-2  border m-auto mt-1
        "
        >
          <h1>Name:{country.name}</h1>
          <p>Capital:{country.capital}</p>
          <p>Code:{country.code}</p>
          <p>Currency:{country.currency}</p>
          <p>Flag:{country.emoji}</p>
          <p>Native Name: {country.native}</p>
          <p>Phone Code: +{country.phone}</p>
        </div>
      ) : (
        <div>loading</div>
      )}
    </section>
  );
};

export default DetailPage;
