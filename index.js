const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const apiKey = "e22eb6317cbef951ad4d392d20fb6553"

async function checkWeather(city){
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  
  if(response.status == 404){
    document.querySelector(".error").style.display = "block"
    document.querySelector(".weather").style.display = "none"
  }else{

    var data = await response.json();
    console.log(data)

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°F";
    document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
    document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";
    document.querySelector('.high-low').innerHTML = Math.round(data.main.temp_max) + "°F/" + Math.round(data.main.temp_min) + "°F";
    document.querySelector('.feels-like').innerHTML = Math.round(data.main.feels_like) + "°F";
    const sunrise = new Date((data.sys.sunrise+data.timezone) * 1000);
    const sunset = new Date((data.sys.sunset+data.timezone) * 1000);

    // Hours part from the timestamp
    var sunriseHours = sunrise.getUTCHours();
    const sunriseHoursIn12HrFormat = sunriseHours >= 13 ? sunriseHours %12: sunriseHours
    const sunriseampm = sunriseHours >= 12 ? 'PM' : 'AM'
    var sunsetHours = sunset.getUTCHours();
    const sunsetHoursIn12HrFormat = sunsetHours >= 13 ? sunsetHours %12: sunsetHours
    const sunsetampm = sunsetHours >= 12 ? 'PM' : 'AM'


    // Minutes part from the timestamp
    var sunriseMinutes = "0" + sunrise.getUTCMinutes();
    var sunsetMinutes = "0" + sunset.getUTCMinutes();


    document.querySelector('.sunrise').innerHTML = sunriseHoursIn12HrFormat + ':' + sunriseMinutes.substr(-2) + ' '+ sunriseampm;
    document.querySelector('.sunset').innerHTML = sunsetHoursIn12HrFormat + ':' + sunsetMinutes.substr(-2) + ' ' + sunsetampm;
    

    if(data.weather[0].main == "Clouds"){
      weatherIcon.src = 'images/clouds.png'
    }
    else if(data.weather[0].main == "Clear"){
      weatherIcon.src = 'images/clear.png'
    }
    else if(data.weather[0].main == "Rain"){
      weatherIcon.src = 'images/rain.png'
    }
    else if(data.weather[0].main == "Drizzle"){
      weatherIcon.src = 'images/drizzle.png'
    }
    else if(data.weather[0].main == "Mist"){
      weatherIcon.src = 'images/mist.png'
    }

    document.querySelector(".weather").style.display = "block"
    document.querySelector(".error").style.display = "none"

  }

}

searchBtn.addEventListener('click', ()=>{
  checkWeather(searchBox.value)
})