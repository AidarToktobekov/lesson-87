import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { commentsFetch } from "../postsThunk";
import { selectComments, selectCommentsLoading } from "../postsSlice";
import { CircularProgress, Grid2 } from "@mui/material";
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
                <CircularProgress/>
            ):(
                <Grid2>
                    {comments.map((comment)=>{
                        return(
                            <CommentItem datetime={comment.datetime} key={comment._id} text={comment.text} idPost={comment.idPost} idUser={comment.idUser}/>
                        )
                    })}    
                </Grid2>
        )}
        </>
    )
}

export default Comments;