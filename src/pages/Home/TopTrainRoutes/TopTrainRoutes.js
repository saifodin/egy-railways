import React from 'react';
import OneTrainRoute from './OneTrainRoute/OneTrainRoute'
import css from './TopTrainRoutes.module.css'


const TopTrainRoutes = () => {
  return (
    <div className={css.topTrainRoutesContainer}>
      <div className={`container ${css.topTrainRoutes}`}>
        <h2>Main Train Routes</h2>
        <div className={css.trainsContainer}>

          <OneTrainRoute from="Alexandria" to="Cairo" link=""/>
          <OneTrainRoute from="Cairo" to="Alexandria" link=""/>

          <OneTrainRoute from="Banha" to="Alexandria" link=""/>
          <OneTrainRoute from="Alexandria" to="Banha" link=""/>

          <OneTrainRoute from="Damanhur" to="Cairo" link=""/>
          <OneTrainRoute from="Cairo" to="Damanhur" link=""/>

          <OneTrainRoute from="Banha" to="Damanhur" link=""/>
          <OneTrainRoute from="Damanhur" to="Banha" link=""/>

          <OneTrainRoute from="Tanta" to="Cairo" link=""/>
          <OneTrainRoute from="Cairo" to="Tanta" link=""/>

        </div>
      </div>
    </div>
  );
}

export default TopTrainRoutes;
