// Creating an cross icon inside the span tag dynamically

// Create span Element
let spanElement=document.createElement('span');
spanElement.classList.add('crossIcon');

// Create i element (font Awesome icon)
let crossIcon=document.createElement('i');
crossIcon.classList.add('fa-solid','fa-xmark');


// Append the i element to the span element
spanElement.appendChild(crossIcon);
let containerElement=document.querySelector('.container');


// Adding cross icon inside the right side of the input text field on input and removing it when we remove all inputs from the input filed by backspace button .
function addCrossIcon(){
   // if(document.querySelector('input').value!==''){
        // containerElement.appendChild(spanElement);
   // }
    // else{
    //     containerElement.removeChild(spanElement);
    // }
}

// Remove input after click on cross icon
crossIcon.addEventListener('click',()=>{
    document.querySelector('input').value='';
    // containerElement.removeChild(spanElement); //removing the cross icon 
})


// Calling  api and fetching the data
let input=document.querySelector('input');
let cityName='';    //value from the input
const apiKey=`6e7683d1c61aa7b9518f67ce32a28ba5`; 
input.addEventListener('keypress', (event)=>{
    cityName=input.value; // updating value from the input 
    const Url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;  
    if(event.key=='Enter' && cityName!=''){
           fetch(Url)
           .then((response)=>response.json())
           .then((data)=>{
            // setting the heading as the name of the city
           let location = document.createElement('h2');
            containerElement.appendChild(location);
            document.querySelector('h2').innerHTML=cityName;

              //diplay weather condtion
              weatherCondition(data); 
           })
           .catch((error)=>{console.log(error)})
     }
     else if(event.key=='Enter' && cityName==''){
        alert("Enter City");
     }
})




function weatherCondition(data){
    //creating parent div for displaying todays weather
    let todayWeather=document.createElement('div');
    todayWeather.id='today-weather'; //setting id
    containerElement.appendChild(todayWeather); // append to the container
    
    //creating a div inside parent div which will dsiplay todays temperarture
    let todayTemp=document.createElement('div');
    todayTemp.id='today-temperature';
    todayWeather.appendChild(todayTemp); //append to the parent div
    document.querySelector('#today-temperature').innerHTML=`${data.main.temp}<sup>o</sup>`; //displaying the todays tempertaure
  

////creating a div inside parent div which will dsiplay current weather condition eg. rain, clear etc.
    let weatherCondition = document.createElement('div');
    weatherCondition.id='weather-condition';
    todayWeather.appendChild(weatherCondition); //append to the parent div
    document.querySelector('#weather-condition').innerHTML=data.weather[0].description;  //displaying the condition
    
    
 // Creating Div inside the parent div which will display todays lowest and higest temperaature.
 let minMaxTemp = document.createElement('div');
 minMaxTemp.id='min-max-temperature';
 todayWeather.appendChild(minMaxTemp); //append to the parent div

document.querySelector('#min-max-temperature').innerHTML= `L :${data.main.temp_min}<sup>o</sup>   H :${data.main.temp_max}<sup>o</sup>`; // 
}