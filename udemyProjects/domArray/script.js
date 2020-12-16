const main = document.getElementById('main');
const addUser = document.getElementById('add-user');
const double = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sort = document.getElementById('sort');
const calculateWealth = document.getElementById('calculate-wealth');
 

let data = [];


getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money

async function getRandomUser(){
   const res = await fetch('https://randomuser.me/api');
   const data = await res.json();
   const user = data.results[0];

   const newUser = {
       name : `${user.name.first} ${user.name.last}`,
       money : Math.floor(Math.random()* 10000000)

   }

   addData(newUser);
}


// add new object to data array

function addData(obj){
data.push(obj);
updateDOM();
}

//update DOM
function updateDOM(providedData = data){
//clear the main div 

main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';
providedData.forEach(obj=>{
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${obj.name}</strong>${formatMoney(obj.money)}`
    main.appendChild(element);
})

}

// format money as money 
function formatMoney(number){
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
}

// double everyones Money
function doubleMoney(){
    data = data.map(user=>{
        return {...user, money: user.money * 2};
    })

    updateDOM();
}
//sort by richest
function sortByRichest(){
    data.sort((a,b)=> b.money-a.money);
    updateDOM();
}
// filter only millionaires
function showMil(){
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}
// calculate weakth
function calculateW(){
    const total = data.reduce((acc,user) => (acc += user.money),0);
    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth : <strong> ${formatMoney(total)}</strong></h3>`;
    
    main.appendChild(wealthElement);
}


//eventListeners
addUser.addEventListener('click',getRandomUser);
double.addEventListener('click',doubleMoney);
sort.addEventListener('click',sortByRichest);
showMillionaires.addEventListener('click',showMil);
calculateWealth.addEventListener('click',calculateW);









////////