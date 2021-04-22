import React from 'react';
import css from './MainServices.module.css'

import SvgLiveStation from '../../../assets/imgs/trains/SvgLiveStation'
// import SvgSearchRoutes from '../../../assets/imgs/trains/SvgSearchRoutes'
import SvgLiveTrain from '../../../assets/imgs/trains/SvgLiveTrain'
import SvgLiveStatus from '../../../assets/imgs/trains/SvgLiveStatus'

const MainServices = () => {
  return (
    <div className={css.MainServices}>

      <div className={`container ${css.servicesBoxes}`}>

        <div className={css.serviceBox}>
          <div className={css.imgBox}>
            {/* <SvgSearchRoutes/> */}
            <SvgLiveStatus />
          </div>
          <div className={css.txtBox}>
            <p className={css.title}>Search Routes</p>
            <p className={css.paraph}>Search between two stations in any governorate, to choose <br></br>the right train for you.</p>
          </div>
        </div>

        <div className={css.serviceBox}>
          <div className={css.imgBox}>
            <SvgLiveTrain />
          </div>
          <div className={css.txtBox}>
            <p className={css.title}>Live Train</p>
            <p className={css.paraph}>Search by train number to show its information and to track its location live.</p>
          </div>
        </div>

        <div className={css.serviceBox}>
          <div className={css.imgBox}>
            <SvgLiveStation />
          </div>
          <div className={css.txtBox}>
            <p className={css.title}>Live Station</p>
            <p className={css.paraph}>Get a complete list of trains that shall be arriving at the railway station of your choice.</p>
          </div>
        </div>

        {/* <div className={css.serviceBox}>
          <div className={css.imgBox}>
            <SvgLiveStatus/>
          </div>
          <div className={css.txtBox}>
            <p className={css.title}>Live Status</p>
            <p className={css.paraph}>Search between two stations in any governorate, to choose the right train for you  </p>
          </div>
        </div>

        <div className={css.serviceBox}>
          <div className={css.imgBox}>
            <SvgLiveStatus/>
          </div>
          <div className={css.txtBox}>
            <p className={css.title}>Live Status</p>
            <p className={css.paraph}>Search between two stations in any governorate, to choose the right train for you  </p>
          </div>
        </div> */}



      </div>

    </div>
  );
}

export default MainServices;
