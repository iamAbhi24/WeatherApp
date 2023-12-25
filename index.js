// Creating an cross icon inside the span tag dynamically

let spanElement=document.createElement('span');
spanElement.classList.add('crossIcon');


let crossIcon=document.createElement('i');

crossIcon.classList.add('fa','fa-times');

let containerElement=document.querySelector('.container');

// Adding cross icon inside the left side of the input text field

let inputValue=document.querySelector('input');
function addCrossIcon(){
    if(inputValue.value==''){
        containerElement.removeChild(spanElement);
    }
    else{
        containerElement.appendChild(spanElement);
        
    }
}

