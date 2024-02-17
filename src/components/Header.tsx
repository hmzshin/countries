import { ChangeEvent, FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
type FormData = {
  filter: string;
  group: string;
};

const Header = () => {
  const [formData, setFormData] = useState<FormData>({ filter: "", group: "" });
  const [searchParams, setSearchParams] = useSearchParams();

  function inputChangeHandler(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function submitHandler(e: FormEvent): void {
    e.preventDefault();
    if (formData.filter === "" && formData.group === "") {
      window.alert("Please enter the word you want to search.");
    } else if (formData.filter === "") {
      setSearchParams({ group: formData.group });
    } else if (formData.group === "") {
      setSearchParams({ filter: formData.filter });
    } else {
      setSearchParams(formData);
    }
  }

  function resetFilter() {
    const filter = searchParams.get("filter");
    const group = searchParams.get("group");
    if (filter || group) {
      searchParams.delete("filter");
      searchParams.delete("group");
      setSearchParams(searchParams);
    }
    console.log(filter);
  }

  return (
    <section className="flex flex-col items-center justify-center gap-5 py-10">
      <h1 className="text-sky-400 text-4xl flex items-center justify-center ">
        Frontend Developer Assignment
      </h1>
      <div className="flex gap-2">
        <form className="flex gap-5" onSubmit={(e) => submitHandler(e)}>
          <label className="flex gap-2 items-center">
            Filter
            <input
              id="filter"
              name="filter"
              type="text"
              className="border pl-1"
              onChange={(e) => inputChangeHandler(e)}
            />
          </label>

          <label className="flex gap-2 items-center">
            Group{" "}
            <select
              id="group"
              name="group"
              className="border pl-1"
              onChange={(e) => inputChangeHandler(e)}
            >
              <option selected hidden>
                Select to group by
              </option>
              <option value="language">Language</option>
              <option value="continent">Continent</option>
              <option value="currency">Currency</option>
            </select>
          </label>

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
