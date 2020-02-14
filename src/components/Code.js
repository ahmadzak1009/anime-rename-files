import React from "react";

const Code = ({ code, show }) => {
  return (
    <>
      <h4 className="my-3 text-center">Output</h4>

      <textarea
        className="border rounded overflow-auto p-2 w-100"
        style={{ backgroundColor: "#F8F9FA", minHeight: "350px" }}
        value={code}
        readOnly
      />
      {show ? (
        <p className="text-danger small mb-5">
          * copy paste this code to command prompt
          <br />* please review the code before execute it
        </p>
      ) : null}
    </>
  );
};

export default Code;
