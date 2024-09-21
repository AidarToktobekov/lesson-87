import { CircularProgress, Grid2, TextField, Typography } from "@mui/material";
import FileInput from "../../UI/FileInput/FileInput";
import { PostMutation } from "../../types";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
import { createPost } from "./postsThunk";
import { selectPostFormLoading } from "./postsSlice";
import { useNavigate } from "react-router-dom";

const NewPost = ()=>{
    

    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectPostFormLoading);
    const navigate = useNavigate()

    const [state, setState] = useState<PostMutation>({
        title: '',
        image: null,
    });

    const submitFormHandler = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(createPost(state));
        navigate('/')
      };
    
    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };

    const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = event.target;
        const value = files && files[0] ? files[0] : null;
    
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

    return(
        <>
            <Grid2 component='form' onSubmit={submitFormHandler}>
                {loading ? (
                    <CircularProgress/>
                ): (
                    <Grid2 display='flex' flexDirection="column" gap='20px' maxWidth='500px' margin='0 auto'>
                        <Typography variant="h3">
                            New Post
                        </Typography>
                        <Grid2>
                        <TextField
                            required
                            label="Title"
                            id="title"
                            name="title"
                            value={state.title}
                            onChange={inputChangeHandler}
                        />
                        </Grid2>
                        <Grid2>
                            <TextField
                                label="Description"
                                id="description"
                                name="description"
                                value={state?.description}
                                onChange={inputChangeHandler}
                            />
                        </Grid2>
                        <Grid2>
                            <FileInput label="Image" name="image" onChange={fileInputChangeHandler} />
                        </Grid2>
                        <Grid2>
                        <LoadingButton
                            type="submit"
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                        >
                            <span>Save</span>
                        </LoadingButton>
                        </Grid2>
                    </Grid2>
                )}
            </Grid2>
        </>
    )
}

export default NewPost;