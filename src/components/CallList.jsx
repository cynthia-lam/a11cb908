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

  // convert filter to is_archived
  console.log('filter: ', filter);
  let filteredCalls = calls;
  if (filter == 'ActivityFeed') {
    filteredCalls = calls.filter((call) => call.is_archived == false);
  };
  if (filter == 'Archive') {
    filteredCalls = calls.filter((call) => call.is_archived == true);
  };

  console.log('filteredCalls: ', filteredCalls);
  return (
    <div>
      <ul>
        {filteredCalls.map((call) => (
          <Call data={call} key={call.id} />
        ))}
      </ul>
    </div>
  );
};

export default CallList;
