import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { commentsFetch } from "../postsThunk";
import { selectComments, selectCommentsLoading } from "../postsSlice";
import Box from '@mui/material/Box';
import { Grid2, Skeleton } from "@mui/material";
import CommentItem from "./CommentItem";

interface Props{
    idPost: string;
}
const Comments:React.FC<Props> = ({idPost})=>{
    
    const dispatch = useAppDispatch();
    const isFetching = useAppSelector(selectCommentsLoading);
    const comments = useAppSelector(selectComments);

    useEffect(()=>{
        dispatch(commentsFetch(idPost))
    },[dispatch])

    return(
        <>
            {isFetching ? (
                <Box sx={{ width: 300 }}>
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                </Box>
            ):(
                <Grid2>
                    {comments.map((comment)=>{
                        return(
                            <CommentItem datetime={comment.datetime} text={comment.text} idPost={comment.idPost} idUser={comment.idUser}/>
                        )
                    })}    
                </Grid2>
        )}
        </>
    )
}

export default Comments;