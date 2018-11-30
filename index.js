//1.) You have a collection of data (50)
//2.) Specify a number of elements per page (10)
//3.) Render pagination controls (next, previous)
//4.) Cut a chunk of data out based on the current page and the number of elements per page
//5.) Render data
//6.) Redraw page controls

import axios from "axios";

const API_URL =
  "https://api.unsplash.com/search/photos?page=1&per_page=50&query=kitten&client_id=592c0cc869cb8a3fa96a46239e298c9aa7cf272768799fe0877882387e0fd727";

//number of elements per page
const NUMBER_PER_PAGE = 10;

const state = {
  list: [],
  //items to display on 'currentPage'.
  pageList: [],
  //Keep track of where we are in pagination
  currentPage: 1,
  maxPages: 1
};

function start() {
  axios
    .get(API_URL, {
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      // change state object, put api data in state
      let list = response.data.results.map(pic => {
        return pic.urls.thumb;
      });

      //Almost like setState of React, but I'm mutating the state
      state.list = list;

      //Calculate total number of pages
      state.maxPages = Math.ceil(list.length / NUMBER_PER_PAGE);
      loadList();
    })
    .catch(function(err) {
      console.log(err);
    });
}

//The function that runs on loading the page.
window.onload = start;

//Slice chunks of data by the amount per page
function loadList() {
  let beginIndex = (state.currentPage - 1) * NUMBER_PER_PAGE;
  let endIndex = beginIndex + NUMBER_PER_PAGE;

  state.pageList = state.list.slice(beginIndex, endIndex);

  //In React/Redux, the page automatically re-renders when the state is changed, but here I don't have the luxury.

  renderList();
  disableButtons();
}

//Navigating through the Pages
function nextPage() {
  state.currentPage++;
  loadList();
}

document.getElementById("next").addEventListener("click", nextPage);

function previousPage() {
  state.currentPage--;
  loadList();
}

document.getElementById("previous").addEventListener("click", previousPage);

function createNode(element) {
  return document.createElement(element);
}

function append(parent, newElement) {
  return parent.appendChild(newElement);
}

function openModal(url) {
  console.log("element: ", url);
  document.getElementById("img01").src = url;
  document.getElementById("modal01").style.display = "block";
}

function renderList() {
  let ul = document.getElementById("list");
  ul.innerHTML = "";

  state.pageList.map(currentEl => {
    let li = createNode("li"),
      img = createNode("img");

    img.src = currentEl;
    img.addEventListener("click", () => openModal(currentEl));

    append(li, img);
    append(ul, li);
  });
}

function disableButtons() {
  document.getElementById("next").disabled =
    state.currentPage === state.maxPages ? true : false;
  document.getElementById("previous").disabled =
    state.currentPage === 1 ? true : false;
}
