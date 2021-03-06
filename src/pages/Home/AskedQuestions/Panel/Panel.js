import React, { useState } from 'react';
import css from './Panel.module.css'

const Panel = (props) => {
  const [panelOpen, setPaneOpen] = useState(false);

  const panelToggleHandler = () => {
    setPaneOpen(!panelOpen)
  }

  const panelBodyClass = panelOpen ? css.panelBodyContainer : "";
  const anchorOpen = panelOpen ? css.anchorOpen : "";
  return (
    <div className={css.panel}>

      <div onClick={panelToggleHandler}>
        <div className={css.panelHeading}>
          <h4 className={css.panelTitle}>{props.title}</h4>
          <span className={`${css.anchor} ${anchorOpen}`}></span>
        </div>
      </div>

      <div className={`${panelBodyClass} ${css.panelClose}`} id="collapse4">
        <div className={css.panelBody}>
          {props.body}
        </div>
      </div>
    </div>
  );
}

export default Panel;
