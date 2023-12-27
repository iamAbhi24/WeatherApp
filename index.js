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


// Adding cross icon inside the left side of the input text field on input
function addCrossIcon(){
    containerElement.appendChild(spanElement);
}

// Remove input after click on cross icon
crossIcon.addEventListener('click',()=>{
    document.querySelector('input').value='';
    containerElement.removeChild(spanElement); //removing the cross icon 
})


document.querySelector('input').addEventListener('blur',()=>{
    if(document.querySelector('input').value=''){
        containerElement.removeChild(spanElement);
    }
})




