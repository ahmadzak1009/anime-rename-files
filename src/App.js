import React, { useState } from "react";
import Generate from "./components/Generate";
import Code from "./components/Code";
import Tutorial from "./components/Tutorial";

function App() {
  const [code, setCode] = useState("click ganerate to get the output");
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="container-fluid">
        <div className="row bg-dark">
          <div className="col-md">
            <h1 className="text-white text-center">
              Anime Rename Files <span className="small">v1</span>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-5 mx-auto">
            <Generate setCode={setCode} setShow={setShow} />
          </div>
          <div className="col-md-6 mx-auto">
            <Code code={code} show={show} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mx-auto">
            <Tutorial />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
