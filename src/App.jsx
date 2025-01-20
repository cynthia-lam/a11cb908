import React, { useState, useEffect, act } from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import CallList from './components/CallList.jsx';

const App = () => {
  const [activeTab, setActiveTab] = useState('ActivityFeed');

  function display() {
    if (activeTab === 'ActivityFeed') {
      return <CallList filter={activeTab} />; // Render ActivityFeed
    } else if (activeTab === 'Archive') {
      return <CallList filter={activeTab} />; // Render Archive
    }
  };

  return (
    <div className='container'>
      <Header setActiveTab={setActiveTab} />
      {display()}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
