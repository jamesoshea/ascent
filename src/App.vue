<template>
  <div id="container">
    <div id="map" />
    <InfoOverlay
      v-if="showRouteInfo"
      :route="currentRoute"
      @closeOverlay="closeOverlay"
    />
  </div>
</template>

<script>
import polyline from 'polyline';

import routes from '../routesWithPoints.json';

import InfoOverlay from './InfoOverlay';

export default {
  name: "app",
  components: {
    InfoOverlay
  },
  data() {
    return {
      routes,
      map: null,
      showRouteInfo: false,
      currentRoute: null,
    };
  },
  methods: {
    closeOverlay() {
      this.showRouteInfo = false;
      this.currentRoute = null;
    }
  },
  mounted() {
    const zoom = isMobileDevice() ? 9 : 10
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom,
      center: { lat: 48.100056, lng: 7.021334 }
    });
    this.routes.forEach((segment) => {
      const result = polyline.decode(segment.polyline)
      const points = result.map((point) => {
        return { lat: point[0], lng: point[1] }
      })
      const path = new google.maps.Polyline({
        path: points,
        geodesic: true,
        strokeColor: '#5755d9',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      const finishIcon = 'src/assets/finish.png'
      const finish = new google.maps.Marker({
        position: points[points.length -1],
        map: this.map,
        title: 'Finish',
        icon: finishIcon
      })
      google.maps.event.addListener(path, 'mouseover', (e) => {
        this.showRouteInfo = true;
        this.currentRoute = segment;
      });
      google.maps.event.addListener(path, 'touch', (e) => {
        this.showRouteInfo = true;
        this.currentRoute = segment;
      });
    path.setMap(this.map)
    })
  }
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

</script>

<style>
body, html {
  margin: 0;
  height: 100%;
  width: 100%;
}

#container {
  width: 100%;
  height: 100%;
}

#map {
  width: 100%;
  height: 100%;
}
</style>
