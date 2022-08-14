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

    },
    data(){
        return{
            alternativeRoutes:[],
        }
    },
    afterCreate(directionsRenderer) {

        let directionsService = new window.google.maps.DirectionsService();
        this.$watch(
            () => [this.origin, this.destination, this.travelMode],
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
                            // eslint-disable-next-line no-console
                            // console.log(response)
                            directionsRenderer.setDirections(response);
                            directionsRenderer.setRouteIndex(i);
                            // eslint-disable-next-line no-undef
                            // data.push(response)
                            this.alternativeRoutes = response.routes;
                            // this.$emit('alternativeRoutes',response.routes)
                            // console.log(response.routes[i]);
                            // Tell the DirectionsRenderer which route to display
                            // directionsRenderer.setDirections(response);

                        }

                    }
                );
            }
        );
    },
});