document.querySelector("#zipform").addEventListener("submit", getLocationInfo);

function getLocationInfo(e) {
  const zipCode = document.getElementById("zip").value;

  fetch(`http://api.zippopotam.us/IN/${zipCode}`)
    .then(response => {
      console.log(response);
      if (response.status != 200) {
        document.querySelector(
          "#output"
        ).innerHTML = `<article class=" message is-danger">
        <div class="message-body">Invalid Zip Code. Please Try Again!!!!</div></article>`;
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(data => {
      console.log(data);
      let output = "";

      data.places.forEach(place => {
        output += `
            <article class= "message is-primary">
            <div class = "message-header">
            <p>Location Info</p>
            </div> 
            <div class= "message-body">
            <ul>
            <li><strong>City: </strong>${place["place name"]}</li>
            <li><strong>Latitude: </strong>${place["latitude"]}</li>
            <li><strong>Longitude: </strong>${place["longitude"]}</li>
            <li><strong>State: </strong>${place["state"]}</li>
            <li><strong>State Abbreviation: </strong>${
              place["state abbreviation"]
            }</li>
            </ul>
            </div>
            </article>`;

        document.querySelector("#output").innerHTML = output;
      });
    })
    .catch(err => console.log(err));

  e.preventDefault();
}
