var dayName = document.getElementById("dayName");
var dayNumber = document.getElementById("dayNumber");
var todayMonthOfCity = document.getElementById("todayMonthOfCity");
var todayLocation = document.getElementById("todayLocation");
var todayTemp = document.getElementById("todayTemp");
var todayConditionImg = document.getElementById("todayConditionImg");
var todayText = document.getElementById("todayText");
var todayHumidity = document.getElementById("todayHumidity");
var todayWind = document.getElementById("todayWind");
var todayWindDirection = document.getElementById("todayWindDirection");
var nextDayName = document.getElementById("nextDayName");
var nextConditionImg = document.getElementById("nextConditionImg");
var nextMaxTemp = document.getElementById("nextMaxTemp");
var nextMinTemp = document.getElementById("nextMinTemp");
var nextConditionText = document.getElementById("nextConditionText");
var afterNextDayName = document.getElementById("afterNextDayName");
var afterNextConditionImg = document.getElementById("afterNextConditionImg");
var afterNextMaxTemp = document.getElementById("afterNextMaxTemp");
var afterNextMinTemp = document.getElementById("afterNextMinTemp");
var afterNextConditionText = document.getElementById("afterNextConditionText");
var searchLocationInput = document.getElementById("searchLocationInput");

navigator.geolocation.getCurrentPosition((position) => {
  console.log(position.coords);
  var myLatitude = position.coords.latitude;
  var myLongitude = position.coords.longitude;
  getWeatherData(`${myLatitude},${myLongitude}`);
});

searchLocationInput.addEventListener('input' , (e)=>{
    var currentValue = e.target.value; 
    console.log(currentValue)
    getWeatherData(currentValue)
})

async function getWeatherData(query) {
  var res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=60453bed0cf24646950224112242009`
    
  );

  var data = await res.json();
  console.log(data);
  displayWeatherData(data);
  displayTommorrowData(data);
  displayAfterTommorrowData(data)
}

function displayWeatherData(data) {
  var todayDate = data.current.last_updated; 
  console.log(todayDate);
  var myDateName = new Date(todayDate);
  console.log(myDateName, "Date");
  var todayName = myDateName.toLocaleString("en-us", { weekday: "long" }); 
  dayName.innerHTML = todayName;
  var todayMonth = myDateName.toLocaleString("en-us", { month: "long" }); 
  var todayDay = myDateName.getDate();
  dayNumber.innerHTML = todayDay;
  todayMonthOfCity.innerHTML = todayMonth;
  todayLocation.innerHTML = data.location.country;
  todayTemp.innerHTML = data.current.temp_c;
  todayText.innerHTML = data.current.condition.text;
  var currentImg = data.current.condition.icon;
  var currentSrc = `https:${currentImg}`;
  todayConditionImg.setAttribute("src", currentSrc);

  todayHumidity.innerHTML = data.current.humidity;
  todayWind.innerHTML = data.current.wind_kph;
  todayWindDirection.innerHTML = data.current.wind_dir;
}

function displayTommorrowData(data) {
  var tommorrowDate = data.forecast.forecastday[1];
  console.log(tommorrowDate);
  var myTommorrowDate = new Date(tommorrowDate.date);
  var myTommorrowDateName = myTommorrowDate.toLocaleString("en-us", {
    weekday: "long",
  });

  nextDayName.innerHTML = myTommorrowDateName;
  var tommorrowImg = tommorrowDate.day.condition.icon;
  var tommorrowSrc = `https:${tommorrowImg}`
  nextConditionImg.setAttribute('src' , tommorrowSrc);
  nextMaxTemp.innerHTML = tommorrowDate.day.maxtemp_c;
  nextMinTemp.innerHTML = tommorrowDate.day.mintemp_c
  nextConditionText.innerHTML = tommorrowDate.day.condition.text;
}


function displayAfterTommorrowData(data) {
    var afterTommorrowDate = data.forecast.forecastday[2];
    console.log(afterTommorrowDate);
    var myAfterTommorrowDate = new Date(afterTommorrowDate.date);
    var myAfterTommorrowDateName = myAfterTommorrowDate.toLocaleString("en-us", {
      weekday: "long",
    });
    afterNextDayName.innerHTML = myAfterTommorrowDateName;
    var myAfterTommorrowImg = afterTommorrowDate.day.condition.icon;
    var myAfterTommorrowSrc = `https:${myAfterTommorrowImg}`

    afterNextConditionImg.setAttribute('src' , myAfterTommorrowSrc);
    afterNextMaxTemp.innerHTML = afterTommorrowDate.day.maxtemp_c;
    afterNextMinTemp.innerHTML = afterTommorrowDate.day.mintemp_c
    afterNextConditionText.innerHTML = afterTommorrowDate.day.condition.text;
}


















