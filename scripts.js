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
    image: "./assets/Ford Mustang Boss 429.png",
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
    image: "./assets/Aston Martin DB5.png",
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
    image: "./assets/Dodge Charger.png",
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
    image: "./assets/Nissan Skyline R34.png",
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
    image: "./assets/Batman Batmobile.png",
  },
];

let carPrice = 0; //dodane

function formatPrice(price) {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
}

function hideCarList() {
  const carList = document.querySelector("#carList");
  carList.classList.add("hidden");
  console.log("Car list is hidden ok");
}

function displayConfigForm(car) {
  const configForm = document.getElementById("configForm");
  configForm.classList.remove("hidden");

  const carNameElement = document.getElementById("carName");
  carNameElement.textContent = `${car.driver}'s ${car.brand} ${car.model}`;

  const carPriceElement = document.getElementById("chosenCarPrice");
  carPriceElement.innerHTML = `${formatPrice(car.price)}`;

  carPrice = car.price; //dodane

  console.log("displayConfigForm ok");
}
///////////////////
//order buttons
///////////////////

document.addEventListener("DOMContentLoaded", function () {
  const orderButtons = document.querySelectorAll(".orderBtn");

  orderButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const container = button.closest(".containerCar");
      const carId = container.id.replace("containerCar", ""); // Pobierz id samochodu
      const chosenCar = cars.find((car) => car.id == carId); // Znajdź wybrany samochód

      displayConfigForm(chosenCar); // Wyświetl formularz konfiguracyjny z wybranym samochodem

      hideCarList(); // Ukryj listę samochodów

      console.log("Order buttons");
    });
  });
});

///////////////////
//Accessories and update final price
///////////////////

function updateFinalPrice(carPrice, accessoriesPrice) {
  const finalPriceElement = document.getElementById("finalPrice");
  const totalPrice = carPrice + accessoriesPrice;
  finalPriceElement.textContent = formatPrice(totalPrice);
}

document.addEventListener("DOMContentLoaded", function () {
  const addAccessoryButtons = document.querySelectorAll(".addAccessoryButton");
  const orderedAccessoriesButtons = document.getElementById(
    "orderedAccessoriesButtons"
  );
  const accessoriesSection = document.getElementById("accessoriesSection");
  let totalAccessoryPrice = 0;

  addAccessoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const accessoryId = button.id;
      const accessoryPrice = parseInt(button.getAttribute("acc-price"));
      const accessoryName = button.textContent.trim();

      // Create a new button for the ordered accessory
      const orderedAccessoryButton = document.createElement("button");
      orderedAccessoryButton.textContent = accessoryName;
      orderedAccessoryButton.classList.add("orderedAccessoryButton");
      orderedAccessoryButton.setAttribute("acc-price", accessoryPrice);

      // Add event listener to the newly created ordered accessory button
      orderedAccessoryButton.addEventListener("click", function () {
        // Remove the ordered accessory button from orderedAccessoriesButtons
        orderedAccessoryButton.remove();

        // Add the accessory button back to availableAccessories
        accessoriesSection
          .querySelector(`#${accessoryId}`)
          .classList.remove("hidden");

        // Decrease totalAccessoryPrice by the price of removed accessory
        totalAccessoryPrice -= accessoryPrice;
        updateAccessoriesPrice(totalAccessoryPrice);
        updateFinalPrice(carPrice, totalAccessoryPrice);
      });

      // Add the ordered accessory button to orderedAccessoriesButtons
      orderedAccessoriesButtons.appendChild(orderedAccessoryButton);

      // Hide the accessory button from availableAccessories
      button.classList.add("hidden");

      // Increase totalAccessoryPrice by the price of added accessory
      totalAccessoryPrice += accessoryPrice;
      updateAccessoriesPrice(totalAccessoryPrice);
      updateFinalPrice(carPrice, totalAccessoryPrice);
    });
  });

  function updateAccessoriesPrice(price) {
    const accessoriesPriceElement = document.getElementById("chosenAccPrice");
    accessoriesPriceElement.textContent = formatPrice(price);
  }
});

///////////////////
//Set the date to 14 days from today
///////////////////

document.addEventListener("DOMContentLoaded", function () {
  const deliveryDateInput = document.getElementById("deliveryDate");
  const currentDate = new Date();
  const defaultDeliveryDate = new Date(
    currentDate.getTime() + 14 * 24 * 60 * 60 * 1000
  ); // 14 days from today
  const formattedDefaultDeliveryDate = defaultDeliveryDate
    .toISOString()
    .split("T")[0]; // Format "YYYY-MM-DD"
  deliveryDateInput.value = formattedDefaultDeliveryDate; // Set a default value for the date
  deliveryDateInput.setAttribute("min", formattedDefaultDeliveryDate); // Set the min value for the date
});

///////////////////
//backBtn
///////////////////

const backBtn = document.querySelector(".backBtn");

const backToCarList = () => {
  configForm.classList.add("hidden");
  carList.classList.remove("hidden");

  updateFinalPrice(0, 0);
};

backBtn.addEventListener("click", backToCarList);
