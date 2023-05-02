import React, { useState, useEffect } from 'react';
import firebase from '../config';
import 'firebase/database';

// function Consign() {
//   const [points, setPoints] = useState(0);
//   const [isCheckedIn, setIsCheckedIn] = useState(false);
//   const [checkInDates, setCheckInDates] = useState([]);

//   const MAX_CHECKINS = 7;

//   useEffect(() => {
//     const dates = JSON.parse(localStorage.getItem('checkInDates')) || [];
//     setCheckInDates(dates);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('checkInDates', JSON.stringify(checkInDates));
//   }, [checkInDates]);

//   const handleCheckIn = () => {
//     if (isCheckedIn) {
//       return;
//     }

//     const currentDate = new Date().toDateString();

//     if (checkInDates.includes(currentDate)) {
//       return;
//     }

//     setPoints(points + 1);
//     setIsCheckedIn(true);
//     setCheckInDates([...checkInDates, currentDate]);
//   };

//   const handleReset = () => {
//     setPoints(0);
//     setIsCheckedIn(false);
//     setCheckInDates([]);
//   };

//   const daysLeft = MAX_CHECKINS - checkInDates.length;

//   return (
//     <div className="Consign">
//       <h1>Check In for Points!</h1>
//       {isCheckedIn ? (
//         <p>You've checked in for today! Come back tomorrow for another point.</p>
//       ) : (
//         <>
//           {daysLeft > 0 ? (
//             <p>Check in to earn a point! You have {daysLeft} days left.</p>
//           ) : (
//             <p>You've checked in every day for the past week! Keep it up!</p>
//           )}
//           <button onClick={handleCheckIn} disabled={!daysLeft}>
//             Check In
//           </button>
//         </>
//       )}
//       <p>You have {points} points.</p>
//       <button onClick={handleReset}>Reset</button>
//     </div>
//   );
// }


const db = firebase.database();

function Consign({ userId }) {
  const [lastCheckIn, setLastCheckIn] = useState(null);

  useEffect(() => {
    // read the user's check-in history from the database
    const userRef = db.ref(`users/${userId}`);
    userRef.child('checkIns').orderByKey().limitToLast(1).once('value', snapshot => {
      const lastCheckInDate = snapshot.val();
      setLastCheckIn(lastCheckInDate);
    });
  }, [userId]);

  const handleCheckIn = () => {
    const today = new Date().toISOString().slice(0, 10);
    const userRef = db.ref(`users/${userId}`);
    userRef.child('checkIns').child(today).set(true)
      .then(() => {
        // check-in successful
        // update the user's streak count and point total
      })
      .catch(error => {
        console.error('Error checking in:', error);
      });
  };

  return (
    <div>
      <h2>Check In</h2>
      {lastCheckIn && <p>Last check-in: {lastCheckIn}</p>}
      <button onClick={handleCheckIn}>Check In</button>
    </div>
  );
}

function ProfilePage({ userId }) {
  const [streakCount, setStreakCount] = useState(0);
  const [pointTotal, setPointTotal] = useState(0);

  useEffect(() => {
    // read the user's streak count and point total from the database
    const userRef = db.ref(`users/${userId}`);
    userRef.child('streakCount').once('value', snapshot => {
      const count = snapshot.val();
      setStreakCount(count);
    });
    userRef.child('pointTotal').once('value', snapshot => {
      const total = snapshot.val();
      setPointTotal(total);
    });
  }, [userId]);

  return (
    <div>
      <h2>Profile</h2>
      <p>Streak count: {streakCount}</p>
      <p>Point total: {pointTotal}</p>
    </div>
  );
}


export default Consign;