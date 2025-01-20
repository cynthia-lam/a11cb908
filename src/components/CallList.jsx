import React, { useState, useEffect } from 'react';
import fetchCalls from '../../routes/useCalls.js';
import Call from './Call.jsx';

const CallList = ({ filter }) => {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCalls();
      setCalls(data);
    };

    fetchData();
  }, []); // dependencies - just empty array

  // get calls filtered by filter aka activeTab
  const filteredCalls = calls.filter((call) => {
    if (filter === 'ActivityFeed') {
      return !call.is_archived; // non-archived calls
    }
    if (filter === 'Archive') {
      return call.is_archived; // archived calls
    }
  });

  return (
    <div>
      <ul>
        {filteredCalls.map((call) => (
          <Call data={call} key={call.id} fetchCalls={fetchCalls}/>
        ))}
      </ul>
    </div>
  );
};

export default CallList;
