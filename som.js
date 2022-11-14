
const currencyOneEL = document.getElementById("currency-one");
const currencyTwoEL = document.getElementById("currency-two");
const amounOneEL = document.getElementById("amount-one");
const amounTwoEL = document.getElementById("amount-two");

let currencyData ={};

const mapRatesKeys =() =>{
    return new Promise ((resolve) => {
        fetch(
            `https://v6.exchangerate-api.com/v6/41b4541f3df8b629ff6e1018/latest/${currencyOne}`
        )
        .then((res) => res.json())
        .then((data) => {
            const { conversion_rates: rates} = data;
            let renferRatesUSD ="";
            let renferRatesEUR ="";

            for(let key in rates) {
                renferRatesUSD +=
                key === "USD"
                ? `< option value="${key}" selected${key}</option>`
                : `< option value="${key}">${key}</option>`;

                renferRatesEUR +=
                key === "EUR"
                ? `< option value="${key}" selected${key}</option>`
                : `< option value="${key}">${key}</option>`;
            }

            currencyOneEL.innerHTML = renferRatesUSD;
            currencyOneEL.innerHTML = renferRatesEUR;

            resolve();
        });
    });
};

const calculete = (data, currencyTwo) => {
    const rate = data[currencyTwo];
    amounTwoEL.value = (+amounOneEL.value + rate).toFixed(2);
};

const getData = () =>{
    const currencyOne = currencyOneEL.value;
    const currencyTwo = currencyTwoEL.value;

    fetch(
        `https://v6.exchangerate-api.com/v6/41b4541f3df8b629ff6e1018/latest/${currencyOne}`
    )
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);

    currencyData = {...data.conversion_rates };
    calculete(currencyData, currencyTwo);
    });
};

const runCalculate = () => calculete(currencyData, currencyTwoEL.value);
mapRatesKeys().then(() => getData());
amounOneEL.addEventListener("input", runCalculate);
currencyOneEL.addEventListener("change", getData);
currencyTwoEL.addEventListener("change", runCalculate);
