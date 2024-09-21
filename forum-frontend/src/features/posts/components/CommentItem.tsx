import dayjs from 'dayjs';
import {  Grid2, Typography } from '@mui/material';
import axiosApi from '../../../axiosApi';
import { useEffect, useState } from 'react';

interface Props{
    idUser: string;
    datetime: Date; 
    idPost: string;
    text: string;
}
const CommentItem:React.FC<Props> = ({ idUser, text, datetime})=>{
    const [userState, setUserState] = useState('Loading');
    const user = async()=>{
        try{
            const response = await axiosApi.get<string>(`/users/${idUser}`);
            setUserState(response.data)
        }catch(e){
            
        }
    }

    useEffect(()=>{
        user();
    }, []);

    
    return(
        <Grid2 border="2px solid #ccc" borderRadius="5px" padding='10px' marginBottom="10px" display="flex" alignItems="center" maxWidth="700px" width='100%'>
            <Grid2>
                <Typography>
                    {dayjs(datetime).format('DD.MM.YYYY HH:mm:ss')} by {userState}
                </Typography>
                <Typography>
                    {text}
                </Typography>
            </Grid2> 
        </Grid2>
    )
}

export default CommentItem;