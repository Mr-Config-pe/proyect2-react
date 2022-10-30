import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Climate = () => {

    //Estado para modificar API

    const [weather, setWeather] = useState({});
    const [isKelvin, setIsKelvin] = useState(true);
    
    
    //Estado para Ejecutar una sola ves
    
    useEffect(()=>{
        
        const success = pos => {
            
            const lat = pos.coords.latitude
            const lon = pos.coords.longitude
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=427e8df36fbc647de7efab15c8519c8b`)
            .then(res => setWeather(res.data))
        }
        
        navigator.geolocation.getCurrentPosition(success);
        
    }, [])
    
    //Cambio de Kelvin a Celsius
 

    const changeTemp = () => {
        setIsKelvin(!isKelvin)
    }

    console.log(weather);

    return (
        <div>
            <h1>App Temperature</h1>
            {weather.name} {" "} {weather.sys?.country}
            <h3>Clima PNG</h3>
            <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}></img>
            <h3>Flag Country</h3>
            <img src={`https://countryflagsapi.com/png/${weather.sys?.country}`}></img>
            <h3>Temperature Kelvin/Celcius</h3>
            <a>{isKelvin ? "Celsius" : "Kelvin"}</a>{isKelvin ? weather.main?.temp -273.15 : weather.main?.temp}
            <button onClick={changeTemp}>{isKelvin ? "Cambiar a Kelvin" : "Cambiar a Celsius"}</button>
        </div>
    );
};

export default Climate;