import React, { createContext, ReactNode, useReducer } from "react";

type Object = {
  name: string;
};

type Country = {
  name: string;
  code: string;
  currencies: string[];
  continent: Object;
  languages: Object[];
};

type InitialData = {
  languages: Object[];
  continents: Object[];
  countries: Country[];
  activeCountry: Country;
};

type ActionType =
  | "SET_COUNTRIES"
  | "SET_ACTIVE_COUNTRY"
  | "RESET_ACTIVE_COUNTRY"
  | "SET_LANGUAGES"
  | "SET_CONTINENTS";

interface Action {
  type: ActionType;
  payload: any;
}

interface CountriesContextType {
  countries: InitialData;
  dispatchCountries: React.Dispatch<Action>;
}

const initialData: InitialData = {
  languages: [],
  continents: [],
  countries: [],
  activeCountry: {
    name: "",
    code: "",
    currencies: [],
    continent: { name: "" },
    languages: [],
  },
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
            countries: [...action.payload],
            activeCountry: action.payload[9],
          };
        } else {
          return {
            ...state,
            countries: [...action.payload],
            activeCountry: action.payload[action.payload.length - 1],
          };
        }

      case "SET_LANGUAGES":
        return { ...state, languages: [...action.payload] };

      case "SET_CONTINENTS":
        return { ...state, continents: [...action.payload] };

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
