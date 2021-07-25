import React from 'react';
import Navbar from '../../components/Navbar/NavBar';
import './Statistics.scss'
import train from '../../assets/imgs/statisticsImgs/train.svg'
import chair from '../../assets/imgs/statisticsImgs/chair.svg'
import station from '../../assets/imgs/statisticsImgs/station.svg'
import money from '../../assets/imgs/statisticsImgs/money.svg'
import tickets from '../../assets/imgs/statisticsImgs/tickets.svg'
import group from '../../assets/imgs/statisticsImgs/group.svg'
import brickWall from '../../assets/imgs/statisticsImgs/brickwall.svg'
import productivity from '../../assets/imgs/statisticsImgs/productivity.svg'
import trainStation from '../../assets/imgs/statisticsImgs/trainStation.svg'
import enter from '../../assets/imgs/statisticsImgs/enter.svg'
import trainSide from '../../assets/imgs/statisticsImgs/trainSide.svg'
import logout from '../../assets/imgs/statisticsImgs/logout.svg'
import sadAndHappy from '../../assets/imgs/statisticsImgs/sadAndHappy.svg'
import hourglass from '../../assets/imgs/statisticsImgs/hourglass.svg'
import broom from '../../assets/imgs/statisticsImgs/broom.svg'
import sleeping from '../../assets/imgs/statisticsImgs/sleeping.svg'
import rightArrow from '../../assets/imgs/statisticsImgs/rightArrow.svg'
import route from '../../assets/imgs/statisticsImgs/route.svg'
import crowd8 from '../../assets/imgs/statisticsImgs/crowd/crowd8.svg'
import crowd5 from '../../assets/imgs/statisticsImgs/crowd/crowd5.svg'
import crowd4 from '../../assets/imgs/statisticsImgs/crowd/crowd4.svg'
import crowd3 from '../../assets/imgs/statisticsImgs/crowd/crowd3.svg'
import Footer from '../../components/Footer/Footer';

