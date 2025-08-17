
panelButtons = [document.querySelector(".dashboardButton"), document.querySelector(".calendarButton")]

function pannelButton(element)
{
    for(let i = 0; i < panelButtons.length; i++)
    {
        if(panelButtons[i].className.includes("selectedPannel"))
        {
            panelButtons[i].classList.remove("selectedPannel")
        }

        
    }

    if (element.className.includes("dashboardButton"))
    {
        displayDashboard()
    }

    else if (element.className.includes("calendarButton"))
    {
        displayCalendar()
        
    }

    element.classList.add("selectedPannel")
}


function updateReservationCounter()
{

    let confirmedParentDiv = document.querySelector(".confirmedBookings")
    document.querySelector(".subText").innerText = (confirmedParentDiv.children.length - 1).toString() + " Confirmed Reservations"


    let pendingParentDiv = document.querySelector(".pendingBookings")
    document.querySelectorAll(".subText")[1].innerText = (pendingParentDiv.children.length - 1).toString() + " Pending Reservations"


}

function addRequest(name, date, status, bungName)
{
    if (status == "confirmed")
    {
        let requestMainDiv = document.createElement("div")
        requestMainDiv.classList.add("confirmedBookingRequest")

        let circle = document.createElement("i")
        circle.className = "fa-solid fa-circle"
        circle.style.fontSize = "0.5em"
        circle.style.color = "#00a63e"

        let requestInfoDiv = document.createElement("div")
        requestInfoDiv.classList.add("confirmedrequestInfo")

        let clientName = document.createElement("span")
        clientName.innerText = name
        clientName.classList.add("name")

        let bookingDate = document.createElement("span")
        bookingDate.innerText = date
        bookingDate.classList.add("date1")

        requestInfoDiv.appendChild(clientName)
        requestInfoDiv.appendChild(bookingDate)

        let tagsDiv = document.createElement("div")
        tagsDiv.classList.add("tagsDiv")


        let statusTag = document.createElement("span")
        statusTag.innerText = "Confirmed"
        statusTag.classList.add("statusConfirmed")

        let bungNameTag = document.createElement("span")
        bungNameTag.innerText = bungName
        
        switch (bungName) {
            case "Margarita":
                bungNameTag.classList.add("margaritaBungTag")
                break;

            case "Tulip":
                bungNameTag.classList.add("tulipBungTag")
                break;

            case "Lily":
                bungNameTag.classList.add("lilyBungTag")
                break;
        
        }

        requestMainDiv.appendChild(circle)
        requestMainDiv.appendChild(requestInfoDiv)

        tagsDiv.appendChild(bungNameTag)
        tagsDiv.appendChild(statusTag)

        requestMainDiv.appendChild(tagsDiv)

        let parentDiv = document.querySelector(".confirmedBookings")
        parentDiv.appendChild(requestMainDiv)




    }


    else if (status == "pending")
    {
        let requestMainDiv = document.createElement("div")
        requestMainDiv.classList.add("pendingBookingRequest")

        let circle = document.createElement("i")
        circle.className = "fa-solid fa-circle"
        circle.style.fontSize = "0.5em"
        circle.style.color = "#d08700"

        let requestInfoDiv = document.createElement("div")
        requestInfoDiv.classList.add("pendingBookingsrequestInfo")

        let clientName = document.createElement("span")
        clientName.innerText = name
        clientName.classList.add("name")

        let bookingDate = document.createElement("span")
        bookingDate.innerText = date
        bookingDate.classList.add("date1")

        requestInfoDiv.appendChild(clientName)
        requestInfoDiv.appendChild(bookingDate)

        let tagsDiv = document.createElement("div")
        tagsDiv.classList.add("tagsDiv")


        let statusTag = document.createElement("span")
        statusTag.innerText = "Pending"
        statusTag.classList.add("statuspending")

        let bungNameTag = document.createElement("span")
        bungNameTag.innerText = bungName
        
        switch (bungName) {
            case "Margarita":
                bungNameTag.classList.add("margaritaBungTag")
                break;

            case "Tulip":
                bungNameTag.classList.add("tulipBungTag")
                break;

            case "Lily":
                bungNameTag.classList.add("lilyBungTag")
                break;
        
        }
        

        requestMainDiv.appendChild(circle)
        requestMainDiv.appendChild(requestInfoDiv)

        tagsDiv.appendChild(bungNameTag)
        tagsDiv.appendChild(statusTag)

        requestMainDiv.appendChild(tagsDiv)

        let parentDiv = document.querySelector(".pendingBookings")
        parentDiv.appendChild(requestMainDiv)
    

    }
}


