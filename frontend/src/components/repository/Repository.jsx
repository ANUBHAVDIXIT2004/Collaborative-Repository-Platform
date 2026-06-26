import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Repository = () => {
  const { repoId } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [repo, setRepo] = useState(null);
  const currentUser = localStorage.getItem("userId");
  const isOwner = repo?.owner?._id === currentUser;
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [commitMessage, setCommitMessage] = useState("");
  const [starred, setStarred] = useState(false);
  const [starLoading, setStarLoading] = useState(false);
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    loadRepository();
    loadFiles();
    checkStar();
    loadCommits();
  }, []);

  const loadRepository = async () => {
    try {
      const response = await fetch(`http://localhost:3002/repo/${repoId}`);
      const data = await response.json();

      console.log("Repository API:", data);

      if (Array.isArray(data)) {
        setRepo(data[0]);
      } else {
        setRepo(data);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const loadFiles = async () => {
    try {
      const response = await fetch(`http://localhost:3002/file/${repoId}`);
      const data = await response.json();

      if (Array.isArray(data))
        setFiles(data);
    } catch (err) {
      console.log(err);
    }
  };
  const loadCommits = async () => {
    try {

      const response = await fetch(
        `http://localhost:3002/commit/${repoId}`
      );

      const data = await response.json();

      setCommits(data);

    } catch (err) {
      console.log(err);
    }
  };
  const checkStar = async () => {
    try {
      const response = await fetch(
        `http://localhost:3002/starred/${currentUser}`
      );

      const data = await response.json();

      const exists = data.some((repo) => repo._id === repoId);

      setStarred(exists);

    } catch (err) {
      console.log(err);
    }
  };

  const createFile = async () => {

      if (!name.trim()) {
        alert("Filename is required");
        return;
      }

      try {

        const response = await fetch(
          "http://localhost:3002/file/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                repoId,
                name,
                content,
                userId: currentUser,
                commitMessage
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message);
          return;
        }

        setName("");
        setContent("");
        setCommitMessage("");
        setShowForm(false);

        loadFiles();
        loadCommits();

      } catch (err) {
        console.log(err);
      }
    };

    const toggleStar = async () => {

  if (starLoading) return;

  setStarLoading(true);

  try {

    const response = await fetch(
          "http://localhost:3002/star",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: currentUser,
              repoId,
            }),
          }
        );

        const data = await response.json();

        setStarred(data.starred);

        // ⭐ Update the star count immediately
        setRepo((prev) => ({
          ...prev,
          stars: data.stars,
        }));

      } catch (err) {
        console.log(err);
      }

      setStarLoading(false);
    };

    const deleteRepository = async () => {

    const confirmDelete = window.confirm(
        "⚠️ Are you sure you want to delete this repository?\n\nThis action cannot be undone."
      );

      if (!confirmDelete) return;

      try {

        const response = await fetch(
          `http://localhost:3002/repo/delete/${repoId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: currentUser,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.error);
          return;
        }

        alert("Repository deleted successfully!");

        navigate("/");

      } catch (err) {
        console.log(err);
      }

    };

    const deleteFile = async (fileId) => {

  const commitMessage = prompt("Enter commit message");

  if (!commitMessage) return;

  try {

    const response = await fetch(
      `http://localhost:3002/file/${fileId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser,
          commitMessage,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    loadFiles();
    loadCommits();

  } catch (err) {
    console.log(err);
  }

};

  return (
    <div style={{ padding: "30px" }}>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1>{repo?.name}</h1>
          <p>{repo?.description}</p>
        </div>

        <button
          onClick={toggleStar}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          {starred ? "⭐ Starred" : "⭐ Star"} ({repo?.stars || 0})
        </button>
        {isOwner && (
          <button
            onClick={deleteRepository}
            style={{
              background: "#da3633",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            🗑 Delete
          </button>
        )}
      </div>

      <hr />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            marginBottom: "30px",
            border: "1px solid #30363d",
            borderRadius: "8px",
            padding: "20px",
            background: "#161b22",
          }}
        >

          <h2 style={{ marginBottom: "15px" }}>
            Commit History
          </h2>

          {
            commits.length === 0
            ?
            <p>No commits yet.</p>

            :

            commits.map(commit => (

              <div
                key={commit._id}
                style={{
                  borderBottom: "1px solid #30363d",
                  padding: "12px 0"
                }}
              >

                <div
                  style={{
                    fontWeight: "bold"
                  }}
                >
                  {commit.message}
                </div>

                <div
                  style={{
                    fontSize: "14px",
                    color: "#8b949e"
                  }}
                >
                  {commit.action} • {commit.fileName}
                </div>

                <div
                  style={{
                    fontSize: "13px",
                    color: "#6e7681"
                  }}
                >
                  {commit.author?.username} •{" "}
                  {new Date(commit.createdAt).toLocaleString()}
                </div>

              </div>

            ))
          }

        </div>
        <h2>Files</h2>

        {
          isOwner && (
            <button onClick={() => setShowForm(!showForm)}>
              {showForm ? "Cancel" : "Add File"}
            </button>
          )
        }
      </div>

        {
          showForm && (
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <input
                type="text"
                placeholder="Filename (e.g. index.js)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "15px",
                }}
              />

              <textarea
                placeholder="File content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "15px",
                }}
              />

              <input
                  type="text"
                  placeholder="Commit message"
                  value={commitMessage}
                  onChange={(e)=>setCommitMessage(e.target.value)}
                  style={{
                      width:"100%",
                      padding:"10px",
                      marginBottom:"15px"
                  }}
              />

              <button onClick={createFile}>
                Create File
              </button>
            </div>
          )
        }
      {
        files.length === 0
        ?
        <p>No files yet.</p>
        :
        files.map(file => (
          <div
            key={file._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              borderBottom: "1px solid #ddd",
            }}
          >

            <div
              onClick={() => navigate(`/repo/${repoId}/file/${file._id}`)}
              style={{
                cursor: "pointer",
                flex: 1,
              }}
            >
              📄 {file.name}
            </div>

            {isOwner && (
              <button
                onClick={() => deleteFile(file._id)}
                style={{
                  background: "#da3633",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            )}

          </div>
        ))
      }

    </div>
  );
};

export default Repository;