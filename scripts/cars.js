const cars = [
  {
    id: 1,
    brand: "Ford",
    model: "Mustang Boss 429",
    year: 1969,
    driver: "John Wick",
    enginePower: "375",
    mileage: "30 000",
    price: 550000,
    image: (src = "./assets/Ford Mustang Boss 429.png"),
  },
  {
    id: 2,
    brand: "Aston Martin",
    model: "DB5",
    year: 1964,
    driver: "James Bond",
    enginePower: "286",
    mileage: "40 000",
    price: 5835000,
    image: (src = "./assets/Aston Martin DB5.png"),
  },

  {
    id: 3,
    brand: "Dodge",
    model: "Charger R/T",
    year: 1970,
    driver: "Dominic Toretto",
    enginePower: "900",
    mileage: "50 000",
    price: 1000000,
    image: (src = "./assets/Dodge Charger.png"),
  },
  {
    id: 4,
    brand: "Nissan",
    model: "Skyline GT-R R34",
    year: 2000,
    driver: "Paul Walker",
    enginePower: "550",
    mileage: "50 000",
    price: 1357000,
    image: (src = "./assets/Nissan Skyline R34.png"),
  },
  {
    id: 5,
    brand: "Batmobil",
    model: "Batman and Batman Returs",
    year: 1989,
    driver: "Batman",
    enginePower: "340",
    mileage: "5 000",
    price: 1500000,
    image: (src = "./assets/Batman Batmobile.png"),
  },
];

// Function to format price
function formatPrice(price) {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
}

// Function to render cars

cars.forEach((car) => {
  const containerId = `containerCar${car.id}`;
  const container = document.getElementById(containerId);

  const carList = document.createElement("ul");
  carList.innerHTML = `
      <li>Brand: ${car.brand}</li>
      <li>Model: ${car.model}</li>
      <li>Year: ${car.year}</li>
      <li>Driver: ${car.driver}</li>
      <li>Engine Power: ${car.enginePower}</li>
      <li>Mileage: ${car.mileage}</li>
      <li>Price: ${formatPrice(car.price)}</li>
    `;

  container.appendChild(carList);
});
