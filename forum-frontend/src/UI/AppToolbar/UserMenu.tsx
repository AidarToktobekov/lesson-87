import React, { useState } from 'react';
import { User } from '../../types';
import  { Button, Menu, MenuItem, styled } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/users/usersThunk';
import { Link } from 'react-router-dom';

interface Props {
  user: User;
}

const StyledLink = styled(Link)({
  color: 'inherit',
  textTransform: 'uppercase',
  fontSize: '15px',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
        <>
        <StyledLink to="/create-post">New Post</StyledLink>
        <Button onClick={handleClick} color="inherit">
            Hello, {user.username}!
        </Button>
        <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose} keepMounted>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </>
  );
};

export default UserMenu;