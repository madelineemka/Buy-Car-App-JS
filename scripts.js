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
    model: "Batman and Batman Returns",
    year: 1989,
    driver: "Batman",
    enginePower: "340",
    mileage: "5 000",
    price: 1500000,
    image: "./assets/Batman Batmobile.png",
  },
];

let carPrice = 0;

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
}

function displayConfigForm(car) {
  const configForm = document.getElementById("configForm");
  configForm.classList.remove("hidden");

  const carNameElement = document.getElementById("carName");
  carNameElement.textContent = `${car.driver}'s ${car.brand} ${car.model}`;

  const carPriceElement = document.getElementById("chosenCarPrice");
  carPriceElement.innerHTML = `${formatPrice(car.price)}`;
  const finalPriceElement = document.getElementById("finalPrice");
  finalPriceElement.innerHTML = `${formatPrice(car.price)}`;

  carPrice = car.price;
}

function updateFinalPrice(carPrice, accessoriesPrice) {
  const finalPriceElement = document.getElementById("finalPrice");
  const totalPrice = carPrice + accessoriesPrice;
  finalPriceElement.textContent = formatPrice(totalPrice);
}

document.addEventListener("DOMContentLoaded", function () {
  setupEventListeners();
});

function setupEventListeners() {
  setupOrderButtons();
  setupAddAccessoryButtons();
  setupConfirmButton();
}

///////////////////
//Order buttons
function setupOrderButtons() {
  const orderButtons = document.querySelectorAll(".orderBtn");
  orderButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const container = button.closest(".containerCar");
      const carId = container.id.replace("containerCar", ""); // Get car ID
      const chosenCar = cars.find((car) => car.id == carId); // Find chosen car

      displayConfigForm(chosenCar);
      hideCarList();
    });
  });

  const confirmBtn = document.querySelector(".confirmBtn");
  confirmBtn.addEventListener("click", handleConfirmOrderButtonClick);

  // Restoring data from localStorage after page refresh
  const formDataString = localStorage.getItem("formData");
  if (formDataString) {
    const formData = JSON.parse(formDataString);
    const nameSurnameInput = document.getElementById("nameSurname");
    const deliveryDateInput = document.getElementById("deliveryDate");
    const paymentOptionInput = document.querySelector(
      `input[name="paymentOption"][value="${formData.paymentOption}"]`
    );

    nameSurnameInput.value = formData.nameSurname;
    deliveryDateInput.value = formData.deliveryDate;
    if (paymentOptionInput) {
      paymentOptionInput.checked = true;
    }
  }

  const deliveryDateInput = document.getElementById("deliveryDate");
  const currentDate = new Date();
  const defaultDeliveryDate = new Date(
    currentDate.getTime() + 14 * 24 * 60 * 60 * 1000
  ); // Add 14 days to current date
  const formattedDefaultDeliveryDate = defaultDeliveryDate
    .toISOString()
    .split("T")[0]; // Format date "YYYY-MM-DD"
  deliveryDateInput.value = formattedDefaultDeliveryDate; // Set default date
  deliveryDateInput.setAttribute("min", formattedDefaultDeliveryDate); // Set min date

  let driverFilterInput = document.getElementById("driverFilter");
  driverFilterInput.addEventListener("input", filterCarsByDriver);
}

///////////////////
//Chosen accessories
function setupAddAccessoryButtons() {
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
}

