// PHONE BLOCK
const phoneInput = document.querySelector("#phone_input");
const phoneButton = document.querySelector("#phone_button");
const phoneResult = document.querySelector("#phone_result");

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/;

phoneButton.onclick = () => {
  if (regExp.test(phoneInput.value)) {
    phoneResult.innerHTML = "OK";
    phoneResult.style.color = "green";
  } else {
    phoneResult.innerHTML = "NOT OK";
    phoneResult.style.color = "red";
  }
};

// TAB SLIDER
const tabContentBlocks = document.querySelectorAll(".tab_content_block");
const tabs = document.querySelectorAll(".tab_content_item");
const tabsParent = document.querySelector(".tab_content_items");

const hideTabContent = () => {
  tabContentBlocks.forEach((item) => (item.style.display = "none"));
  tabs.forEach((tab) => tab.classList.remove("tab_content_item_active"));
};

const showTabContent = (index = 0) => {
  tabContentBlocks[index].style.display = "block";
  tabs[index].classList.add("tab_content_item_active");
};

hideTabContent();
showTabContent();

tabsParent.onclick = (event) => {
  const target = event.target;
  if (target.classList.contains("tab_content_item")) {
    tabs.forEach((tab, tabIndex) => {
      if (target === tab) {
        hideTabContent();
        showTabContent(tabIndex);
      }
    });
  }
};

let index = 0;
setInterval(() => {
  index++;
  if (index >= tabs.length) index = 0;
  hideTabContent();
  showTabContent(index);
}, 3000);

// CONVERTER (DRY version)
const somInput = document.querySelector("#som");
const usdInput = document.querySelector("#usd");
const eurInput = document.querySelector("#eur");

const converter = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "../data/converter.json");
  request.setRequestHeader("Content-type", "application/json");
  request.send();

  request.onload = () => {
    const data = JSON.parse(request.response);

    const convert = (source, target1, target2, rate1, rate2) => {
      source.oninput = () => {
        if (source.value === "") {
          target1.value = "";
          target2.value = "";
          return;
        }
        const base = parseFloat(source.value);
        if (source === somInput) {
          target1.value = (base / rate1).toFixed(2);
          target2.value = (base / rate2).toFixed(2);
        } else {
          target1.value = (base * rate1).toFixed(2);
          target2.value = ((base * rate1) / rate2).toFixed(2);
        }
      };
    };

    convert(somInput, usdInput, eurInput, data.usd, data.eur);
    convert(usdInput, somInput, eurInput, data.usd, data.eur);
    convert(eurInput, somInput, usdInput, data.eur, data.usd);
  };
};

converter();

// CARD SWITCHER — Task 1
const cardBlock = document.querySelector(".card");
const btnNext = document.querySelector("#btn-next");
const btnPrev = document.querySelector("#btn-prev");
let cardId = 1;

const fetchCard = (id) => {
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then((res) => res.json())
    .then(({ id, title, completed }) => {
      cardBlock.innerHTML = `
        <p>${title}</p>
        <p style="color: ${completed ? "green" : "red"}">${completed}</p>
        <span>${id}</span>
      `;
    });
};

// Show first card on page load
fetchCard(cardId);

btnNext.onclick = () => {
  cardId = cardId === 200 ? 1 : cardId + 1;
  fetchCard(cardId);
};

btnPrev.onclick = () => {
  cardId = cardId === 1 ? 200 : cardId - 1;
  fetchCard(cardId);
};

// FETCH POSTS TO CONSOLE — Task 2
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((res) => res.json())
  .then((data) => console.log("POSTS:", data));

// WEATHER

const searchInput = document.querySelector(".cityName");
const searchButton = document.querySelector("#search");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");

//query params
//q

const BASE_API = "http://api.openweathermap.org/data/2.5/weather";
const API_KEY = "e417df62e04d3b1b111abeab19cea714";

searchButton.onclick = async () => {
  try {
    if (searchInput.value !== "") {
      const response = await fetch(
        `${BASE_API}?q=${searchInput.value}&units=metric&lang=ru&appid=${API_KEY}`
      );
      const data = await response.json();
      city.innerHTML = data.name || "Город не найден";
      temp.innerHTML = Math.round(data.main.temp) + "℃";
      searchInput.value = "";
    } else {
      city.innerHTML = "Введите название города";
      temp.innerHTML = "";
    }
  } catch (e) {
    console.log(e);
  }
};
