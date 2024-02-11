import React, { createContext, ReactNode, useReducer } from "react";
type Country = {
  name: string;
  code: string;
  capital: string;
};

type InitialData = {
  countries: Country[];
};

type ActionType = "SET_COUNTRIES" | "FILTER_COUNTRIES" | "RESET_FILTER";

interface Action {
  type: ActionType;
  payload: Country[];
}

interface CountriesContextType {
  countries: InitialData;
  dispatchCountries: React.Dispatch<Action>;
}

const initialData: InitialData = {
  countries: [],
};

export const CountriesContextObject = createContext<CountriesContextType>({
  countries: initialData,
  dispatchCountries: () => {},
});

interface CountriesContextProviderProps {
  children: ReactNode;
}

const CountriesContextProvider: React.FC<CountriesContextProviderProps> = ({
  children,
}) => {
  const dataReducer = (state: InitialData, action: Action): InitialData => {
    switch (action.type) {
      case "SET_COUNTRIES":
        return { ...state, countries: action.payload };

      default:
        return state;
    }
  };

  const [countries, dispatchCountries] = useReducer(dataReducer, initialData);

  const contextValue: CountriesContextType = {
    countries,
    dispatchCountries,
  };

  return (
    <CountriesContextObject.Provider value={contextValue}>
      {children}
    </CountriesContextObject.Provider>
  );
};

export default CountriesContextProvider;
