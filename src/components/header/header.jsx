import React, { useState, useEffect } from 'react'
import './headerStyles.scss'
import {Spinner, Table } from 'reactstrap';

function loadScript(url) {
    var index = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}

export default () => {
    const [longitude, setLongitude] = useState((<Spinner size="sm" color="secondary" />))
    const [latitude, setLatitude] = useState((<Spinner size="sm" color="secondary" />))
    const [astros, setAstros] = useState([])
    const [mapLoaded, setMapLoaded] = useState()
    const [curDate, setCurDate] = useState((new Date())
        .toUTCString()
        .split(' ')
        .splice(1,4)
        .join(' '))

    useEffect(() => {
        async function getData() {
            let getPosition = await fetch(`http://api.open-notify.org/iss-now.json`)
            let positionToStr = await getPosition.json();
            let position = await positionToStr['iss_position']
            setLongitude(Number(position['longitude']))
            setLatitude(Number(position['latitude']))

            let getAstros = await fetch(`http://api.open-notify.org/astros.json`)
            let astrosToStr = await getAstros.json();
            setAstros(astrosToStr['people'].filter(el => el.craft === 'ISS'))
        }
        setTimeout(() => setMapLoaded(!mapLoaded), 5000)

        getData()
    }, [mapLoaded])

    useEffect(() => {
        setTimeout(() =>
            setCurDate((new Date())
                .toUTCString()
                .split(' ')
                .splice(1,4)
                .join(' '))
            , 5000)
    }, [curDate])

    if ((longitude && latitude) && (mapLoaded === undefined)) renderMap()

    function initMap() {
        var myLatLng = {lat: latitude, lng: longitude};

        const map = new window.google.maps
            .Map(document.getElementById('map'), {
                zoom: 2,
                center: myLatLng
        });

        var marker = new window.google.maps
            .Marker({
                position: myLatLng,
                map: map,
                title: 'Here we are!'
         });
    }

    function renderMap() {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyD1DrDBUd6GNL2EIBCxK-K0OjkTny8kbuA&callback=initMap");
        window.initMap = initMap
    }

    // HEADER BUTTONS
    return (
        <div >
            <header>
                <div>
                    <h3>ISS current coords:</h3>
                    <p>longitude: {longitude} | latitude: {latitude}</p>
                </div>
                <div>
                    <i className="far fa-clock fa-lg"></i>
                    <span> UTC: {curDate}</span>
                </div>
            </header>
            <main>
                <div id="map"></div>
                <Table id={"table"}>
                    <thead>
                        <tr>
                            <th>{astros.length + ' heroes on station now:'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {astros.map((el, index) => (
                            <tr key={el.name + index}>
                                <td>{el.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </main>
        </div>
    )
}
