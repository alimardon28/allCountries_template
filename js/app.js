"use strict";

const URL = "https://restcountries.com/v2/all";
const main = document.querySelector(".main");
const year = document.querySelector("#year");

async function getData(m, e) {
  const request = await fetch(URL);
  const result = await request.json();

  console.log(result);

  const from = m;
  const to = e;

  const SLICE1 = result.slice(m, to * 25);

  console.log(SLICE1);

  SLICE1.map((ele, indx) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
        <div data-bs-toggle="modal" data-bs-target="#staticBackdrop">

        <i href='/${ele.name}'>
        <img src='${ele.flags.svg}' class='image-thubnail rounded d-block'/>
        <p class="text-center" onclick='aCountry(${ele.name})'> ${ele.name} </p>
        </i>

        </div>

        `;

    main.append(div);

    div.addEventListener("click", () => {
      aCountry(ele.name);
    });
  });
}

let indx = 0;
let indxz = -1;

const Slicer = () => {
  indx++;
  indxz++;

  getData(indxz, indx);
};

const aCountry = async (e) => {
  const modal = document.querySelector(".modal-body");

  const one = await fetch(`https://restcountries.com/v2/name/${e}`);
  const two = await one.json();

  const count = two[0];
  console.log(count);

  modal.innerHTML = `

    <h2>${count.name}</h2>
    <div>flag:
      <img src='${count.flag}' class='image-thubnail rounded d-block'/>
    </div>

   <div>
   name:
     <p>${count.regionalBlocs[0].name}</p>
   </div>
    <div>
    acronym:
    <p>${count.regionalBlocs[0].acronym}</p>
    </div>
    <div>
    currencies:
      <span>${count.currencies[0].code}</span>
      <span>${count.currencies[0].name}</span>
      <span>${count.currencies[0].symbol}</span>
    </div>



    `;
};

function YearClock() {
  let newClockDate = new Date();
  year.innerHTML = `${newClockDate.getDate()} : ${
    newClockDate.getMonth() + 1
  } : ${newClockDate.getFullYear()}`;
}

YearClock();
