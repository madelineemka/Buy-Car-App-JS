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
    accessories: [],
  },
  {
    id: 2,
    brand: "Aston Martin",
    model: "DB5",
    year: 2021,
    driver: "James Bond",
    enginePower: "286",
    mileage: "40 000",
    price: 2922000,
    image: (src = "./assets/Aston Martin DB5.png"),
    accessories: [],
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
    accessories: [],
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
    accessories: [],
  },
  {
    id: 5,
    brand: "Batmobil",
    model: "Batman and Batman Returs",
    year: 2019,
    driver: "Batman",
    enginePower: "340",
    mileage: "5 000",
    price: 1500000,
    image: (src = "./assets/Batman Batmobile.png"),
    accessories: [],
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const carListingsContainer = document.getElementById("carListings");
  const chosenCarDiv = document.getElementById("chosenCar");
  const formDiv = document.getElementById("form");
  chosenCarDiv.style.display = "none"; // Initially hide chosenCar div
  formDiv.classList.add("hidden"); // Initially hide form div

  cars.forEach((car) => {
    const carDiv = document.createElement("div");
    carDiv.classList.add("car");

    const details = document.createElement("div");
    details.innerHTML = `
    <p><strong class="car-brand">${car.brand}</strong> <strong class="car-model">${car.model}</strong></p>
      <p><strong>Year:</strong> ${car.year}</p>
      <p><strong>Driver:</strong> ${car.driver}</p>
      <p><strong>Engine Power:</strong> ${car.enginePower}</p>
      <p><strong>Mileage:</strong> ${car.mileage}</p>
      <p><strong>Price:</strong> ${car.price}</p>
    `;
    const image = document.createElement("img");
    image.src = car.image;
    image.alt = car.brand + " " + car.model;

    const buyButton = document.createElement("button");
    buyButton.textContent = "Buy now";

    buyButton.addEventListener("click", function () {
      // Toggle visibility of chosenCar div
      chosenCarDiv.style.display = "block";
      // Toggle visibility of form div
      formDiv.classList.remove("hidden");

      // Fill in chosen car details
      document.getElementById("carName").textContent =
        car.brand + " " + car.model;
      document.getElementById("totalPrice").textContent = car.price;

      // Optionally, you can also hide the car listings and scroll to the chosenCar div
      carListingsContainer.style.display = "none";
      chosenCarDiv.scrollIntoView({ behavior: "smooth" });
    });

    carDiv.appendChild(details);
    carDiv.appendChild(image);
    carDiv.appendChild(buyButton);

    carListingsContainer.appendChild(carDiv);
  });
});
// DATE - 14 days from today

document.addEventListener("DOMContentLoaded", function () {
  const today = new Date();

  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + 14);

  const futureDateString = futureDate.toISOString().split("T")[0];

  document.getElementById("deliveryDate").value = futureDateString;
});
// ACCESSORIES

const accessories = [
  { name: "Winter tires", price: 2000, id: "tires" },
  { name: "Signature", price: 500, id: "sign" },
  { name: "Special case", price: 1000, id: "case" },
  { name: "Complete set of films", price: 500, id: "films" },
];
document.addEventListener("DOMContentLoaded", function () {
  const accessoriesContainer = document.getElementById("accessories");

  accessories.forEach((accessory) => {
    const accessoryDiv = document.createElement("div");
    accessoryDiv.classList.add("accessory");

    const accessoryName = document.createElement("span");
    accessoryName.textContent = accessory.name;

    const accessoryPrice = document.createElement("span");
    accessoryPrice.textContent = `${accessory.price} USD`;

    const addButton = document.createElement("button");
    addButton.textContent = "+";
    addButton.classList.add("addAccessoryButton");
    addButton.dataset.id = accessory.id;

    accessoryDiv.appendChild(accessoryName);
    accessoryDiv.appendChild(accessoryPrice);
    accessoryDiv.appendChild(addButton);

    accessoriesContainer.appendChild(accessoryDiv);
  });
});

// CONFIRM ORDER PAGE

document.addEventListener("DOMContentLoaded", function () {
  const confirmOrderButton = document.getElementById("confirm-order-btn");
  const formDiv = document.getElementById("form");
  const confirmPageDiv = document.getElementById("confirmPage");

  confirmOrderButton.addEventListener("click", function () {
    // Hide the form
    formDiv.classList.add("hidden");

    // Show the confirmation page
    confirmPageDiv.classList.remove("hidden");

    // Optionally, scroll to the top of the confirmation page for better visibility
    confirmPageDiv.scrollIntoView({ behavior: "smooth" });
  });
});
