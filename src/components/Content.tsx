import { useContext } from "react";
import { CountriesContextObject } from "../context/countiresContext";
import ListItem from "./ListItem";

const Content = () => {
  const { countries } = useContext(CountriesContextObject);

  return (
    <section className="flex flex-col items-center justify-center gap-2 pb-10">
      {countries.countries.map((country, i) => (
        <ListItem key={i} country={country} />
      ))}
    </section>
  );
};

export default Content;
