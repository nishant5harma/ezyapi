// api-help.js
// Simple helper: callapi, apidata, bindData, autoBind
(function (global) {
    // helper: get nested path e.g. "address.city"
    function getByPath(obj, path) {
      if (!obj || !path) return undefined;
      return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
    }
  
    // internal request using axios if available, otherwise fetch
    function _request(url, opts = {}) {
      const method = (opts.method || 'GET').toUpperCase();
  
      // If axios exists, use it
      if (typeof axios !== 'undefined') {
        return axios({
          method,
          url,
          data: opts.body ?? null,
          withCredentials: opts.withCredentials ?? true,
          timeout: opts.timeout ?? 10000
        }).then(r => r.data);
      }
  
      // fallback to fetch
      const fetchOpts = {
        method,
        credentials: opts.withCredentials ? 'include' : 'same-origin',
        headers: {}
      };
      if (opts.body) {
        fetchOpts.headers['Content-Type'] = 'application/json';
        fetchOpts.body = JSON.stringify(opts.body);
      }
  
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('timeout')), opts.timeout ?? 10000);
        fetch(url, fetchOpts)
          .then(async res => {
            clearTimeout(timer);
            const text = await res.text();
            try {
              const json = JSON.parse(text);
              resolve(json);
            } catch (e) {
              // return raw text if not json
              resolve(text);
            }
          })
          .catch(err => {
            clearTimeout(timer);
            reject(err);
          });
      });
    }
  
    /**
     * callapi(url, options)
     * - returns a Promise that resolves to the raw API response (your backend response object)
     */
    function callapi(url, options = {}) {
      return _request(url, options).catch(err => {
        console.error('callapi error:', err);
        return { success: false, error: String(err) };
      });
    }
  
    /**
     * apidata(promise)
     * - await the promise returned by callapi() and return the 'data' payload when available
     * - if backend returns { success: true, data: {...} } -> returns that data
     * - otherwise returns the full response
     */
    async function apidata(promise) {
      const res = await promise;
      if (!res) return null;
      if (typeof res === 'object' && res !== null && res.success === true && ('data' in res)) {
        return res.data;
      }
      // if API uses another shape, return the whole object
      return res;
    }
  
    /**
     * bindData(data, root)
     * - Replace placeholders like {name} or {user.name} or {address.city}
     * - root defaults to document.body
     */
    function bindData(data, root = document.body) {
      if (!root) return;
      // token: {key} where key may include letters, digits, underscore, hyphen and dots
      const tokenRegex = /\{([\w\-\.$]+)\}/g;
  
      // Replace in text nodes only to be safer (avoid replacing inside scripts/styles)
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
  
      nodes.forEach(node => {
        if (!node.nodeValue || !node.nodeValue.includes('{')) return;
        node.nodeValue = node.nodeValue.replace(tokenRegex, (match, path) => {
          // support optional leading 'v.' like {v.name}
          if (path.startsWith('v.')) path = path.slice(2);
          let val = getByPath(data, path);
          if (val === undefined || val === null) return '';
          if (typeof val === 'object') return JSON.stringify(val);
          return String(val);
        });
      });
    }
  
    /**
     * autoBind(url, root)
     * - convenience: fetch the API and bind its data into the DOM
     * - returns the resolved data object
     */
    async function autoBind(url, root = document.body, options = {}) {
      const raw = await callapi(url, options);
      const data = await apidata(Promise.resolve(raw));
      if (data && typeof data === 'object') bindData(data, root);
      return data;
    }
  
    // Expose globally
    global.callapi = callapi;
    global.apidata = apidata;
    global.bindData = bindData;
    global.autoBind = autoBind;
  
  })(window);
  