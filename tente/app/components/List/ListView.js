import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import Loader  from '../../components/Loader';
import axios from 'axios'; // left incase Firebase not used
import firebase, { database, provider } from '../../common/firebase'; // firebase

import './style.css'; // custom + muicss

var GET_URL = 'https://jsonplaceholder.typicode.com/users'; // users 10 ; comments 500 ; photos 5000 ; ref = https://jsonplaceholder.typicode.com

class List extends Component {
	constructor(props) {
		super(props);
		this.sortTable = this.sortTable.bind(this); // required 
		this.handleClick = this.handleClick.bind(this); // required 
	}
   
    state = {
    	loading: '', // placeholder for loader ; set loader true to show (as needed)
    	items: [],   // placeholder for firebase data
    	users: []    // placeholder for json data
  	};

  	// ref = https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sort_table_desc
  	sortTable = function(n) {
	  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	  table = document.getElementById("dataTable");
	  switching = true;
	  dir = "asc"; // Set sorting direction
	  while (switching) { // Make a loop that will continue until no switching has been done:
	    switching = false; //start by saying: no switching is done
	    rows = table.rows;
	    for (i = 1; i < (rows.length - 1); i++) { // Loop through all table rows (except the first, which contains table headers):
	      shouldSwitch = false; // start by saying there should be no switching
	      // Get the two elements you want to compare, one from current row and one from the next
	      x = rows[i].getElementsByTagName("td")[n];
	      y = rows[i + 1].getElementsByTagName("td")[n];
	      if (dir == "asc") { // check if the two rows should switch place, based on the direction, asc or desc
	        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
	          shouldSwitch= true; // if so, mark as a switch and break the loop
	          break;
	        }
	      } else if (dir == "desc") {
	        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
	          shouldSwitch = true; // if so, mark as a switch and break the loop
	          break;
	        }
	      }
	    }
	    if (shouldSwitch) {
	      // If a switch has been marked, make the switch and mark that a switch has been done
	      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
	      switching = true;
	      switchcount ++; // Each time a switch is done, increase this count by 1
	    } else {
	      if (switchcount == 0 && dir == "asc") { // If no switching has been done AND the direction is "asc", set the direction to "desc" and run the while loop again.
	        dir = "desc";
	        switching = true;
	      }
	    }
	  }
	}

	handleClick = id => {
		console.log('Hi ' +id);
	}

  componentDidMount() {
    console.log('list > componentDidMount')
    this.setState({ loading: true }) // set loader true to show ; make sure to unset below 

    // (working) placeholder to get JSON data via external API (in case Firebase/GAS not used)
    /*
    axios.get(GET_URL).then(response => response.data)
    .then((data) => { 
      this.setState({ loading: false, users: data }) 
     })
    */
   
    // get Firebase
	var dbRef = database.ref('allSheet'); // hardcode db name
    dbRef.on('value', (snapshot) => { // no error checking ; will fail silently (done on purpose)
      let items = snapshot.val();
      //console.log(items) 
      let newState = [];
      for (let item in items) { // item is index ; misnomer
        newState.push({
          userID: items[item].ID,
          userName: items[item].userName,
          userEmail: items[item].userEmail,
          userWebsite: items[item].userWebsite
        });
      }
      this.setState({
      	loading: false, // disable loader + save data to state
        items: newState
      });
    });

  } // end did mount

  render() {
    console.log('list > render ')
    const { loading, items, users } = this.state;

    return (

	<section>
    { loading ? <Loader /> : 

		<section style={{paddingBottom:"100px"}}>
		<table className="mui-table" id="dataTable">
		  <thead>
		    <tr>
		      <th className="mui--text-left" onClick={ () => this.sortTable(0) }> ID  <span className="sort-by">&#8597;</span> </th>
		      <th className="mui--text-left" onClick={ () => this.sortTable(1) }> Username <span className="sort-by">&#8597;</span> </th>
		      <th className="mui--text-left" onClick={ () => this.sortTable(2) }> Email <span className="sort-by">&#8597;</span> </th>
		      <th className="mui--text-left" onClick={ () => this.sortTable(3) }> Website <span className="sort-by">&#8597;</span> </th>
		      <th className="mui--text-left">Action</th>
		    </tr>
		  </thead>

          {/* Will be blank if Axios not used to get JSON data */}
		  <tbody>
		  {users.map(item => (
		    <tr key={item.id}>
		      <td className="mui--text-left">{item.id}</td>
		      <td className="mui--text-left">{item.username}</td>
		      <td className="mui--text-left">{item.email}</td>
		      <td className="mui--text-left">{item.website}</td>
		      <td className="mui--text-left"> <button onClick={ () => this.handleClick(item.id) }> add </button> </td>
		    </tr>
		    ))}
		  </tbody>

		  <tbody>
		  {items.map(item => (
		    <tr key={item.userID}>
		      <td className="mui--text-left">{item.userID}</td>
		      <td className="mui--text-left">{item.userName}</td>
		      <td className="mui--text-left">{item.userEmail}</td>
		      <td className="mui--text-left">{item.userWebsite}</td>
		      <td className="mui--text-left"> <button onClick={ () => this.handleClick(item.id) }> add </button> </td>
		    </tr>
		    ))}
		  </tbody>
		</table>
		</section>

     } 
	</section>
    
    ); 
  } 
} 

export default List
