const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("searchInput");
const resultsElems = document.getElementById("results");
const webTitle = document.getElementById("webTitle");
const err = document.getElementById("err");
const random = document.getElementById("random");
const topGif = document.getElementById("topGif");
const lastGifSearched = document.getElementById("lastGifSearched");

const apiKey = "S72aLFTOA6SHPyBuU8iCUvDwx38mqztg";

let highRatedGifUrl = `https://api.giphy.com/v1/gifs/trending?api_key=b3ylakyVZUjmNwUAipQHcuKnzdX4piZE&limit=25&rating=g`;

let randomGif =
  "https://api.giphy.com/v1/gifs/random?api_key=b3ylakyVZUjmNwUAipQHcuKnzdX4piZE&tag=&rating=g";

const load = () => {
  fetch(highRatedGifUrl)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      let topResultsHTML = "";
      json.data.forEach((gif) => {
        let popularGifTURL = gif.images.fixed_width.url;
        let popularGifTitle = gif.title;

        topResultsHTML += `<div class="top-gif-card">         
                              <img 
                                  src="${popularGifTURL}" 
                                  alt="${popularGifTitle}" 
                                  class="gif"
                              />
                              <div class="gif-title-container">
                                  <p class="gif-title">${popularGifTitle}</p>
                              </div>
                            </div>`;
      });
      resultsElems.innerHTML = topResultsHTML;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
load();

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchTerm = searchInput.value;
  itemsInLocalStorage(searchTerm);
  search(searchTerm);
});

const search = (searchTerm) => {
  // API REQUEST PARAMS
  const path = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}`;
  // API FETCH
  if (searchInput.value == "") {
    document.getElementById("gif-obj").style.display = "none";
    load();
  }
  fetch(path)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      let resultsHTML = "";
      if (json.data == "") {
        err.style.display = "flex";
      }
      json.data.forEach((obj) => {
        let url = obj.images.fixed_width.url;
        let title = obj.title;

        resultsHTML += `<div class="gif-card" id="gif-obj">         
                          <img 
                              src="${url}" 
                              alt="${obj.title}" 
                              class="gif"
                          />
                          <div class="gif-title-container">
                              <p class="gif-title">${title}</p>
                          </div>
                        </div>`;
      });

      resultsElems.innerHTML = resultsHTML;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

webTitle.addEventListener("click", function reload() {
  err.style.display = "none";
  searchInput.value = "";
  load();
});

random.addEventListener("click", function randomGifSearchBtn() {
  fetch(randomGif, {
    mode: "cors",
    haeders: {
      "Content-Type": "text/plain;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      let resultsHTML = "";
      if (json.data == "") {
        err.style.display = "flex";
      }
      let randomGifurl = json.data.images.fixed_width.url;
      let randomGiftitle = json.data.title;

      resultsHTML += `<div class="gif-card-random" id="gif-obj">
                          <img
                              src="${randomGifurl}"
                              alt="${randomGiftitle}"
                              class="gif-random"
                          />
                          <div class="gif-title-container">
                              <p class="gif-title-random">${randomGiftitle}</p>
                          </div>
                        </div>`;

      resultsElems.innerHTML = resultsHTML;
    })
    .catch((err) => {
      console.log(err.message);
    });
});

topGif.addEventListener("click", function topGifSearch() {
  load();
});

let searchedGifs = [];

function itemsInLocalStorage(searchItem) {
  let searchGifStr = { searchItem };
  let storecapacity = localStorage.length;

  if (storecapacity >= 3) {
    searchedGifs.pop();
    searchedGifs.unshift(searchItem);
  } else {
    searchedGifs.push(searchItem);
  }

  localStorage.setItem("searchedGifs", JSON.stringify(searchedGifs));
  let arrGifs = JSON.parse(localStorage.getItem("searchedGifs"));

  for (let i = 0; i < arrGifs.length; i++) {
    // searchGifStr += `(#${i}) ${arrGifs[i]}<br>`;
    arrGifs.push(searchGifStr);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  console.log(localStorage.searchedGifs);
  let arrGifs = JSON.parse(localStorage.getItem("searchedGifs"));

  if (localStorage.length = 3) {
    arrGifs.forEach((elem) => {
      console.log(elem);
      //     storedSearched += `
      //   <button>${elem[0]}</button>
      //   <button>${elem[0]}</button>
      //   <button>${elem[0]}</button>
      // `;
      //     lastGifSearched.innerHTML = storedSearched;
    });
  }
});
