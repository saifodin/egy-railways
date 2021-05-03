import React from 'react';
import Logo from '../Logo/Logo';
import css from './Footer.module.css'

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className={css.FooterBackground}>
      <div className='container'>
        <div className={css.Footer}>
          <div className={css.Logo}>
            <div className={`${css.logoContainer}`}>
              <p className={css.firstLine}><span className={css.coloredPart}>EGY</span>Railways</p>
              {/* <p className={css.secondLine} >Lifeline of the Nation</p> */}
            </div>
          </div>
          <div className={css.CopyWrightContainer}>
            <p>Copyright &copy; {year} EGYRailways</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
