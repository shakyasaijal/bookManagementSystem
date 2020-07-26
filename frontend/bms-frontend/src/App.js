import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './assets/css/common.min.css';
import PATHS from './routes';

import Header from './components/Header';
import Home from './views/HomeView/Home';
import BooksDetails from './views/BooksView/BooksDetails';
import SignIn from './views/AuthView/SignIn';
import SignUp from './views/AuthView/SignUp';
import Search from './views/SearchView/Search';
import Footer from './components/Footer';


const DEFAULT_TITLE = 'Book Management System';

const BookManagementRoute = (props) => {
  const { title, path, component } = props;
  let pageTitle = title ? title : DEFAULT_TITLE
  document.title = "Book Management System " + pageTitle;
  window.scroll(0, 0);

  return <Route path={path} component={component} />;
}

function App() {
  return (
    <Router>
      <Header />
      <div className="app">
        <Switch>
          <BookManagementRoute exact path={PATHS.HOME} component={Home} />
          <BookManagementRoute exact path={PATHS.BOOKS_DETAIL} component={BooksDetails} title="Details" />
          <BookManagementRoute exact path={PATHS.SIGN_IN} component={SignIn} title="Sign In" />
          <BookManagementRoute exact path={PATHS.SIGN_UP} component={SignUp} title="Sign Up" />
          <BookManagementRoute exact path={PATHS.SEARCH} component={Search} title="Search" />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