async function viewBookerInfo(){

    function getMonthName(monthNumber) {
        const months = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ];
        return months[monthNumber - 1];
    }

    function getCheckoutDate (date) {

        let datevar = new Date(date)

        let m = new Date(datevar.getTime() + 86400000)

        return `${m.getDate()}/${m.getMonth() + 1}/${m.getFullYear()}`
    }

    async function fillDocs(response) {

         //filling in data

        let firstName = document.querySelector("#first-name")
        firstName.innerText = response.firstName

        let lastName = document.querySelector("#last-name")
        lastName.innerText = response.lastName

        let phone = document.querySelector("#clientPhone")
        phone.innerText = response.phone

        let numberOfPeople = document.querySelector(".numberofguestsSpan")

        if (response.numberOfPeople == "1")
        {
            numberOfPeople.innerText = response.numberOfPeople + " Person"
        }

        else{
            numberOfPeople.innerText = response.numberOfPeople + " People"
        }


        let checkinDate = document.querySelector("#checkin-date")

        let date1Parts = response.bookingDate.split("/")

        checkinDate.innerText = `${getMonthName(parseInt(date1Parts[1]))} ${date1Parts[0]}, ${date1Parts[2]}`

        let checkoutDate = document.querySelector("#checkout-date")

        let date2Parts = getCheckoutDate(`${date1Parts[2]}/${date1Parts[1]}/${date1Parts[0]}`).split("/")

        checkoutDate.innerText = `${getMonthName(parseInt(date2Parts[1]))} ${date2Parts[0]}, ${date2Parts[2]}`

        let dateofBooking = document.querySelector(".dateOfBookingText")

        date3Parts = response.dateOfBooking.split("/")

        dateofBooking.innerText = `${getMonthName(parseInt(date3Parts[1]))} ${date3Parts[0]}, ${date3Parts[2]}`


        let viewDocumentButton = document.querySelector(".viewfileButton")

        let imgPreview = false

        viewDocumentButton.addEventListener('click', function() {

            let documentBox = document.querySelector(".documentBox")


            if (!imgPreview)
            {
                imgPreview = true

                viewDocumentButton.innerText = "Hide File"

                let previewImg = document.createElement("img")
                

                previewImg.src = response.idImg

                previewImg.style.width = "100%"
                previewImg.style.alignSelf = "center"
                previewImg.style.marginTop = "20px"


                documentBox.appendChild(previewImg)

            }

            else{

                viewDocumentButton.innerText = "View File"
                documentBox.removeChild(documentBox.children[2])
                imgPreview = false

            }
            
            

        });
    }

    let pendingRequestDivs = document.querySelectorAll('.pendingBookingRequest')
    let confirmedRequestDivs = document.querySelectorAll('.confirmedBookingRequest')
    let mainpage = document.querySelector('.mainPage')
    let bookerInfoPage = document.querySelector('.bookerInfoPage')
    let statusCircle = document.querySelector('.statusCircle')
    let buttonsDiv = document.querySelector('.buttonsDiv')

    let backtodashboardbutton = document.querySelector('.backToDashboardButton')

    if (pendingRequestDivs[0] != undefined)
    {
        for (let i = 0; i < pendingRequestDivs.length; i++)
        {

            pendingRequestDivs[i].addEventListener('click', async function(){

            //get data

            let request = await fetch("http://34.163.87.189:3000/getClientsInfo", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({date: this.querySelector(".date1").innerText})

            })

            let response = await request.json()

           
            fillDocs(response)

            

            statusCircle.innerHTML = '';
            buttonsDiv.innerHTML = '';
            mainpage.style.display = 'none'
            bookerInfoPage.style.display = 'flex'


            let statusTag = document.createElement("span")
            statusTag.innerText = "Pending"
            statusTag.classList.add("bookingStatusPending")

            statusCircle.appendChild(statusTag)

            let declineButton = document.createElement('button')
            declineButton.innerText = 'Decline Booking'
            declineButton.classList.add('declineBooking')

            let approveButton = document.createElement('button')
            approveButton.innerText = 'Approve Booking'
            approveButton.classList.add('approveBooking')

            buttonsDiv.appendChild(declineButton)
            buttonsDiv.appendChild(approveButton) 


            approveButton.addEventListener("click", async () => {

                let request = await fetch("http://34.163.87.189:3000/approveBooking", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({date: response.bookingDate})

                })

                let approvedRespose = await request.json()

                if (approvedRespose.action == "successful")
                {

                    mainpage.style.display = 'flex'
                    bookerInfoPage.style.display = 'none'

                    statusCircle.innerHTML = '';
                    buttonsDiv.innerHTML = '';
        
                    await displayDashboardRequests()

                    

                }

            })

            declineButton.addEventListener("click", async () => {

                let request = await fetch("http://34.163.87.189:3000/declineBooking", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({date: response.bookingDate})

                })

                let declineRespose = await request.json()


                if (declineRespose.action == "successful")
                {
                    mainpage.style.display = 'flex'
                    bookerInfoPage.style.display = 'none'

                    statusCircle.innerHTML = '';
                    buttonsDiv.innerHTML = '';
        
                    await displayDashboardRequests()

                }
            
            })

        })

        }

        
    }

    if (confirmedRequestDivs[0] != undefined)
    {

        for (let i = 0; i < confirmedRequestDivs.length; i++)
        {


            confirmedRequestDivs[i].addEventListener('click', async function(){

                let request = await fetch("http://34.163.87.189:3000/getClientsInfo", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({date: this.querySelector(".date1").innerText})

                })

                let response = await request.json()

                fillDocs(response)

                statusCircle.innerHTML = '';
                buttonsDiv.innerHTML = '';
                mainpage.style.display = 'none'
                bookerInfoPage.style.display = 'flex'


                let statusTag = document.createElement("span")
                statusTag.innerText = "Confirmed"
                statusTag.classList.add("bookingStatusConfirmed")

                statusCircle.appendChild(statusTag)

                let cancelButton = document.createElement('button')
                cancelButton.innerText = 'Cancel Booking'
                cancelButton.classList.add('declineBooking')

                buttonsDiv.appendChild(cancelButton)

                cancelButton.addEventListener("click", async () => {

                let request = await fetch("http://34.163.87.189:3000/declineBooking", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({date: response.bookingDate})

                })

                let cancelResponse = await request.json()


                if (cancelResponse.action == "successful")
                {
                    mainpage.style.display = 'flex'
                    bookerInfoPage.style.display = 'none'

                    statusCircle.innerHTML = '';
                    buttonsDiv.innerHTML = '';
        
                    await displayDashboardRequests()

                    document.querySelectorAll(".subText")[0].innerText = (document.querySelectorAll(".confirmedBookingRequest").length).toString() + " Confirmed Reservations"
                }
            
            })

            })

        }


        
    }

    backtodashboardbutton.addEventListener('click', function(){
        mainpage.style.display = 'flex'
        bookerInfoPage.style.display = 'none'

        statusCircle.innerHTML = '';
        buttonsDiv.innerHTML = '';
        

    })

}


