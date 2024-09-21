import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { CommentMutation } from "../../../types";
import { Grid2, CircularProgress, TextField, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { selectCommentsFormLoading } from "../postsSlice";
import { createComment } from "../postsThunk";
import { LoadingButton } from "@mui/lab";
import { selectUser } from "../../users/usersSlice";

interface Props{
    idPost: string;
}

const CommentsForm:React.FC<Props> = ({idPost})=>{
    
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectCommentsFormLoading);
    const user = useAppSelector(selectUser);

    const [state, setState] = useState<CommentMutation>({
        idPost: idPost,
        text: '',
    });

    const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>)=>{
        setState(prevState=>({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }

    let warning = 'inline-block';
    if (user) {
        warning = 'none'
    }

    const submitFormHandler = (event: FormEvent)=>{
        event.preventDefault();
        dispatch(createComment(state));
    }
    
    return(
        <>
            <Grid2 component='form' direction='column' my='10px' onSubmit={submitFormHandler}>
                {loading ? (
                    <CircularProgress/>
                ): (
                    <>
                        <Typography color="red"display={warning}>                    
                            Register to post comments
                        </Typography>
                        <Grid2 display='flex' gap='10px'>
                            <TextField
                                required
                                label="Text"
                                id="text"
                                name="text"
                                value={state.text}
                                onChange={inputChangeHandler}
                                >
                            </TextField>
                            <LoadingButton
                                type="submit"
                                loading={loading}
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                variant="contained"
                                disabled={Boolean(!user)}
                                >
                                <span>Save</span>
                            </LoadingButton>
                        </Grid2>
                    </>
                  )}
            </Grid2>
        </>
    )
}

export default CommentsForm;