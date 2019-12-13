import React, { Component } from 'react'; 
import ReactDOM from 'react-dom'; 

import './app.css'; // common css to all components (not part of "web" ; "web" = just resets)

import Header  from '../../components/Header';
import Card  from '../../components/Card';
import List  from '../../components/List';
import Footer  from '../../components/Footer';

import * as serviceWorker from '../../web/serviceWorker';

/* 
  Typical landing page includes these components 

      <div>
        <NavBar navBarShrink = {nbs} />
        <Hero />
        <AppDownload />
        <Features />
        <CallToAction />
        <Social />
        <Footer />
      </div>
 */

class AppView extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    //console.log('app > componentDidMount')
  }

  render() {
    return (
      <div>
        <a name="pageTop"></a>
        <p />
        <Header />
        <Card />
        <List /> {/* <Loader /> will go inside List */}
        <Footer />
      </div>
    ); 
  } 
} 

export default AppView

ReactDOM.render(<AppView />, document.getElementById('root'));

//// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
