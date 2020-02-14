import React from "react";

const Tutorial = props => {
  return (
    <>
      <h4 className="text-center my-5">How to use?</h4>
      <div className="embed-responsive embed-responsive-16by9 mb-5">
        <iframe
          allowFullScreen
          title="how to use"
          className="embed-responsive-item"
          src="https://www.youtube.com/embed/A6qCAZ1la5U"
        ></iframe>
      </div>
    </>
  );
};

export default Tutorial;
