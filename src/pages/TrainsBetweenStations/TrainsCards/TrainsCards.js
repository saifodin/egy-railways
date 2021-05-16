import React from 'react';
import TrainCard from '../../../components/TrainCard/TrainCard';
import css from './TrainsCards.module.scss'

const TrainsCards = () => {

  return (
    <div className={`${css.trainsCards} container`}>
      <ul className='reset'>
        <TrainCard />
        <TrainCard />
        <TrainCard />
        <TrainCard />
        <TrainCard />
        <TrainCard />
        <TrainCard />
      </ul>
    </div>

  );
}

export default TrainsCards;
