import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import ActivityFeed from './components/ActivityFeed.jsx';
import Archive from './components/Archive.jsx';

const App = () => {
  const [activeTab, setActiveTab] = useState('Archive');

  function display() {
    if (activeTab === 'ActivityFeed') {
      return(
      <ActivityFeed/>
      );
    } else if (activeTab === 'Archive'){
      return(
      <Archive/>
      );
    }
  };

  return (
    <div className='container'>
      <Header setActiveTab={setActiveTab}/>
      {display()}
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