function filterBookings(element){

    let buttons = document.querySelector(".selectionButtons").children
    
    for (let i = 0; i < buttons.length; i++)
    {
        if (buttons[i].className.includes("Clicked"))
        {
            buttons[i].className = buttons[i].className.split(" ")[0]
        }

    }

    function refreshRequests() {

        if (dashboardDiv.style.display != "none")
        {
            displayDashboardRequests()
        }

        else{
            arrangeCalendar()
        }

    }


    if (element.className.includes("allBungButton"))
    {
        element.classList.add("allBungButtonClicked")
        displayDashboardRequests()

    }

    else if (element.className.includes("margaritaButton"))
    {
        element.classList.add("margaritaButtonClicked")
        refreshRequests()
    }

    else if (element.className.includes("tulipButton"))
    {
        element.classList.add("tulipButtonClicked")
        refreshRequests()


    }

    else if (element.className.includes("lilyButton"))
    {
        element.classList.add("lilyButtonClicked")
        refreshRequests()


    }



}


let dashboardDiv = document.querySelector(".dashboard")
let calendarDiv = document.querySelector(".calendar")

//dashboard

function displayDashboard()
{
    
    generateBungSelection("dashboard")

    calendarDiv.classList.add("deselected")
    calendarDiv.classList.remove("selected")
    
    setTimeout(() => {
        calendarDiv.style.display = "none"
        dashboardDiv.style.display = "flex"
        dashboardDiv.classList.remove("deselected")
    }, 300);

}

