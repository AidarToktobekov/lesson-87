import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { postsFetch } from "./postsThunk";
import { selectPosts, selectPostsLoading } from "./postsSlice";
import Grid from "@mui/material/Grid2";
import { Alert, CircularProgress } from "@mui/material";
import PostItem from "./components/PostItem";
import { Post } from "../../types";

const Posts = ()=>{

    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts);
    const trueDatePosts:Post[] = [];
    if (posts.length > 0) {
      posts.map((post)=>{
        trueDatePosts.unshift(post);
      })
    }
    const isFetching = useAppSelector(selectPostsLoading);

    useEffect(()=>{
        dispatch(postsFetch());
    }, [dispatch]);

    let content: React.ReactNode = (
        <Alert severity="info" sx={{ width: '100%' }}>
          No posts yet!
        </Alert>
    );

  if (isFetching) {
    content = <CircularProgress/>;
  } else if (posts.length > 0) {
    content = trueDatePosts.map((post) => (
      <PostItem
        key={post._id}
        id={post._id}
        idUser={post.idUser}
        title={post.title}
        image={post.image}
        datetime={post.datetime}
      />
    ));
  }

    
    return(
        <>
        <Grid container display="flex" flexDirection='column' alignItems='center'>
            {content}
            <Grid></Grid>
        </Grid>
        </>
    )
}

export default Posts;