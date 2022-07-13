const url = 'https://ws.smn.gob.ar/map_items/weather';
const weatherStation = 'Las Rosas';

document.addEventListener('DOMContentLoaded', init());

function init() {
  document.body.childen[1].value = '';
  //console.log('anda...');
  fetch(url)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      // aca va lo importante lo que queremos hacer
      //console.log(document.body.children[1].value);
      weatherStation = document.body.children[1].value || weatherStation;
      let filteredData = data.filter(item => item.name == weatherStation)[0];
      // console.log(filteredData,weather);
      let stationName = filteredData.name;
      //let {
      //  humidity,
      //  temp,
      //  description,
      //  wind_speed,
      //  wind_deg
      //  } = filteredData.weather;
      //modificamos el div
      let container = document.getElementById('container');
      container.innerHTML = '';
      let title = document.createElement('h2')
      title.textContent = stationName;
      container.append(title);
      console.log(filteredData.weather);
      delete filteredData.weather.id;
      delete filteredData.weather.st;
      delete filteredData.weather.tempDesc;
      delete filteredData.weather.visibility;
      delete filteredData.weather.pressure;
      for(let key in filteredData.weather) {
        let div = document.createElement('div');
        div.textContent = `${key}: ${filteredData.weather[key]}`;
        container.append(div);
      }
    })
    .catch(err => console.log(err));
}
