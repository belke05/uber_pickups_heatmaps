// This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">
// import { first_morning } from "./morning.js";
import { first_morning, second_morning } from "./morning.js";
import { first_noon, second_noon } from "./noon.js";
import { first_evening, second_evening } from "./evening.js";
// import { first_morning } from "./morning.js";
// import { first_morning } from "./morning.js";

var map, heatmap;
let currentTime = "morning";
let specificty = "not-specific";

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: 40.7128, lng: -74.006 },
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }]
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }]
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }]
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }]
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }]
      }
    ]
  });

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(first_morning),
    map: map
  });
}

heatmap;

function toggleHeatmapData(e) {
  let check = e.target.id;
  const specific = document.getElementById("toggle").checked;
  console.log(check, specific);
  if (check == "toggle") {
    check = currentTime;
  }
  changeInfo(check, specific);
  if (check === "morning") {
    specific
      ? heatmap.setData(getPoints(second_morning))
      : heatmap.setData(getPoints(first_morning));
  } else if (check === "noon") {
    specific
      ? heatmap.setData(getPoints(second_noon))
      : heatmap.setData(getPoints(first_noon));
  } else if (check === "evening") {
    specific
      ? heatmap.setData(getPoints(second_evening))
      : heatmap.setData(getPoints(first_evening));
  }
  currentTime = check;
}

function changeInfo(time, specific) {
  document.getElementById("time").innerHTML = time;
  specific
    ? (document.getElementById("specific").innerHTML = "specific")
    : (document.getElementById("specific").innerHTML = "not-specific");
}

function getPoints(data) {
  let maps_points = [];
  data.forEach(point => {
    // console.log(point[0]);
    maps_points.push(new google.maps.LatLng(point[0], point[1]));
  });
  // console.log(maps_points, "here");
  return maps_points;
}

initMap();

const panel = document.getElementById("floating-panel");
const morning = document.getElementById("morning");
morning.addEventListener("click", toggleHeatmapData);
const noon = document.getElementById("noon");
noon.addEventListener("click", toggleHeatmapData);
const evening = document.getElementById("evening");
evening.addEventListener("click", toggleHeatmapData);
const toggler = document.getElementById("toggle");
toggler.addEventListener("click", toggleHeatmapData);
