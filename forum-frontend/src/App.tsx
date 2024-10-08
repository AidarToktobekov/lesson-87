import './App.css'
import AppToolbar from './UI/AppToolbar/AppToolbar'
import { Container, Typography } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Register from './features/users/Register'
import Login from './features/users/Login'
import Posts from './features/posts/Posts'
import OnePost from './features/posts/OnePost'
import NewPost from './features/posts/NewPost'

const App = ()=>{

  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
        <Route path="/" element={<Posts/>} />
        <Route path="/:id" element={<OnePost/>} />
        <Route path="/create-Post" element={<NewPost/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
          <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
        </Routes>
      </Container>
    </>
  )
}

export default App
