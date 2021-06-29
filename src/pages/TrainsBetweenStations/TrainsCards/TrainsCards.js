import React from 'react';
import TrainCard from '../../../components/TrainCard/TrainCard';
import css from './TrainsCards.module.scss'
import { subTwoTimes, ToMinOnly, time24To12, digitDateToNice, calFaresPrices } from '../../../shared/utility'

const TrainsCards = (props) => {
  // <TrainsCards ourTrains={ourTrains} fromUrl={fromUrl} toUrl={toUrl} dateUrl={dateUrl} />


  const ourTrains = props.ourTrains
  const fromUrl = props.fromUrl
  const toUrl = props.toUrl
  const dateUrl = props.dateUrl

  let FastestId, CheapestId//, TopRatedId
  let FastestMin, minPrice //, hightestRate;
  let departTime, arrivalTime
  let indexFrom, indexTo
  let cheapestPrice

  console.log("ourTrains", ourTrains);

  let OurTrainsWithExtra = [];
  for (const val of ourTrains) {
    for (const i in val.value.stopStation) {
      if (val.value.stopStation[i].name === fromUrl) {
        departTime = val.value.stopStation[i].departTime
        indexFrom = i;
      }
      else if (val.value.stopStation[i].name === toUrl) {
        arrivalTime = val.value.stopStation[i].arrivalTime
        indexTo = i
      }
    }

    val.value.departTime = time24To12(departTime);
    val.value.arrivalTime = time24To12(arrivalTime);
    val.value.numberOfStops = (indexTo - indexFrom - 1);
    val.value.journeyTime = subTwoTimes(departTime, arrivalTime);

    if (val.value.fareClassess["3A"]) {
      cheapestPrice = calFaresPrices(fromUrl, toUrl, val.value.numberOfStops).p3A
    } else if (val.value.fareClassess["2A"]) {
      cheapestPrice = calFaresPrices(fromUrl, toUrl, val.value.numberOfStops).p2A
    } else if (val.value.fareClassess["1A"]) {
      cheapestPrice = calFaresPrices(fromUrl, toUrl, val.value.numberOfStops).p1A
    }

    val.value.cheapestPrice = cheapestPrice;

    //* if this is first train, or this is faster than previous train
    if (!FastestMin || ToMinOnly(val.value.journeyTime) <= FastestMin) {
      FastestMin = ToMinOnly(val.value.journeyTime)
      FastestId = val.value.number
    }
    if (!minPrice || val.value.cheapestPrice <= minPrice) {
      minPrice = val.value.cheapestPrice
      CheapestId = val.value.number
    }
    // if (!hightestRate || val.value.rate >= hightestRate) {
    //   TopRatedId = val.value.number
    // }

    OurTrainsWithExtra.push(val)
  }

  console.log("OurTrainsWithExtra", OurTrainsWithExtra)




  return (
    <div className={`${css.trainsCards} container`}>
      <ul className='reset'>
        {
          ourTrains.map((val) => {
            return (
              <TrainCard
                key={val.id}
                id={val.id}
                name={val.value.number}
                departTime={val.value.departTime}
                arrivalTime={val.value.arrivalTime}
                dateUrl={digitDateToNice(dateUrl)}
                journeyTime={val.value.journeyTime}
                numberOfStops={val.value.numberOfStops}
                p1A={val.value.fareClassess["1A"] ? calFaresPrices(fromUrl, toUrl, val.value.numberOfStops).p1A : null}
                p2A={val.value.fareClassess["2A"] ? calFaresPrices(fromUrl, toUrl, val.value.numberOfStops).p2A : null}
                p3A={val.value.fareClassess["3A"] ? calFaresPrices(fromUrl, toUrl, val.value.numberOfStops).p3A : null}
                weekDayRuns={val.value.weekDayRuns}
                // isTopRated={TopRatedId === val.value.number ? true : false}
                isCheapest={CheapestId === val.value.number ? true : false}
                isFastest={FastestId === val.value.number ? true : false}
              />
            )
          })
        }
      </ul>
    </div>

  );
}

export default TrainsCards;
