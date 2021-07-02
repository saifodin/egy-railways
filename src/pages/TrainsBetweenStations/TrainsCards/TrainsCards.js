import React from 'react';
import TrainCard from '../../../components/TrainCard/TrainCard';
import css from './TrainsCards.module.scss'
import { subTwoTimes, ToMinOnly, time24To12, digitDateToNice, calFaresPrices, time24ToMin } from '../../../shared/utility'

const TrainsCards = (props) => {
  // <TrainsCards ourTrains={ourTrains} fromUrl={fromUrl} toUrl={toUrl} dateUrl={dateUrl} />


  let ourTrains = props.ourTrains
  const fromUrl = props.fromUrl
  const toUrl = props.toUrl
  const dateUrl = props.dateUrl

  let FastestId, CheapestId//, TopRatedId
  let FastestMin, minPrice //, hightestRate;
  let departTime, arrivalTime
  let indexFrom, indexTo
  let cheapestPrice

  console.log("ourTrains", ourTrains);

  //# add extra items to ourTrains objects
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

    val.value.departTime12 = time24To12(departTime);
    val.value.arrivalTime12 = time24To12(arrivalTime);
    val.value.departTimeMin = time24ToMin(departTime);
    val.value.arrivalTimeMin = time24ToMin(arrivalTime);
    val.value.numberOfStops = (indexTo - indexFrom - 1);
    val.value.journeyTime = subTwoTimes(departTime, arrivalTime);
    val.value.journeyTimeMin = ToMinOnly(subTwoTimes(departTime, arrivalTime));


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
  }

  console.log("ourTrains after extra", ourTrains);

  //#region - sorted by filers

  //* Sorted By
  if (props.filterSorted === "DEPARTURE_TIME") {
    ourTrains.sort((a, b) => (a.value.arrivalTimeMin - b.value.arrivalTimeMin))
  } else if (props.filterSorted === "DURATION") {
    ourTrains.sort((a, b) => (a.value.journeyTimeMin - b.value.journeyTimeMin))
  } else if (props.filterSorted === "ARRIVAL_TIME") {
    ourTrains.sort((a, b) => (a.value.arrivalTimeMin - b.value.arrivalTimeMin))
  }

  //* Class 2^3=8
  let ourTrainClass = []
  const filterClass = (fareClass, fareClass2) => {
    for (const val of ourTrains) {
      if (!fareClass2) {
        if (val.value.fareClassess[fareClass]) {
          ourTrainClass.push(val)
        }
      } else {
        if (val.value.fareClassess[fareClass] || val.value.fareClassess[fareClass2]) {
          ourTrainClass.push(val)
        }
      }
    }
  }
  if (props.whichClassIsActive === "false,false,false" || props.whichClassIsActive === "true,true,true")
    ourTrainClass = [...ourTrains]
  else if (props.whichClassIsActive === "true,false,false")
    filterClass("1A")
  else if (props.whichClassIsActive === "false,true,false")
    filterClass("2A")
  else if (props.whichClassIsActive === "false,false,true")
    filterClass("3A")

  else if (props.whichClassIsActive === "true,true,false")
    filterClass("1A", "2A")
  else if (props.whichClassIsActive === "false,true,true")
    filterClass("2A", "3A")
  else if (props.whichClassIsActive === "true,false,true")
    filterClass("1A", "2A")
  else
    ourTrainClass = [...ourTrains]
  ourTrains = [...ourTrainClass]

  //* Departure time 2^4=16
  let ourTrainDep = []
  const filterDep = (min1, min2, min3, min4) => {
    for (const val of ourTrains) {
      if (!min3) {
        if (val.value.departTimeMin >= min1 && val.value.departTimeMin < min2) {
          ourTrainDep.push(val)
        }
      } else {
        if ((val.value.departTimeMin >= min1 && val.value.departTimeMin < min2) || (val.value.departTimeMin >= min3 && val.value.departTimeMin < min4)) {
          ourTrainDep.push(val)
        }
      }

    }
  }
  if (props.depTimeFilter === "false,false,false,false" || props.depTimeFilter === "true,true,true,true")
    ourTrainDep = [...ourTrains]
  else if (props.depTimeFilter === "true,false,false,false")
    filterDep(5 * 60, 11 * 60)
  else if ((props.depTimeFilter === "false,true,false,false"))
    filterDep(11 * 60, 17 * 60)
  else if ((props.depTimeFilter === "false,false,true,false"))
    filterDep(17 * 60, 23 * 60)
  else if ((props.depTimeFilter === "false,false,false,true"))
    filterDep(23 * 60, 24 * 60, 0, 5 * 60)

  else if (props.depTimeFilter === "true,true,false,false")
    filterDep(5 * 60, 17 * 60)
  else if (props.depTimeFilter === "true,true,true,false")
    filterDep(5 * 60, 23 * 60)

  else if (props.depTimeFilter === "false,true,true,false")
    filterDep(11 * 60, 23 * 60)
  else if (props.depTimeFilter === "false,true,true,true")
    filterDep(11 * 60, 24 * 60, 0, 5 * 60)

  else if (props.depTimeFilter === "false,false,true,true")
    filterDep(17 * 60, 24 * 60, 0, 5 * 60)
  else if (props.depTimeFilter === "true,false,true,true")
    filterDep(17 * 60, 24 * 60, 0, 17 * 60)

  else if (props.depTimeFilter === "true,false,false,true")
    filterDep(23 * 60, 24 * 60, 0, 11 * 60)
  else if (props.depTimeFilter === "true,true,false,true")
    filterDep(23 * 60, 24 * 60, 0, 17 * 60)

  else if (props.depTimeFilter === "true,false,true,false")
    filterDep(5 * 60, 11 * 60, 17 * 60, 23 * 60)

  else if (props.depTimeFilter === "false,true,false,true") {
    for (const val of ourTrains) {
      if (((val.value.departTimeMin >= (23 * 60) && val.value.departTimeMin < (24 * 60)) || (val.value.departTimeMin >= 0 && val.value.departTimeMin < (5 * 60))) || (val.value.departTimeMin >= (11 * 60) && val.value.departTimeMin < (17 * 60)))
        ourTrainDep.push(val)
    }
  } 
  
  else ourTrainDep = [...ourTrains]
  ourTrains = [...ourTrainDep]




  //#endregion





  return (
    <div className={`${css.trainsCards} container`}>
      <ul className='reset'>
        {
          ourTrains.map((val) => {
            return (
              <TrainCard
                forTrainsBetweenStations
                key={val.id}
                id={val.id}
                name={val.value.number}
                departTime={val.value.departTime12}
                arrivalTime={val.value.arrivalTime12}
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
