import React, { useState } from 'react';
import css from './MainServices.module.css'
import SvgLiveStation from '../../../assets/imgs/trains/SvgLiveStation'
import SvgLiveTrain from '../../../assets/imgs/trains/SvgLiveTrain'
import SvgLiveStatus from '../../../assets/imgs/trains/SvgLiveStatus'
import SvgSearchRoutes from '../../../assets/imgs/trains/SvgSearchRoutes'

const MainServices = props => {

  const myService = props.myService
  console.log(myService)

  return (
    <div className={css.MainServices}>

      <div className={`${css.servicesBoxes} container `}>

        <div className={`${css.serviceBox} ${myService === 1 ? css.serviceBoxSelected : null}`} onClick={_ => props.setMyService(1)}>
          <div className={css.imgBox}>
            <SvgSearchRoutes />
          </div>
          <div className={css.txtBox}>
            <p className={css.title}>Search Routes</p>
            <p className={css.paraph}>Search between two stations, to choose the right train for you.</p>
          </div>
        </div>

        <div className={`${css.serviceBox} ${myService === 2 ? css.serviceBoxSelected : null}`} onClick={_ => props.setMyService(2)}>
          <div className={css.imgBox}>
            <SvgLiveStatus />
          </div>
          <div className={css.txtBox}>
            <p className={css.title}>Train Number</p>
            <p className={css.paraph}>Search by train number to show its information</p>
          </div>
        </div>

        <div className={`${css.serviceBox} ${myService === 3 ? css.serviceBoxSelected : null}`} onClick={_ => props.setMyService(3)}>
          <div className={css.imgBox}>
            <SvgLiveTrain />
            <div className={css.flash}>
              <div>
                <span></span>
              </div>
            </div>
          </div>
          <div className={css.txtBox}>
            <p className={css.title}>Live Train</p>
            <p className={css.paraph}>Search by train number to show its live status.</p>
          </div>
        </div>

        <div className={`${css.serviceBox} ${myService === 4 ? css.serviceBoxSelected : null}`} onClick={_ => props.setMyService(4)}>
          <div className={css.imgBox}>
            <SvgLiveStation />
            <div className={css.flash}>
              <div>
                <span></span>
              </div>
            </div>
          </div>
          <div className={css.txtBox}>
            <p className={css.title}>Live Station</p>
            <p className={css.paraph}>Get list of trains that shall be arriving at the railway station.</p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default MainServices;
