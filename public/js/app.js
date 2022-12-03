//document.getElementById('heading').innerText = 'Client'
console.log("I am client side js");

/*fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then(data =>{
        console.log(data.puzzle)
    })
}) */
const weatherForm = document.querySelector("form");
const searchText = document.querySelector("input");
const paraOne = document.querySelector("#paraResultOne");
const paraTwo = document.querySelector("#paraResultTwo");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const address = searchText.value
  paraOne.textContent = "Loading"
  paraTwo.textContent = ""
  if (address != "") {
    fetch(
      "http://localhost:3000/weather?address=" + encodeURIComponent(address)
    ).then((response) => {
      response.json().then((data) => {
        if (data.error) {
            paraOne.textContent = data.error
        }else{
            paraOne.textContent = "Location: " + data.location
            paraTwo.textContent = "Temperature: " + data.temperature + " Centigrade"
        }
      });
    });
  } else {
    paraOne.textContent = "Location Empty"
  }
});
