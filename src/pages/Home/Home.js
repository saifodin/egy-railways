import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar'
import SearchBar from '../../components/SearchBar/SearchBar'
import MainServices from './MainServices/MainServices'
import TopTrainRoutes from './TopTrainRoutes/TopTrainRoutes'
import DownloadApp from './DownloadApp/DownloadApp'
import AskedQuestions from './AskedQuestions/AskedQuestions'
import Footer from '../../components/Footer/Footer'
import css from './Home.module.css'


const Home = props => {
  const [myService, setMyService] = useState(1)


  return (
    <div className={css.Home}>
      <header className={`${css.Header}`}>
        <Navbar />
        <h1 className={`${css.title} container`}>Train Ticket Booking and Tracking</h1>
      </header>


      {myService === 1 &&
        <SearchBar searchOn="stations" />
      }
      {(myService === 2 || myService === 3) &&
        <SearchBar searchOn="trains" inHomePage />
      }
      {myService === 4 &&
        <SearchBar searchOn="LiveStation" />
      }


      <MainServices myService={myService} setMyService={setMyService} />

      <div className={css.toShowScroll}></div>

      <TopTrainRoutes />

      <DownloadApp />

      <AskedQuestions />

      <Footer />

    </div>
  );
}
export default Home;