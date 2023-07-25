"use strict";

// select elements DOM

const currencyOne = document.getElementById("currency-price-one");
const currencyTwo = document.getElementById("currency-price-two");

//text box

const dynamicTextCurrencyOne = document.getElementById("currency-one-input");
const dynamicTextCurrencyTwo = document.getElementById("currency-two-input");

//swap button

const swapBtn = document.getElementById("btnSwap");

//exchange para

const inputEle = document.getElementById("inputEle");

//exchangeRate API

function init() {
  populateInOptions();
  getCurrencyRates();
}

function populateInOptions() {
  const url = `https://v6.exchangerate-api.com/v6/ba1793056b601fe3922b5ff7/latest/`;
  //fetch function
  const fetchcurrencyCodes = async () => {
    const response = await fetch(`${url}INR`);
    const data = await response.json();

    const currencyCodes = Object.keys(data.conversion_rates);
    console.log(currencyCodes);
    addcurrencyCodes(currencyCodes, currencyOne);
    addcurrencyCodes(currencyCodes, currencyTwo);
  };
  fetchcurrencyCodes();
}

//helper function
function addcurrencyCodes(arrayCode, elementOfCode) {
  arrayCode.forEach((code) => {
    const optionElement = document.createElement(`option`);
    optionElement.value = code;
    optionElement.innerText = code;
    elementOfCode.appendChild(optionElement);
  });
}

function getCurrencyRates() {
  const currencyFirst = currencyOne.value;
  const currencySecond = currencyTwo.value;
  const amountOne = dynamicTextCurrencyOne.value;
  console.log(currencyFirst);
  console.log(currencySecond);
  const url = `https://v6.exchangerate-api.com/v6/ba1793056b601fe3922b5ff7/pair/`;
  const fetchCurrencyRates = async () => {
    const response = await fetch(`${url}${currencyFirst}/${currencySecond}`);
    const data = await response.json();
    console.log(data);
    const rate = data.conversion_rate.toFixed(2);
    console.log(`1 ${currencyFirst} = ${rate}${currencySecond}`);
    inputEle.innerText = `1 ${currencyFirst} = ${rate}${currencySecond}`;

    dynamicTextCurrencyTwo.value = Number(amountOne) * Number(rate);
    // dynamicTextCurrencyTwo.value = `${rate}`;
  };
  fetchCurrencyRates();
}

//eventListener
currencyOne.addEventListener("change", getCurrencyRates);

currencyTwo.addEventListener("change", getCurrencyRates);
dynamicTextCurrencyOne.addEventListener("input", getCurrencyRates);

swapBtn.addEventListener("click", () => {
  [currencyOne.value, currencyTwo.value] = [
    currencyTwo.value,
    currencyOne.value,
  ];
  getCurrencyRates();
});

init();
