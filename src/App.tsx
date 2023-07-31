import { useEffect, useState } from "react";
import { getLocationInfo, options } from "./api";
import "./App.css";

function App() {
  const [location, setLocation] = useState<any>("");
  const [cords, setCords] = useState<{ latitude: string; longitude: string }>({
    latitude: "",
    longitude: "",
  });

  function success(pos: any) {
    var crd = pos.coords;
    setCords({ latitude: crd.latitude, longitude: crd.longitude });
    getLocationInfo(crd.latitude, crd.longitude).then((formattedLocation) => {
      if (formattedLocation) {
        setLocation(formattedLocation);
      } else {
        setLocation("Локация не определена");
      }
    });
  }

  function errors(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
          }
        });
    } else {
      console.log("Геолокация не поддерживается.");
    }
  }, []);

  return (
    <div className="App">
      {location ? (
        <>
          <p>
            Ваши координаты:{" "}
            {cords
              ? `Ширина: ${cords.latitude}, Долгота: ${cords.longitude}`
              : "Координаты определяются"}
            ,
          </p>
          <p>
            {location ? (
              <>
                Ваша геопозиция: {location[0].components.country},{" "}
                {location[0].components.state}, {location[0].annotations.flag}
              </>
            ) : (
              "Геопозиция определяется"
            )}
          </p>
        </>
      ) : (
        <p>Локация определеяется...</p>
      )}
      {/* // location работает если пользователь разрешил показывать геолокацию приложениям как в браузере, так и на своём устройстве */}
    </div>
  );
}

export default App;
