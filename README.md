# Car Purchase Application

## Overview

The Car Purchase Application allows you to buy the car of your dreams. It features a static list of cars that can be filtered and ordered through a configuration form. Below are the details of the application's functionality.

## Features

### Car List

The list of cars includes the following data:

- Brand
- Model
- Year
- Driver
- Engine Power
- Mileage
- Price

You can filter the car list by the driver of the car. The available drivers are:

- John Wick
- James Bond
- Dominic Toretto
- Paul Walker
- Batman

### Ordering a Car

Clicking the 'Order now' button in the chosen car container performs the following actions:

1. Hides the car list.
2. Displays a configuration form with the details of the chosen car.

### Configuration Form

The configuration form includes:

- **Car Name**: Consisting of the brand and model of the chosen car.
- **Car Price**: Price of the chosen car.

The form allows the following actions:

1. **Selecting Financing**: Choose between leasing or cash.
2. **Providing Owner Data**: Enter the name and surname of the future owner, which must be two strings separated by a space.
3. **Providing a Delivery Date**: Select a delivery date that is at least 14 days from the current day.
4. **Choosing Accessories**:
   - **Adding an Accessory**: Click on the desired accessory from the 'Available Accessories' list to move it to the 'Ordered Accessories' list. The price of the chosen accessory will be displayed in the 'Accessories price' section.
   - **Removing an Accessory**: Click on the accessory in the 'Ordered Accessories' list to move it back to the 'Available Accessories' list.
   - **Price Updates**: The 'Accessories price' and 'Final price' are updated and displayed whenever an accessory is added or removed.

### Confirming the Order

Clicking the 'Confirm order' button performs the following actions:

1. **Form Validation**:
   - If the form data is incorrect, an error message is displayed at the bottom of the form.
   - The provided data is stored in Local Storage.
2. **Purchase Confirmation**:
   - If the form data is correct, a summary confirmation page is displayed.
   - Data is removed from Local Storage.

### Canceling the Order

Clicking the 'Cancel' button returns you to the car selection list.

## Summary Confirmation Page

The summary confirmation page displays:

- A thank you note.
- The chosen car details:
  - **Image of the Car**
  - **Name of the Car**
  - **Payment Method**
  - **Final Price**: Car price + chosen accessories price

Clicking the 'Back' button returns to the configuration form.

