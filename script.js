


require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/ImageryLayer",
  "esri/layers/support/RasterFunction"
], (Map, MapView, ImageryLayer, RasterFunction) => {
  
  //Popup 

const imagePopupTemplate = {
  title: "NDVI Colorized",
  content: `
    NDVI data from Landsat 8 OLI imagery.
    <ul>
        <li>Near-Infrared (NIR) Band: <b>5</b></li>
        <li>Red Band: <b>4</b></li>`
};

  //Create image layer with server defined raster funtion template

  const serviceRFT = new RasterFunction({
    functionName: "NDVI Colorized",
    variableName: "Raster"
  });

  const layer = new ImageryLayer({
    url: "https://landsat2.arcgis.com/arcgis/rest/services/Landsat8_Views/ImageServer",
    rasterFunction: serviceRFT,
    popupTemplate: imagePopupTemplate
  });

// Add image layer to the map

  const map = new Map({
    basemap: "hybrid",
    layers: [layer]
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: {
      // Ames, Iowa coordinates
      x: -93.6250,
      y: 42.0308,
      spatialReference: 4326 // WGS 84
    },
    zoom: 7, // Adjusted zoom level to show the Mid-west
    popup: {
      actions: []
    }
  });
});
