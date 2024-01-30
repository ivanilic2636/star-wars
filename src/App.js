import { useEffect, useState } from "react";
import "./App.css";
import { fetchStarWarsData } from "./api/starwars";
import MovieButton from "./components/MovieButton";
import MovieData from "./components/MovieData";
import Header from "./components/Header";
import Loading from "./components/Loading";

function App() {
  const [movies, setMovies] = useState([]);
  const [showCharacters, setShowCharacters] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState();
  useEffect(() => {
    setLoading(true);
    async function fetchMovies() {
      try {
        const storedData = localStorage.getItem("starWarsData");
        if (storedData) {
          setMovies(JSON.parse(storedData));
          setLoading(false);
        } else {
          const { results } = await fetchStarWarsData();
          setMovies(results);
          localStorage.setItem("starWarsData", JSON.stringify(results));
          setLoading(false);
        }
        setDataFetched(true);
      } catch (e) {
        console.log(e.message, " This is the error");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [dataFetched]);

  function handleShowCharacters(movie) {
    setShowCharacters(true);
    setMovie(movie);
  }
  return (
    <div className="App container">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="row">
            <Header className={"col"} />
          </div>
          <div className="row mt-4">
            <div className="row">
              {movies.map((oneMovie) => (
                <MovieButton
                  isCurrentMovie={
                    movie ? movie.episode_id === oneMovie.episode_id : ""
                  }
                  movie={oneMovie}
                  onHandleShowCharacters={() => handleShowCharacters(oneMovie)}
                  key={oneMovie.episode_id}
                >
                  {oneMovie.title}
                </MovieButton>
              ))}
            </div>
            {showCharacters && (
              <>
                <MovieData key={movie.name} movieData={movie} />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
