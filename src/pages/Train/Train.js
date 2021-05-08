import React from 'react';
import css from './Train.module.scss'
import Navbar from '../../components/Navbar/Navbar'
import SearchBar from '../../components/SearchBar/SearchBar'

const Train = () => {
    const he = <h1>hello</h1>
  return (
    <div className={css.Train}>
      <div className={css.upperPart}>
        <Navbar extraStyle="whiteBackground" />
        <div className={css.line}></div>
        <div className={css.SearchBarContainer}>
          <SearchBar extraStyle="flat" />
        </div>
        <div className={css.line}></div>
      </div>
      {he}
    </div>
  );
}

export default Train;
