import React from 'react';
//import './style.css'; 

const Header = (props) => (
  <section>

  <header className="mui-appbar mui--z1" style={{lineHeight:"35px"}}>
  <table width="100%">
  <thead>
    <tr style={{verticalAlign:"middle",backgroundColor:"initial"}}>
      <td className="mui--appbar-height" align="left" style={{padding:"15px"}}>Awesome LLC</td>
      <td className="mui--appbar-height" align="right" style={{padding:"15px"}}> <a href='https://github.com/ottograjeda/public_ticket.536' target="_blank" style={{color:"white"}}>GitHub Repo</a> </td>
    </tr>
  </thead>
  </table>
  </header>

  </section>

)

export default Header
