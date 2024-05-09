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
  console.log("Car list is hidden ok");
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

  console.log("displayConfigForm ok");
}

///////////////////
//Order buttons
///////////////////

document.addEventListener("DOMContentLoaded", function () {
  const orderButtons = document.querySelectorAll(".orderBtn");

  orderButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const container = button.closest(".containerCar");
      const carId = container.id.replace("containerCar", ""); // Get car ID
      const chosenCar = cars.find((car) => car.id == carId); // Find chosen car

      displayConfigForm(chosenCar);

      hideCarList();

      console.log("Order buttons");
    });
  });
});

///////////////////
//Final price = chosen car price + chosen accessories
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
  ); // Dodaj 14 dni do bieżącej daty
  const formattedDefaultDeliveryDate = defaultDeliveryDate
    .toISOString()
    .split("T")[0]; // Formatuj datę do postaci "YYYY-MM-DD"
  deliveryDateInput.value = formattedDefaultDeliveryDate; // Ustaw wartość domyślną dla pola wyboru daty
  deliveryDateInput.setAttribute("min", formattedDefaultDeliveryDate); // Ustaw wartość min dla pola wyboru daty
});

///////////////////
//backBtn
///////////////////

const backBtn = document.querySelector(".backBtn");

const backToCarList = () => {
  configForm.classList.add("hidden");
  carList.classList.remove("hidden");

  // Zeruj finalną cenę
  updateFinalPrice(0, 0); // Zeruj zarówno cenę samochodu, jak i dodatków
};

backBtn.addEventListener("click", backToCarList);

///////////////////
//confirmBtn
///////////////////

document.addEventListener("DOMContentLoaded", function () {
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
});

///////////////////
//backBtn Summary page - dodac zeby po nacisnieciu nie zerowala sie final price
///////////////////
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

///////////////////
const confirmBtn = document.querySelector(".confirmBtn");
//Saving form data in local storage (data to be removed after clicking (confirmBtn) function updated under confirmBtn)
///////////////////

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

// Po naciśnięciu przycisku "Confirm order", usuwamy dane z localStorage
function removeFormDataFromLocalStorage() {
  localStorage.removeItem("formData");
}

// Funkcja wywoływana po naciśnięciu przycisku "Confirm order"
function handleConfirmOrderButtonClick() {
  removeFormDataFromLocalStorage();
  // Dodatkowe akcje związane z potwierdzeniem zamówienia
}

document.addEventListener("DOMContentLoaded", function () {
  const confirmBtn = document.querySelector(".confirmBtn");
  confirmBtn.addEventListener("click", handleConfirmOrderButtonClick);

  // Przywrócenie danych z localStorage po odświeżeniu strony
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
});

// Po wprowadzeniu danych przez użytkownika, zapisujemy je w localStorage
document
  .getElementById("configForm")
  .addEventListener("input", saveFormDataToLocalStorage);
