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

      <a href={_ => { }} onClick={panelToggleHandler}>
        <div class={css.panelHeading}>
          <h4 class={css.panelTitle}>{props.title}</h4>
          <span class={`${css.anchor} ${anchorOpen}`}></span>
        </div>
      </a>

      <div className={`${panelBodyClass} ${css.panelClose}`} id="collapse4">
        <div class={css.panelBody}>
          {props.body}
        </div>
      </div>
    </div>
  );
}

export default Panel;
