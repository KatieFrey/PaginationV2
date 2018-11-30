//1.) You have a collection of data (50)
//2.) Specify a number of elements per page (10)
//3.) Render pagination controls (next, previous)
//4.) Cut a chunk of data out based on the current page and the number of elements per page
//5.) Render data
//6.) Redraw page controls

import axios from "axios";

const apiUrl =
  "https://api.unsplash.com/search/photos?page=1&per_page=50&query=kitten&client_id=592c0cc869cb8a3fa96a46239e298c9aa7cf272768799fe0877882387e0fd727";

// const list = [
//   "https://picsum.photos/200/?random",
//   "https://picsum.photos/201/?random",
//   "https://picsum.photos/202/?random",
//   "https://picsum.photos/203/?random",
//   "https://picsum.photos/204/?random",
//   "https://picsum.photos/205/?random",
//   "https://picsum.photos/206/?random",
//   "https://picsum.photos/207/?random",
//   "https://picsum.photos/208/?random",
//   "https://picsum.photos/209/?random",
//   "https://picsum.photos/210/?random",
//   "https://picsum.photos/211/?random",
//   "https://picsum.photos/212/?random",
//   "https://picsum.photos/213/?random",
//   "https://picsum.photos/214/?random",
//   "https://picsum.photos/215/?random",
//   "https://picsum.photos/216/?random",
//   "https://picsum.photos/217/?random",
//   "https://picsum.photos/218/?random",
//   "https://picsum.photos/219/?random"
// ]; //collection of data
let pageList = []; //items to display on 'currentPage'.
let currentPage = 1; //Keep track of where we are in pagination
const numberPerPage = 4; //number of elements per page

function start() {
  console.log("I'm here");
  axios
    .get(apiUrl, {
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      let list = response.data.results.map(pic => {
        return pic.urls.small;
      });
      window.list = list;
      //Calculate total number of pages
      let maxPages = Math.ceil(list.length / numberPerPage);
      window.maxPages = maxPages;
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
  let beginIndex = (currentPage - 1) * numberPerPage;
  let endIndex = beginIndex + numberPerPage;

  pageList = window.list.slice(beginIndex, endIndex);
  console.log("Pagelist: ", pageList);
  renderList();
  disableButtons();
}

//Navigating through the Pages
function nextPage() {
  currentPage++;
  loadList();
}

window.nextPage = nextPage;

function previousPage() {
  currentPage--;
  loadList();
}

window.previousPage = previousPage;

function createNode(element) {
  return document.createElement(element);
}

function append(parent, newElement) {
  return parent.appendChild(newElement);
}

function renderList() {
  let ul = document.getElementById("list");
  ul.innerHTML = "";

  pageList.map(currentEl => {
    let li = createNode("li"),
      img = createNode("img");

    img.src = currentEl;
    append(li, img);
    append(ul, li);
  });
}

function disableButtons() {
  document.getElementById("next").disabled =
    currentPage === window.maxPages ? true : false;
  document.getElementById("previous").disabled =
    currentPage === 1 ? true : false;
}
