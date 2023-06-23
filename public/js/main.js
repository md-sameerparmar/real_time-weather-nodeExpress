const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');

const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');
const dataHide = document.querySelector('.middle_layer')


const getInfo = async (e) => {
    let cityVal = cityName.value;
    e.preventDefault();
    
    if(cityVal === ""){
        city_name.innerHTML = `Please write city name before search.`
        dataHide.classList.add('data_hide');
    } else {
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=1fa092556afb8c644d0fe4921618c3c0`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            city_name.innerHTML = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp.innerHTML = `${arrData[0].main.temp} &deg;C`;

            const WeatherStatus = arrData[0].weather[0].main;

            if (WeatherStatus == "Clear") {
                temp_status.innerHTML =
                  "<i class='fa-solid fa-sun' style='color: #eccc68'></i>";
              } else if (WeatherStatus == "Clouds") {
                temp_status.innerHTML =
                  "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
              } else if (WeatherStatus == "Rainy") {
                temp_status.innerHTML =
                  "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
              } else {
                temp_status.innerHTML =
                  "<i class='fas  fa-sun' style='color:#f1f2f6;'></i>";
              }

              dataHide.classList.remove('data_hide');
        } catch{
            city_name.innerHTML = "<span style='color:red'>Please write the city name properly.</span>"
            dataHide.classList.add('data_hide');
        }
        
    }
}

submitBtn.addEventListener('click', getInfo);