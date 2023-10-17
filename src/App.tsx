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

  useEffect(() => {
    if (result.length === randomNumsArr.length) setIsFileFilled(true);
  }, [result]);

  const getPi = async () => {
    setIsLoading(true);
    for (let i = 0; i < 5; i++) {
      let urlObj = {
        url: "http://localhost:4000",
        file: "part_1.txt",
      };
      if (randomNumsArr[i] >= 45215800000000) {
        urlObj.url = "http://localhost:4001";
        urlObj.file = "part_2.txt";
      }
      try {
        const res = await axios(
          `${urlObj.url}/compute-pi/${randomNumsArr[i]}/${urlObj.file}`
        );
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
    setResult([""])
    URL.revokeObjectURL(link.href);
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
        </div>
      </div>
    </>
  );
}

export default App;
