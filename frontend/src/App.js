import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {AppBar, Toolbar, Typography, Container, IconButton} from '@mui/material';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';
import UserProfilePage from './components/UserProfilePage';
import PostListPage from './components/PostListPage';
import IndividualPostPage from './components/IndividualPostPage';
import CreatePostPage from './components/CreatePostPage';
import PrivateRoute from  './components/PrivateRoute';
import AccountCircle from '@mui/icons-material/AccountCircle';


const App = () => {
  return (
      <Router>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="h6" component="div" fontWeight={600} sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                Blog Project
              </Link>
            </Typography>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
              LogIn
            </Link>
            <Link to="/registration" style={{ color: 'white', textDecoration: 'none', marginLeft: '20px' }}>
              Registration
            </Link>
            <Link to="/posts" style={{ color: 'white', textDecoration: 'none', marginLeft: '20px' }}>
              List of Posts
            </Link>
            <Link to="/profile" style={{ color: 'black', textDecoration: 'none', marginLeft: '20px' }}>
              <IconButton size="large" sx={{ backgroundColor: 'white' }}>
                <AccountCircle />
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>

        <Container sx={{ marginTop: '32px' }}>
          <Switch>
            <Route exact path="/" component={PostListPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/registration" component={RegistrationPage} />
            <Route path="/profile" component={UserProfilePage} />
            <PrivateRoute path="/create-post" component={CreatePostPage} />
            <Route exact path="/posts" component={PostListPage} />
            <Route exact path="/posts/:id" component={IndividualPostPage} />
          </Switch>
        </Container>
      </Router>
  );
};

export default App;