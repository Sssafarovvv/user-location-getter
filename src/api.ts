const API_KEY = "bf114a61337c41c8aa7562fc108d3348";
//apikey испарится через день. Получить новый => api.opencagedata.com

export function getLocationInfo(latitude: any, longitude: any) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${API_KEY}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status.code === 200) {
        return data.results;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

export var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
