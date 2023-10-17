import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import RandomNumbers from "../get-random-numbers.json";

type resType = {
  x: string | null;
  pi_x: string | null;
  error: boolean;
};

const randomNumsArr = RandomNumbers.numbers;

function App() {
  const [result, setResult] = useState([""]);
  const [isFileFilled, setIsFileFilled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [times, setTimes] = useState<number[]>([]);
  const [timeRes, setTimeRes] = useState({
    avg: 0,
    total: 0,
  });

  useEffect(() => {
    if (result.length === randomNumsArr.length) setIsFileFilled(true);
  }, [result]);

  const getPi = async () => {
    setIsLoading(true);
    for (let i = 0; i < 200; i++) {
      let urlObj = {
        url: "http://localhost:4000",
        file: "part_1.txt",
      };
      if (randomNumsArr[i] >= 4052720000 && randomNumsArr[i] < 34845800000) {
        urlObj.url = "http://localhost:4001";
        urlObj.file = "part_2.txt";
      }
      if (
        randomNumsArr[i] >= 34845800000 &&
        randomNumsArr[i] < 81574100000
      ) {
        urlObj.url = "http://localhost:4002";
        urlObj.file = "part_3.txt";
      }
      if (
        randomNumsArr[i] >= 81574100000 &&
        randomNumsArr[i] < 383023000000
      ) {
        urlObj.url = "http://localhost:4003";
        urlObj.file = "part_4.txt";
      }
      if (
        randomNumsArr[i] >= 383023000000 &&
        randomNumsArr[i] < 850306000000
      ) {
        urlObj.url = "http://localhost:4004";
        urlObj.file = "part_5.txt";
      }
      if (
        randomNumsArr[i] >= 850306000000 &&
        randomNumsArr[i] < 4175880000000
      ) {
        urlObj.url = "http://localhost:4005";
        urlObj.file = "part_6.txt";
      }
      if (
        randomNumsArr[i] >= 4175880000000 &&
        randomNumsArr[i] < 8848710000000
      ) {
        urlObj.url = "http://localhost:4006";
        urlObj.file = "part_7.txt";
      }
      if (randomNumsArr[i] >= 8848710000000 &&
        randomNumsArr[i] < 45215300000000) {
        urlObj.url = "http://localhost:4007";
        urlObj.file = "part_8.txt";
      }
      if (randomNumsArr[i] >= 8848710000000 &&
        randomNumsArr[i] < 439350000000000) {
        urlObj.url = "http://localhost:4008";
        urlObj.file = "part_9.txt";
      }
      if (randomNumsArr[i] >= 439350000000000 &&
        randomNumsArr[i] < 906633000000000) {
        urlObj.url = "http://localhost:4009";
        urlObj.file = "part_10.txt";
      }
      if (randomNumsArr[i] >= 906633000000000 &&
        randomNumsArr[i] < 4739150000000000) {
        urlObj.url = "http://localhost:4010";
        urlObj.file = "part_11.txt";
      }
      if (randomNumsArr[i] >= 4739150000000000  &&
        randomNumsArr[i] < 9411980000000000) {
        urlObj.url = "http://localhost:4011";
        urlObj.file = "part_12.txt";
      }
      if (randomNumsArr[i] >= 9411980000000000 &&
        randomNumsArr[i] < 50848000000000000) {
        urlObj.url = "http://localhost:4012";
        urlObj.file = "part_13.txt";
      }
      if (randomNumsArr[i] >= 50848000000000000 &&
        randomNumsArr[i] < 97576300000000000) {
        urlObj.url = "http://localhost:4013";
        urlObj.file = "part_14.txt";
      }
      if (randomNumsArr[i] >= 97576300000000000 &&
        randomNumsArr[i] < 543045000000000000) {
        urlObj.url = "http://localhost:4014";
        urlObj.file = "part_15.txt";
      }
      if (randomNumsArr[i] >= 543045000000000000){
        urlObj.url = "http://localhost:4015";
        urlObj.file = "part_16.txt";
      }
      
      try {
        const tIni = window.performance.now();
        const res = await axios(
          `${urlObj.url}/compute-pi/${randomNumsArr[i]}/${urlObj.file}`
        );
        const tFin = window.performance.now();
        setTimes((prev) => [...prev, tFin - tIni]);
        const { x, pi_x, error }: resType = res.data;
        setResult((prev) => [...prev, pi_x!, "\n"]);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  };

  const downloadFile = () => {
    const link = document.createElement("a");
    // setResult(result.slice(1));
    const file = new Blob(result!, { type: "text/plain" });
    link.href = URL.createObjectURL(file);
    link.download = "output.txt";
    link.click();
    setResult([""]);
    URL.revokeObjectURL(link.href);
  };

  const showTimes = () => {
    let sum = 0;
    times.forEach((t) => {
      sum += t;
    });
    setTimeRes({ avg: sum / times.length, total: sum });
  };

  return (
    <>
      <h1>Compute Pi</h1>
      <div className="card">
        <div className="input-wrapper">
          <button onClick={getPi}>Compute</button>
          {isLoading && <span>Loading ...</span>}
          {!isLoading && (
            <button onClick={downloadFile}>Download Text File</button>
          )}
          {!isLoading && times.length > 0 && (
            <button onClick={showTimes}>Show Times</button>
          )}
          {timeRes.total !== 0 && (
            <div className="time">
              <span>Average time: {timeRes.avg} ms</span>
              <span>Total time: {timeRes.total} ms </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
