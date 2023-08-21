import {
    Backdrop,
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Modal,
    Theme,
    ThemeProvider
} from "@mui/material";
import {muiTheme} from "@/lib/configs";
import {useClientContext} from "@/lib/state/client-provider.tsx";
import {MovieShort} from "@/types/movie.ts";
import modalStyles from './styles.module.scss';

type RemoveDialogProps = {
    open: boolean;
    onClose: () => void;
    movie: MovieShort | null;
}

export const RemoveDialog = ({open, onClose, movie}: RemoveDialogProps) => {
    const {removeFavoriteMovie} = useClientContext();

    const handleRemove = () => {
        if (!movie) return;
        removeFavoriteMovie(movie.imdbID)
        onClose();
    }

    return (
        <ThemeProvider theme={muiTheme}>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={onClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <section className={modalStyles.modal}>
                    <DialogTitle id="alert-dialog-title" sx={{color: "#FFF"}}>
                        Do you wish to remove <b>{movie?.Title}</b> from your favorite movies?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You cannot undo this action, but you can always add it back to your favorite movies, from
                            the main page.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={(theme) => ({
                        [theme.breakpoints.down('sm')]: {
                            flexDirection: "column-reverse"
                        }
                    })}>
                        <Button sx={actionButtonStyles} onClick={onClose} variant={"text"}>I want to keep it</Button>
                        <Button sx={actionButtonStyles}  onClick={handleRemove} variant={"contained"}>
                            Remove
                        </Button>
                    </DialogActions>
                </section>
            </Modal>
        </ThemeProvider>
    );
}

const actionButtonStyles = (theme: Theme) => ({
    [theme.breakpoints.down('sm')]: {
        width: "100%"
    }
});

export default RemoveDialog;