function bungFilter () {
    let buttons = document.querySelector(".selectionButtons").children

    for (let i = 0; i < buttons.length; i++)
    {
        if (buttons[i].className.includes("Clicked"))
        {
            return buttons[i].innerText
        }

    }
}

async function displayDashboardRequests()
{



    let confirmedBookings = document.querySelectorAll(".confirmedBookingRequest")
    let pendingBookings = document.querySelectorAll(".pendingBookingRequest")

    if (confirmedBookings[0] != undefined)
    {
        for(let i = 0 ; i < confirmedBookings.length; i++)
        {
            confirmedBookings[i].parentNode.removeChild(confirmedBookings[i])
        }
    }

    if (pendingBookings[0] != undefined)
    {
        for(let i = 0 ; i < pendingBookings.length; i++)
        {
            pendingBookings[i].parentNode.removeChild(pendingBookings[i])
        }
    }
    
    let request = await fetch("http://34.163.87.189:3000/getDashboardInfo", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({bungName: bungFilter()})
    
    })

    let response = await request.json()

    for (let i = 0; i < response.length; i++)
    {
        addRequest(response[i].firstName + " " + response[i].lastName, response[i].bookingDate, response[i].requestStatus, response[i].bungName)
    }

    updateReservationCounter()
    viewBookerInfo()

}

let originalBungSelection = document.querySelector(".bungSelection")
function generateBungSelection(panel) {

    let bunSelectionClone = originalBungSelection.cloneNode(true)

    if (panel == "dashboard")
    {
        document.querySelector(".bungSelection").parentNode.removeChild(document.querySelector(".bungSelection"))

        dashboardDiv.insertBefore(bunSelectionClone, document.querySelector(".bookingPanels"))
    }

    else if (panel == "calendar")
    {
        document.querySelector(".bungSelection").parentNode.removeChild(document.querySelector(".bungSelection"))

        bunSelectionClone.querySelector(".selectionButtons").removeChild(bunSelectionClone.querySelector(".selectionButtons").children[0])


        calendarDiv.insertBefore(bunSelectionClone, document.querySelector(".calendarAndControl"))

        

    }

    document.querySelector(".selectionButtons").children[0].click()

}

//calendar

function displayCalendar()
{
    generateBungSelection("calendar")
    
    dashboardDiv.classList.add("deselected")

    setTimeout(() => {
        dashboardDiv.style.display = "none"
        calendarDiv.style.display = "flex"


        calendarDiv.classList.remove("deselected")
        calendarDiv.classList.add("selected")
    }, 300);
    
}


