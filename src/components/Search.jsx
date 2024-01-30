import React, { useState } from "react";
import { getHomeworldData } from "../api/starwars";

const homeworldCache = {};

export default function Search({
  onSearchData,
  movieCharacters,
  setSearchLoading,
}) {
  const [search, setSearch] = useState("");

  const handleInputSearch = (e) => {
    const searchName = e.target.value;
    setSearch(searchName);
  };

  const submitSearch = async (e) => {
    e.preventDefault();
    setSearchLoading(true);
    if (search.trim() === "") {
      setSearchLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${search}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const searchData = await response.json();
      const filteredData = searchData.results.filter((character) =>
        movieCharacters.includes(character.url)
      );

      const charactersDataWithHomeworld = await getHomeworldData(
        filteredData,
        homeworldCache
      );

      onSearchData(charactersDataWithHomeworld);
    } catch (error) {
      alert(`Search failed: ${error.message}`);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-end">
      <form
        onSubmit={submitSearch}
        className="input-group my-2 flex justify-content-end needs-validation"
      >
        <div className="form-outline">
          <input
            type="search"
            id="search_form"
            required
            value={search}
            onChange={handleInputSearch}
            className="form-control"
            placeholder="Search for character..."
          />
        </div>
        <button type="submit" className="btn btn-primary" data-mdb-ripple-init>
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  );
}
