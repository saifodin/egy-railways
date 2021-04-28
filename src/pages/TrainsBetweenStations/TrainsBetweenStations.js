import React from 'react';
import css from './TrainsBetweenStations.module.scss'
import Navbar from '../../components/Navbar/Navbar'
import SearchBar from '../../components/SearchBar/SearchBar';

const TrainsBetweenStations = props => (
  <div className={css.TrainsBetweenStations}>
    <div className={css.upperPart}>
      <Navbar />
      <div className={css.line}></div>
      <div className={css.SearchBarContainer}>
        <SearchBar />
      </div>
    </div>
  </div>
);

export default TrainsBetweenStations;