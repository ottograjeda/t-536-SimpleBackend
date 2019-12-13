import React, { Component } from 'react'; 
import './style.css';

class Footer extends Component {
  constructor(props){
    super(props);
    this.checkBottom = this.checkBottom.bind(this); 
  }

  state = {
    listener: '' // for checkBottom
  };
  
  checkBottom = () => {
    window.onscroll = function(ev) {
      if ((window.innerHeight + window.scrollY) > document.body.scrollHeight - 5 ) { 
        //console.log('at page bottom');
        document.getElementById('hiTest').style.display = 'block'; 
      } else {
        document.getElementById('hiTest').style.display = 'none';      
      }
    };
  }

  componentWillUnmount() {
    //console.log('footer > will UN mount');
    document.removeEventListener('scroll', this.state.listener); // avoid causing memory leaks
    this.setState({listener: null});
  }

  componentDidMount() {
    //console.log('footer > componentDidMount')
    this.setState({listener: this.checkBottom.bind(this)}, () => document.addEventListener('scroll', this.state.listener));

  }

  render() {
    return (

        <footer>
        <div className="mui--text-right"><a href='#pageTop' id='hiTest' style={{display:"none", fontSize:"30px", textDecoration: "none", position:"absolute!important", right:"5px", top:"20px"}}> &#8593; </a></div>
        <hr style={{backgroundColor:"#2196F3", marginTop:"0",border:"1px!important",height:"1px!important",paddingTop:"1px!important"}} />
        <div className="mobile-footer">
            <ul className="list-inline">
              <li className="list-inline-item">&copy; 2019 Awesome LLC. All Rights Reserved.</li>
              | <li className="list-inline-item"><a href="#">Privacy</a></li>
              | <li className="list-inline-item"><a href="#">Terms</a></li>
              | <li className="list-inline-item"><a href="#">Fair use</a></li>
            </ul>
        </div>
        </footer>

    );
  } 
} 

export default Footer
