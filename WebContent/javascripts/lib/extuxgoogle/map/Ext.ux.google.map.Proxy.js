Ext.ux.google.map.Proxy = Ext.extend(Ext.data.DataProxy, function() {

    var initMapApi = function() {
        Ext.ux.google.map.Proxy.prototype._G = {
            geocoder: google.maps.Geocoder
        };
    };

    return {

        // private
        constructor: function() {
            Ext.ux.google.map.Proxy.superclass.constructor.call(this, arguments);
            this.initMapApi();
        },

        // private
        request: function(action, rs, params, reader, callback, scope, options) {
            params = params || {};
            if (this.fireEvent("beforeload", this, params) !== false) {
                this.doRequest.apply(this, arguments);
            } else {
                callback.call(scope || this, null, options, false);
            }
        },

        // private
        doRequest: function(action, rs, params, reader, callback, scope, arg) {
            var prot = Ext.ux.google.map.View.prototype,
                G = prot._G,
                geocoder = new G.geocoder(),
                me = this;

            geocoder.geocode({'address': params.query, region: 'jp'}, function(results, status) {
                var data = [];
                if (status == google.maps.GeocoderStatus.OK || status == google.maps.GeocoderStatus.ZERO_RESULTS) {
                    if (!params.query.match(/[\s　]/)) {
                        Ext.each(results, function(item, num) {
                           data.push({
                               id: Ext.id({}, 'address-'),
                               address: item.formatted_address.replace('日本, ', ''),
                               lat: item.geometry.location.lat(),
                               lng: item.geometry.location.lng()
                           });
                        });
                    }
                    var response = {
                        total: data.length,
                        data: data
                    };
                    try {
                       var result = reader.readRecords(response);
                       me.fireEvent('load', me, arg);
                    } catch (e) {
                      me.fireEvent('loadexception', me, arg, e);
                      callback.call(scope || me, null, arg, false);
                    }
                } else if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                    me.fireEvent('loadexception', me, arg);
                    callback.call(scope || me, null, arg, false);
                }

                callback.call(scope || me, result, arg, true);
            });
        },

        // private
        initMapApi: function (opt) {
            opt = opt || {};

            try {
                Ext.ux.google.Loader.init({
                    api: 'maps',
                    ver: '3',
                    callback: initMapApi,
                    scope: this,
                    option: {
                       other_params: 'sensor=false' 
                    },
                    args: [opt]
                });
            } catch (e) {
                if (e.name === 'ApiLoading') {
                    return;
                } else {
                    throw e;
                }
            }
        }
    };
}());
