import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Climate = () => {

    //Estado para modificar API

    const [weather, setWeather] = useState({});

    //Estado para modificar Temperatura

    const [isKelvin, setIsKelvin] = useState(true);

    //Estado para Ejecutar una sola ves

    useEffect(() => {

        const success = pos => {

            const lat = pos.coords.latitude
            const lon = pos.coords.longitude
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=427e8df36fbc647de7efab15c8519c8b`)
                .then(res => setWeather(res.data))
        }

        navigator.geolocation.getCurrentPosition(success);

    }, [])

    //Flag 

    const flagIcon = `https://countryflagsapi.com/svg/${weather.sys?.country}`

    //Climate Icon

    const iconClimate = `http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`;

    //Fahrenheit to Celsius

    const celsius = Math.ceil(weather.main?.temp - 273.15)
    const fahrenheit = Math.ceil(((weather.main?.temp - 273.15) * 1.8) + 32)

    //Funcion para el Boton

    const changeTemp = () => {
        setIsKelvin(!isKelvin)
    }

    // console.log(weather);

    return (
        <div>
            <div className="container-climate">
                <h2>App Temperature</h2>
                <div className="country-city">
                    <p className="p-cc1"><a>Country : </a>{weather.sys?.country}<img className="flag" src={flagIcon} /></p>
                    <p className="p-cc2"><a>City : </a>{weather.name}</p>
                </div>
                <div className="celsius-fahrenheit">
                    <a className="num-temp">{isKelvin ? celsius : fahrenheit}</a>
                    <p className="symbol-temp">{isKelvin ? "°C" : "°F"}</p>
                </div>
                <div className="icon-climate">
                    <img className="icon-climate-1" src={iconClimate} />
                </div>
                <div className="button-one">
                    <button className="btn-changetemp" onClick={changeTemp}>{isKelvin ? "Change to Fahrenheit" : "Change to Celsius"}</button>
                </div>
            </div>
        </div>
    );
};

export default Climate;