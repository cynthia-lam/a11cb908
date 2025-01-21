import React, { useState, useEffect } from 'react';
import fetchCalls from '../../routes/useCalls.js';
import Call from './Call.jsx';
import '../css/callList.css';

const CallList = ({ filter }) => {
  const [calls, setCalls] = useState([]);
  const baseURL = 'https://aircall-api.onrender.com';

  // FetchData gets the calls from the API and updates the state
  const fetchData = async () => {
    try {
      const data = await fetchCalls();
      setCalls(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ToggleArchive archives or unarchives a call
  const toggleArchive = async (id, is_archived) => {
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

  // ArchiveAll archives or unarchives all calls
  const archiveAll = async () => {
    try {
      const newArchiveStatus = filter === 'ActivityFeed';

      const archivePromises = filteredCalls.map((call) =>
        fetch(`${baseURL}/activities/${call.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            is_archived: newArchiveStatus, // PATCH this here!
          }),
        })
      );

      await Promise.all(archivePromises); // Wait for all requests to complete
      fetchData(); // Refresh the call list
    } catch (error) {
      console.error('Error archiving all calls:', error);
    }
  };

  // Reset all calls to initial state
  const resetAll = async () => {
    try {
      const response = await fetch(`${baseURL}/reset`, {
        method: 'PATCH'
      });
      if (response.ok) {
        console.log("Calls successfully reset!");
        fetchData();
      } else {
        console.log("Calls were not reset.");
      }
    } catch (error) {
      console.log('Error reseting calls: ', error);

    }
  };

  // Get calls filtered by filter prop
  const filteredCalls = calls.filter((call) => {
    if (filter === 'ActivityFeed') {
      return !call.is_archived; // non-archived calls
    }
    if (filter === 'Archive') {
      return call.is_archived; // archived calls
    }
  });

  return (
    <div className='call-list'>
      <div className='call-list-top'>
        <img src='/assets/scroll-top.png' className="scroll-top-button"></img>
        <button
          className='archive-all-button'
          onClick={archiveAll}>
          {filter === 'ActivityFeed' ?
            <>
              <img src="/assets/archive.png" className="call-action-all-logo" />
              ALL
            </>
            :
            <>
              <img src="/assets/unarchive.png" className="call-action-all-logo" />
              ALL
            </>
          }
        </button>
      </div>
      <div className='call-list-content'>
      {filteredCalls.length === 0 ? (
        <p className="no-calls-message">
          {filter === 'ActivityFeed'
            ? "No recent calls to display."
            : "No archived calls to display."}
        </p>
      ) : (
        <ul>
          {filteredCalls.map((call) => (
            <Call
              data={call}
              key={call.id}
              fetchCalls={fetchData}
              toggleArchive={toggleArchive}
            />
          ))}
        </ul>
      )}
    </div>
      <div className='footer'>
          <img src={`${process.env.PUBLIC_URL}/../src/assets/answered-call.png`} className='footer-icon'/>
          <img src='/assets/foot-icon-2.png' className='footer-icon'/>
          <img src='/assets/foot-icon-3.png' className='footer-icon'/>
          <img src='/assets/foot-icon-4.png' className='footer-icon'/>
      </div>
    </div>
  );
};

export default CallList;
