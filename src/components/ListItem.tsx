import { useContext } from "react";
import { useNavigate } from "react-router";
import slugify from "slugify";
import { CountriesContextObject } from "../context/countriesContext";
type Object = {
  name: string;
};

type Country = {
  name: string;
  code: string;
  currencies: string[];
  continent: Object;
};

interface ListItemProps {
  country: Country;
  randomColor: string;
}

const ListItem: React.FC<ListItemProps> = ({ country, randomColor }) => {
  const { dispatchCountries, countries } = useContext(CountriesContextObject);
  const active = countries?.activeCountry;
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

  return country ? (
    <div
      id={country.code}
      className={`w-full flex justify-between items-center border cursor-pointer shadow-sm rounded-md p-2 ${
        active.code === country.code ? randomColor : "bg-gray-50"
      }`}
      onClick={() => clickHandler(country)}
    >
      <p className="w-52 ">{country.name}</p>
      <p className="w-20 pl-2">{country.code}</p>
      <p className="w-40 pl-7"> {country.continent.name}</p>
      <p className="w-40 pl-10 flex flex-wrap">
        {" "}
        {country.currencies.map((currency, index) =>
          country.currencies.length - 1 === index ? (
            <span key={index}>{currency}</span>
          ) : (
            <span className="mr-1" key={index}>{`${currency},`}</span>
          )
        )}
      </p>

      <p onClick={() => navigateToDetails(country)}>
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
      </p>
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default ListItem;
