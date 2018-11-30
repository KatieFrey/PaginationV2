//1.) You have a collection of data (50)
//2.) Specify a number of elements per page (10)
//3.) Render pagination controls (next, previous)
//4.) Cut a chunk of data out based on the current page and the number of elements per page
//5.) Render data
//6.) Redraw page controls

const list = [
  "https://picsum.photos/200/?random",
  "https://picsum.photos/201/?random",
  "https://picsum.photos/202/?random",
  "https://picsum.photos/203/?random",
  "https://picsum.photos/204/?random",
  "https://picsum.photos/205/?random",
  "https://picsum.photos/206/?random",
  "https://picsum.photos/207/?random",
  "https://picsum.photos/208/?random",
  "https://picsum.photos/209/?random",
  "https://picsum.photos/210/?random",
  "https://picsum.photos/211/?random",
  "https://picsum.photos/212/?random",
  "https://picsum.photos/213/?random",
  "https://picsum.photos/214/?random",
  "https://picsum.photos/215/?random",
  "https://picsum.photos/216/?random",
  "https://picsum.photos/217/?random",
  "https://picsum.photos/218/?random",
  "https://picsum.photos/219/?random"
]; //collection of data
let pageList = []; //items to display on 'currentPage'.
let currentPage = 1; //Keep track of where we are in pagination
const numberPerPage = 4; //number of elements per page
let maxPages = 1; //tells us the total number of pages required to render collection. (this will change if we're doing numeric pagination)

function start() {
  //Calculate total number of pages
  maxPages = Math.ceil(list.length / numberPerPage);
  loadList();
}

//The function that runs on loading the page.
window.onload = start;

//Slice chunks of data by the amount per page
function loadList() {
  let beginIndex = (currentPage - 1) * numberPerPage;
  let endIndex = beginIndex + numberPerPage;

  pageList = list.slice(beginIndex, endIndex);
  console.log("Pagelist: ", pageList);
  renderList();
  disableButtons();
}

//Navigating through the Pages
function nextPage() {
  currentPage++;
  loadList();
}

function previousPage() {
  currentPage--;
  loadList();
}

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
    currentPage === maxPages ? true : false;
  document.getElementById("previous").disabled =
    currentPage === 1 ? true : false;
}
