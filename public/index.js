'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from '../public/scripts/facebook.js';

 const responseFacebook = (response) => {
   console.log(response);
 }
ReactDOM.render(
 <FacebookLogin
    appId="292766321059998"
    autoLoad={true}
    callback={responseFacebook}
    icon="fa-facebook" />,
  document.getElementById('main')
);
