const appResources = {
    appoverlays :{
        queryoverlay: document.querySelector('[data-query-overlay]')
    },
    appbuttons :{
        querybutton: document.querySelector('[data-query-button]')
    }
}

appResources.appbuttons.querybutton.addEventListener('click', (event) => {
    event.preventDefault()
    appResources.appoverlays.queryoverlay.style.display = 'block'
})

/*--------------------------------*/

const roadIssuesElements = document.getElementsByClassName("road-issues");

const formOverlay = document.querySelector("[data-form-overlay]");
const formHeading = document.getElementById("form-heading");
console.log(formOverlay)
// Attach click event listener to each road-issues element
for (let i = 0; i < roadIssuesElements.length; i++) {
    const roadIssueElement = roadIssuesElements[i];
    // Extract the issue name
    const issueName = roadIssueElement.querySelector("p").textContent;
    // Attach click event listener
    roadIssueElement.addEventListener("click", () => {
        formOverlay.style.display = "block";
        appResources.appoverlays.queryoverlay.style.display = 'none'
        // Set the form heading to the issue name
        formHeading.textContent = issueName;
        return issueName
    });
}

const addressLocation= () => {
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
    }
  
    // Function to handle successful retrieval of location
    const showPosition = (position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
  
      // Call the reverse geocoding function to get the address
      reverseGeocode(latitude, longitude);
    }
  
    // Function to handle errors in retrieving location
    const handleLocationError = (error) => {
      console.log('Error occurred while retrieving location:', error.message);
    }

    // Function to retrieve the user's location
    const getLocation = () => {
      if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, handleLocationError);
      } else {
      console.log('Geolocation is not supported by this browser.');
      }
    }
    // Event listener for the "Report Road Fault" button
    reportButton.addEventListener('click', function(event) {
      event.preventDefault();
      getLocation();
    });
  
  }
  
document.addEventListener('DOMContentLoaded', addressLocation );

let submitButton1 = document.getElementById('submitButton1')

   // Get the console element
    let mainContent = document.getElementById('main-content');
    
    const currentDate = new Date().getDate()
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()
    const hours = new Date().getHours()
    const minutes = new Date().getMinutes()


    // Event listener for submit button
    
    submitButton1.addEventListener('click', function() {
      // Get the values from the form inputs
      
      let formHeading = document.getElementById('form-heading').value
      let locationValue = document.getElementById('live-location').value;
      let imageFile = document.getElementById('image-upload').files[0];
      let descriptionValue = document.getElementById('descriptions').value;
    
      // Log the values in the console
      logToConsole(`
        <div class="issues-appended">
          <div class="report-date-and-time">Date:${currentYear}/${currentMonth}/${currentDate} ${hours}:${minutes.toString().padStart(2, '0')}
          </div>
          <div class="issues-info">
            <h2 class="issues-name">${formHeading}</h2>
            <div class="location-and-description">
              <div class="location-info">Location: ${locationValue}</div>
              <div class="issues-description">${descriptionValue}</div>
              <br>
              <div>Status: Pending</div>
              <br>
              <div>Review</div>
              <div class="issue-review">No reviews yet!</div>
            </div>
          <div class="image-file">
            <h4>Road Condition</h4>
            <div>${imageFile}</div>
            </div>
          </div>
        </div>    
       `);
  
      // Clear the form inputs
     // document.getElementById('myForm').reset();
     
    formOverlay.style.display = 'none'
    });

    // Function to log output to the console
var logToConsole = function(message) {
  var outputElement = document.createElement('D');
  outputElement.innerHTML = `<div>${message}</div>`;
  mainContent.appendChild(outputElement);
};


