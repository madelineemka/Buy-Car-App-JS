# Buy-Car-App-JS

Application allows you to buy the car of your dreams.

The list of cars is static. Data includes: Brand, Model, Year, Driver, Engine Power, Mileage and Price.
The list can be filtered by the driver of the car: John Wick, James Bond, Dominic Toretto, Paul Walker and Batman.

Clicking the 'Order now' button in the chosen car container hides the list and displays a configuration form with the chosen car details:

- Name of the car, which consists of the brand and model of the chosen car.
- Price of the chosen car.

The form allows:

- Selecting financing: leasing or cash.
- Providing data of the future owner (name and surname) that needs to be in the form of 2 strings separated by a space.
- Providing a delivery date that is at least 14 days from the current day.
- Choosing accessories:
  -- To add an accessory to the order: click on the desired accessory from the 'Available Accessories' list; the accessory will be moved to the 'Ordered Accessories' list, and the price of the chosen accessory will be displayed in 'Accessories price:' in the upper part of the form.
  -- To remove an accessory from the order: click on the respective accessory displayed in the 'Ordered Accessories' list; the accessory will be moved back to the 'Available Accessories' list.
  -- Every time an accessory is added or removed from the order, 'Accessories price' and 'Final price' are updated and displayed in the upper part of the form.
- Clicking 'Confirm order' confirms the purchase and validates the form.
  -- If the data in the form is incorrect, an error message is displayed at the bottom of the form. Data provided in the form is stored in Local Storage.
  -- If the data is correct, a summary confirmation page is displayed, and data is removed from Local Storage.
- Clicking the 'Cancel' button returns to the car selection list.

The summary confirmation page displays a thank you note and chosen car details:

- Image of the car.
- Name of the car.
- Payment method.
- Final price (car price + chosen accessories price).

- The 'Back' button returns to the form.
  ................

  Author:
  Magdalena Kopeć
  WSB Merito Wroclaw
  Group: Programista Front-End z Angular 2023/2024
