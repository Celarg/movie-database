import styles from "./styles.module.scss";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import {Card, CardContent, CardHeader, Grid, Typography} from "@mui/material";
import {MovieTypeBadge} from "@/src/components/ui";
import {MovieShort} from "@/types/movie.ts";

type MovieCardProps = {
    movie: MovieShort
    onClick: (movie: MovieShort) => void
}

export const MovieCard = ({movie, onClick}:MovieCardProps) => {
    return (
        <Card
            variant="outlined"
            className={styles.movieCard}
            onClick={()=>onClick(movie)}
        >
            {(movie.Poster && movie.Poster !== "N/A") ?
                <img src={movie.Poster} alt={"Not Found"}/> :
                <div style={{width:'200px', display:"flex", alignItems:'center', justifyContent:'center', fontSize:"3rem"}}>
                    <ImageNotSupportedIcon/>
                </div>}
            <CardContent sx={{paddingBottom: '1rem !important', display: "grid", width: "100%"}}>
                <CardHeader title={movie.Title} sx={{paddingX: 0}}/>
                <Grid sx={{
                    display: 'flex',
                    gap: "1rem",
                    width: '100%',
                    height: "fit-content",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "auto"
                }}>
                    <Typography>{movie.Year}</Typography>
                    <MovieTypeBadge type={movie.Type}/>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default MovieCard;
