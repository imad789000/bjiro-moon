
document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});

document.addEventListener('gesturechange', function (e) {
  e.preventDefault();
});

document.addEventListener('gestureend', function (e) {
  e.preventDefault();
});






const monthYear = document.getElementById('month-year');
const datesContainer = document.getElementById('dates');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');


let currentDate = new Date();

async function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  // Set month name and year
  monthYear.innerText = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Get first day of month
  const firstDay = new Date(year, month, 1).getDay();
  // Get last day of month
  const lastDate = new Date(year, month + 1, 0).getDate();

  // Clear old dates
  datesContainer.innerHTML = '';

  // Add empty spaces for days before the 1st
  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement('div');
    datesContainer.appendChild(emptyDiv);
  }

  // Add dates
  for (let day = 1; day <= lastDate; day++) {
    const dateDiv = document.createElement('button');
    dateDiv.addEventListener('click', () => {


      if (!dateDiv.className.includes("unavailableDate"))
      {

        displayDate(dateDiv, monthYear.innerText)

        let selectedDiv = document.querySelector(".selectedButton")

        if (selectedDiv != undefined)
        {

          selectedDiv.classList.remove("selectedButton")

        }

        dateDiv.classList.add("selectedButton")

        }

    })
    dateDiv.innerText = day;
    dateDiv.classList.add('date');

    const today = new Date();
    const thisDate = new Date(year, month, day);


    if (thisDate < today.setHours(0, 0, 0, 0) == true) {
      dateDiv.classList.add('past');
    }

    else
    {
        dateDiv.classList.add("availableDate")
    }

    datesContainer.appendChild(dateDiv);
  }

  await getCalendarData(monthYear.innerText.split(" ")[0], monthYear.innerText.split(" ")[1])


}

// Event Listeners
prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

async function getCalendarData(month, year)
{
    let bungName = localStorage.getItem('docname').split(" ")[1]

    let request = await fetch(`http://34.163.87.189:3000/requestCalendarData`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({bungName: bungName, month: month, year: year})

    })

    let data = await request.json()

    let allDatesDivs = document.querySelectorAll(".date")

    for(let i = 0; i < data.length; i++)
    {
        let unavailableDate = data[i].date.slice(0, data[i].date.indexOf("/"))

        

        for(let g = 0; g < allDatesDivs.length; g++)
        {
            if(allDatesDivs[g].innerText == unavailableDate && data[i].status == "Unavailable")
            {
                allDatesDivs[g].classList.add("unavailableDate")
            }

            else if (allDatesDivs[g].innerText == unavailableDate && data[i].status == "pending")
            {
                allDatesDivs[g].classList.add("pendingDate")
            }


        }
    }

}

// Initial render
renderCalendar(currentDate);

