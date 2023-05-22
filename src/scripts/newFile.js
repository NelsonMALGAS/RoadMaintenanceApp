const mainOverlay = document.querySelector(".main-overlay")
const mainOverlayMap = document.querySelector(".main-overlay1")
const showIssuesButton = document.querySelector('[data-button]')
const closeIssuesButton = document.querySelector('.close-btn')
const submitButton = document.querySelector("body > div.footer > div > form > button")
const mainSection = document.querySelector('.main')
const classDate = document.querySelectorAll('#date')
const LOCATION = document.querySelectorAll('#location')
const reports = document.querySelectorAll("img")
const innerHtmlText = document.querySelectorAll('.road-issues-name')
const roadIssues = document.querySelectorAll('.road-issues-main')
const textAreaValue = document.querySelector('form')
const inputAreaValue = document.querySelector('form .input')
const mainTestimony = document.querySelector('.testimony')
const STATUS = {
  A : 'Completed',
  B : 'In progress',
  C :'Not started yet'
}
const currentDate = new Date().getDate()
const currentMonth = new Date().getMonth() + 1
const currentYear = new Date().getFullYear()
const hours = new Date().getHours()
const minutes = new Date().getMinutes()

textAreaValue.addEventListener('submit' , (event)=>{
  event.preventDefault()
  const feedbackValue = document.querySelector('#feedback')
  console.log(feedbackValue.value)
  console.log(inputAreaValue.value)
  textAreaValue.reset()
})


// User will be able to click on the road-issues-name to see ,date ,time , and the issue name
innerHtmlText.forEach(text => {
   text.addEventListener('click' , () =>{
    console.log(`ROAD ISSUE :${text.innerHTML}`)
    console.log(`DATE :${currentYear}/${currentMonth}/${currentDate}`)
    console.log( `TIME OF REPORT (${hours}:${minutes.toString().padStart(2, '0')})`)
    
    
  // Success callback function
  function success(position)  {
    const { latitude, longitude } = position.coords;
    console.log(`LOCATION COODINATES : Latitude: ${latitude},Longitude: ${longitude}`);
    const searchUrl = ` https://www.google.com/maps/place/Phokeng/@${latitude},${longitude},13z/data=!3m1!4b1!4m6!3m5!1s0x1ebddff89137c117:0x1af854373f15f84b!8m2!3d-25.5926646!4d27.1558867!16s%2Fm%2F03czrx1?authuser=0`;

    

// Open the URL in a new tab

 window.open(searchUrl, '_blank');
    
  
    // You can now use the latitude and longitude values for further processing
    const IssuesHtml = `
    <div class="testimony">
    <p class="location-name">${text.innerHTML}</p>
      <p class="location">LOCATION COORDINATES [Longitude :${latitude} Latitude : ${longitude}]</p>
      <p class="date">Date:${currentYear}/${currentMonth}/${currentDate} </p>
      <p class="report-time">TIME OF REPORT (${hours}:${minutes.toString().padStart(2, '0')})</p>
      <p class="status">Status :${STATUS.C} </p>
      <br><hr>
    </div>
    
  `;
  // Replace the contents of the main section with the new content
  mainTestimony.remove()
  mainSection.innerHTML += IssuesHtml;
  
  mainOverlay.style.display = ''
  mainOverlayMap.style.display = ''
  }
  
  // Error callback function
  const error = (error) => {
    console.log('Error getting geolocation:', error.message);
  }

   // Check if the browser supports Geolocation
  if ('geolocation' in navigator) {
    // Request the user's location
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
  
  
   }) 
   
});
 //plus buttton event
showIssuesButton.addEventListener('click' , () =>{
    mainOverlay.style.display = 'grid'
    mainOverlayMap.style.display = 'block'
    
  
   
})
closeIssuesButton.addEventListener('click' , ()=>{
  mainOverlay.style.display = ''
  mainOverlayMap.style.display = ''
})


