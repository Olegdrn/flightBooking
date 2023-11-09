

export function UseFilter(data, array) {

  let filteredItems = array;

  switch (data.sort) {
    case "upPrice":
      filteredItems = array.sort((flight1, flight2) =>
        (+flight1.price) > (+flight2.price) ? 1 : -1)
      break;

    case "dropPrice":
      filteredItems = array.sort((flight1, flight2) =>
        (+flight1.price) < (+flight2.price) ? 1 : -1)
      break;

    case "time":
      filteredItems = array.sort((flight1, flight2) =>
        (+flight2.travelDuration) - (+flight1.travelDuration))
      break;

    default:
      break;
  };

  if (data.transfer === "transfer") {
    filteredItems = filteredItems.filter(el => el.stops === 1)
  };

  if (data.minPrice || data.maxPrice) {
    if (data.minPrice && !data.maxPrice) {
      data.minPrice = +data.minPrice;
      filteredItems = filteredItems.filter((el) =>
        el.price > data.minPrice)
    } else if (!data.minPrice && data.maxPrice) {
      data.maxPrice = +data.maxPrice;
      filteredItems = filteredItems.filter((el) =>
        el.price < data.maxPrice
      )
    } else {
      data.minPrice = +data.minPrice;
      data.maxPrice = +data.maxPrice;
      filteredItems = filteredItems.filter((el) =>
        data.minPrice < el.price && el.price < data.maxPrice
      )
    }
  };

  switch (data.company) {
    case "Air France":
      filteredItems = filteredItems.filter((el) => el.airline.caption === "Air France")
      break;

    case "Aeroflot":
      filteredItems = filteredItems.filter((el) => el.airline.caption === "Аэрофлот - российские авиалинии")
      break;

    default:
      break;
  };

  return filteredItems;
}






// if (data.sort === "upPrice") {
//   filteredItems = array.sort((flight1, flight2) =>
//     (+flight1.price) > (+flight2.price) ? 1 : -1)
// };

// if (data.sort === "dropPrice") {
//   filteredItems = array.sort((flight1, flight2) =>
//     (+flight1.price) < (+flight2.price) ? 1 : -1)
// };

// if (data.sort === "time") {
//   filteredItems = array.sort((flight1, flight2) =>
//     (+flight2.travelDuration) - (+flight1.travelDuration))
// };


// if (data.company === "Air France") {
//   filteredItems = filteredItems.filter((el) => el.airline.caption === "Air France")
// }
// else if (data.company === "Aeroflot") {
//   filteredItems = filteredItems.filter((el) => el.airline.caption === "Аэрофлот - российские авиалинии")
// };