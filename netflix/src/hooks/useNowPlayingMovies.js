import { useState, useEffect } from "react";
import axios from "axios";
import { useMovieContext } from "../context/MovieContext";

const useNowPlayingMovies = () => {
  const { setnowPlayingMovieData } = useMovieContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      setLoading(true); // Start loading state
      setError(null);   // Reset error before new request

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2Y1MjU2NjRkMjZlMDNjYTIyZWYwNzU1MjEwMWZiMyIsIm5iZiI6MTczODY1MTY2Ny4zNDIwMDAyLCJzdWIiOiI2N2ExYjgxM2JlYjhmZmVlODUyNjRjYTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.t94VZhgKywGp5aY7BXxfPX1ueMEtYhLnB-7Og-eXH9U",
        },
      };
      const Now_Playing_Movie = "https://api.themoviedb.org/3/movie/now_playing";

      try {
        const res = await axios.get(Now_Playing_Movie, options);
        const movies = res.data?.results;
        if (movies && movies.length > 0) {
          setnowPlayingMovieData(movies); // ✅ Only store valid data
        } else {
          console.warn("No movies found in API response");
          setError(new Error("No movies found"));
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(error);
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchNowPlayingMovies();
  }, [setnowPlayingMovieData]); // Runs only once when `setnowPlayingMovieData` is available

  return { loading, error };
};

export default useNowPlayingMovies;
