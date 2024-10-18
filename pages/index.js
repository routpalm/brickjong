import React from 'react';
import Front from '../components/front.js';

const Home = () => {
	return ( <>
		<header>VisuaLoom</header>
  		<div id="root"></div>
  		<Front/>
  		<footer>
    		<small>
      			VisuaLoom<br />
      			Brett DeWitt, Nick Anthony, Tong Guan, Jordan Poppe<br/>
      			University of Oregon<br />
      			<a href="https://github.com/routpalm/visualoom">Github</a>
    		</small>
  		</footer>

	</>
	);
}

export default Home;