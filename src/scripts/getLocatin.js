// document.addEventListener('DOMContentLoaded', function() {
// let reportButton = document.getElementById('report-button');

// // Event listener for the "Report Road Fault" button
// reportButton.addEventListener('click', function(event) {
//     event.preventDefault();
//     getLocation();
// });

// // Function to retrieve the user's location
// function getLocation() {
//     if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition, handleLocationError);
//     } else {
//     console.log('Geolocation is not supported by this browser.');
//     }
// }

// // Function to handle successful retrieval of location
// function showPosition(position) {
//     let latitude = position.coords.latitude;
//     let longitude = position.coords.longitude;

//     // Call the reverse geocoding function to get the address
//     reverseGeocode(latitude, longitude);
// }

// // Function to handle errors in retrieving location
// function handleLocationError(error) {
//     console.log('Error occurred while retrieving location:', error.message);
// }

// // Function to perform reverse geocoding and get address based on coordinates
// function reverseGeocode(latitude, longitude) {
//     let apiKey = 'c2978d2caf4f4dc58d22d2027c2f9073'; 

//     let url = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude},${longitude}`;
// console.log(url);

//     fetch(url)
//     .then(function(response) {
//         if (response.ok) {
//         return response.json();
//         } else {
//         throw new Error('Error retrieving address data.');
//         }
//     })
//     .then(function(data) {
//         let address = data.results[0].formatted;
//         console.log('Address:', address);
//     })
//     .catch(function(error) {
//         console.log('Error:', error.message);
//     });
// }
// });
