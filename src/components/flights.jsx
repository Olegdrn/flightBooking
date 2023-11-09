import './style/flights.css';
import { useEffect, useState } from 'react';
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { MdOutlineWatchLater } from "react-icons/md";
import { SiAirfrance } from "react-icons/si";
import { SiKlm } from "react-icons/si";
import { SiTurkishairlines } from "react-icons/si";
import { SiAeroflot } from "react-icons/si";
import { GiAirplaneDeparture } from "react-icons/gi";

import { UseFilter } from './hooks/useFilter';
import { UseDateTransform } from './hooks/useDateTransform';

export default function Flights({ formInfo, setAirCompanies }) {
  const [bigData, setBigData] = useState([]);
  const url = 'http://localhost:8000/result';

  const priceArr = [];
  const segments = [];
  const companies = [];


  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(finalData => {
        setBigData(finalData.flights)
      })
  }, [])

  bigData.forEach(element => {
    priceArr.push(+element.flight.price.total.amount)
  });

  bigData.forEach(element => {
    element.flight.legs.forEach(el => {
      el.segments.forEach(el => {
        segments.push(el);
        companies.push(el.airline.caption)
      })
    })
  });

  segments.forEach((el, index) => {
    (priceArr[index] ? el.price = priceArr[index] : el.price = (30000 + index * 10))
    console.log(index)
  })

  useEffect(() => {
    setAirCompanies(companies)
  }, [bigData]);

  let currentItems = UseFilter(formInfo, segments)

  const [noOfElement, setNoOfElement] = useState(2);

  const loadMore = () => {
    setNoOfElement(noOfElement + 2)
  }

  const slice = currentItems.slice(0, noOfElement);

  function CompanyLabel(objectSeg) {
    switch (objectSeg) {
      case "KL":
        return <SiKlm />

      case "TK":
        return <SiTurkishairlines />

      case "AF":
        return <SiAirfrance />

      case "SU1":
        return <SiAeroflot />

      default:
        return <GiAirplaneDeparture />
    }
  }

  return (
    <div className="flights">
      {
        slice.map((el, index) => {
          return (
            <div className="flight" key={index}>
              <div className="price">
                <div className="companylabel">
                  <div className="companyImg">{CompanyLabel(el.airline.uid)}</div>
                  <div className="companyUid"> {el.airline.airlineCode}</div>
                </div>
                <div className="priceBlock">
                  <p className="priceAmount">{el.price} RUB</p>
                  <p className='descriptionPrice'>Стоимость за одного взрослого пассажира</p>
                </div>
              </div>
              <div className="direction">
                <div className="from">
                  <p>{el.departureCity.caption}, {el.departureAirport.caption},
                    <span className="fromUid">
                      &nbsp;({el.departureAirport.uid})
                    </span>
                  </p>
                </div>
                <div >
                  <HiOutlineArrowNarrowRight className="arrow" />
                </div>
                <div className="to">
                  <p>{el.arrivalCity.caption}, {el.arrivalAirport.caption},
                    <span className="fromUid">
                      &nbsp;({el.arrivalAirport.uid})
                    </span>
                  </p>
                </div>
              </div>
              <div className="hr"></div>
              <div className="time">
                <div className="start">
                  <p className='secondDate'>
                    {UseDateTransform(el.departureDate).time}
                  </p>
                  <p className='firstDate'>
                    {UseDateTransform(el.departureDate).date}&nbsp;
                    {UseDateTransform(el.departureDate).mounth}&nbsp;
                    {UseDateTransform(el.departureDate).days}
                  </p>

                </div>
                <div className="total">
                  <div className="watch">
                    <MdOutlineWatchLater />
                  </div>
                  <p className="timeData">{Math.trunc(el.travelDuration / 60)} ч {el.travelDuration % 60} мин</p>
                </div>
                <div className="end">
                  <p className='firstDate'>
                    {UseDateTransform(el.arrivalDate).date}&nbsp;
                    {UseDateTransform(el.arrivalDate).mounth}&nbsp;
                    {UseDateTransform(el.arrivalDate).days}</p>
                  <p className='secondDate'>
                    {UseDateTransform(el.arrivalDate).time}
                  </p>
                </div>
              </div>
              <div className="transfer">
                <div className="hr"></div>
                <p className="amountTransfer">пересадок: {el.stops} </p>
                <div className="hr"></div>
              </div>
              <div className="companyBlock" >
                <p className="company">Рейс выполняет: {el.airline.caption}</p>
              </div>
              <button className="elementbutton">Выбрать</button>
            </div>
          )
        })
      }
      <button className="showMoreButton" onClick={() => loadMore()}>Показать еще</button>
    </div >
  );
}
