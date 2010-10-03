Yuhodo.util.DirectionsService = Ext.extend(Ext.util.Observable, {

    requestOption: {
        travelMode: google.maps.DirectionsTravelMode.WALKING,
        unitSystem: google.maps.DirectionsUnitSystem.METRIC,
        region: 'jp'
    },

    wayPoints: [],

    constructor: function(cfg) {

        var me = this;

        Ext.apply(me, cfg);

        if (cfg.map) {
            me.directionsRenderer.setMap(cfg.map);
        }
    },

    route: function(option) {

        var me = this;

        option = Ext.applyIf(me.requestOption, {
            origin: me.origin,
            destination: me.destination,
            waypoints: me.wayPoints
        });
        option = Ext.applyIf(me.requestOption, option);
        console.log(option);

        // ルート計算
        me.directionsService.route(option, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                me.directionsRenderer.setDirections(result);
            }
        });
    },

    addWayPoint: function(latlng) {
        var gm = google.maps;
        if (!this.destination) {
            this.destination = latlng;
        }
        this.wayPoints.push({
            location: latlng
        });
    },

    getWayPointSize: function() {
        return this.wayPoints.length;
    },

    setMap: function(map) {

        var me = this;

        this.map = map;

        if (me.DirectionsRenderer) {
            me.DirectionsRenderer.setMap(map);
        }
    },

    setDirectionsService: function(directionsService) {
        this.directionsService = DirectionsService;
    },

    setDirectionsRenderer: function(directionsRenderer) {
        this.directionsRenderer = directionsRenderer;
    },

    setOrigin: function(origin) {
        this.origin = origin;
    },

    setDestination: function(destination) {
        this.destination = destination;
    }
});
