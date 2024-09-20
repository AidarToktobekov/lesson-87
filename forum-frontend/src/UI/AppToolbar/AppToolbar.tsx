import { AppBar, styled, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/usersSlice';
import AnonymousMenu from './AnonymousMenu';
import UserMenu from './UserMenu';

const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <StyledLink to="/">Forum</StyledLink>
            </Typography>
          {user ? <UserMenu user={user} /> : <AnonymousMenu />}
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;