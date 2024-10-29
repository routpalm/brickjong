import React from 'react';
import Front from '../components/front.js';
import Head from 'next/head';

const Home = () => 
  (
    <>
      <Head>
      	<meta charSet="UTF-8" name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>VisuaLoom Art Generator</title>

      </Head>
      
      <div id="root">
        <div id = "Title">
          <h1>VisuaLoom</h1>
        </div>
        <div class="algorithmSelection">
          <label for="algorithmSelect">Choose an algorithm:</label>
          <select id="algorithmSelect">
            <option value="lines">Lines</option>
            <option value="elaborate">Elaborate Sketch</option>
          </select>
        </div>
        
        <div id="canvasContainer"></div>
        <div id="buttons">
        <Front />
        </div>
        
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


export default Home;
