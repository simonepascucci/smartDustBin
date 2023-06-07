
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
    distance = data["distance"]
    state = data["status"]
    ts = data["timestamp"]
    
    var date = ""
    for (i = 0; i < 10; i++)
        date += ts[i]
    
    var time = ""
    for (i = 11; i < ts.length; i++)
        time += ts[i]
    
    document.getElementById("lastOpening").innerHTML = date + "<br>" + time

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

    document.getElementById("distance").innerText = distance + " mm"
  }

  function init(){
    callAPI();
  }