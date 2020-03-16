

const date = new Date(new Date().getTime() + 1800 * 1000);
console.log("date moved 30 min forward:", date.toUTCString());

localStorage.setItem("expDate", date.toUTCString());

const newDate = new Date(date.toUTCString());
console.log(newDate.toUTCString());

// const dateAsSting = JSON.stringify(dateAsDate);
// console.log("String - ", dateAsSting);

// const dateBackAsDate = new Date(dateAsSting);
// console.log(dateBackAsDate);
