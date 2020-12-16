const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const btn = document.getElementById('btn');
const form = document.getElementById('form');


// const dummyTransactions = [
//     { id: 1, text:'Flower', amount:-20},
//     { id: 2, text: 'Salary', amount: 80},
//     { id: 3, text: 'Book', amount: 70 },
//     { id: 4, text: 'Camera', amount: -100}
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));


let transactions = localStorage.getItem('transactions')!==null? localStorageTransactions : [];

// add transaction 
function addTransaction(e){
    e.preventDefault();
    if(text.value.trim()==='' || amount.value.trim()==='' ){
        alert('Please add text or amount properly');
    }
    else{
         const transaction = {
              id: generaterandomid(),
              text: text.value,
              amount: +amount.value
         }
        transactions.push(transaction);

        addTransactionToDom(transaction);
        updateLocalStorage();
        updateValues();
        text.value = '';
        amount.value = '';
    }
}
//generate random id
function generaterandomid(){
    return Math.floor(Math.random()*10000000);
}
// add transactions to the doms list  

function addTransactionToDom(transaction){
    const sign = transaction.amount < 0? '-' : '+';


    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
     
    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeItem(${transaction.id})">X</button>
    `;
    list.appendChild(item);
}
//update th balance income and expence
function updateValues(){
    const amounts = transactions.map(transaction=> transaction.amount);
    
    const total = amounts.reduce((acc,item)=>(acc+=item) ,0).toFixed();
   
    const income = amounts
                     .filter(item => item > 0)
                     .reduce((acc,item) => (acc+= item),0)
                     .toFixed(2);

    const expence = (amounts
    .filter(item=>item<0)
    .reduce((acc,item)=>(acc+=item),0) * -1)
    .toFixed(2);
    
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expence}`;

}
// remove transactions by id
function removeItem(id){
    transactions  = transactions.filter(trans=>
        trans.id!==id);
        updateLocalStorage();
    init();
}
function updateLocalStorage(){
    localStorage.setItem('transactions', JSON.stringify('transactions'));
}
// Init app
function init(){
 list.innerHTML = '';
 transactions.forEach(addTransactionToDom);
 
 updateValues();
}


init();

// Event Listeners

form.addEventListener('submit',addTransaction);


// 