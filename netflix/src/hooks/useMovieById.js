import axios from "axios";
import { useMovieContext } from "../context/MovieContext";
import { useEffect } from "react";
const useMovieById= (movieId)=> {
  const {setTrailer}=useMovieContext();
  useEffect(()=>{
const getMovieById =async()=>{
  try{
    if (!movieId) return;
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2Y1MjU2NjRkMjZlMDNjYTIyZWYwNzU1MjEwMWZiMyIsIm5iZiI6MTczODY1MTY2Ny4zNDIwMDAyLCJzdWIiOiI2N2ExYjgxM2JlYjhmZmVlODUyNjRjYTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.t94VZhgKywGp5aY7BXxfPX1ueMEtYhLnB-7Og-eXH9U'
        }
      };
    const res=await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`,options)
    // console.log(res.data.results)
    const tralir=res?.data?.results?.filter((item)=>{
        return item.type === "Trailer"
    })
    // console.log(tralir.length > 0 ? tralir[0] : res.data.results[0])
    setTrailer( tralir.length > 0 ? tralir[0] : res.data.results[0]);
   }catch(err){
   console.log(err);
   }
}
getMovieById();
  },[movieId, setTrailer])
}
export default useMovieById
