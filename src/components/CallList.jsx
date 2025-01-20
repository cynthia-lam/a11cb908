import React, { useState, useEffect } from 'react';
import fetchCalls from '../../routes/useCalls.js';
import Call from './Call.jsx';

const CallList = ({ filter }) => {
  const [calls, setCalls] = useState([]);

  const fetchData = async () => {
    const data = await fetchCalls();
    setCalls(data);
  };

  useEffect(() => {
    fetchData();
  }, []); // dependencies - just empty array
  
  const toggleArchive = async (id, is_archived) => {
    const baseURL = 'https://aircall-api.onrender.com';
    const response = await fetch(`${baseURL}/activities/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        is_archived: !is_archived, // PATCH this here!
      }),
    });
    
    if (response.ok) {
      fetchData();  // refresh CallList
    } else {
      console.error('Failed to toggle archive');
    }
  };
  
    // get calls filtered by filter prop
    const filteredCalls = calls.filter((call) => {
      if (filter === 'ActivityFeed') {
        return !call.is_archived; // non-archived calls
      }
      if (filter === 'Archive') {
        return call.is_archived; // archived calls
      }
    });

  const archiveAll = async () => {
    try {
      const newArchiveStatus = filter === 'ActivityFeed';

      const archivePromises = filteredCalls.map((call) =>
        fetch(`https://aircall-api.onrender.com/activities/${call.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            is_archived: newArchiveStatus, // what to PATCH
          }),
        })
      );

      await Promise.all(archivePromises); // Wait for all requests to complete
      fetchData(); // Refresh the call list
    } catch (error) {
      console.error('Error archiving all calls:', error);
    }
  };

  return (
    <div>
      <button onClick={archiveAll}>{filter === 'ActivityFeed' ? 'ARCHIVE ALL' : 'UNARCHIVE ALL'}</button>
      <ul>
        {filteredCalls.map((call) => (
          <Call data={call} key={call.id} fetchCalls={fetchData} toggleArchive={toggleArchive}/>
        ))}
      </ul>
    </div>
  );
};

export default CallList;
