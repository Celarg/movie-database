import {Chip, ChipTypeMap} from "@mui/material";
import {MovieType, MovieTypeMap} from "@/types/movie.ts";

type MovieTypeBadgeProps = {
    type?: MovieType;
} & (ChipTypeMap['props'] | undefined);

export const MovieTypeBadge = ({type, ...props}:MovieTypeBadgeProps) => {
    if(!type) return null;

    return (
        <Chip {...props} label={MovieTypeMap[type]}  sx={{width:'fit-content', ...props.sx}}/>
    );
};

export default MovieTypeBadge;
