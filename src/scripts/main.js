const appResources = {
  appoverlays: {
    queryoverlay: document.querySelector('[data-query-overlay]')
  },
  appbuttons: {
    querybutton: document.querySelector('[data-query-button]')
  }
};

appResources.appbuttons.querybutton.addEventListener('click', (event) => {
  event.preventDefault();
  appResources.appoverlays.queryoverlay.style.display = 'block';
});

const roadIssuesElements = document.getElementsByClassName("road-issues");

const formOverlay = document.querySelector("[data-form-overlay]");
const formHeading = document.querySelector("#form-heading");
console.log(formOverlay, formHeading);
// Attach click event listener to each road-issues element
for (let i = 0; i < roadIssuesElements.length; i++) {
  const roadIssueElement = roadIssuesElements[i];
  // Extract the issue name
  const issueName = roadIssueElement.querySelector(".road-issues p").textContent;
  // Attach click event listener
  roadIssueElement.addEventListener("click", () => {
    formOverlay.style.display = "block";
    appResources.appoverlays.queryoverlay.style.display = 'none';
    // Set the form heading to the issue name
    formHeading.textContent = issueName;

    // Create a new heading element
    const newHeading = document.createElement("h2");
    newHeading.textContent = issueName;

    // Event listener for form submission
    const submitButton = document.querySelector("#submitButton1");
    submitButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent form submission

      // Append the new heading to the form heading element
      formHeading.textContent = issueName;
    });
  });
}

const addressLocation = () => {
  let reportButton = document.getElementById('report-button');

  // Function to perform reverse geocoding and get address based on coordinates
  const reverseGeocode = (latitude, longitude) => {
    let apiKey = 'c2978d2caf4f4dc58d22d2027c2f9073';

    let url = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude},${longitude}`;
    console.log(url);

    fetch(url)
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error retrieving address data.');
        }
      })
      .then(function(data) {
        let address = data.results[0].formatted;
        console.log('Address:', address);
        document.getElementById('live-location').value = address;
      })
      .catch(function(error) {
        console.log('Error:', error.message);
      });
  };

  // Function to handle successful retrieval of location
  const showPosition = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    // Call the reverse geocoding function to get the address
    reverseGeocode(latitude, longitude);
  };

  // Function to handle errors in retrieving location
  const handleLocationError = (error) => {
    console.log('Error occurred while retrieving location:', error.message);
  };

  // Function to retrieve the user's location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, handleLocationError);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  // Event listener for the "Report Road Fault" button
  reportButton.addEventListener('click', function(event) {
    event.preventDefault();
    getLocation();
  });
};

document.addEventListener('DOMContentLoaded', addressLocation);

const submitButton1 = document.getElementById('submitButton1');

// Get the console element
const mainContent = document.getElementById('main-content');

const currentDate = new Date().getDate();
const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();
const hours = new Date().getHours();
const minutes = new Date().getMinutes();

// Event listener for submit button
// Event listener for submit button
submitButton1.addEventListener('click', function() {
  // Get the values from the form inputs
  const formHeading = document.getElementById('form-heading').textContent;
  const locationValue = document.getElementById('live-location').value;
  const imageFile = document.getElementById('image-upload').files[0];
  const descriptionValue = document.getElementById('descriptions').value;

  const roadIssuesImgs = document.querySelectorAll("img .road-issues-icon");
  roadIssuesImgs.forEach(img => {
    img.addEventListener('click', () => {
      console.log(img.src);
    });
  });
  

  // Log the values in the console
  logToConsole(`
    <div class="issues-appended">
      <div class="report-date-and-time">Date:${currentYear}/${currentMonth}/${currentDate} ${hours}:${minutes.toString().padStart(2, '0')}
      </div>
      <div class="issues-info">
        <h2 class="issues-name">${formHeading}</h2>
        <div class="location-and-description">
          <div class="location-info">Location: ${locationValue}</div>
          <div class="issues-description">Message / Description : ${descriptionValue}</div>
          <br>
          <div>Status: Pending</div>
          <br>
          <div>Review</div>
          <div class="issue-review">No reviews yet!</div>
        </div>
        <div class="image-file">
          <h4>${formHeading}</h4>
          <img src="${URL.createObjectURL(imageFile)}" alt="Road Condition Image">
          <img src="" alt="Road Condition Image">
        </div>
      </div>
    </div>    
  `);

  formOverlay.style.display = 'none';
});


// Function to log output to the console
const logToConsole = function(message) {
  let outputElement = document.createElement('div');
  outputElement.innerHTML = `${message}`;
  mainContent.appendChild(outputElement);
};
