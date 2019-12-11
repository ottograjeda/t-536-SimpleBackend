import React from 'react';
import './style.css'; // uses this (style.css), app.css, + muicss

const Card = (props) => (
  <section>

  <div className="mui-container">
    <div className="card-example mui--z1 center">

      <span className="title mui--text-light mui--text-headline"> &nbsp; </span>
      <img src="https://grajeda.com/images/portfolio/sample_15.jpg" />
      <div className="label">
        <div className="mui--text-dark-secondary mui--text-caption">Marketing Maxims</div>
      </div>
      <br />

   </div>
  </div>

  </section>
)

export default Card