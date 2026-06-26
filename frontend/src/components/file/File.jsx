import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const File = () => {
  const { fileId } = useParams();

  const [file, setFile] = useState(null);

  useEffect(() => {
    loadFile();
  }, []);

  const loadFile = async () => {
    try {
      const response = await fetch(`http://localhost:3002/file/view/${fileId}`);
      const data = await response.json();
      setFile(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>{file?.name}</h2>

      <hr />

      <pre
        style={{
            background: "#ffffff",
            color: "#000000",
            padding: "20px",
            border: "1px solid #d0d7de",
            borderRadius: "8px",
            whiteSpace: "pre-wrap",
            minHeight: "400px",
            fontFamily: "monospace",
            fontSize: "15px",
        }}
        >
        {file?.content}
        </pre>
    </div>
  );
};

export default File;