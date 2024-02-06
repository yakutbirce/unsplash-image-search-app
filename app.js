const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageListWrapper = document.querySelector(".imageList-wrapper");

runEventListeners();

function runEventListeners() {
    form.addEventListener("submit", search);
    clearButton.addEventListener("click", clear);

    searchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            search(e);
        }
    })
}

function clear() {
    searchInput.value = "";
    Array.from(imageListWrapper.children).forEach((child) => child.remove())
    // imageListWrapper.innerHTML = "";
}

function search(e) {
    imageListWrapper.innerHTML = "";

    const value = searchInput.value.trim();
    // @RequestParam - Spring - Rest API
    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
        method: "GET",
        headers: {
            Authorization: "Client-ID QgglKUEPOGCura1-lJ5YLf0v_TQJTme5zzAvs6wdL78"
        }
    })
        .then((res) => res.json())
        .then((data) => {
            Array.from(data.results).forEach((image) => {
                // console.log(image.urls.small)
                addImageToUI(image.urls.small)
            })
        })
        .catch((err) => console.log(err));

    e.preventDefault();
}

function addImageToUI(url) {
    const div = document.createElement("div");
    div.className = "card";

    const img = document.createElement("img");
    img.setAttribute("src", url);
    img.height = '400';
    img.width = '400';

    div.append(img);
    imageListWrapper.append(div);
}