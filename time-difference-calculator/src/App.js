import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputTime, setInputTime] = useState('');
  const [timeDifference, setTimeDifference] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const parseDateString = (dateString) => {
    const dateTimeParts = dateString.split(' ');
    const dateParts = dateTimeParts[0].split('-');
    const timeParts = dateTimeParts[1].split(':');
    
    return new Date(
      dateParts[0], // year
      dateParts[1] - 1, // month (0-based index)
      dateParts[2], // day
      timeParts[0], // hour
      timeParts[1], // minute
      timeParts[2] // second
    );
  };

  const calculateTimeDifference = () => {
    const inputDate = parseDateString(inputTime);
    const currentDate = new Date();

    if (isNaN(inputDate.getTime())) {
      setTimeDifference('Invalid Date');
      setCopySuccess('');
      return;
    }

    const differenceInMilliseconds = currentDate - inputDate;
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);

    const seconds = differenceInSeconds % 60;
    const minutes = differenceInMinutes % 60;
    const hours = differenceInHours % 24;

    const formattedTimeDifference = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    setTimeDifference(formattedTimeDifference);

    // 결과값을 클립보드에 복사
    navigator.clipboard.writeText(formattedTimeDifference).then(() => {
      setCopySuccess('결과값이 클립보드에 복사되었습니다.');
    }).catch((error) => {
      console.error('복사 실패:', error);
      setCopySuccess('복사에 실패했습니다.');
    });
  };

  return (
    <div className="App">
      <h1>시간 차이 계산기</h1>
      <input
        type="text"
        placeholder="0000-00-00 00:00:00"
        value={inputTime}
        onChange={(e) => setInputTime(e.target.value)}
      />
      <button onClick={calculateTimeDifference}>계산하기</button>
      <p>시간 차이: {timeDifference}</p>
      <p>{copySuccess}</p>
    </div>
  );
}

export default App;
