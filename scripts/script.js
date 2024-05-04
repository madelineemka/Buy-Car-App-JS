///////////////////
//Display form
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
    });
  });
});

function displayConfigForm(car) {
  const configForm = document.getElementById("configForm");
  configForm.classList.remove("hidden");

  document.getElementById(
    "carName"
  ).textContent = `${car.driver}'s ${car.brand} ${car.model}`;
}

function hideCarList() {
  const carList = document.querySelector(".carlist");
  carList.classList.add("hidden");
}

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
//Accessories
///////////////////

document.addEventListener("DOMContentLoaded", function () {
  const availableAccessoriesSelect = document.getElementById(
    "availableAccessoriesSelect"
  );
  const addAccessoryButton = document.getElementById("addAccessoryButton");
  const orderedAccessoriesButtons = document.getElementById(
    "orderedAccessoriesButtons"
  );

  addAccessoryButton.addEventListener("click", function () {
    const selectedOptions = Array.from(
      availableAccessoriesSelect.selectedOptions
    );
    selectedOptions.forEach((option) => {
      const accessoryName = option.textContent.trim();
      const accessoryValue = option.value;

      if (
        !orderedAccessoriesButtons.querySelector(
          `button[data-accessory-value="${accessoryValue}"]`
        )
      ) {
        const accessoryButton = document.createElement("button");
        accessoryButton.textContent = accessoryName;
        accessoryButton.dataset.accessoryValue = accessoryValue;
        accessoryButton.classList.add("removeAccessoryButton");
        accessoryButton.addEventListener("click", function () {
          const accessoryValue = this.dataset.accessoryValue;
          const option = document.createElement("option");
          option.textContent = accessoryName;
          option.value = accessoryValue;
          availableAccessoriesSelect.appendChild(option);
          this.remove();
        });
        orderedAccessoriesButtons.appendChild(accessoryButton);
        option.remove();
      }
    });
  });
});

///////////////////
//Name should be 2 string separated with space
///////////////////

// document.addEventListener("DOMContentLoaded", function () {
//   const buyerNameInput = document.getElementById("nameSurname");
//   buyerNameInput.addEventListener("input", function () {
//     const nameSurname = buyerNameInput.value.trim();
//     const spaceIndex = nameSurname.indexOf(" ");
//     if (
//       spaceIndex === -1 ||
//       spaceIndex === 0 ||
//       spaceIndex === nameSurname.length - 1
//     ) {
//       // Jeśli nie znaleziono spacji lub spacja jest na początku lub na końcu ciągu
//       buyerNameInput.setCustomValidity(
//         "Imię i nazwisko powinny być oddzielone spacją."
//       );
//     } else {
//       buyerNameInput.setCustomValidity("");
//     }
//   });
// });