function displayDate(button, monthAndYear)
{
  //getting day name
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let date = new Date(`${monthAndYear.split(" ")[0]} 1, 2000`);
  let monthNumber = date.getMonth() + 1;
  
  let day = new Date(monthAndYear.split(" ")[1] + '/' + monthNumber + '/' + button.innerText)
  let dayName = ''; // declare outside
  // let dayName = dayNames[day.getDay()];
  if (!isNaN(day)) {
    const dayIndex = day.getDay(); // returns 0 to 6
    dayName = dayNames[dayIndex];

  } else {
    dayName = 'Invalid date';
  }

 


  //constructing the date info box

  // if the date id available

  if (document.querySelector(".displayDateBox"))
  {
    document.querySelector(".displayDateBox").parentNode.removeChild(document.querySelector(".displayDateBox"))
  }

  let displayDateBox = document.createElement('div')
  displayDateBox.classList.add("displayDateBox")

  let tag = document.createElement("div")
  tag.innerText = "Selected Date"
  tag.classList.add("displayDateTag")

  let dateTag = document.createElement("span")
  dateTag.classList.add("dateTag")
  dateTag.innerText = dayName + ", " + monthAndYear.split(" ")[0] + " " + button.innerText + ", " + monthAndYear.split(" ")[1]

  let bookButton = document.createElement("button")
  bookButton.classList.add("bookButton")
  bookButton.innerText = "Book This Date"

  displayDateBox.appendChild(tag)
  displayDateBox.appendChild(dateTag)
  displayDateBox.appendChild(bookButton)

  document.querySelector(".calendar-container").appendChild(displayDateBox)

  // if the date is reserved

  if (button.className.includes("pendingDate"))
  {

    displayDateBox.style.backgroundColor = "#fef9c2"

    tag.style.backgroundColor = "#fff8a6ff"
    tag.style.color = "#c49413"
    
    bookButton.disabled = true
    bookButton.style.backgroundColor = "grey"
    bookButton.style.cursor = "not-allowed"

    displayDateBox.style.height = "auto"


    let subtext = document.createElement("span")
    subtext.innerText = "This date is reserved, you can check in 24h to see if it has been booked."
    subtext.style.fontSize = "0.6em"
    subtext.style.color = "#ac810aff"
    

    displayDateBox.appendChild(subtext)


  }

  bookButton.addEventListener('click', ()=>{
    let mainpage = document.querySelector('.bookPage')
    let userInfo = document.querySelector('.userInfo')
    let body = document.body
    let selectedDateText = document.querySelector('.selectedDateText')
    body.style.height = "100%";
    mainpage.style.display = "none";
    userInfo.style.display = "flex";
    selectedDateText.innerHTML = 
    `<span class="bold-label">Selected Date:</span> ${dayName}, ${monthAndYear.split(" ")[0]} ${button.innerText}, ${monthAndYear.split(" ")[1]}`;
    window.onload = function() {
        window.scrollTo(0, 0);
    };

    
  })

}

function changeDocumentDetails() {
  let docname = localStorage.getItem('docname');
  document.title = docname;
  let recievedbungalowname = docname.split(" ")[1]
  let bungalowname = document.querySelector('.bung-name') 
  bungalowname.innerText = recievedbungalowname

  if ( recievedbungalowname == "Lily" ){
    let emoji = document.getElementById('charemoji')
    let chartextlily = document.getElementById('chartextlily')
    let charsubtextlily = document.getElementById('charsubtextlily')

    emoji.innerText = "🛁"
    chartextlily.innerText = "Private Jacuzzi"
    charsubtextlily.innerText = "Jacuzzi perfect for peaceful evenings"
  }

}
changeDocumentDetails()


function hideListSpan(){
  const select = document.querySelector(".nbofguests");
  const span =  document.getElementById("listplaceholder");

  select.addEventListener("change", () => {
    if (select.value !== "") {
      span.style.display = "none";
    } else {
      span.style.display = "block";
    }
  });

}

hideListSpan()

function openFileBrowser(){
    document.querySelector(".uploadingSpace").addEventListener("click", async function () {

      let delay = new Promise(() => {setTimeout(() => {
        
      }, 100);})

      document.getElementById("fileInput").click();

      await delay
    });
}

openFileBrowser()

function backToSelection(){
  let mainpage = document.querySelector('.bookPage')
  let userInfo = document.querySelector('.userInfo')
  let backButton = document.querySelector('.backtodates')
  backButton.addEventListener('click', function() {
    mainpage.style.display = "block";
    userInfo.style.display = "none";
  })

}
backToSelection() 


function limitNumberChars(){
  document.getElementById("numInput").addEventListener("input", function () {
    if (this.value.length > 15) {
      this.value = this.value.slice(0, 15);
    }
    this.value = this.value.replace(/[^0-9]/g, '');
  });
  
}

limitNumberChars()

function lettersOnlyInput(){
  document.getElementById('lettersOnly').addEventListener('input', function () {
    this.value = this.value.replace(/[^a-zA-Z]/g, '');
  });
  
}
lettersOnlyInput()


//for info submition

let fileInputFilled = false

