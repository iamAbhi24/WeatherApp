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
    if(document.querySelector('input').value!==''){
        containerElement.appendChild(spanElement);
    }
    else{
        containerElement.removeChild(spanElement);
    }
}

// Remove input after click on cross icon
crossIcon.addEventListener('click',()=>{
    document.querySelector('input').value='';
    containerElement.removeChild(spanElement); //removing the cross icon 
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
            document.querySelector('h2').innerHTML=`${data.main.temp}<sup>0</sup>c`;
           })
           .catch((error)=>{console.log(error)})
     }
     else if(event.key=='Enter' && cityName==''){
        alert("Enter City");
     }
})




