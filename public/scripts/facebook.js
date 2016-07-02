import React, { PropTypes } from 'react';
import styles from '../styles/facebook.scss';
import FaceData from '../../public/scripts/facedata.js';
class FacebookLogin extends React.Component {

  state = {
    status: 'loading'  };

  static propTypes = {
    callback: PropTypes.func.isRequired,
    appId: PropTypes.string.isRequired,
    xfbml: PropTypes.bool,
    cookie: PropTypes.bool,
    scope: PropTypes.string,
    textButton: PropTypes.string,
    autoLoad: PropTypes.bool,
    size: PropTypes.string,
    fields: PropTypes.string,
    cssClass: PropTypes.string,
    version: PropTypes.string,
    icon: PropTypes.string,
    language: PropTypes.string,
  };

  static defaultProps = {
    textButton: 'Login with Facebook',
    scope: 'public_profile, email',
    xfbml: false,
    cookie: false,
    size: 'metro',
    fields: 'name',
    cssClass: 'kep-login-facebook',
    version: '2.3',
    language: 'en_US',
  };

  constructor(props) {
    super(props);
    

  }

  componentDidMount() {
    let fbRoot = document.createElement('div');
        fbRoot.id = 'fb-root';

    document.body.appendChild(fbRoot);

    window.fbAsyncInit = () => {
      FB.init({
        appId: this.props.appId,
        xfbml: this.props.xfbml,
        cookie: this.props.cookie,
        version: 'v' + this.props.version,
      });

      if (this.props.autoLoad) {
        FB.getLoginStatus(this.checkLoginState);
      } 


     FB.getLoginStatus(
        response => {
          if( response.status == 'connected' ){
            var uid =  response.authResponse.userID
            var accessToken = response.authResponse.accessToken
            this.setState({ status: response.status,user_id:uid , token:accessToken });
          }

          response.status !== 'connected' && this.setState({ status: response.status })
        }
      );


   

      FB.Event.subscribe('auth.authResponseChange', (response) => {
        // start spinner
        this.setState({ status: 'loading' });

        (async () => {
          try {

          } catch (e) {
            this.setState({ status: 'err' });
          }
        })();
      });
    };
    // Load the SDK asynchronously
    (function(d, s, id)  {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  responseApi = (authResponse) => {
    FB.api('/me', { fields: this.props.fields }, (me) => {
      me.accessToken = authResponse.accessToken;
      this.props.callback(me);
    });
  };

  checkLoginState = (response) => {
    if (response.authResponse) {
      this.responseApi(response.authResponse);
    } else {
      if (this.props.callback) {
        this.props.callback({ status: response.status });
      }
    }
  };



  click = () => {
    FB.login(this.checkLoginState, { scope: this.props.scope });
  };

  renderWithFontAwesome() {
    return (
      <div>
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />
         <button
            className={this.props.cssClass + ' ' + this.props.size}
            onClick={this.click}>
          <i className={'fa ' + this.props.icon}></i> {this.props.textButton}
        </button>

        <style dangerouslySetInnerHTML={{ __html: styles }}></style>
      </div>
    )
  };



  render() {
    if (this.state.status === 'err') {
      return (<h1>error</h1>);
    } else if (this.state.status === 'unknown' || this.state.status === 'not_authorized') {
      return (<div>
        <button
            className={this.props.cssClass + ' ' + this.props.size}
            onClick={this.click}>
          {this.props.textButton}
        </button>
        
        <style dangerouslySetInnerHTML={{ __html: styles }}></style>
      </div>);
    } else if (this.state.status === 'connected') {
      return (
        <div >
                   <FaceData conn={this.state} />

        </div>
      );
    } else if (this.state.status === 'loading') {
      return (
        <div >
         <h1>LOADING ... </h1>
        </div>
      );
    }
  };
    
  }


export default FacebookLogin;
