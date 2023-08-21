import {createContext, ReactNode, useContext} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {MovieShort} from "@/types/movie.ts";

type ClientContextType = {
    favoriteMovies: MovieShort[];
    // setFavoriteMovies: (value:string[]) => void;
    addFavoriteMovie: (newMovie:MovieShort) => void;
    removeFavoriteMovie: (imdbID:string) => void;
} | null;

const ClientContext = createContext<ClientContextType>(null);

type ClientContextProviderProps = {
    children: ReactNode;
}

export const ClientContextProvider = ({children}:ClientContextProviderProps) => {
    const [favoriteMovies, setFavoriteMovies]=useLocalStorage<MovieShort[]>("favoriteMovies",[] );

    const addFavoriteMovie = (newMovie:MovieShort) => {
        setFavoriteMovies([...favoriteMovies, newMovie]);
    }

    const removeFavoriteMovie = (imdbID:string) => {
        setFavoriteMovies(favoriteMovies.filter((movie) => movie.imdbID !== imdbID));
    }

    return (
        <ClientContext.Provider value={{favoriteMovies, addFavoriteMovie, removeFavoriteMovie}}>
            {children}
        </ClientContext.Provider>
    )
}

export const useClientContext = () => {
    const context = useContext(ClientContext);

    if(!context) {
        throw new Error("useClientContext must be used within a ClientContextProvider");
    }

    return context;
}
