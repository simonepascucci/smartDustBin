
var distance;
var status;
var ts;


function callAPI() {
    var myHeaders = new Headers();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
  
    var latestData;
  
    fetch(
      "https://wtsxhv5xf5.execute-api.eu-west-3.amazonaws.com/dev",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => storeData(JSON.parse(result)));
  }

  function storeData(data){
    distance = data[0]["distance"]
    state = data[0]["status"]
    ts = data[1]["timestamp"]
    
    var date = ""
    for (i = 0; i < 10; i++)
        date += ts[i]
    
    var time = ""
    for (i = 11; i < ts.length; i++)
        time += ts[i]
    
    document.getElementById("lastOpening").innerHTML = date + "<br><span class='text-warning'> At: </span>" + time

    if (state == "CLOSED"){
        document.getElementById("statusCard").classList.remove("bg-success");
        document.getElementById("statusCard").classList.add("bg-warning");
        document.getElementById("status").innerText = state;
    }
    else if (state == "OPEN"){
        document.getElementById("statusCard").classList.remove("bg-warning");
        document.getElementById("statusCard").classList.add("bg-success");
        document.getElementById("status").innerText = state;
    }
    else{
        document.getElementById("statusCard").classList.remove("bg-warning");
        document.getElementById("statusCard").classList.remove("bg-success");
        document.getElementById("statusCard").classList.add("bg-danger");
        document.getElementById("status").innerText = "Connection error!";
    }

    document.getElementById("distance").innerText = distance.toPrecision(3) / 10 + " cm"

    var lastDay = "";
    lastDay += date[0]
    lastDay += date[1]

    var openingsNumberD = 0

    for (i = 0; i < data.length; i++){
      var tday = "";
      tday = data[i]["timestamp"][0] + data[i]["timestamp"][1]
      if(tday == lastDay){
        openingsNumberD++
      }
    }

    var lastHour = "";
    lastHour += time[0]
    lastHour += time[1]

    var openingsNumberH = 0

    for (i = 0; i < data.length; i++){
      var thour = "";
      thour = data[i]["timestamp"][11] + data[i]["timestamp"][12]
      if(thour == lastHour){
        openingsNumberH++
      }
    }

    var openingDistances = [];
    var s = 0;
    for(i = 0; i < data.length; i++){
      if(data[i]["status"] == "OPEN" && data[i]["distance"] != -2){
        openingDistances.push(data[i]["distance"])
        s += data[i]["distance"]
      }
    }
    var meanDistance = s / openingDistances.length

    document.getElementById("LD").innerText = openingsNumberD
    document.getElementById("LH").innerText = openingsNumberH
    document.getElementById("MD").innerText = meanDistance.toPrecision(3) / 10 + " cm"
  }

  function init(){
    callAPI();
  }