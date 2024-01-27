
//parent container of all element
let containerElement = document.querySelector('.container');

// Calling  api and fetching the data
let input = document.querySelector('input');
let cityName = '';    //value from the input
const apiKey = `18efe3f8ffe340c7920100058242201`;
input.addEventListener('keypress', (event) => {
    cityName = input.value.trim(); //updating value from the input and Trim whitespaces. 
    const currentUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`;
    const forcastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=5&aqi=no&alerts=no`;

    if (event.key == 'Enter' && cityName != '') {

        Pageloading(); // loading untill fetch the data

        // It will wait for all promise to resolve 
        Promise.all([fetchCurrentWeather(currentUrl), fetchDailyForcast(forcastUrl)])
            .then(([currentWeather, dailyWeather]) => {

                // remove spinner 
                removeLoadingElement();
                let location = document.createElement('h2'); // setting the heading as the name of the city
                containerElement.appendChild(location);
                document.querySelector('h2').innerHTML = cityName.toUpperCase();

                //Display Current weather
                displayWeather(currentWeather, dailyWeather);
            }).catch((error) => {
                // remove spinner 
                removeLoadingElement();
                alert(`Enter a valid City!! 
Note: Please varify the spelling`);
                console.log(error)
            });
    }
    else if (event.key == 'Enter' && cityName == '') {
        alert("Enter City");
    }
})




// Will display the current weather and 4 days forcast
function displayWeather(currentWeather, dailyWeather) {

    let todayWeather = document.createElement('div');//creating parent div for displaying todays weather
    todayWeather.id = 'today-weather'; //setting id
    containerElement.appendChild(todayWeather); // append to the container


    // creating a div inside parent div which will dsiplay todays temperarture
    let todayTemp = document.createElement('div');
    todayTemp.id = 'today-temperature';
    todayWeather.appendChild(todayTemp); //append to the parent div
    document.querySelector('#today-temperature').innerHTML = `${currentWeather.current.temp_c}<sup>o</sup>`; //displaying the todays tempertaure



    // ////creating a div inside parent div which will dsiplay current weather condition eg. rain, clear etc.
    let weatherCondition = document.createElement('div');

    weatherCondition.id = 'weather-condition';
    todayWeather.appendChild(weatherCondition); //append to the parent div
    document.querySelector('#weather-condition').innerHTML = `<div class="weather_Condition_Emog">   <!-- weather condition emog  and weather condition parent div-->
    <div id="weatherEmog">    <!-- weather condition emog -->
     <img src="" alt="" id="currentEmog" width="50%">
    </div>
    <div id="weatherTxt">  <!-- weather condition --> 
     
    </div>
    </div>`
    document.querySelector('#weatherTxt').innerHTML = currentWeather.current.condition.text; // fetching and setting the weather condition

    document.querySelector('#currentEmog').src = currentWeather.current.condition.icon; // fetching and setting the weather condition emog



    //  // Creating Div inside the parent div which will display todays lowest and higest temperaature.
    let minMaxTemp = document.createElement('div');
    minMaxTemp.id = 'min-max-temperature';
    todayWeather.appendChild(minMaxTemp); //append to the parent div

    document.querySelector('#min-max-temperature').innerHTML = `L :${dailyWeather.forecast.forecastday[0].day.mintemp_c}<sup>o</sup>   H :${dailyWeather.forecast.forecastday[0].day.maxtemp_c}<sup>o</sup>`; // 


    // Checking if the forecast table already exists
    let existingForecastTable = document.querySelector("table");
    let forcastContainer = document.querySelector('#forcast');

    // Creating table for displaying 5 days forcast

    if (!forcastContainer) {
        forcastContainer = document.createElement('div'); //creating a div that contain the table 
        forcastContainer.id = "forcast";
        // forcastContainer.parentNode.appendChild(forcastContainer);
        containerElement.appendChild(forcastContainer); //appending to the parent div
    }


    // if the table  exists, remove it
    if (existingForecastTable) {
        forcastContainer.removeChild(existingForecastTable);
    }


    let table = document.createElement('table');
    forcastContainer.appendChild(table);

    for (let i = 1; i < 5; i++) {

        let myDate = new Date(dailyWeather.forecast.forecastday[i].date);
        const options = { weekday: 'short' };  // for short name of the days
        const dayOfWeek = myDate.toLocaleDateString('en-US', options);  // diplaying the day from current date

        let row = document.createElement('tr');   // adding row to the forcast table
        table.appendChild(row);

        // adding days name in the 1st column of the table
        let col1 = document.createElement('td'); // adding cells to each row
        row.appendChild(col1);
        if (i == 1) {
            col1.textContent = 'Tomorrow';   // 1st day will be tomorrow in 4 days forcast table
        }
        else {
            col1.textContent = dayOfWeek;
        }
        // adding weather icon in 2nd column of the dable
        let col2 = document.createElement('td');
        let dailyimg = document.createElement('img');
        dailyimg.id = 'dailyImgIcon';
        dailyimg.src = dailyWeather.forecast.forecastday[i].day.condition.icon;
        col2.appendChild(dailyimg);
        row.appendChild(col2);

        // adding the weather condition in the 3rd column of the table
        let col3 = document.createElement('td');
        row.appendChild(col3);
        col3.textContent = `${dailyWeather.forecast.forecastday[i].day.condition.text}`;


        // adding the min and max temperature in 4th column of the table
        let min_temp = dailyWeather.forecast.forecastday[i].day.mintemp_c;
        let max_temp = dailyWeather.forecast.forecastday[i].day.maxtemp_c;
        let col4 = document.createElement('td');
        row.appendChild(col4);
        col4.textContent = `${min_temp}/${max_temp}`;





    }


}


// return the promise of current weather
function fetchCurrentWeather(currentUrl) {

    return fetch(currentUrl).then((currentWeather) => {
        if (!currentWeather.ok) {
            throw new Error(`API 1 error`);
        }

        return currentWeather.json();

    }).catch((error) => {
        // console.log(error);
        throw error;
    })

}



// return the Promise of daily forcast
function fetchDailyForcast(forcastUrl) {
    return fetch(forcastUrl).then((dailyWeather) => {
        if (!dailyWeather.ok) {
            // console.log("Error in API 2, status:" + dailyWeather.status);
            throw new Error("API 2 error");
        }
        return dailyWeather.json();

    }).catch((error) => {
        // console.log("Error:" + error);
        throw error;
    })
}


let loadingElement = document.getElementById('loadingContainer');
const spinner = `<div class="d-flex justify-content-center">
<div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div>
</div>`
// display spinner 
function Pageloading() {
    if (!loadingElement) {   // 1st time showing spinner
        createLoadingElement();
        loadingElement.innerHTML = spinner;
        containerElement.appendChild(loadingElement);
    }
    else { // 2nd time and onwords
        loadingElement.innerHTML = spinner;
        containerElement.appendChild(loadingElement);
    }

}

// remove spinner
function removeLoadingElement() {
    containerElement.removeChild(loadingElement);
    createLoadingElement();
}

// create the container for spinner
function createLoadingElement() {
    loadingElement = document.createElement('div');
    loadingElement.id = 'loadingContainer';
}