import { MapElementFactory } from "vue2-google-maps";
export default MapElementFactory({
    name: "directionsRenderer",
    ctr() {
        return window.google.maps.DirectionsRenderer;
    },
    events: [],
    mappedProps: {},
    props: {
        origin: { type: [Object, Array] },
        destination: { type: [Object, Array] },
        travelMode: { type: String },
        alternativeRoute: { type: String },

    },
    data(){
        return{
            alternativeRoutes:[],
        }
    },
    afterCreate(directionsRenderer) {
        let directionsService = new window.google.maps.DirectionsService();
        this.$watch(
            () => [this.origin, this.destination, this.travelMode,this.alternativeRoute],
            () => {
                // console.log(this.travelMode)
                let { origin, destination, travelMode } = this;
                if (!origin || !destination || !travelMode) return;
                directionsService.route(
                    {
                        origin,
                        destination,
                        travelMode,
                        provideRouteAlternatives: true
                    },
                    (response, status) => {
                        if (status !== 'OK') return; // something went wrong
                        // console.log(response.routes[0]);
                        for (var i = 0, len = response.routes.length; i < len; i++) {
                            // console.log(response)
                            // console.log(this.alternativeRoute )
                            if(response.routes[i].legs[0].distance.text === this.alternativeRoute){
                                this.$emit('routeDuration',response.routes[i].legs[0].duration.text)
                                directionsRenderer.setRouteIndex(i).clear();
                                directionsRenderer.setDirections(response.routes[i]);
                            }
                            else{
                                directionsRenderer.setDirections(response);
                                directionsRenderer.setRouteIndex(i);
                            }


                        }
                        // console.log(response.routes)
                        this.$emit('alternativeRoutes',response.routes)





                    }
                );
            }
        );
    },
});