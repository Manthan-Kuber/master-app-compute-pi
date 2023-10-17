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
    for (let i = 0; i < randomNumsArr.length; i++) {
      let urlObj = {
        url: "http://localhost:4000",
        file: "part_1.txt",
      };
      if (randomNumsArr[i] >= 45215800000000) {
        urlObj.url = "http://localhost:4001";
        urlObj.file = "part_2.txt";
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
