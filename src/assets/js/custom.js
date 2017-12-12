window.klrn = window.klrn || {};

var jquery = require('./jquery-1.12.4.js');
global.$ = global.jQuery = jquery;

require('./bootstrap.js');
require('./ie10-viewport-bug-workaround.js');
require('./global.js');

//add additional modules to klrn object  
(function (exports) { 

  exports.setOptions = function(optionClass) {
    if (optionClass == 'passportLaunch') {
      document.getElementById('passport_logo').className = 'option_passportLaunch';
      document.getElementById('cta_button').className = 'option_passportLaunch';
      document.querySelector('.option_passportLaunch').style.display = 'block';
      document.querySelector('.option_default').style.display = 'none';
    }
    if (optionClass == 'default') {
      document.getElementById('cta_button').className = '';
      document.querySelector('.option_passportLaunch').style.display = 'none';
      document.querySelector('.option_default').style.display = 'block';
    }
  };
  
}(klrn)); //end adding modules to klrn object 