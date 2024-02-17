import { useContext } from "react";
import { useNavigate } from "react-router";
import slugify from "slugify";
import { CountriesContextObject } from "../context/countriesContext";

type Country = {
  name: string;
  code: string;
  capital: string;
};

interface ListItemProps {
  country: Country;
  randomColor: string;
}

const ListItem: React.FC<ListItemProps> = ({ country, randomColor }) => {
  const { dispatchCountries, countries } = useContext(CountriesContextObject);
  const active = countries.activeCountry;
  const navigate = useNavigate();

  function navigateToDetails(country: Country): void {
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

  function clickHandler(country: Country) {
    if (country.name === active.name)
      dispatchCountries({
        type: "RESET_ACTIVE_COUNTRY",
        payload: { name: "", code: "", capital: "" },
      });
    else {
      dispatchCountries({
        type: "SET_ACTIVE_COUNTRY",
        payload: country,
      });
    }
  }

  return (
    <tr
      id={country.code}
      className={`w-full flex justify-between items-center border cursor-pointer shadow-sm rounded-md p-2 ${
        active.code === country.code ? randomColor : "bg-gray-50"
      }`}
      onClick={() => clickHandler(country)}
    >
      <td className="w-52 ">{country.name}</td>
      <td className="w-20">{country.code}</td>
      <td className="w-40"> {country.capital}</td>

      <td onClick={() => navigateToDetails(country)}>
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
      </td>
    </tr>
  );
};

export default ListItem;