///////////////////
//Confirm Button
function setupConfirmButton() {
  let chosenCar;

  const orderButtons = document.querySelectorAll(".orderBtn");
  orderButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const container = button.closest(".containerCar");
      const carId = container.id.replace("containerCar", "");
      chosenCar = cars.find((car) => car.id == carId);
      displayConfigForm(chosenCar);
      hideCarList();
    });
  });

  const confirmBtn = document.querySelector(".confirmBtn");
  confirmBtn.addEventListener("click", function () {
    const nameSurnameInput = document.getElementById("nameSurname");
    const deliveryDateInput = document.getElementById("deliveryDate");

    if (!nameSurnameInput.value || !deliveryDateInput.value) {
      showError("Fill in all required fields");
      return;
    }

    const regex = /^[a-zA-Z]+\s[a-zA-Z]+$/;
    if (!nameSurnameInput.value.match(regex)) {
      showError("Name should be in format: Name Surname");
      return;
    }

    localStorage.removeItem("nameSurname");
    localStorage.removeItem("deliveryDate");

    configForm.classList.add("hidden");
    orderSummary.classList.remove("hidden");

    const finalPrice = document.getElementById("finalPrice").textContent;

    displayOrderSummary(finalPrice);
  });

  const backBtn = document.querySelector(".backBtn");
  backBtn.addEventListener("click", function () {
    const carList = document.getElementById("carList");
    carList.classList.remove("hidden");
    const configForm = document.getElementById("configForm");
    configForm.classList.add("hidden");
    const orderSummary = document.getElementById("orderSummary");
    orderSummary.classList.add("hidden");
  });

  function displayOrderSummary(finalPrice) {
    const orderedCarModel = document.getElementById("orderedCarModel");
    const orderedCarPay = document.getElementById("orderedCarPay");
    const finalPriceSummary = document.getElementById("finalPriceSummary");
    const orderedCarImg = document.getElementById("orderedCarImg");

    const chosenCarModel = `${chosenCar.driver}'s ${chosenCar.brand} ${chosenCar.model}`;
    const chosenPaymentMethod = document.querySelector(
      'input[name="paymentOption"]:checked'
    ).value;

    orderedCarModel.textContent = chosenCarModel;
    orderedCarPay.textContent = chosenPaymentMethod;
    finalPriceSummary.textContent = finalPrice;
    orderedCarImg.src = chosenCar.image;
  }

  function showError(errorMessageText) {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = errorMessageText;
    errorMessage.classList.remove("hidden");
  }
}

///////////////////
//backBtn Form
const backBtn = document.querySelector(".backBtn");

const backToCarList = () => {
  configForm.classList.add("hidden");
  carList.classList.remove("hidden");

  updateFinalPrice(0, 0); // // Zero out car price and accessories price
};

backBtn.addEventListener("click", backToCarList);

///////////////////
//backBtn Summary page
const backBtnSummary = document.querySelector(".backBtnSummary");

const backToForm = () => {
  configForm.classList.remove("hidden");
  orderSummary.classList.add("hidden");
};

backBtnSummary.addEventListener("click", backToForm);

const hideError = () => {
  errorMessage.classList.add("hidden");
};

backBtnSummary.addEventListener("click", hideError);

const confirmBtn = document.querySelector(".confirmBtn");

///////////////////
//Saving form data to local storage
function saveFormDataToLocalStorage() {
  const nameSurnameInput = document.getElementById("nameSurname");
  const deliveryDateInput = document.getElementById("deliveryDate");
  const paymentOptionInput = document.querySelector(
    'input[name="paymentOption"]:checked'
  );

  const formData = {
    nameSurname: nameSurnameInput.value,
    deliveryDate: deliveryDateInput.value,
    paymentOption: paymentOptionInput ? paymentOptionInput.value : null,
  };

  localStorage.setItem("formData", JSON.stringify(formData));
}

// After click "Confirm order", removing data from localStorage
function removeFormDataFromLocalStorage() {
  localStorage.removeItem("formData");
}

function handleConfirmOrderButtonClick() {
  removeFormDataFromLocalStorage();
}

document
  .getElementById("configForm")
  .addEventListener("input", saveFormDataToLocalStorage);

//////////////
//Filter
function filterCarsByDriver() {
  const driverFilterInput = document.getElementById("driverFilter");
  const filterValue = driverFilterInput.value.toLowerCase();
  const carItems = document.querySelectorAll(".containerCar");

  carItems.forEach((carItem) => {
    const carDriver = carItem
      .querySelector(".carDriverSpan")
      .textContent.toLowerCase();
    if (carDriver.includes(filterValue)) {
      carItem.classList.remove("hidden");
      carItem.classList.add("flex");
    } else {
      carItem.classList.remove("flex");
      carItem.classList.add("hidden");
    }
  });
}
