window.addEventListener("load", () => {
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      let pilotName = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");

      let numbers = /^[0-9]+$/
      let letters = /^[a-zA-Z]+$/

      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
         alert("All fields are required");
      }
      else if (!isNaN(pilotName.value) || !isNaN(copilotName.value)) {
         alert("Letters only for the names, please")
      }
      else if (!numbers.test(fuelLevel.value) || !numbers.test(cargoMass.value)) {
         alert("Numbers only for the fuel level and cargo mass, please")
      }

      //Status Check Indicators for Launch
      faultyItemsPanel = document.getElementById("faultyItems");
      faultyItemsPanel.innerHTML = `
         <ol>
            <li id="pilotStatus">Pilot Name: ${pilotName.value}</li>
            <li id="copilotStatus">Co-Pilot Name: ${copilotName.value}</li>
            <li id="fuelStatus">Fuel level high enough for launch</li>
            <li id="cargoStatus">Cargo mass low enough for launch</li>
         </ol>
         `
      let launchStatus = document.getElementById("launchStatus");
      if (fuelLevel.value < 10000) {
         let fuelStatus = document.getElementById("fuelStatus");
         fuelStatus.innerHTML = "There is not enough fuel for the journey";
         launchStatus.innerHTML = "Shuttle not ready for launch";
         launchStatus.style.color = "red";
         faultyItemsPanel.style.visibility='visible';
      } else if (cargoMass.value > 20000) {
         let cargoStatus = document.getElementById("cargoStatus");
         cargoStatus.innerHTML = "There is too much mass for the shuttle to take off";
         launchStatus.innerHTML = "Shuttle not ready for launch";
         launchStatus.style.color = "red";
         faultyItemsPanel.style.visibility='visible';
      } else {
         launchStatus.innerHTML = "Shuttle is ready for launch";
         launchStatus.style.color = "green"
      }

      event.preventDefault()

   })

   //Fetch Planetary Data
   const fetchData = async () => {
      try {
         const response = await fetch("https://handlers.education.launchcode.org/static/planets.json")
         const data = await response.json();
         chosenPlanet = data[Math.floor(Math.random()*data.length)] //Bonus Mission
         document.getElementById("missionTarget").innerHTML = 
            `<h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${chosenPlanet.name}</li>
                  <li>Diameter: ${chosenPlanet.diameter}</li>
                  <li>Star: ${chosenPlanet.star}</li>
                  <li>Distance from Earth: ${chosenPlanet.distance}</li>
                  <li>Number of Moons: ${chosenPlanet.moons}</li>
               </ol>
               <img src="${chosenPlanet.image}">`;
      } catch (error) {
         console.error(error);
      }
   }
   fetchData()
})