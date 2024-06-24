import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [inputTime, setInputTime] = useState("");
  const [timeDifference, setTimeDifference] = useState("");

  const parseDateString = (dateString) => {
    const dateTimeParts = dateString.split(" ");
    const dateParts = dateTimeParts[0].split("-");
    const timeParts = dateTimeParts[1].split(":");

    return new Date(
      dateParts[0],
      dateParts[1] - 1,
      dateParts[2],
      timeParts[0],
      timeParts[1],
      timeParts[2]
    );
  };

  const calculateTimeDifference = () => {
    if (inputTime.trim() === "") {
      return alert("시간을 입력해주세요.");
    }
    console.log(inputTime)
    const inputDate = parseDateString(inputTime.trim());
    const currentDate = new Date();

    if (isNaN(inputDate.getTime())) {
      setTimeDifference("Invalid Date");
      return;
    }

    const differenceInMilliseconds = currentDate - inputDate;
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);

    const seconds = differenceInSeconds % 60;
    const minutes = differenceInMinutes % 60;
    const hours = differenceInHours % 24;

    const formattedTimeDifference = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    setTimeDifference(formattedTimeDifference);

    navigator.clipboard
      .writeText(formattedTimeDifference)
      .then(() => {
        toast.success("복사 완료!");
      })
      .catch((error) => {
        toast.success("복사 실패..");
      });
  };

  return (
    <div className="App">
      <ToastContainer
        autoClose={10}
        position="bottom-center"
        pauseOnHover={false}
        theme="light"
      />
      <h1 style={{ color: "#4279ff" }}>아프리카 업타임 계산기</h1>
      <InputContainer>
        <StyledInput
          type="text"
          placeholder="0000-00-00 00:00:00"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
        />
        <ButtonContainer onClick={calculateTimeDifference}>
          입력
        </ButtonContainer>
      </InputContainer>
      <h4 style={{ color: "#4279ff" }}>업타임 : {timeDifference ? timeDifference : "00:00:00"}</h4>
      <ExampleContainer>
        <h3>사용 방법</h3>
        <h4>1. 아프리카 '방송시작시간'을 복사해 붙여넣기 해주세요.</h4>
        <img src="/example.png" alt="예시"/>
        <h4>2. 입력 버튼을 눌러 업타임을 계산합니다.</h4>
        <h4>3. 계산된 업타임이 복사됩니다.</h4>
      </ExampleContainer>
    </div>
  );
}

const StyledInput = styled.input`
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #4279ff;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
  color: #333;
  height: 50px;

  &:focus {
    outline: none;
    border-color: #2851a3;
    box-shadow: 0 0 10px rgba(66, 121, 255, 0.2);
  }

  &::placeholder {
    color: #bbb;
  }
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const ButtonContainer = styled.button`
  border: none;
  border-radius: 10px;
  background-color: #4279ff;
  color: white;
  height: 50px;
  width: 100px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-weight: bold;
  font-size: 20px;
  transition: background-color 0.5s, transform 0.2s;

  &:hover {
    background-color: #2851a3;
  }

  &:active {
    transform: scale(0.9);
  }
`;

const ExampleContainer = styled.div`

`;

export default App;
