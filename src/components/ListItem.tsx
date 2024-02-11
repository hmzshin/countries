import { useContext } from "react";
import { useNavigate } from "react-router";
import slugify from "slugify";
import { CountriesContextObject } from "../context/countiresContext";

type Country = {
  name: string;
  code: string;
  capital: string;
};

interface ListItemProps {
  country: Country;
}

const ListItem: React.FC<ListItemProps> = ({ country }) => {
  const { dispatchCountries, countries } = useContext(CountriesContextObject);
  const active = countries.activeCounry;
  const navigate = useNavigate();

  function clickHandler(country: Country): void {
    const slug = slugify(country.name, {
      replacement: "-",
      remove: undefined,
      lower: true,
      strict: false,
      locale: "en",
      trim: true,
    });
    navigate(`/${country.code.toLowerCase()}/${slug}`);
  }

  return (
    <li
      id={country.code}
      className={`w-[500px] flex justify-between items-center border list-none cursor-pointer shadow-sm rounded-md p-2 ${
        active.code === country.code ? "bg-lime-100" : " bg-gray-50"
      }`}
      onClick={() =>
        dispatchCountries({ type: "SET_ACTIVE_COUNTRY", payload: country })
      }
    >
      <div>
        <p>Country name: {country.name}</p>
        <p>Country code: {country.code}</p>
        <p>Country capital: {country.capital}</p>
      </div>
      <div onClick={() => clickHandler(country)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <title>Click here to see more information</title>
          <path
            fill="currentColor"
            d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A.998.998 0 0 0 5 3v18a1 1 0 0 0 .536.886M7 4.909L17.243 12L7 19.091z"
          />
        </svg>
      </div>
    </li>
  );
};

export default ListItem;
