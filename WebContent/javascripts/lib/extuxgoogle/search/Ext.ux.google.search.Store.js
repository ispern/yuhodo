/*
 * Ext.ux.google.search.Store
 *
 * Project Home: http://code.google.com/p/extuxgoogle/ 
 * API Documentation: http://extuxgoogle.googlecode.com/svn/trunk/docs/index.html 
 *
 * copyright   Copyright 2009 Yuki Naotori
 * license     GNU General Public License version 3
 *
 * The content of this file is an implementation of Ext JS version 2.
 * Thus this is subject to the Open Source License of Ext JS
 * http://extjs.com/license, and is licensed under GNU General Public
 * License version 3 http://www.gnu.org/copyleft/gpl.html
 */

Ext.namespace('Ext.ux');
Ext.namespace('Ext.ux.google');
Ext.namespace('Ext.ux.google.search');

/**
 * @class Ext.ux.google.search.Store
 * @extends Ext.data.Store
 * <p>Small helper class to make creating Store for retrieving search data from Google AJAX Search API. Ext.ux.google.search.Store
 * is pre-configured with {@link Ext.ux.google.search.Proxy}.</p>
 * <p>Since {@link Ext.ux.google.search.Proxy} class utilizes (but not necessarily needs){@link Ext.ux.google.Loader}
 * to create a script tag to dynamically include and load Google Search API, make sure to check {@link #isReady isReady()} method
 * before start interacting with store/proxy</p>
 * @author Yuki Naotori
 * @version 0.1
 */

/**
 * Create a new Ext.ux.google.search.Store
 * @method Store
 * @param {Object} config Config options
 */
Ext.ux.google.search.Store = function(c){
    try{
      var proxy = null;
      if(c.proxy && typeof c.proxy == 'object'){
        if(c.proxy instanceof Ext.ux.google.search.Proxy){
          proxy = c.proxy;  
        }else{
          proxy = new Ext.ux.google.search.Proxy(c.proxy);
        }
      }else{
        proxy = new Ext.ux.google.search.Proxy();
      }

      var reader = null;
      if(c.reader && typeof c.reader == 'object'){
        if(c.reader instanceof Ext.ux.google.search.Reader){
          reader = c.reader;  
        }else if(c.reader.recordTypes){
          reader = new Ext.ux.google.search.Reader(c.reader);
        }else{
          reader = new Ext.ux.google.search.Reader({ recordTypes: c.reader});
        }
      }else{
        reader = new Ext.ux.google.search.Reader();
      }

      Ext.ux.google.search.Store.superclass.constructor.call(this, Ext.apply(c, {
        proxy:  proxy,
        reader: reader
      }));

      this.relayEvents(this.proxy, [
        /**
         * @event searchapiinitialized Fires when Google Search API is loaded and ready to use
         * @param {Ext.ux.google.search.Proxy} this
         */
        'searchapiinitialized',

        /**
         * @event searcheradded Fires when new searcher is added
         * @param {string} name added searcher
         */
        'searcheradded',

        /**
         * @event searcherremoved Fires when a searcher is removed
         * @param {string} name removed searcher
         */
        'searcherremoved',

        /**
         * @event searcherchanged Fires when active searcher changed
         * @param {string} name active searcher
         */
        'searcherchanged',

        /**
         * @event searcherchanged Fires when specified searcher was not available from API
         * @param {Object} e Exception object
         */
        'searcherexception',

        /**
         * @event loadexception Fires if an exception occurs in the Proxy during data loading.  This event can be fired for one of two reasons:
         * <ul><li><b>The search result has no result.</b>  This means there was no result for a given query or some error
         * at Search API caused no result. In this case, this event will be raised and the fourth parameter (read error) will be null.</li>
         * <li><b>The load succeeded but the reader could not read the response.</b>  This means the server returned
         * data, but the configured Reader threw an error while reading the data.  In this case, this event will be 
         * raised and the caught error will be passed along as the fourth parameter of this event.</li></ul>
         * Note that this event is also relayed through {@link Ext.data.Store}, so you can listen for it directly
         * on any Store instance.
         * @param {Object} this
         * @param {Object} options The loading options that were specified (see {@link #load} for details)
         * @param {Object} response The response object containing the search result if any
         * @param {Error} e The JavaScript Error object caught if the configured Reader could not read the data.
         */
        'loadexception'
      ]);
    }catch(e){
      
    }
};

Ext.extend(Ext.ux.google.search.Store, Ext.data.Store, {
  /**
   * @cfg {Object} data
   * @hide
   */

  /**
   * @cfg {String} url
   * @hide
   */

  /**
   * @cfg {boolean} remoteSort
   * @hide
   */

  /**
   * @cfg {Object} sortInfo
   * @hide
   */

  /**
   * @cfg {Object} sortInfo
   * @hide
   */

  /**
   * @cfg {Array} fields
   * @hide
   */

  /**
   * @cfg {Ext.ux.search.Proxy/Object} proxy
   * {@link Ext.ux.search.Proxy} object or its configuration object literal. If not specified, a plain Proxy
   * object is created (only 'web' searcher is activated).
   */
  proxy: null,

  /**
   * @cfg {Ext.ux.search.Reader/Object} reader
   * {@link Ext.ux.search.Reader} object or its configuration object literal. If not specified, a plain Reader
   * object is created. 
   */
  reader: null,

  // overridden method
  load: function(options){
    if(this.isReady()){
      var p = Ext.apply(options.params || {}, this.baseParams);
      var pn = this.paramNames;
  
      p[pn["limit"]] = this.getResultSetSize();
  
      if(typeof p.page === 'undefined' && typeof p[pn["start"]] !== 'undefined'){
        p.page = Math.floor(p[pn["start"]] / p[pn["limit"]]);    
      }else{
        p.page = 0;
      }
  
      options.params = p;
  
      return Ext.ux.google.search.Store.superclass.load.call(this,options);
    }else{
      this.proxy.on('searchapiinitialized',function(){
        return this.load(options);
      },this);
      return true;
    }
  },

  /**
   * Change active searcher of proxy
   * @method setActiveSearcher
   * @param {string} active New active searcher
   * @return {google.search.Searhcer} searcher active searcher (false when specified searcher is not available)
   */
  setActiveSearcher: function(s){
    if(this.isReady()){
      return this.proxy.setActiveSearcher(s);
    }else{
      this.proxy.on('avaialble', function(t){
        t.setActiveSearcher(s);
      });
      return true;
    }
  },

  /**
   * Return active searcher of proxy
   * @method getActiveSearcher
   * @param {bool} name if true, return value will be active searcher's name
   * @return {google.search.Searhcer/string} searcher active searcher
   */
  getActiveSearcher: function(name){
    if(this.isReady()){
      return this.proxy.getActiveSearcher(name);
    }else{
      return false;
    }
  },

  /**
   * Return search result set size of Proxy
   * @method getResultSetSize
   * @return {int} size search result set size
   */
  getResultSetSize: function(){
    if(this.isReady()){
      return this.proxy.getResultSetSize(true);
    }else{
      return 0;
    }
  },

  /**
   * Returns the status of api availability
   * @method isReady
   * @return {bool} status 
   */
  isReady: function(){
    return this.proxy && this.proxy.isReady();
  }
});
