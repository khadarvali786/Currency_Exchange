const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");

const i = document.querySelector(".dropdown i");

for (let select of dropdown) {
  for (let code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = code;
    newOption.value = code;
    if (select.name === "from" && code === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && code === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let imgurl = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = imgurl;
};
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }
  let f = fromCurr.value.toLowerCase();
  let t = toCurr.value.toLowerCase();
  let money = amount.value;
  let URL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${f}/${t}.json`;
  getExchangeRate(URL, money, f, t);
});

const getExchangeRate = async (url, amount, f, t) => {
  let response = await fetch(url);
  let data = await response.json();
  let toExValue = t;
  let rate = (amount * data[toExValue]).toFixed(2);
  let text = `${amount} ${f.toUpperCase()} = ${rate} ${t.toUpperCase()}`;
  msg.innerText = text;
};

i.addEventListener("click", () => {
  let temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temp;
  let fromImg = document.querySelector(".from img");
  let toImg = document.querySelector(".to img");
  let tempImg = fromImg.src;
  fromImg.src = toImg.src;
  toImg.src = tempImg;
});
