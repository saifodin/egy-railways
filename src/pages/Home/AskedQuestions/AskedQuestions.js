import React, { Fragment, useState } from 'react';
import Panel from './Panel/Panel'
import css from './AskedQuestions.module.css'

const AskedQuestions = () => {



  return (
    <div className={css.AskedQuestions}>
      <div className="container">
        <h2>FAQs</h2>
        <div className={css.panelGroup}>

          <Panel
            title="Our Services"
            body={
              <Fragment>
                <p><strong>How do I buy train tickets in Italy?</strong> Buying train tickets in Italy is easy. For regional trains you don't have to prebook, just show up at the station and use one of the ticket machines and off you go. Long distance train tickets need to be booked in advance although seats rarely sell out, so buying a day or two before is usually fine, but much more expensive than booking in advance.</p>
                <p><strong>Is it easy to book tickets if you don't speak the language?</strong> Yes, just go to the station and use the fast ticket machines in English.</p>
                <p>For more in-depth information about trains in Italy.</p>
              </Fragment>
            }
          />

          <Panel
            title="Tracking Trains"
            body={
              <Fragment>
                <p><strong>How do I buy train tickets in Italy?</strong> Buying train tickets in Italy is easy. For regional trains you don't have to prebook, just show up at the station and use one of the ticket machines and off you go. Long distance train tickets need to be booked in advance although seats rarely sell out, so buying a day or two before is usually fine, but much more expensive than booking in advance.</p>
                <p><strong>Is it easy to book tickets if you don't speak the language?</strong> Yes, just go to the station and use the fast ticket machines in English.</p>
                <p>For more in-depth information about trains in Italy.</p>
              </Fragment>
            }
          />

          <Panel
            title="Booking"
            body={
              <Fragment>
                <p><strong>How do I buy train tickets in Italy?</strong> Buying train tickets in Italy is easy. For regional trains you don't have to prebook, just show up at the station and use one of the ticket machines and off you go. Long distance train tickets need to be booked in advance although seats rarely sell out, so buying a day or two before is usually fine, but much more expensive than booking in advance.</p>
                <p><strong>Is it easy to book tickets if you don't speak the language?</strong> Yes, just go to the station and use the fast ticket machines in English.</p>
                <p>For more in-depth information about trains in Italy.</p>
              </Fragment>
            }
          />

          <Panel
            title="About Us"
            body={
              <Fragment>
                <p><strong>How do I buy train tickets in Italy?</strong> Buying train tickets in Italy is easy. For regional trains you don't have to prebook, just show up at the station and use one of the ticket machines and off you go. Long distance train tickets need to be booked in advance although seats rarely sell out, so buying a day or two before is usually fine, but much more expensive than booking in advance.</p>
                <p><strong>Is it easy to book tickets if you don't speak the language?</strong> Yes, just go to the station and use the fast ticket machines in English.</p>
                <p>For more in-depth information about trains in Italy.</p>
              </Fragment>
            }
          />

          <div className={css.split}></div>

        </div>
      </div>
    </div>
  );
}

export default AskedQuestions;
