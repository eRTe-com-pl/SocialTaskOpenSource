import React, { useState } from "react";

function UserNamePrompt({ onSubmit }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username);
    }
  };

  return (
    <div className="UserNamePrompt">
      <div className="UserNamePrompt-Content">
        <h1>Welcome to SocialTask</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="UserNameInput"
            required
          />
          <button type="submit" className="Button Primary">
            Start
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserNamePrompt;