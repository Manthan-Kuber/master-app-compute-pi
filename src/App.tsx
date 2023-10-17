import { useState } from "react";
import axios from "axios";
import "./App.css";

type resType = {
  x: string | null;
  pi_x: string | null;
  error: boolean;
};

function App() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<string | null>("");
  const [isErr, setIsErr] = useState(false);

  const getPi = async () => {
    let urlObj = {
      url: "http://localhost:4000",
      file: "part_1.txt",
    };
    if (parseInt(value) >= 45215800000000) {
      urlObj.url = "http://localhost:4001";
      urlObj.file = "part_2.txt";
    }
    try {
      const res = await axios(
        `${urlObj.url}/compute-pi/${value}/${urlObj.file}`
      );
      const { x, pi_x, error }: resType = res.data;
      setResult(pi_x);
      setIsErr(error);
    } catch (e) {
      console.log(e);
      setIsErr(true);
    }
  };

  return (
    <>
      <h1>Compute Pi</h1>
      <div className="card">
        <p>Enter value of x</p>
        <div className="input-wrapper" >
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <button onClick={getPi}>Compute</button>
        </div>
        {result && <p>The value of pi(x) is: {result}</p>}
      </div>
    </>
  );
}

export default App;
