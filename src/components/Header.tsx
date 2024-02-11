import { ChangeEvent, FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
type FormData = {
  filter: string;
  group: string;
};

const Header = () => {
  const [fromData, setFormData] = useState<FormData>({ filter: "", group: "" });
  const [searchParams, setSearchParams] = useSearchParams();

  function inputChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function submitHandler(e: FormEvent): void {
    e.preventDefault();
    if (fromData.filter === "" && fromData.group === "") {
      window.alert("Arama yapmak istediğiniz kelimeyi yazın.");
    } else if (fromData.filter === "") {
      setSearchParams({ group: fromData.group });
    } else if (fromData.group === "") {
      setSearchParams({ filter: fromData.filter });
    } else {
      setSearchParams(fromData);
    }
  }

  function resetFilter() {
    const filter = searchParams.get("filter");
    if (filter) {
      searchParams.delete("filter");
      setSearchParams(searchParams);
    }
    console.log(filter);
  }

  return (
    <section className="flex flex-col items-center justify-center gap-5 py-10">
      <h1 className="text-sky-400 text-4xl flex items-center justify-center ">
        Frontend Developer Assignment
      </h1>
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
          <input
            id="group"
            name="group"
            type="text"
            className="border pl-1"
            onChange={(e) => inputChangeHandler(e)}
          />
        </label>

        <button
          type="submit"
          className="border bg-gray-100 hover:bg-gray-200 py-1 px-5 rounded-md"
        >
          Go
        </button>
      </form>
      <div
        className="text-white cursor-pointer border py-1 px-3 rounded-md bg-sky-400 hover:bg-sky-500"
        onClick={resetFilter}
      >
        Reset Filter
      </div>
    </section>
  );
};

export default Header;
