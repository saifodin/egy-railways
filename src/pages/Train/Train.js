import React from 'react';
import css from './Train.module.scss'
import Navbar from '../../components/Navbar/Navbar'
import SearchBar from '../../components/SearchBar/SearchBar'
import TrainCard from '../../components/TrainCard/TrainCard';
// import TrainCard from '../TrainsBetweenStations/TrainsCards/TrainCard/TrainCard'

const Train = () => {
  return (
    <div className={css.Train}>
      <div className={css.upperPart}>
        <Navbar extraStyle="whiteBackground" />
        <div className={css.line}></div>
        <div className={css.SearchBarContainer}>
          <SearchBar extraStyle="flat" searchOn="trains" />
        </div>
        <div className={css.line}></div>
      </div>
      <div className={`${css.trainCardContainer} container`}>
        <TrainCard forTrainPage />
      </div>
    </div>
  );
}

export default Train;
