var Dashboard = {
  init: function () {
    var params = this.getQueryStringParams(window.location.search.substr(1)),
        script;

    // Add LiveReload script if debug mode is activated
    if(params.debug === 'true') {
      script = document.createElement('script');
      script.src = 'http://localhost:35729/livereload.js?snipver=1';
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  },

  getQueryStringParams: function (queryString) {
    var params = {},
        tokens,
        parts,
        i;

    if(queryString !== '') {
      tokens = queryString.split('&');

      for(i = 0; i < tokens.length; i++) {
        parts = tokens[i].split('=');

        if (parts.length !== 2) {
          continue;
        }

        params[parts[0]] = decodeURIComponent(parts[1].replace(/\+/g, ' '));
      }
    }

    return params;
  }
};

Dashboard.init();
