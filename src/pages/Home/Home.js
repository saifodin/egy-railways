import React from 'react';
import Navbar from '../../components/Navbar/Navbar'
import SearchBar from './SearchBar/SearchBar'
import css from './Home.module.css'


const Home = props => (
  <div>
    <header className={`${css.Header}`}>
      <Navbar />
      <h1 className={`${css.title} container`}>Book Train Tickets across Egypt</h1>
      {/* <HomeSearchBar /> */}
    </header>
      <SearchBar/>
  </div>
);

export default Home;