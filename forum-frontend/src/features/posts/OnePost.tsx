import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { postFetch } from "./postsThunk";
import textPost from '../../assets/images/text-post.png';
import dayjs from 'dayjs';
import { selectPost, selectPostLoading } from "./postsSlice";
import { CardMedia, Grid2, Skeleton, styled, Typography } from "@mui/material";
import { API_URL } from "../../constants";
import axiosApi from "../../axiosApi";
import { User } from "../../types";
import Comments from "./components/Comments";


const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '100%',
});
const OnePost = ()=>{
    let cardImage = textPost;

    const {id} = useParams() as {id: string};
    const dispatch = useAppDispatch();
    const post = useAppSelector(selectPost);
    const [userState, setUserState] = useState('Loading');
    const postLoding = useAppSelector(selectPostLoading);
    const user = async()=>{
        try{
            const response = await axiosApi.get<User>(`/users/${post?.idUser}`);
            setUserState(response.data.username)
        }catch(e){
            
        }
    }

    useEffect(()=>{
        dispatch(postFetch(id));
        user();
    }, [dispatch]);

    if (post?.image) {
        cardImage = `${API_URL}/${post.image}`;
    }

    return(
        <>
            {postLoding ? (
                <Skeleton variant="rounded" width={'100%'} height={'200px'} />
            ) : (
                <>
                <Grid2>
                    <Grid2 borderBottom="2px solid #ccc" display="flex" alignItems="center">
                        <Grid2 sx={{width: "150px", height: '150px'}}>
                            <ImageCardMedia image={cardImage} title={post?.title} />
                        </Grid2>
                        <Grid2>
                            <Typography>
                                {dayjs(post?.datetime).format('DD.MM.YYYY HH:mm:ss')} by {userState}
                            </Typography>
                            <Typography variant="h5">
                                {post?.title}
                            </Typography>
                            <Typography >
                                {post?.description}
                            </Typography>
                        </Grid2> 
                    </Grid2>
                    <Grid2>
                        <Typography variant="h5"my="20px">
                            Comments
                        </Typography>
                        <Comments idPost={id}></Comments>
                    </Grid2>
                </Grid2>
                </>
            )}
        </>
    )
}

export default OnePost;