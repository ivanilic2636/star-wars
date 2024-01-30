import { useEffect, useState } from "react";
import Character from "./Character";
import Pagination from "./Pagination";
import Search from "./Search";

const characterCache = {};

export default function MovieData({ movieData }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sort, setSort] = useState("");
  const [searched, setSearched] = useState(false);
  let { characters } = movieData;

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSearched(false);
    const fetchCharacterData = async () => {
      try {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const currentCharacters = characters.slice(start, end);

        const characterPromises = currentCharacters.map(async (url) => {
          if (characterCache[url]) {
            return characterCache[url];
          } else {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const character = await response.json();
            const homeworldResponse = await fetch(character.homeworld);
            if (!homeworldResponse.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const homeworld = await homeworldResponse.json();
            const characterWithHomeworld = {
              ...character,
              homeworldData: homeworld,
            };
            characterCache[url] = characterWithHomeworld;
            return characterWithHomeworld;
          }
        });

        const charactersDataWithHomeworld = await Promise.all(
          characterPromises
        );
        setData(charactersDataWithHomeworld);
      } catch (error) {
        setError(`Failed to fetch data: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterData();
  }, [currentPage, characters, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const sortAscending = () => {
    if (sort !== "asc") {
      const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));
      setData(sortedData);
      setSort("asc");
    }
  };

  const sortDescending = () => {
    if (sort !== "desc") {
      const sortedData = [...data].sort((a, b) => b.name.localeCompare(a.name));
      setData(sortedData);
      setSort("desc");
    }
  };

  const setSearchLoading = (value) => {
    setLoading(value);
  };

  const setSearchedData = (searchedCharacters) => {
    setSearched(true);
    setData(searchedCharacters);
  };

  return (
    <>
      {loading ? (
        <div className="position-absolute top-50 start-50 translate-middle">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <div className="col-sm">
          <div className="row mt-3 mb-3">
            <Search
              onSearchData={setSearchedData}
              movieCharacters={characters}
              setSearchLoading={setSearchLoading}
            />
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-dark ">
              <thead>
                <tr>
                  <th scope="col">
                    Name
                    <i
                      className="bi bi-arrow-up ms-2"
                      onClick={sortAscending}
                    ></i>
                    <i
                      className="bi bi-arrow-down ms-2"
                      onClick={sortDescending}
                    ></i>
                  </th>
                  <th scope="col">Birth Year</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Homeworld</th>
                  <th scope="col">Eye color</th>
                </tr>
              </thead>
              <tbody>
                {data.map((character, index) => (
                  <tr key={character.id || index}>
                    <Character character={character} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            totalItems={searched ? searched.length : characters.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      {error && <div>There has been an error...</div>}
    </>
  );
}
