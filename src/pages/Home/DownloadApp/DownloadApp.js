import React from 'react';
import css from './DownloadApp.module.css';
import { ReactComponent as SvgIos } from "../../../assets/imgs/mobileStores/ios.svg"
import { ReactComponent as SvgAndroid } from "../../../assets/imgs/mobileStores/android.svg"
import mobile from "../../../assets/imgs/hand-mobile.png";


const DownloadApp = () => {
  return (
    <div className={css.downloadAppContainer}>
      <div className={`container ${css.downloadApp}`}>
        
        <div className={css.downloadAppTxt}>

          <h4 className={css.title}>The EGYRailways App Makes It Easy</h4>
          <p className={css.paragraph}>We’ll get you where you want to go. From live train updates to mobile tickets, our innovative app is the ideal way to plan and keep track of your travel.</p>

          <div className={css.downloadButtons}>
            <div className={css.ios}>
              <button>
                <SvgIos />
              </button>
            </div>
            <div className={css.android}>
              <button>
                <SvgAndroid />
              </button>
            </div>
          </div>
          
        </div>

        <div className={css.downloadAppImg}>
          <img alt="mobile App" src={mobile}/>
        </div>

      </div>
    </div>
  );
}

export default DownloadApp;
