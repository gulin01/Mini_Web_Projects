const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const submit = document.getElementById('submit');
const form = document.getElementById('form');

function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}
function showError(input,message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerHTML = message;
}
function checkValid(inputArray){
    inputArray.forEach(function(input){
        if(input.value===''){
            showError(input,`${inputField(input)} is required`);
        } else{
            showSuccess(input);
        }
    });
}

function inputField(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkLength(input, min , max){
    if(input.value.length<min){
        showError(input,`${inputField(input)}'s must be more than 3 charachters`);
    }
    else if(input.value.length>max){
        showError(input,`${inputField(input)}'s must be less than 15 charachters`);
    }
    else{
        showSuccess(input);
    }
}
function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value)){
         showSuccess(input);
    }
    else{
       showError(input,'Email is not Valid');
    }
}
function checkPasswordMatch(input,input2){
    if(input.value===input2.value){
        showSuccess(input2);
    }
    else{
        showError(input2,`passwords dont match`);
    }
}
form.addEventListener('submit',function(e){
    e.preventDefault();
    checkValid([username,email,password,password2]);
    checkLength(username,3,15);
    checkLength(password,6,16);
    checkEmail(email);
    checkPasswordMatch(password,password2);

})