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






