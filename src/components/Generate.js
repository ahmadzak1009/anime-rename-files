import React, { useState } from "react";

const Generate = ({ setCode, setShow }) => {
  const [path, setPath] = useState("");
  const [files, setFiles] = useState(null);
  const [formatFiles, setFormatFile] = useState(null);
  const [anime, setAnime] = useState("");
  const [id, setId] = useState("");

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

      const digit = String(data.episodes.length).match(/\d/g).length;

      let arr = [];
      data.episodes.forEach(eps => {
        arr.push(eps.title);
      });

      let cd = "";

      await files.forEach((file, index) => {
        cd += `REN "${path}\\${file}" "${anime} ${String(index + 1).padStart(digit, "0")} - ${arr[
          index
        ]
          .replace(/[/\\?*<>]/g, "")
          .replace(/[|]/g, "_")
          .replace(/[:]/g, ";")
          .replace(/["]/g, "'")}.${formatFiles[index]}"\r\n`;
      });

      setCode(cd);
      setShow(true);
    } catch (err) {
      window.alert(err);
    }
  };

  return (
    <>
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
    </>
  );
};

export default Generate;