const Statistics = () => {
  return (
    <div className="statistics">
      <header className="upperPart">
        <Navbar />
        <h1 className="title container">Statistics</h1>
      </header>

      <main className="container">
        <div className="mainContent">

          <div className="firstRowOfStatics">
            <div className="infraInfo">
              <div className="header">Infrastructure information<img src={brickWall} alt="brickWall icon" /></div>
              <div className="subBoxes">
                <div>
                  <div className="icon">
                    <img src={train} alt="train icon" />
                  </div>
                  <div className="info">
                    <div className="title">Trains</div>
                    <div className="number">34</div>
                  </div>
                </div>
                <div>
                  <div className="icon">
                    <img src={chair} alt="chair icon" />
                  </div>
                  <div className="info">
                    <div className="title">Seats</div>
                    <div className="number">23,532</div>
                  </div>
                </div>
                <div>
                  <div className="icon">
                    <img src={station} alt="station icon" />
                  </div>
                  <div className="info">
                    <div className="title">Stations</div>
                    <div className="number">16</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="outcomeInfo">
              <div className="header">Outcomes information<img src={productivity} alt="productivity icon" /></div>
              <div className="subBoxes">
                <div>
                  <div className="icon">
                    <img src={group} alt="train icon" />
                  </div>
                  <div className="info">
                    <div className="title">Users</div>
                    <div className="number">88,242</div>
                  </div>
                </div>
                <div>
                  <div className="icon">
                    <img src={tickets} alt="chair icon" />
                  </div>
                  <div className="info">
                    <div className="title">Tickets</div>
                    <div className="number">71,234</div>
                  </div>
                </div>
                <div>
                  <div className="icon">
                    <img src={money} alt="station icon" />
                  </div>
                  <div className="info">
                    <div className="title">Revenue</div>
                    <div className="number">2,232,425<span>EGP</span></div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="secondeRowOfStatics">

            <div className="stations">

              <div className="header">Top Crowded Stations<img src={trainStation} alt="train station icon" /></div>

              <div className="stationsContent">
                <div className="stationName">Cairo</div>
                <div className="stationAllNumber">19,301<span>passengers</span></div>
                <div className="stationEnterAndLeave">
                  <div className="stationEnter">10,345<img src={enter} alt="brickWall icon" /></div>
                  <div className="stationLeave"><img src={logout} alt="brickWall icon" />8,956</div>
                </div>
                <div className="progressBarContainer"><div className="progressBar red"></div></div>
                <div className="crowdIcon"><img src={crowd8} alt="crowd icon" /></div>
              </div>

              <div className="stationsContent">
                <div className="stationName">Alexandria</div>
                <div className="stationAllNumber">10,328<span>passengers</span></div>
                <div className="stationEnterAndLeave">
                  <div className="stationEnter">5,245<img src={enter} alt="brickWall icon" /></div>
                  <div className="stationLeave"><img src={logout} alt="brickWall icon" />5,083</div>
                </div>
                <div className="progressBarContainer"><div className="progressBar orange"></div></div>
                <div className="crowdIcon"><img src={crowd5} alt="crowd icon" /></div>
              </div>

              <div className="stationsContent">
                <div className="stationName">Tanta</div>
                <div className="stationAllNumber">5,363<span>passengers</span></div>
                <div className="stationEnterAndLeave">
                  <div className="stationEnter">2,043<img src={enter} alt="brickWall icon" /></div>
                  <div className="stationLeave"><img src={logout} alt="brickWall icon" />3,320</div>
                </div>
                <div className="progressBarContainer"><div className="progressBar blue"></div></div>
                <div className="crowdIcon"><img src={crowd4} alt="crowd icon" /></div>
              </div>

              <div className="stationsContent">
                <div className="stationName">Damanhur</div>
                <div className="stationAllNumber">2,530<span>passengers</span></div>
                <div className="stationEnterAndLeave">
                  <div className="stationEnter">937<img src={enter} alt="brickWall icon" /></div>
                  <div className="stationLeave"><img src={logout} alt="brickWall icon" />1,593</div>
                </div>
                <div className="progressBarContainer"><div className="progressBar green"></div></div>
                <div className="crowdIcon"><img src={crowd3} alt="crowd icon" /></div>
              </div>

              <span className="viewMore">view more<i className="fas fa-angle-down"></i></span>


            </div>

            <div className="trains">

              <div className="header">Top Crowded Trains<img src={trainSide} alt="train station icon" /></div>

              <div className="trainsContent">
                <div className="trainName">1109</div>
                <div className="trainInfo">
                  <div className="trainNumber">716<span>passengers</span></div>
                  <div className="progressBarContainer"><div className="progressBar red"></div></div>
                  <div className="crowdIcon"><img src={crowd8} alt="crowd icon" /></div>
                </div>
              </div>

              <div className="trainsContent">
                <div className="trainName">901</div>
                <div className="trainInfo">
                  <div className="trainNumber">404<span>passengers</span></div>
                  <div className="progressBarContainer"><div className="progressBar blue"></div></div>
                  <div className="crowdIcon"><img src={crowd4} alt="crowd icon" /></div>
                </div>
              </div>

              <div className="trainsContent">
                <div className="trainName">921</div>
                <div className="trainInfo">
                  <div className="trainNumber">328<span>passengers</span></div>
                  <div className="progressBarContainer"><div className="progressBar blueLow"></div></div>
                  <div className="crowdIcon"><img src={crowd4} alt="crowd icon" /></div>
                </div>
              </div>

              <div className="trainsContent">
                <div className="trainName">2001</div>
                <div className="trainInfo">
                  <div className="trainNumber">113<span>passengers</span></div>
                  <div className="progressBarContainer"><div className="progressBar green"></div></div>
                  <div className="crowdIcon"><img src={crowd3} alt="crowd icon" /></div>
                </div>
              </div>

              <span className="viewMore">view more<i className="fas fa-angle-down"></i></span>
            </div>

          </div>

          <div className="thirdRowOfStatics">
            <div className="toRated">
              <div className="header">Top Rated Trains<img src={sadAndHappy} alt="sad and happy icon" /></div>
              <div className="trainRatedContent">
                <div className="trainName">917</div>
                <div className="numberOfReviews">40<span>Reviews</span></div>
                <div className="subReviews">
                  <div className="cleanliness">
                    <div><img src={broom} alt="hourglass icon" />Cleanliness</div>
                    <div>
                      <i className="active fas fa-star"></i>
                      <i className="active fas fa-star"></i>
                      <i className="active fas fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                    </div>
                  </div>
                  <div className="onTime">
                    <div><img src={hourglass} alt="hourglass icon" />On Time</div>
                    <div>
                      <i className="active fas fa-star"></i>
                      <i className="active fas fa-star"></i>
                      <i className="active fas fa-star"></i>
                      <i className="active fas fa-star"></i>
                      <i className="active fas fa-star"></i>
                    </div>
                  </div>
                  <div className="onTime">
                    <div><img src={sleeping} alt="hourglass icon" />Comforts</div>
                    <div>
                      <i className="active fas fa-star"></i>
                      <i className="active fas fa-star"></i>
                      <i className="active fas fa-star"></i>
                      <i className="active fas fa-star"></i>
                      <i className="far fa-star"></i>
                    </div>
                  </div>
                </div>

                <div className="review green">4.3</div>
              </div>
              <div className="trainRatedContent">
                <div className="trainName">925</div>
                <div className="numberOfReviews">35<span>Reviews</span></div>
                <div className="subReviews">
                  <div className="cleanliness">
                    <div><img src={broom} alt="hourglass icon" />Cleanliness</div>
                    <div>
                      <i className="active fas fa-star"></i>
                      <i className="active fas fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                    </div>
                  </div>
                  <div className="onTime">
                    <div><img src={hourglass} alt="hourglass icon" />On Time</div>
                    <div>
                      <i className="active fas fa-star"></i>
                      <i className="active fas fa-star"></i>
                      <i className="active fas fa-star"></i>
                      <i className="active fas fa-star"></i>
                      <i className="far fa-star"></i>
                    </div>
                  </div>
                  <div className="onTime">
                    <div><img src={sleeping} alt="hourglass icon" />Comforts</div>
                    <div>
                      <i className="active fas fa-star"></i>
                      <i className="active fas fa-star"></i>
                      <i className="active fas fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                    </div>
                  </div>
                </div>
                <div className="review orange">3.6</div>
              </div>
              <div className="trainRatedContent">
                <div className="trainName">196</div>
                <div className="numberOfReviews">62<span>Reviews</span></div>
                <div className="subReviews">
                  <div className="cleanliness">
                    <div><img src={broom} alt="hourglass icon" />Cleanliness</div>
                    <div>
                      <i className="active fas fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                    </div>
                  </div>
                  <div className="onTime">
                    <div><img src={hourglass} alt="hourglass icon" />On Time</div>
                    <div>
                      <i className="active fas fa-star"></i>
                      <i className="active fas fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                    </div>
                  </div>
                  <div className="onTime">
                    <div><img src={sleeping} alt="hourglass icon" />Comforts</div>
                    <div>
                      <i className="active fas fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                    </div>
                  </div>
                </div>
                <div className="review orange">1.7</div>
              </div>
              <div className="trainRatedContent">
                <div className="trainName">88</div>
                <div className="numberOfReviews">53<span>Reviews</span></div>
                <div className="subReviews">
                  <div className="cleanliness">
                    <div><img src={broom} alt="hourglass icon" />Cleanliness</div>
                    <div>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                    </div>
                  </div>
                  <div className="onTime">
                    <div><img src={hourglass} alt="hourglass icon" />On Time</div>
                    <div>
                      <i className="active fas fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                    </div>
                  </div>
                  <div className="onTime">
                    <div><img src={sleeping} alt="hourglass icon" />Comforts</div>
                    <div>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                    </div>
                  </div>
                </div>
                <div className="review red">0.8</div>
              </div>

              <span className="viewMore">view more<i className="fas fa-angle-down"></i></span>

            </div>
            <div className="routes">
              <div className="header">Top Selected Routes<img src={route} alt="route icon" /></div>

              <div className="routeContent">
                <div className="fromStation">Cairo</div>
                <div className="arrow"><img src={rightArrow} alt="right arrow icon" /></div>
                <div className="toStation">Alexandria</div>
                <div className="numbers">6,453<span>passengers</span></div>
              </div>

              <div className="routeContent">
                <div className="fromStation">Alexandria</div>
                <div className="arrow"><img src={rightArrow} alt="right arrow icon" /></div>
                <div className="toStation">Cairo</div>
                <div className="numbers">5,102<span>passengers</span></div>
              </div>

              <div className="routeContent">
                <div className="fromStation">Cairo</div>
                <div className="arrow"><img src={rightArrow} alt="right arrow icon" /></div>
                <div className="toStation">Tanta</div>
                <div className="numbers">3,019<span>passengers</span></div>
              </div>
              <div className="routeContent">
                <div className="fromStation">Damanhur</div>
                <div className="arrow"><img src={rightArrow} alt="right arrow icon" /></div>
                <div className="toStation">Shubra</div>
                <div className="numbers">1,401<span>passengers</span></div>
              </div>
              <div className="routeContent">
                <div className="fromStation">Sidi Gaber</div>
                <div className="arrow"><img src={rightArrow} alt="right arrow icon" /></div>
                <div className="toStation">Alexandria</div>
                <div className="numbers">802<span>passengers</span></div>
              </div>

              <span className="viewMore">view more<i className="fas fa-angle-down"></i></span>
            </div>
          </div>

        </div>
      </main>
      <div className="footerContainer">
        <Footer />
      </div>

    </div>
  );
}

export default Statistics;
