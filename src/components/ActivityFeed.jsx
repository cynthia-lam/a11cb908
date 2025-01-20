import React, { useState, useEffect } from 'react';
import fetchCalls from '../../routes/useCalls';
import Call from './Call.jsx';

const ActivityFeed = () => {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const data = await fetchCalls();
        setCalls(data);
    };

    fetchData();
  }, []); // dependencies - just empty array

  return (
    <div>
      <ul>
        {calls.map((call) => (
          <Call data={call} key={call.id}/>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;
