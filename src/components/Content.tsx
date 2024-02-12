import { useContext, useEffect, useState } from "react";
import { CountriesContextObject } from "../context/countiresContext";
import ListItem from "./ListItem";

const Content = () => {
  const { countries } = useContext(CountriesContextObject);
  const active = countries.activeCounry;

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
    <section className="flex flex-col items-center justify-center gap-2 pb-10">
      {countries.countries.map((country, i) => (
        <ListItem key={i} country={country} randomColor={randomColor} />
      ))}
    </section>
  );
};

export default Content;
