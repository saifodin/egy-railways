import React from 'react';
import css from './TrainsCards.module.scss'
import TrainCard from './TrainCard/TrainCard'

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
