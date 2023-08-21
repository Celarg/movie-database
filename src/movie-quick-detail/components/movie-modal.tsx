import {ReactNode} from 'react';
import {muiTheme} from "@/lib/configs";
import {Backdrop, Fade, Modal, ThemeProvider} from "@mui/material";
import {useNavigate} from "react-router-dom";
import movieDetailStyles from '../styles/movie-detail.module.scss';
import {cn} from "@/lib/helpers";
import {Close} from "@mui/icons-material";

type MovieModalProps = {
    children: ReactNode;
}


export const MovieModal = ({children}: MovieModalProps) => {
    const navigate = useNavigate();

    const handleClose = () => navigate(-1);

    return (
        <ThemeProvider theme={muiTheme}>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={true}
                onClose={handleClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={true}>
                    <section className={cn(movieDetailStyles.section)}>
                        <Close className={cn(movieDetailStyles.closeIcon)} onClick={handleClose}/>
                        {children}
                    </section>
                </Fade>
            </Modal>
        </ThemeProvider>
    );
};

export default MovieModal;
