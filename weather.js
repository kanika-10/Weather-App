console.log("Weather App");
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//make object
const weatherApi = {
    key:"ce8028038a491cc6862274f41e8aa3c0",
    URL:"https://api.openweathermap.org/data/2.5/weather"
}

const searchbox = document.getElementById("inputcity");

searchbox.addEventListener("keypress", (e)=>{       //in place of e we can write anyword
    if(e.keyCode == "13")
    {
    console.log(searchbox.value);
    getWeatherReport(searchbox.value);
    
    }
})

//SENDING REQUEST TO API         //&units=metric so that K can be converted to celcius
function getWeatherReport(city){
    fetch(`${weatherApi.URL}?q=${city}&appid=${weatherApi.key}&units=metric`).then(weather =>{    
        if(!weather.ok) 
            throw new Error('A Problem occured');

        return weather.json();
    }).then(showWeatherReport).catch(error => {
        showalert();
    });

   
    

}

//RECEIVING THE WEATHER REPORT

function showWeatherReport(weather){
    console.log(weather);
    document.querySelector(".weather-body").style.display = "block";
    document.querySelector(".inputcity").value = " ";

    let citycountry = document.getElementById("city-country");
    citycountry.innerText= `${weather.name}, ${weather.sys.country}`;

    let dateday = document.getElementById("date-day");
    let todaysDate = new Date();         //it will contain everything date day time etc but we need only date and day so we will call function to grab those
    dateday.innerText = dateManager(todaysDate);

    let temp = document.getElementById("temp");
    temp.innerHTML= `${Math.round(weather.main.temp)}&deg;C`;   //innerText will not work here


    let minmax = document.getElementById("min-max");
    minmax.innerHTML= `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;
    
    let status = document.getElementById("status");
    status.innerHTML = `${weather.weather[0].main}`;

    //CHANGING BACKGROUND DYNAMICALLY
    
    if(status.textContent == "Clear"){
        document.body.style.backgroundImage = "url('Images/clearsky.jpg')";
    }
    else if(status.textContent == "Sunny" ){
        document.body.style.backgroundImage = "url('Images/warm.jpg')";
    }
    else if( status.textContent == "Dust"){
        document.body.style.backgroundImage = "url('Images/dust.jpg')";
    }
    else if(status.textContent == "Drizzle"){
        document.body.style.backgroundImage = "url('Images/showerrains.jpg')";
    }
    else if(status.textContent == "Snow"){
        document.body.style.backgroundImage = "url('Images/snow.jpg')";
    }
    else if(status.textContent == "Storms"){
        document.body.style.backgroundImage = "url('Images/thunderstorm.jpg')";
    }
    else if(status.textContent == "Fog"){
        document.body.style.backgroundImage= "url('Images/fog.jpg')";
    }
    else if(status.textContent == "Rain"){
        document.body.style.backgroundImage = "url('Images/rains.jpg')";
    }
    else if(status.textContent == "Clouds"){
        document.body.style.backgroundImage = "url('Images/brokenclouds.jpg')";  
    }
    else if(status.textContent == "Haze"){
        document.body.style.backgroundImage = "url('Images/haze.jpg')";
    }
    else if(status.textContent == "Mist"){
        document.body.style.backgroundImage = "url('Images/mist.jpg')";
    }

    
  

}

function dateManager(todaysDate){
    

    let days = ["Sunday" , "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["Jan" , "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sept", "Oct","Nov","Dec"];

    let date = todaysDate.getDate();
    let month = months[todaysDate.getMonth()];
    let year = todaysDate.getFullYear();
    let day = days[todaysDate.getDay()];

    return  `${date} ${month}, ${year} (${day})`;

}

function showalert(){
    document.querySelector(".weather-body").style.display = "none";
    document.body.style.backgroundImage = "url('Images/back0.jpg')";
    setTimeout(() => {
        alert('City Not Found')
    },1);
}