import { useContext, useEffect, useState } from "react";
import { CountriesContextObject } from "../context/countriesContext";
import ListItem from "./ListItem";

const Content = () => {
  const { countries } = useContext(CountriesContextObject);
  const active = countries.activeCountry;

  const [randomNumber, setRandomNumber] = useState<number>(0);
  const [randomColor, setRandomColor] = useState<string>("");

  const randomColors = [
    "bg-customColor1",
    "bg-customColor2",
    "bg-customColor3",
    "bg-customColor4",
    "bg-customColor5",
    "bg-customColor6",
  ];

  function createRandomNumber() {
    const number = Math.floor(Math.random() * 6);
    return number;
  }

  useEffect(() => {
    let number = createRandomNumber();
    while (randomNumber === number) {
      number = createRandomNumber();
    }
    console.log("number", number);
    const color = randomColors[number];
    setRandomColor(color);
    setRandomNumber(number);
  }, [active]);

  return (
    <table className="w-[600px] m-auto flex flex-col items-center justify-between gap-2 pb-10 relative">
      <tr className="w-full border p-2 rounded-md bg-slate-300 sticky top-0 flex justify-between items-center">
        <th className="w-52 pr-10">Name</th>
        <th className="w-20 pr-7">Code</th>
        <th className="w-40">Capital</th>
        <th>Details</th>
      </tr>
      {countries.countries.map((country, i) => (
        <ListItem key={i} country={country} randomColor={randomColor} />
      ))}
    </table>
  );
};

export default Content;
