import {Alert, Typography} from "@mui/material";
import {useClientContext} from "@/lib/state/client-provider.tsx";
import styles from './page.module.scss';
import {cn} from "@/lib/helpers";
import {Outlet, useNavigate} from "react-router-dom";
import {useState} from "react";
import {MovieShort} from "@/types/movie.ts";
import {FavoriteMovieCard, RemoveDialog} from "@/src/favorite-movie/components";
import {ROUTES} from "@/lib/constants";

const FavoritePage = () => {
    const navigate = useNavigate();
    const {favoriteMovies} = useClientContext();
    const [removingMovie, setRemovingMovie] = useState<MovieShort | null>(null);

    const handleOnMovieClick = (imdbID: string) => {
        navigate(ROUTES.FAVORITES + ROUTES.MOVIE_DETAILS.split(':')[0] + imdbID);
    }

    const handleOnRemove = (movie: MovieShort) => {
        setRemovingMovie(movie);
    }


    return (
        <>
            <main style={{color: "#fff"}} className='container'>
                <Typography variant={"h4"}>
                    Favorite Movies
                </Typography>
                <Typography variant={"h6"} className={styles.h6}>
                    Here are all your favorite movies, you can remove them by clicking on the star icon
                </Typography>

                <div className={cn(styles.favoriteMoviesContainer)}>
                    {favoriteMovies.map((movie) => (
                        <FavoriteMovieCard key={movie.imdbID} movie={movie}
                                           onClick={() => handleOnMovieClick(movie.imdbID)}
                                           onRemove={() => handleOnRemove(movie)}/>
                    ))}
                </div>

                {!favoriteMovies.length && <Alert variant={"filled"} severity={"info"} sx={{background: "#FFF"}}>
                    You don't have any favorite movies yet, you can add them from the main page
                </Alert>}
                <RemoveDialog open={!!removingMovie} onClose={() => setRemovingMovie(null)} movie={removingMovie}/>
            </main>
            <Outlet/>
        </>
    );
};

export default FavoritePage;
