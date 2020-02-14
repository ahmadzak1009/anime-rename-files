import React, { useState } from "react";

function App() {
  const [path, setPath] = useState("");
  const [files, setFiles] = useState(null);
  const [formatFiles, setFormatFile] = useState(null);
  const [anime, setAnime] = useState("");
  const [id, setId] = useState("");
  const [episode, setEpisode] = useState(null);
  const [code, setCode] = useState("click ganerate to get the output");
  const [show, setShow] = useState(false);

  const onFiles = e => {
    let arr = [];
    Array.from(e.target.files).forEach(file => {
      arr.push(file.name);
    });
    setFiles(arr);

    let arr_format = [];
    arr.forEach(file => {
      const arr2 = file.split(".");
      const format = arr2.splice(-1)[0];

      arr_format.push(format);
    });
    setFormatFile(arr_format);
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (!path || !files || !formatFiles || !anime || !id)
      return window.alert("please fill all input");

    try {
      const res = await fetch(`https://api.jikan.moe/v3/anime/${id}/episodes`);
      const data = await res.json();

      console.log(data);

      let arr = [];
      data.episodes.forEach(eps => {
        arr.push(eps.title);
      });
      setEpisode(arr);

      let cd = "";

      await files.forEach((file, index) => {
        cd += `REN "${path}\\${file}" "${anime} ${index + 1} - ${arr[index]}.${
          formatFiles[index]
        }"\r\n`;
      });

      setCode(cd);
      setShow(true);
    } catch (err) {
      window.alert(err);
    }
  };

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
            <h4 className="my-3 text-center">Input</h4>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="your-files">Your Anime Files</label>
                <input
                  type="file"
                  className="form-control p-1"
                  id="your-files"
                  multiple
                  onChange={onFiles}
                />
              </div>
              <div className="form-group">
                <label htmlFor="path">Directory Path</label>
                <input
                  type="text"
                  className="form-control"
                  id="path"
                  placeholder="example: D:\anime\Naruto"
                  onChange={e => setPath(e.target.value)}
                  value={path}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Anime Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="example: Naruto"
                  onChange={e => setAnime(e.target.value)}
                  value={anime}
                />
              </div>
              <div className="form-group">
                <label htmlFor="mal-id">MyAnimeList ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="mal-id"
                  placeholder="example: 37521"
                  onChange={e => setId(e.target.value)}
                  value={id}
                />
              </div>
              <div className="d-flex justify-content-center align-item-center ">
                <button type="submit" className="btn btn-primary mt-3">
                  Generate
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6 mx-auto">
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
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mx-auto">
            <h4 className="text-center my-5">How to use?</h4>
            <div className="embed-responsive embed-responsive-16by9 mb-5">
              <iframe
                title="how to use"
                className="embed-responsive-item "
                src="https://www.youtube.com/embed/A6qCAZ1la5U"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
