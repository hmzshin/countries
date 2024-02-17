import React, { createContext, ReactNode, useReducer } from "react";
type Country = {
  name: string;
  code: string;
  capital: string;
};

type InitialData = {
  countries: Country[];
  activeCountry: Country;
};

type ActionType =
  | "SET_COUNTRIES"
  | "SET_ACTIVE_COUNTRY"
  | "RESET_ACTIVE_COUNTRY";

interface Action {
  type: ActionType;
  payload: any;
}

interface CountriesContextType {
  countries: InitialData;
  dispatchCountries: React.Dispatch<Action>;
}

const initialData: InitialData = {
  countries: [],
  activeCountry: { name: "", code: "", capital: "" },
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
        if (action.payload.length >= 10) {
          return {
            ...state,
            countries: action.payload,
            activeCountry: action.payload[9],
          };
        } else {
          return {
            ...state,
            countries: action.payload,
            activeCountry: action.payload[action.payload.length - 1],
          };
        }

      case "SET_ACTIVE_COUNTRY":
        return { ...state, activeCountry: action.payload };

      case "RESET_ACTIVE_COUNTRY":
        return { ...state, activeCountry: action.payload };

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
