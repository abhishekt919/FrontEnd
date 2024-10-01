import {
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { closeDialog, openDialog } from "app/store/fuse/dialogSlice";
import store from "../store";
const { dispatch } = store;

const CommonPopUp = ({
    title,
    message,
    positiveBtnText,
    negativeBtnText,
    positiveBtnClick,
    negativeBtnClick,
    positiveBtnColor,
}) => {
    dispatch(
        openDialog({
            children: (
                <>
                    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() =>
                                negativeBtnClick ? negativeBtnClick : dispatch(closeDialog())
                            }
                            color="primary"
                        >
                            {negativeBtnText ? negativeBtnText : "Back"}
                        </Button>
                        {positiveBtnClick && (
                            <Button
                                onClick={() => {
                                    dispatch(closeDialog());
                                    positiveBtnClick();
                                }}
                                color={positiveBtnColor ? positiveBtnColor : "primary"}
                                autoFocus
                            >
                                {positiveBtnText ? positiveBtnText : "Yes"}
                            </Button>
                        )}
                    </DialogActions>
                </>
            ),
        })
    );
};

export default CommonPopUp;
