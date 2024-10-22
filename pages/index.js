import React from 'react';
import Front from '../components/front.js';
//import '../src/view.css'; // Ensure the path is correct

const Home = () => {
  return (
    <>
      <header>VisuaLoom</header>
      <div id="root">
        <Front />
      </div>
      <footer>
        <small>
          VisuaLoom<br />
          Brett DeWitt, Nick Anthony, Tong Guan, Jordan Poppe<br />
          University of Oregon<br />
          <a href="https://github.com/routpalm/visualoom">Github</a>
        </small>
      </footer>
    </>
  );
}

export default Home;
