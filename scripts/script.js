///////////////////
//Display form
///////////////////

function displayConfigForm(car) {
  const configForm = document.getElementById("configForm");
  configForm.classList.remove("hidden");

  const carNameElement = document.getElementById("carName");
  carNameElement.innerHTML = `${car.driver}'s ${car.brand} ${car.model}`;

  const carPriceElement = document.getElementById("chosenCarPrice");
  carPriceElement.innerHTML = `${formatPrice(car.price)}`;

  console.log("displayConfigForm ok");
}

////////////
function hidecarList() {
  const carList = document.querySelector("#carList");
  carList.classList.add("hidden");
  console.log("Car list is hidden ok");
}

////////////

///////////////
document.addEventListener("DOMContentLoaded", function () {
  const orderButtons = document.querySelectorAll(".orderBtn");

  orderButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const container = button.closest(".containerCar");
      const carId = container.id.replace("containerCar", ""); // Pobierz id samochodu
      const chosenCar = cars.find((car) => car.id == carId); // Znajdź wybrany samochód

      displayConfigForm(chosenCar); // Wyświetl formularz konfiguracyjny z wybranym samochodem

      hidecarList(); // Ukryj listę samochodów
    });
  });
});

///////////////////
//Accessories + price calculation under Accessories price
///////////////////

document.addEventListener("DOMContentLoaded", function () {
  const availableAccessoriesSelect = document.getElementById(
    "availableAccessoriesSelect"
  );
  const addAccessoryButton = document.getElementById("addAccessoryButton");
  const orderedAccessoriesButtons = document.getElementById(
    "orderedAccessoriesButtons"
  );
  const accessoriesPriceSpan = document.getElementById("chosenAccPrice");
  let totalPrice = 0;

  addAccessoryButton.addEventListener("click", function () {
    const selectedOptions = Array.from(
      availableAccessoriesSelect.selectedOptions
    );
    selectedOptions.forEach((option) => {
      const accessoryName = option.innerHTML.trim();
      const accessoryValue = option.value;
      const accessoryPrice = parseInt(option.dataset.price);

      if (
        !orderedAccessoriesButtons.querySelector(
          `button[data-accessory-value="${accessoryValue}"]`
        )
      ) {
        const accessoryButton = document.createElement("button");
        accessoryButton.innerHTML = accessoryName;
        accessoryButton.dataset.accessoryValue = accessoryValue;
        accessoryButton.dataset.accessoryPrice = accessoryPrice;
        accessoryButton.classList.add("removeAccessoryButton");
        accessoryButton.addEventListener("click", function () {
          const accessoryValue = this.dataset.accessoryValue;
          const accessoryPrice = parseInt(this.dataset.accessoryPrice);
          const option = document.createElement("option");
          option.innerHTML = accessoryName;
          option.value = accessoryValue;
          option.dataset.price = accessoryPrice;
          availableAccessoriesSelect.appendChild(option);
          this.remove();
          totalPrice -= accessoryPrice;
          accessoriesPriceSpan.innerHTML = `$${totalPrice}`;
        });
        orderedAccessoriesButtons.appendChild(accessoryButton);
        option.remove();
        totalPrice += accessoryPrice;
        accessoriesPriceSpan.innerHTML = `$${totalPrice}`;
      }
    });
  });
});

/////////// dziala zle, zle liczy, nie resetuje ceny

// document.addEventListener("DOMContentLoaded", function () {
//   const carPriceElement = document.getElementById("chosenCarPrice");
//   const accessoriesPriceSpan = document.getElementById("chosenAccPrice");
//   const finalPriceSpan = document.getElementById("finalPrice"); // Get the final price element

//   // Function to calculate and update the final price
//   function updateFinalPrice() {
//     const carPrice = parseFloat(
//       carPriceElement.innerHTML.replace("$", "").replace(",", "")
//     );
//     const accessoriesPrice = parseFloat(
//       accessoriesPriceSpan.innerHTML.replace("$", "").replace(",", "")
//     );

//     const finalPrice = carPrice + accessoriesPrice;

//     finalPriceSpan.innerHTML = `$${finalPrice.toLocaleString("en-US", {
//       minimumFractionDigits: 0,
//     })}`;
//   }

//   // Call updateFinalPrice initially to display the correct price when the page loads
//   updateFinalPrice();

//   // Add event listener to the add accessory button to update the final price
//   const addAccessoryButton = document.getElementById("addAccessoryButton");
//   addAccessoryButton.addEventListener("click", function () {
//     // Your code to add accessory here...

//     // Update the final price after adding accessory
//     updateFinalPrice();
//   });
// });

//

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
//summaryBtn options
///////////////////
//backBtn
const backBtn = document.querySelector(".backBtn");

const backToCarList = () => {
  configForm.classList.add("hidden");
  carList.classList.remove("hidden");
};

backBtn.addEventListener("click", backToCarList);

////////////
//confirmBtn
///////////generowanie img i total price nie dziala

document.addEventListener("DOMContentLoaded", function () {
  const confirmBtn = document.querySelector(".confirmBtn");
  const configForm = document.getElementById("configForm");
  const nameSurnameInput = document.getElementById("nameSurname");
  const deliveryDateInput = document.getElementById("deliveryDate");
  const orderSummary = document.getElementById("orderSummary");
  const errorMessage = document.getElementById("errorMessage");

  confirmBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Zapobiega domyślnej akcji kliknięcia przycisku

    // Sprawdź, czy pola są wypełnione
    if (!nameSurnameInput.value || !deliveryDateInput.value) {
      showError("Fill in all required fields");
      return;
    }

    // Sprawdź, czy imię i nazwisko są w prawidłowym formacie
    const regex = /^[a-zA-Z]+\s[a-zA-Z]+$/;
    if (!nameSurnameInput.value.match(regex)) {
      showError("Name should be in format: Name Surname");
      return;
    }

    // Jeśli dane są poprawne, pokaż potwierdzenie zakupu
    configForm.classList.add("hidden");
    orderSummary.classList.remove("hidden");

    // Aktualizuj dane w podsumowaniu
    document.getElementById("finalPrice").textContent =
      document.getElementById("totalPrice").textContent;
    document.getElementById("orderedCarModel").textContent =
      document.getElementById("carName").textContent;
    document.getElementById("orderedCarPay").textContent =
      document.querySelector('input[name="paymentOption"]:checked').value;

    // Ustawienie ścieżki obrazka dla wybranego auta
    // const chosenCarImageSrc = document.getElementById("orderedCarImg").src;
    // document.getElementById("orderedCarImg").src = chosenCarImageSrc;

    const chosenCarImageSrc = chosenCar.image;
    document.getElementById("orderedCarImg").src = chosenCarImageSrc;
  });

  // Funkcja do wyświetlania błędu
  function showError(errorMessageText) {
    errorMessage.textContent = errorMessageText;
    errorMessage.classList.remove("hidden");
  }
});

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
