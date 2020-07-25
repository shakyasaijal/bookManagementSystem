import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './assets/css/common.min.css';
import PATHS from './routes';

import Home from './views/HomeView/Home';
import BooksDetails from './views/BooksView/BooksDetails';
import Header from './components/Header';
import Footer from './components/Footer';


const DEFAULT_TITLE = 'Book Management System';

const BookManagementRoute = (props) => {
  const { title, path, component } = props;

  document.title = title ? title : DEFAULT_TITLE;
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
          <BookManagementRoute exact path={PATHS.BOOKS_DETAIL} component={BooksDetails} title="Details"/>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