async function arrangeCalendar()
{
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

        function displayDateOnControl(dateDiv, monthAndYear)
            {
                //returning everything to default after the pending 

                let statusTag = document.querySelector(".statusAvailable")

                statusTag.classList.remove("statusPending")
                document.querySelectorAll(".slider")[1].classList.remove("sliderDisabled")
                statusTag.innerText = "Available"
                document.querySelector(".slider").disabled = false
                if (dateDiv.className.includes("unavailableDate"))
                {
                    statusTag.innerText = "Unavailable"
                    statusTag.classList.add("statusUnavailable")

                }

                
                let day = dateDiv.innerText

                let date = new Date(`${monthAndYear.split(" ")[0]} 1, 2000`);
                let monthNumber = date.getMonth() + 1

                let year = monthAndYear.split(" ")[1]

                let displayDayDiv = document.querySelector(".managingDate")

                displayDayDiv.innerText = "Managing: " + day + "/" + monthNumber + "/" + year

                let slider = document.querySelector(".slider")

                if ((dateDiv.className.includes("unavailableDate") && !slider.checked) || (!dateDiv.className.includes("unavailableDate") && slider.checked && !dateDiv.className.includes("pendingDate")) )
                {

                    slider.click()
                }

                else if (dateDiv.className.includes("pendingDate")){

                    statusTag.classList.remove("statusUnavailable")

                    statusTag.classList.add("statusPending")
                    statusTag.innerText = "Pending"

                    document.querySelectorAll(".slider")[1].classList.add("sliderDisabled")
                    slider.disabled = true

                }

                

            }
                
        for (let day = 1; day <= lastDate; day++) {
            const dateDiv = document.createElement('button');
            dateDiv.addEventListener('click', () => {
                displayDateOnControl(dateDiv, monthYear.innerText)
                let selectedDiv = document.querySelector(".selectedButton")
                selectedDiv.classList.remove("selectedButton")

                dateDiv.classList.add("selectedButton")
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


        //selecting the first available date
        
        document.querySelector(".availableDate").classList.add("selectedButton")
        document.querySelector(".availableDate").click()
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

    // Initial render
    renderCalendar(currentDate);

    

}

async function getCalendarData(month, year)
{

    let request = await fetch(`http://34.163.87.189:3000/requestCalendarData`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({bungName: bungFilter(), month: month, year: year})
    })

    let data = await request.json()



    let allDatesDivs = document.querySelectorAll(".date")

    for(let i = 0; i < data.length; i++)
    {
        let bookingDate = data[i].date.slice(0, data[i].date.indexOf("/"))

        for(let g = 0; g < allDatesDivs.length; g++)
        {
            if(allDatesDivs[g].innerText == bookingDate && !allDatesDivs[g].className.includes("past"))
            {
                console.log(data[i].status)
                if (data[i].status == "pending")
                {

                    allDatesDivs[g].classList.add("pendingDate")

                }

                else if (data[i].status == "Unavailable")
                {

                    allDatesDivs[g].classList.add("unavailableDate")

                }
            }
        }



    }



    for(let i = 0; i < data.length; i++)
    {
        let unavailableDate = data[i].date.slice(0, data[i].date.indexOf("/"))

        

        for(let g = 0; g < allDatesDivs.length; g++)
        {
            if(allDatesDivs[g].innerText == unavailableDate && !allDatesDivs[g].className.includes("past") && !allDatesDivs[g].className.includes("pending"))
            {
                allDatesDivs[g].classList.add("unavailableDate")
            }
        }
    }

}

arrangeCalendar()





//submit button sending over data

let submitButton = document.querySelector(".submitChange")

submitButton.addEventListener('click', async () => {

    let dateDiv = document.querySelector(".managingDate").innerText
    let status = document.querySelector(".statusAvailable").innerText

    let response = await fetch("http://34.163.87.189:3000/manageBookingDate",
    {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: dateDiv.split(" ")[1], status: status})

    })

    arrangeCalendar()

})


    //once the window is loaded

//getting clients' info

filterBookings(document.querySelector(".allBungButton"))

//Checking the state of the slider

let slider = document.querySelector(".slider")
let statusTag = document.querySelector(".statusAvailable")

slider.addEventListener("change", () => {
    
    if(slider.checked)
    {
        statusTag.innerText = "Unavailable"
        statusTag.classList.add("statusUnavailable")
    }

    else{
        statusTag.innerText = "Available"
        statusTag.classList.remove("statusUnavailable")
    }

})

