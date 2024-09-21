import dayjs from 'dayjs';
import textPost from '../../../assets/images/text-post.png';
import { API_URL } from '../../../constants';
import { CardMedia, Grid2, styled, Typography } from '@mui/material';
import axiosApi from '../../../axiosApi';
import { useEffect, useState } from 'react';
import { User } from '../../../types';
import { Link } from 'react-router-dom';


const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '100%',
});
interface Props{
    id: string;
    idUser: string;
    image?: string | null;
    title: string;
    datetime: Date; 
}
const PostItem:React.FC<Props> = ({id, idUser, image, title, datetime})=>{
    let cardImage = textPost;
    const [userState, setUserState] = useState('Loading');
    const user = async()=>{
        try{
            const response = await axiosApi.get<User>(`/users/${idUser}`);
            setUserState(response.data.username)
        }catch(e){
            
        }
    }

    useEffect(()=>{
        user();
    }, []);

    if (image) {
      cardImage = `${API_URL}/${image}`;
    }
    
    return(
        <Grid2 border="2px solid #ccc" borderRadius="20px" display="flex" alignItems="center" maxWidth="700px" width='100%'>
            <Grid2 sx={{width: "150px", height: '150px'}}>
                <ImageCardMedia image={cardImage} title={title} />
            </Grid2>
            <Grid2>
                <Typography>
                    {dayjs(datetime).format('DD.MM.YYYY HH:mm:ss')} by {userState}
                </Typography>
                <Link style={{fontSize: '30px', color: 'blue'}} to={`/${id}`}>
                    {title}
                </Link>
            </Grid2> 
        </Grid2>
    )
}

export default PostItem;