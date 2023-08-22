import {Alert, Button, Typography} from "@mui/material";
import {useClientContext} from "@/lib/context";
import styles from './page.module.scss';
import {cn} from "@/lib/helpers";
import {Outlet, useNavigate} from "react-router-dom";
import {useState} from "react";
import {MovieShort} from "@/types/movie.ts";
import {FavoriteMovieCard, RemoveDialog} from "@/src/favorite-movies/components";
import {ROUTES} from "@/lib/constants";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

    const goBack = () => {
        navigate(ROUTES.MOVIE_SEARCH);
    }


    return (
        <>
            <main style={{color: "#fff"}} className='container'>
                <Button variant={"contained"} sx={{marginBottom: "1rem"}} startIcon={<ArrowBackIcon/>} onClick={goBack}>
                    Go back to search
                </Button>
                <Typography variant={"h4"}>
                    Favorite Movies
                </Typography>
                <Typography variant={"h6"} className={styles.h6}>
                    Here are all your favorite movies, you can remove them by clicking on the star icon
                </Typography>

                <div className={cn(styles.favoriteMoviesContainer)}>
                    {favoriteMovies.map((movie) => (
                        <FavoriteMovieCard
                            key={movie.imdbID}
                            movie={movie}
                            onClick={() => handleOnMovieClick(movie.imdbID)}
                            onRemove={() => handleOnRemove(movie)}
                        />
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
