const currency_one = document.getElementById('currency-one');
const currency_two =document.getElementById('currency-two');
const amount_one = document.getElementById('amount-one');
const amount_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

//fetch exchange rates and uodate the dom
function calculate(){ 
  const currencyOne = currency_one.value;
  const currencyTwo = currency_two.value;
  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
  .then(res=>res.json())
  .then(data=>{
    // console.log(data)
    const rate = data.rates[currencyTwo];
    console.log(rate);
    rateEl.innerHTML = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
     amount_two.value = (amount_one.value*rate).toFixed(2);
});
  
}
//event Listeners
currency_one.addEventListener('change',calculate);
amount_one.addEventListener('input',calculate);
currency_two.addEventListener('change',calculate);
amount_two.addEventListener('input',calculate); 
swap.addEventListener('click',()=>{
    const temp = currency_one.value;
    currency_one.value=currency_two.value;
    currency_two.value = temp;
    calculate();
})

calculate(); 