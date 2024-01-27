const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


const dropdownS = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load", () => {
    updateExchange();
});

for (let select of dropdownS) {
    for (currCode in countryList) {
        //console.log(currCode, countryList[currCode]);
        let newOpetion = document.createElement("option");
        newOpetion.innerText = currCode;
        newOpetion.value = currCode;
        if(select.name === "from" && currCode === "USD") {
            newOpetion.selected = "selected";
        }else if(select.name === "to" && currCode ==="INR") {
            newOpetion.selected = "selected";
        }
        select.append(newOpetion);
    }
    select.addEventListener("change",(evt) => {
        updateFlg(evt.target);
    });
}
// const updateFlg = (element) => {
//     let currCode = element.value;
//     let cuntryCode = countryList[currCode];
//     let newSrc = `https://flagsapi.com/${cuntryCode}/flat/64.png`;
//     let img =element.parentElement.querySelector("img");
//     img.src = newSrc;
//     console.log(cuntryCode);
// }
const updateFlg = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  };

  btn.addEventListener("click", (evt) =>{
    evt.preventDefault();
    updateExchange();
  });

  const updateExchange = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = amtVal;
        console.log(amtVal);
    }
    //console.log(fromCurr.value , toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmount = amtVal * rate;
    console.log(finalAmount);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  };
