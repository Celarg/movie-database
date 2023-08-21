import {Chip, Typography} from "@mui/material";
import MovieModal from "@/src/movie-quick-detail/components/movie-modal.tsx";
import {useParams} from "react-router-dom";
import {MovieTypeBadge} from "@/src/components/ui";
import {cn, parseMovieRuntime} from "@/lib/helpers";
import movieDetailStyles from './styles/movie-detail.module.scss';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {useEffect, useState} from "react";
import {useClientContext} from "@/lib/state/client-provider.tsx";
import {useGetMovie} from "@/lib/queries/movie-get.ts";

const sx = {color: "#FFD700", width: "2.5rem", height: "2.5rem", cursor: "pointer"}

const MovieDetailPage = () => {
    const {id} = useParams();
    const {addFavoriteMovie, favoriteMovies} = useClientContext()
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (!favoriteMovies) return;
        setIsFavorite(favoriteMovies.some((favoriteMovie) => favoriteMovie.imdbID === id));
    }, [favoriteMovies]);


    const movieQuery = useGetMovie(id);
    const movie = movieQuery.data?.data;

    const handleFavoriteAction = () => {
        if (!movie) return;

        setIsFavorite(prevState => {
            if (!prevState) {
                addFavoriteMovie({
                    imdbID: movie?.imdbID,
                    Title: movie?.Title,
                    Poster: movie?.Poster,
                    Type: movie?.Type,
                    Year: movie?.Year
                });
            }
            return !prevState
        });

    }

    return (
        <>
            <MovieModal>
                <img src={movie?.Poster}/>
                <div className={cn(movieDetailStyles.movieInfo)}>
                    <MovieTypeBadge type={movie?.Type} size={"medium"}/>
                    <Typography>
                        {movie?.Year}
                    </Typography>
                    <Chip label={movie?.Rated}/>
                    <Typography>
                        {parseMovieRuntime(movie?.Runtime)}
                    </Typography>
                </div>
                <Typography id="transition-modal-title" variant="h6" component="h1" textAlign={"end"}
                            sx={{display: "flex"}}
                            className={cn(movieDetailStyles.container)}>
                    {movie?.Title}

                    <div onClick={handleFavoriteAction}
                         style={{cursor: "pointer", width: "fit-content", margin: "auto 1rem auto 0",}}>

                        {isFavorite ? <StarIcon sx={sx}/> : <StarBorderIcon sx={sx}/>}

                    </div>
                </Typography>

                <div className={cn(movieDetailStyles.quickRatings, movieDetailStyles.container)}>
                    <div className={cn(movieDetailStyles.imbdRating)}>
                        <Typography>
                            <StarRateIcon sx={{color: "#FFD700"}}/>&nbsp;
                            <span style={{marginTop: "4px"}}>
                            {movie?.imdbRating}&nbsp;/&nbsp;10
                        </span>
                        </Typography>
                        <Typography fontSize={"14px"}>
                            {movie?.imdbVotes} votes
                        </Typography>
                    </div>
                    <div>
                        <Typography>
                            <span style={{
                                background: "green",
                                padding: "0.25rem",
                                textAlign: "center",
                                borderRadius: "4px"
                            }}>{movie?.Metascore}</span>&nbsp;Metascore
                        </Typography>
                    </div>
                </div>
                <Typography variant={"h6"} className={cn(movieDetailStyles.container)}>
                    {movie?.Plot}
                </Typography>
                <Typography sx={{paddingX: '2rem', fontWeight: "bold", marginTop: "1rem"}}
                            className={cn(movieDetailStyles.container)}>
                    Directed by {movie?.Director}
                </Typography>
                <Typography variant={'h5'}>
                    Genres
                </Typography>
                <div className={cn(movieDetailStyles.genreContainer, movieDetailStyles.container)}>
                    {movie?.Genre.split(',').map((genre, index) => (
                        <Chip key={index} label={genre} sx={{width: "fit-content", padding: "1rem 0"}}/>
                    ))}
                </div>

                <Typography variant={'h5'}>
                    Creators
                </Typography>
                <ul className={cn(movieDetailStyles.actorsContainer)}>
                    {movie?.Writer.split(',').map((Writer) => (
                        <li key={Writer}>
                            {Writer}
                        </li>
                    ))}
                </ul>
                <Typography variant={'h5'}>
                    Top cast
                </Typography>
                <ul className={cn(movieDetailStyles.actorsContainer)}>
                    {movie?.Actors.split(',').map((actor) => (
                        <li key={actor}>
                            {actor}
                        </li>
                    ))}
                </ul>
                {(movie?.Ratings.length || 0) > 0 && (
                    <>
                        <Typography variant={'h5'}>
                            Other Ratings
                        </Typography>
                        <div className={cn(movieDetailStyles.container)}>


                            <table>
                                <tbody>

                                {movie?.Ratings.map((rating) => (
                                    <tr key={rating.Value}>
                                        <td><Typography>{rating.Source}</Typography></td>
                                        <td><Typography
                                            sx={{fontWeight: "600", color: "#fff"}}>{rating.Value}</Typography>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
                <Typography variant={'h5'}>
                    Details
                </Typography>
                <div className={cn(movieDetailStyles.container)}>
                    <table>
                        <tbody>
                        <tr>
                            <td><Typography>Release date</Typography></td>
                            <td><Typography
                                sx={{fontWeight: "600", color: "#fff"}}>{movie?.Released}</Typography>
                            </td>
                        </tr>
                        <tr>
                            <td><Typography>Country</Typography></td>
                            <td><Typography sx={{fontWeight: "600", color: "#fff"}}>{movie?.Country}</Typography>
                            </td>
                        </tr>
                        <tr>
                            <td><Typography>Language</Typography></td>
                            <td><Typography
                                sx={{fontWeight: "600", color: "#fff"}}>{movie?.Language}</Typography>
                            </td>
                        </tr>
                        {movie?.DVD && <tr>
                            <td><Typography>DVD</Typography></td>
                            <td><Typography sx={{fontWeight: "600", color: "#fff"}}>{movie?.DVD}</Typography>
                            </td>
                        </tr>}
                        {movie?.BoxOffice && <tr>
                            <td><Typography>Box office</Typography></td>
                            <td><Typography
                                sx={{fontWeight: "600", color: "#fff"}}>{movie?.BoxOffice}</Typography>
                            </td>
                        </tr>}
                        </tbody>
                    </table>
                </div>
            </MovieModal>
        </>

    );
};

export default MovieDetailPage;
