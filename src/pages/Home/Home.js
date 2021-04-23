import React from 'react';
import Navbar from '../../components/Navbar/Navbar'
import SearchBar from './SearchBar/SearchBar'
import MainServices from './MainServices/MainServices'
import TopTrainRoutes from './TopTrainRoutes/TopTrainRoutes'
import css from './Home.module.css'


const Home = props => (
  <div className={css.Home}>
    <header className={`${css.Header}`}>
      <Navbar />
      <h1 className={`${css.title} container`}>Train Ticket Booking and Tracking</h1>
    </header>
    <SearchBar />
    <MainServices />
    <div className={css.toShowScroll}></div>
    <TopTrainRoutes/>
  </div>
);

export default Home;