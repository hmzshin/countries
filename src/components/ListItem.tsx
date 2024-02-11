type Country = {
  name: string;
  code: string;
  capital: string;
};

interface ListItemProps {
  country: Country;
  active: string;
  setActive: Function;
}

const ListItem: React.FC<ListItemProps> = ({ country, active, setActive }) => {
  return (
    <li
      id={country.code}
      className={`w-[500px] border list-none cursor-pointer shadow-sm rounded-md p-2 ${
        active === country.code ? "bg-lime-100" : " bg-gray-50"
      }`}
      onClick={() => setActive(country.code)}
    >
      <p>Country name: {country.name}</p>
      <p>Country code: {country.code}</p>
      <p>Country capital: {country.capital}</p>
    </li>
  );
};

export default ListItem;
