import { useContext, useState } from "react";
import { CountriesContextObject } from "../context/globalData";
import ListItem from "./ListItem";

const Content = () => {
  const { countries } = useContext(CountriesContextObject);
  const [active, setActive] = useState<string>("");

  return (
    <section className="flex flex-col items-center justify-center gap-2">
      {countries.countries.map((country, i) => (
        <ListItem
          key={i}
          country={country}
          active={active}
          setActive={setActive}
        />
      ))}
    </section>
  );
};

export default Content;
