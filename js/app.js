let state = { 
    price: getNumber(document.querySelectorAll('[name="price"]')[0].value),
    loan_years: document.querySelectorAll('[name="loan_years"]')[0].value,
    down_payment: document.querySelectorAll('[name="down_payment"]')[0].value,
    interest_rate: document.querySelectorAll('[name="interest_rate"]')[0].value,
    property_tax: document.querySelectorAll('[name="property_tax"]')[0].value,
    home_insurance: document.querySelectorAll('[name="home_insurance"]')[0].value,
    hoa: document.querySelectorAll('[name="hoa"]')[0].value
}

let totalLoan, 
totalMonths, 
monthlyInterest,
monthlyPrincipalInterest,
monthlyPropertyTaxes,
monthlyHomeInsurance,
monthlyHOA,
labels = ["Principal & Interest", "Property Tax", "Home Insurance", "HOA"],
backgroundColor = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
],
borderColor = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
]

function getNumber(str) {
    return Number(str.replace(/[^0-9\.]+/g,""));
}

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: labels,
        datasets: [{
            label: '# of Votes',
            data: [monthlyPrincipalInterest, monthlyPropertyTaxes, monthlyHomeInsurance, monthlyHOA],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1
        }]
    },
});
myChart.options.animation = false;


let inputText = document.getElementsByClassName('form-group__textInput');

for (let index = 0; index < inputText.length; index++){
    inputText[index].addEventListener('input', () => updateInputsState)
}
let inputSlides = document.getElementsByClassName('form-group__range-slide');

for (let index = 0; index < inputSlides.length; index++){
    inputSlides[index].addEventListener('input', () => updateInputsState)
}
function updateInputsState(event) {
    let name = event.target.name;
    let value = event.target.value;

    if (name === 'price') {
value = getNumber(value);    
}
if(event.target.type == 'range'){
    let total = (document.getElementsByClassName(`total__${name}`))[0].innerHTML = `${value}`;
}
state = {
    ...state,
    [name]: value
}
console.log(state)

}

document.getElementsByTagName('form')[0].addEventListener('submit', (event) => { 
    event.preventDefault();
    document.getElementsByClassName('mg-page__right')[0].classList.add('mg-page__right--animate');
}
)

function calculateData() {
    totalLoan = state.price - state.price  * (state.down_payment / 100);
    totalMonths = state.loan_years * 12;
    monthlyInterest = state.interest_rate / 100 / 12;
    monthlyPrincipalInterest = totalLoan * monthlyInterest / (1 - (1 + monthlyInterest) ** (-totalMonths)).toFixed(2);
    monthlyPropertyTaxes = state.property_tax / 12;
}

console.log(inputTexts);