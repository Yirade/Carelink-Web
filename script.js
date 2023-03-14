firstName = ""; // USER VARIABLES
lastSG = null; // GLUCOSE VARIABLES
LSG = null;
sensorState = "ERROR"; // STATE VARIABLES
sensorDurationHours = 0; // SENSOR VARIABLES
SDH = 0;
medicalDeviceBatteryLevelPercent = 0; // BATTERY VARIABLES
timeToNextCalibHours = 0; // CLAIBRATION VARIABLES
lastSGTrend = "ERROR"; // TREND VARIABLES
values = []; // CHART VARIABLES
function showTime() {
    // VARIABLES
    
    // SENSOR DURATION
    if (sensorDurationHours > 23) {
        SDH = sensorDurationHours / 24;
        SDH = Math.round(SDH);
        document.getElementById('duration').innerText = " " + SDH + " days";
        document.getElementById('duration').className = "badge bg-success text-dark bi bi-calendar-heart-fill";
    } else {
        SDH = sensorDurationHours;
        document.getElementById('duration').innerText = " " + SDH + " hours";
        if (SDH > 7) {
            document.getElementById('duration').className = "badge bg-warning text-dark bi bi-calendar-heart-fill";
        } else if (SDH > 0) {
            document.getElementById('duration').className = "badge bg-warning text-dark bi bi-calendar-heart-fill";
        } else if (SDH == 0) {
            document.getElementById('duration').className = "badge bg-danger text-dark bi-calendar-heart-fill";
            document.getElementById('info').className = "alert alert-danger bi bi-exclamation-triangle-fill";
            document.getElementById('info').innerText = " Change sensor!";
        }
    }
    // BATERY
    if (medicalDeviceBatteryLevelPercent > 50) {
        document.getElementById('battery').className = "badge bg-success text-dark bi bi-battery-full";
    } else if (medicalDeviceBatteryLevelPercent > 25) {
        document.getElementById('battery').className = "badge bg-warning text-dark bi bi-battery-half";
    } else if (medicalDeviceBatteryLevelPercent <= 25) {
        document.getElementById('battery').className = "badge bg-danger text-dark bi bi-battery";
        document.getElementById('info').className = "alert alert-danger bi bi-exclamation-triangle-fill";
        document.getElementById('info').innerText = " Charge battery!";
    } else {
        document.getElementById('battery').className = "badge bg-danger text-dark bi bi-battery-full";
        document.getElementById('info').innerText = " Sensor disconected!";
    }
    // CALIBRATION
    if (timeToNextCalibHours >= 6) {
        document.getElementById('claibration').className = "badge bg-success text-dark bi bi-droplet-fill";
    } else if (timeToNextCalibHours >= 3) {
        document.getElementById('claibration').className = "badge bg-warning text-dark bi bi-droplet-fill";
    } else if (timeToNextCalibHours < 3) {
        document.getElementById('claibration').className = "badge bg-danger text-dark bi bi-droplet-fill";
    } else if (timeToNextCalibHours == 0) {
        document.getElementById('claibration').className = "badge bg-danger text-dark bi bi-droplet-fill";
        document.getElementById('info').className = "alert alert-danger bi bi-exclamation-triangle-fill";
        document.getElementById('info').innerText = " Calibration needed!";
    } else {
        document.getElementById('claibration').className = "badge bg-danger text-dark bi bi-droplet-fill";
    }
    // SENSOR STATE
    if (lastSG == 0 || medicalDeviceBatteryLevelPercent == -1) {
        document.getElementById('info').className = "alert alert-danger bi bi-exclamation-triangle-fill";
        document.getElementById('info').innerText = " Sensor disconected!";
    } else if (sensorDurationHours !=0 && medicalDeviceBatteryLevelPercent != 0 && timeToNextCalibHours != 0) {
        document.getElementById('info').className = "alert alert-info bi bi-info-circle-fill";
        document.getElementById('info').innerText = " Sensor is ok 👍";
    }
    // TREND
    // UP
    if (lastSGTrend == "UP") {
        document.getElementById('trend').className = "bi bi-arrow-up-short";
        document.getElementById('trend2').className = "";
        document.getElementById('trend3').className = "";
    } else if (lastSGTrend == "UP_DOUBLE") {
        document.getElementById('trend').className = "bi bi-arrow-up-short";
        document.getElementById('trend2').className = "bi bi-arrow-up-short";
        document.getElementById('trend3').className = "";
    } else if (lastSGTrend == "UP_TRIPLE") {
        document.getElementById('trend').className = "bi bi-arrow-up-short";
        document.getElementById('trend2').className = "bi bi-arrow-up-short";
        document.getElementById('trend3').className = "bi bi-arrow-up-short";
    }
    // DOWN
    else if (lastSGTrend == "DOWN") {
        document.getElementById('trend').className = "bi bi-arrow-down-short";
        document.getElementById('trend2').className = "";
        document.getElementById('trend3').className = "";
    } else if (lastSGTrend == "DOWN_DOUBLE") {
        document.getElementById('trend').className = "bi bi-arrow-down-short";
        document.getElementById('trend2').className = "bi bi-arrow-down-short";
        document.getElementById('trend3').className = "";
    } else if (lastSGTrend == "DOWN_TRIPLE") {
        document.getElementById('trend').className = "bi bi-arrow-down-short";
        document.getElementById('trend2').className = "bi bi-arrow-down-short";
        document.getElementById('trend3').className = "bi bi-arrow-down-short";
    }
    // NONE
    else if (lastSGTrend == "NONE") {
        document.getElementById('trend').className = "bi bi-arrow-right-short";
        document.getElementById('trend2').className = "";
        document.getElementById('trend3').className = "";
    } else if (lastSG == "0") {
        document.getElementById('trend').className = "bi bi-x";
        document.getElementById('trend2').className = "";
        document.getElementById('trend3').className = "";
    }
    // ERROR
    else {
        document.getElementById('trend').className = "bi bi-x";
        document.getElementById('trend2').className = "";
        document.getElementById('trend3').className = "";
    }
    // TIME
    const d = new Date();
    let hour = d.getHours();
    let minute = d.getMinutes();
    // GRAPH TIME
    const currentTime = new Date();
    const startTime = new Date(currentTime.getTime() - 3 * 60 * 60 * 1000);
    const timeValues = [];


    for (let time = currentTime; time >= startTime; time.setMinutes(time.getMinutes() - 5)) {
        timeValues.unshift(time.getHours() + ':' + time.getMinutes());
    }
    // INFO TEXT
    document.getElementById('time').innerText = d.getHours().toString().padStart(2, '0') + " : " + d.getMinutes().toString().padStart(2, '0');
    document.getElementById('Name').innerText = "Hey " + firstName + "!";
    document.getElementById('battery').innerText = " " + medicalDeviceBatteryLevelPercent + "%";
    document.getElementById('claibration').innerText = " " + timeToNextCalibHours + " hours";
    
    document.getElementById('status').innerText = sensorState;
    //INFO VALUE
    if (lastSG != 0) {
        document.getElementById('lastSG').innerText = lastSG;
    } else if (lastSG == 0) {
        document.getElementById('lastSG').innerText = LSG;
        document.getElementById('lastSG').style.cssText = "font-size:150px; font-family: Arial; color:Gray;";
    }
    //INFO COLOR
    if (lastSG != 0) {
        if (lastSG <= 80) {
            document.getElementById('lastSG').style.cssText = "font-size:150px; font-family: Arial; color:Crimson;";
            document.getElementById('info').className = "alert alert-danger bi bi-exclamation-triangle-fill";
            document.getElementById('info').innerText = " Low Value!";
        }
        else if (lastSG >= 250) {
            document.getElementById('lastSG').style.cssText = "font-size:150px; font-family: Arial; color:Crimson;";
            document.getElementById('info').className = "alert alert-danger bi bi-exclamation-triangle-fill";
            document.getElementById('info').innerText = " High Value!";
        }
        else {
        document.getElementById('lastSG').style.cssText = "font-size:150px; font-family: Arial;";
    }
    // GRAPH SETTINGS
    // GRAPH SETTINGS
    new Chart("myChart", {
        type: "line",
        data: {
            labels: timeValues,
            datasets: [{
                data: values,
                backgroundColor: "rgba(225,225,255,1.0)",
                borderColor: "rgba(225,225,255,0.4)",
                fill: false
            }, ]
        },
        options: {
            legend: {
                display: false
            },
            animation: false,
            scales: {
                display: false,
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 400
                    }
                }],
            }
        }
    });
}
}
showTime();
// REFRESH
async function readJSONFile() {
    fetch("/data.json")
        .then(response => response.json())
        .then(data => {
            console.clear();
            console.log(data);
            // Set the data
            firstName = data.name;
            lastSG = data.sg;
            lastSGTrend = data.trend;
            medicalDeviceBatteryLevelPercent = data.battery;
            timeToNextCalibHours = data.calibration;
            sensorDurationHours = data.sensorlife;
            sensorState = data.state;
            values = data.values;
            LSG = data.last;
        })
        .catch(error => console.error(error));

}

readJSONFile();
setInterval(readJSONFile, 1000);
setInterval(showTime, 1000);
setInterval(function() {
    location.reload();
  }, 30 * 60 * 1000)