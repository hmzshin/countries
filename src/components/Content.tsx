import { useContext, useEffect, useMemo, useState } from "react";
import { CountriesContextObject } from "../context/countriesContext";
import ListItem from "./ListItem";
import { useSearchParams } from "react-router-dom";
import GroupedDisplay from "./GroupedDisplay";

const Content = () => {
  const { countries } = useContext(CountriesContextObject);
  const active = countries?.activeCountry;
  const [group, setGroup] = useState<"languages" | "continents" | "">("");
  const [searchParams] = useSearchParams();
  const memoizedSearchParams = useMemo(() => searchParams, [searchParams]);

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
    const color = randomColors[number];
    setRandomColor(color);
    setRandomNumber(number);
  }, [active]);

  useEffect(() => {
    const urlParams: any = {};
    for (const entry of memoizedSearchParams.entries()) {
      urlParams[entry[0]] = entry[1];
    }
    const group = urlParams.group;
    if (group) {
      setGroup(group);
    } else {
      setGroup("");
    }
  }, [memoizedSearchParams]);

  return (
    <div className="w-[700px] m-auto flex flex-col items-center justify-between gap-2 pb-10 relative">
      <div className="w-full border p-2 rounded-md bg-slate-300 sticky top-0 flex justify-center items-center">
        <div className="w-full flex justify-between items-center">
          <p className="w-52 pl-5 text-left">Name</p>
          <p className="w-20 pr-7">Code</p>
          <p className="w-40 pl-5">Continent</p>
          <p className="w-40 pl-10">Currency</p>
          <p>Details</p>
        </div>
      </div>
      {group !== "" ? (
        <GroupedDisplay randomColor={randomColor} group={group} />
      ) : (
        <div className="w-full flex flex-col justify-between items-center gap-2">
          {countries?.countries?.map((country, i) => (
            <ListItem key={i} country={country} randomColor={randomColor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Content;