let fileAsBase64 = ""

async function submitData()
{

  let firstNameInput = document.querySelector(".firstNameInput")
  let lastNameInput = document.querySelector(".lastNameInput")
  let phoneInput = document.querySelector(".phoneInput")
  let nbofguests = document.querySelector(".nbofguests")

  let allInputs = [firstNameInput, lastNameInput, phoneInput, nbofguests]

  //checking if the data is written

  let conditions = [false, false, false, false, false]

  //for all other inputs

  for (let i = 0; i < allInputs.length; i++)
  {

    if (allInputs[i].value.trim() == "")
    {

      allInputs[i].addEventListener("change", () => {

        allInputs[i].classList.remove("incompleteInput")
        allInputs[i].parentNode.classList.remove("incompleteDiv")

      })

      allInputs[i].classList.add("incompleteInput")
      allInputs[i].parentNode.classList.add("incompleteDiv")

    }

    else{
      conditions[i] = true
    }

  }

  //for file input

  if (!fileInputFilled)
  {

    document.querySelector(".uploadingSpace").classList.add("incompleteInput")
    document.querySelector('.uploadingSpace').classList.add("incompleteDiv")

  }

  else{
    conditions[4] = true
  }


  //checking if all inputs are filled
  for (let i = 0; i < conditions.length; i++)
  {
    if (!conditions[i])
    {
      return
    }
  }

  
  //sending data to server

  let day = document.querySelector(".selectedButton").innerText

  let monthNumber = new Date(`${document.querySelector(".month-year").innerText.split(" ")[0]} 1, 2000`).getMonth() + 1

  let year = document.querySelector(".month-year").innerText.split(" ")[1]

  let todaysDate = new Date().toLocaleDateString('en-GB').split("/")

  let bungName = document.querySelector(".bung-name").innerText
  

  if (todaysDate[0][0] == "0")
  {
    todaysDate[0] = todaysDate[0].replace("0", "")
  }

  if (todaysDate[1][0] == "0")
  {
    todaysDate[1] = todaysDate[1].replace("0", "")
  }


  let data = {
    bungName: bungName,
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    phone: phoneInput.value,
    numberOfPeople: nbofguests.value,
    bookingDate: `${day}/${monthNumber}/${year}`,
    dateOfBooking: `${todaysDate[0]}/${todaysDate[1]}/${todaysDate[2]}`,
    idImg: fileAsBase64,
    requestStatus: "pending"
  }

  let request = fetch("http://34.163.87.189:3000/addBookingAndInfo", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)

  })

}

document.querySelector("#fileInput").addEventListener("change", (e) => {
  let file = e.target.files[0]

  if (!file) return;

  fileInputFilled = true

  document.querySelector(".uploadingSpace").classList.remove("incompleteInput")
  document.querySelector('.uploadingSpace').classList.remove("incompleteDiv")
    
  const reader = new FileReader();
  
  reader.onload = function(event) {
    const base64String = event.target.result;
    fileAsBase64 = base64String

    //displaying photo

    let uploadingSpace = document.querySelector(".uploadingSpace")

    //removing the text in the div

    let uploadtext = document.querySelector(".uploadtext").cloneNode(true)


    for(let i = uploadingSpace.children.length - 2; i >= 0 ; i--)
    {

      uploadingSpace.removeChild(uploadingSpace.children[i])

    }

    let imgPreview = document.createElement("img")
    
    imgPreview.style.width = "80%"
    imgPreview.style.height = "auto"

    uploadingSpace.style.height = "auto"
    uploadingSpace.style.padding = "10px"
    uploadingSpace.style.display = "flex"
    uploadingSpace.style.justifyContent = "center"
    uploadingSpace.style.alignItems = "center"


    imgPreview.src = fileAsBase64

    uploadingSpace.prepend(uploadtext)
    uploadingSpace.insertBefore(imgPreview, document.querySelector("#fileInput"))

  }

  reader.readAsDataURL(file)

  

})

