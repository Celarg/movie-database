import styles from "./styles.module.scss";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import {Card, CardContent, CardHeader, Grid, Typography} from "@mui/material";
import {MovieTypeBadge} from "@/src/components/ui";
import {MovieShort} from "@/types/movie.ts";
import StarIcon from "@mui/icons-material/Star";

type FavoriteMovieCardProps = {
    movie: MovieShort
    onClick: () => void;
    onRemove: () => void;
}

export const FavoriteMovieCard = ({movie, onClick, onRemove}: FavoriteMovieCardProps) => {

    const handleRemoveMovieFromFavorites = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.stopPropagation();
        onRemove();
    }

    return (
        <Card
            variant="outlined"
            className={styles.movieCard}
            onClick={onClick}
        >
            {(movie.Poster && movie.Poster !== "N/A") ?
                <img src={movie.Poster} alt={"image not found"}/> :
                <div style={{
                    width: '200px',
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: "3rem"
                }}>
                    <ImageNotSupportedIcon/>
                </div>}
            <CardContent sx={{padding: '0 !important', display: "flex", width: "100%", alignItems:"center", justifyContent:"space-between"}}>
                <div>
                    <CardHeader title={movie.Title} sx={{paddingX: 0}}/>
                    <Grid sx={{
                        display: 'flex',
                        gap: "1.5rem",
                        width: '100%',
                        height: "fit-content",
                        alignItems: "center",
                        marginTop: "auto",
                    }}>
                        <Typography>{movie.Year}</Typography>
                        <MovieTypeBadge type={movie.Type}/>
                    </Grid>
                </div>
                <StarIcon
                    onClick={handleRemoveMovieFromFavorites}
                    sx={{color: "#FFD700", width: "2rem", height: "2rem", cursor: "pointer", padding:"0.5rem", "&:hover": {color: "rgba(255,223,0,0.42)",transition:"color 0.2s ease-in-out"}}}
                />
            </CardContent>
        </Card>
    );
};

export default FavoriteMovieCard;
