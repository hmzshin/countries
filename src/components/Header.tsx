import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { CountriesContextObject } from "../context/countriesContext";
type FormData = {
  filter: string;
  group: string;
  filterBy: string;
};

const Header = () => {
  const [formData, setFormData] = useState<FormData>({
    filterBy: "default",
    filter: "",
    group: "default",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const memoizedSearchParams = useMemo(() => searchParams, [searchParams]);
  const [fetchCountries] = useFetch();

  const { dispatchCountries, countries } = useContext(CountriesContextObject);

  function inputChangeHandler(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function submitHandler(e: FormEvent): void {
    e.preventDefault();
    if (
      formData.filter === "" &&
      formData.group === "default" &&
      formData.filterBy === "default"
    ) {
      window.alert("Please enter the word you want to search.");
    } else if (
      formData.filter === "" &&
      formData.group !== "default" &&
      formData.filterBy === "default"
    ) {
      setSearchParams({ group: formData.group });
      window.alert(`Results grouped by ${formData.group}`);
    } else if (
      formData.group === "default" &&
      formData.filterBy !== "default"
    ) {
      setSearchParams({ filterBy: formData.filterBy, filter: formData.filter });
    } else if (
      formData.filter !== "" &&
      formData.group !== "default" &&
      formData.filterBy !== "default"
    ) {
      setSearchParams({
        filterBy: formData.filterBy,
        filter: formData.filter,
        group: formData.group,
      });
    }
  }

  function resetFilter(): void {
    const filter = searchParams.get("filter");
    const group = searchParams.get("group");
    const filterBy = searchParams.get("filterBy");
    if (filter == null && filterBy == null && group != null) {
      dispatchCountries({
        type: "RESET_ACTIVE_COUNTRY",
        payload: countries?.countries[9],
      });
    }
    if (filter || group || filterBy) {
      searchParams.delete("filter");
      searchParams.delete("group");
      searchParams.delete("filterBy");
      setSearchParams(searchParams);
    }

    setFormData({ filter: "", group: "default", filterBy: "default" });
  }

  function queryMaker(filter: string, filterBy: string, group: string): string {
    let query = "";
    if (filter && filterBy && group) {
      setFormData({ filter, filterBy, group });
      query = `query Countries {
        countries(filter: { ${filterBy}: { regex: "${filter}" } }) {
          name
          code
          currencies
          continent {
              name
          }
          languages {
            name
          }
      }}`;
    } else if (filter && filterBy) {
      setFormData({ filter, filterBy, group: "default" });
      query = `query Countries {
        countries(filter: { ${filterBy}: { regex: "${filter}" } }) {
          name
          code
          currencies
          continent {
              name
          }
          languages {
            name
          }
      }}`;
    } else if (group) {
      setFormData({ filter: "", filterBy: "default", group });
      query = `
        query Countries {
        countries {
        name
        code
        currencies
        continent {
            name
        }
        languages {
          name
      }
      }}`;
    } else {
      query = `
        query Countries {
        countries {
        name
        code
        currencies
        continent {
            name
        }
        languages {
          name
      }
      }}`;
    }
    return query;
  }

  useEffect(() => {
    const urlParams: any = {};
    for (const entry of memoizedSearchParams.entries()) {
      urlParams[entry[0]] = entry[1];
    }
    const filter = urlParams.filter;
    const group = urlParams.group;
    const filterBy = urlParams.filterBy;
    const query = queryMaker(filter, filterBy, group);
    if (query !== "") {
      fetchCountries(query);
    }
  }, [memoizedSearchParams]);

  return (
    <section className="flex flex-col items-center justify-center gap-5 py-10">
      <h1 className="text-sky-400 text-4xl flex items-center justify-center ">
        Frontend Developer Assignment
      </h1>
      <div className="flex gap-2">
        <form
          className="flex items-center justify-center gap-5"
          onSubmit={(e) => submitHandler(e)}
        >
          <label className="flex gap-1">
            <select
              id="filterBy"
              name="filterBy"
              className="border pl-1"
              onChange={(e) => inputChangeHandler(e)}
              value={formData.filterBy}
            >
              <option value="default" hidden disabled>
                Filter by
              </option>
              <option value="code">Code</option>
              <option value="continent">Continent</option>
              <option value="currency">Currency</option>
              <option value="name">Name</option>
            </select>
            <p>:</p>
          </label>

          <input
            id="filter"
            name="filter"
            type="text"
            className="border pl-1"
            onChange={(e) => inputChangeHandler(e)}
            value={formData.filter}
            placeholder="Type here to filter"
          />

          <select
            id="group"
            name="group"
            className="border pl-1"
            onChange={(e) => inputChangeHandler(e)}
            value={formData.group}
          >
            <option value="default" hidden disabled>
              Group by
            </option>
            <option value="languages">Language</option>
            <option value="continents">Continent</option>
          </select>

          <button type="submit" className="btn">
            Search
          </button>
        </form>
        <div className="btn" onClick={resetFilter}>
          Reset Filter
        </div>
      </div>
    </section>
  );
};

export default Header;
