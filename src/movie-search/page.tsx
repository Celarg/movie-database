import {useMovieSearch} from "@/lib/queries";
import {Alert, CircularProgress, InputAdornment, Pagination, Skeleton, TextField, Typography} from "@mui/material";
import pageStyles from './styles/page.module.scss'
import {cn} from "@/lib/helpers";
import SearchIcon from '@mui/icons-material/Search';
import {Outlet, useNavigate} from "react-router-dom";
import {MovieCard} from "@/src/movie-search/components";
import {usePageContext} from "@/lib/context";
import {useMemo} from "react";
import {ROUTES} from "@/lib/constants";

const MovieSearchPage = () => {
    const {search, setSearch, setPage, page, debouncedSearch} = usePageContext()
    const navigate = useNavigate();

    const searchMoviesQuery = useMovieSearch({query: debouncedSearch, page});

    const handleMovieCardClick = (movieId: string) => {
        navigate(ROUTES.MOVIE_DETAILS.split(':')[0] + movieId);
    }

    const error = useMemo(() => searchMoviesQuery.data?.data.Error, [searchMoviesQuery.data?.data.Error]);

    return (
        <>
            <main className={cn('container', pageStyles.main)} >
                <div className={pageStyles.header}>

                    <TextField
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {((searchMoviesQuery.isLoading || searchMoviesQuery.isFetching) && !!search) ?
                                        <CircularProgress size={18}/> : <SearchIcon/>}
                                </InputAdornment>
                            )
                        }}
                        data-empty={!debouncedSearch}
                        className={cn(pageStyles.searchInput)}
                        sx={{
                            '&:focus-within': {
                                width: '25rem', // Change the width to your desired value
                                // You can add more style properties here for other changes on focus-within
                            },
                        }}
                        id="outlined-basic"
                        label="Search movie..." variant="outlined" value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <Typography variant={"h5"} style={{color: 'white'}}
                                sx={{fontWeight: "semibold", letterSpacing: "2px", cursor: "pointer", textAlign:"right"}}
                                onClick={() => navigate('/favorites')}>
                        Favorite Movies
                    </Typography>
                </div>
                <Typography sx={{color: "white", textAlign:"center", margin:!!debouncedSearch ? "0" : "auto", paddingTop:"3rem"}} variant={"h2"}>
                    Movie Database
                    <span style={{display: "block", color: "rgba(255,255,255,0.68)", fontSize: "1.5rem"}}>
                         made by @Celarg
                    </span>
                </Typography>
                <section className={cn(pageStyles.movieContainer)}>
                    {(!!debouncedSearch && searchMoviesQuery.isSuccess) && searchMoviesQuery.data.data.Search?.map((movie) => (
                        <MovieCard movie={movie} onClick={(movie) => handleMovieCardClick(movie.imdbID)}
                                   key={movie.imdbID}/>
                    ))}
                    {(searchMoviesQuery.isLoading && !!debouncedSearch) && Array.from({length: 9}).map((_, index) => (
                        <div style={{position: "relative"}} key={index}>
                            <Skeleton variant="rectangular" width={'100%'} height={234}/>
                            <div className={pageStyles.skeletonDiv}>
                                <Skeleton
                                    variant="rectangular"
                                    animation="wave"
                                    width={'132px'}
                                    height={200}
                                    sx={{margin: "auto 1rem !important", flexShrink: "0"}}
                                />
                                <div style={{display: "grid", width: "100%", padding: "0 2rem 0 0"}}>
                                    <Skeleton variant="text" animation="wave" width={'100%'} height={60}
                                              sx={{marginTop: "3.25rem", boxSizing: "border-box"}}/>
                                    <div style={{
                                        margin: "auto 0 2rem",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}>
                                        <Skeleton variant="text" animation="wave" width={'32%'} height={40}
                                                  sx={{marginTop: "3.25rem", boxSizing: "border-box"}}/>
                                        <Skeleton variant="rounded" width={'32%'} animation="wave" height={32} sx={{
                                            marginTop: "3.25rem",
                                            boxSizing: "border-box",
                                            borderRadius: "16px"
                                        }}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </section>
                {parseInt(searchMoviesQuery.data?.data?.totalResults || '0') > 0 && <div style={{display: "flex", justifyContent: "center", paddingTop: "1rem", marginTop:"auto"}}>

                        <Pagination count={Math.ceil(parseInt(searchMoviesQuery.data?.data.totalResults || '1') / 10)}
                                    color="primary" page={page} onChange={(_, page) => setPage(page)}/>

                </div>}

                {!!error && <Alert severity="error" variant={"filled"} sx={{width: "320px", margin: "10rem auto"}}>
                    {error}
                </Alert>}
            </main>
            <Outlet/>
        </>
    );
};

export default MovieSearchPage;
