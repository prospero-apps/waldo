import React, { useEffect } from 'react';
import '../style.css';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase-config';

function Leaderboard({ leaders, setLeaders, formatTime }) {
  const leadersCollectionRef = collection(db, 'leaders');

  useEffect(() => {
    const getLeaders = async () => {
      const data = await getDocs(leadersCollectionRef);
      const leaderData = data.docs.map((doc) => ({
        name: doc._document.data.value.mapValue.fields.name.stringValue,
        time: doc._document.data.value.mapValue.fields.time.integerValue,
        id: doc.id,
      }));

      const sortedLeaders = leaderData.sort((a, b) => a.time - b.time);

      setLeaders(sortedLeaders);
    };

    getLeaders();
  }, [])

  return (
    <div className='leaderboard'>
      <table className='leader-table'>
        <thead className='table-header'>
          <tr>
            <th className='name-column'>Name</th>
            <th className='time-column'>Time</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((leader) => {
            return (
              <tr key={leader.id}>
                <td>{leader.name}</td>
                <td>{formatTime(leader.time)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard
