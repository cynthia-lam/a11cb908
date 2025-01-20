import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import ActivityFeed from './components/ActivityFeed.jsx';
import Archive from './components/Archive.jsx';

const App = () => {
  function display() {
    if (true) {
      return(
      <ActivityFeed/>
      );
    } else {
      return(
      <Archive/>
      );
    }
  }

  return (
    <div className='container'>
      <Header/>
      {display()}
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
