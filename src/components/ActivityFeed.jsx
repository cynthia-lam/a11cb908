import React, { useState, useEffect } from 'react';
import fetchCalls from '../../routes/useCalls';

const ActivityFeed = () => {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const data = await fetchCalls();
        setCalls(data);
        setLoading(false);
    };

    fetchData();
  }, []); // dependencies - just empty array

  return (
    <div>
      <ul>
        {calls.map((call) => (
          <li key={call.id}>
            {call.from}
            {call.direction}
            {call.duration}
            {call.call_type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;
