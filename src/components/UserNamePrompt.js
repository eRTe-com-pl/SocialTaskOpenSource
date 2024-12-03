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
    <div className="UserNamePrompt prompt ">
      <div className="UserNamePrompt-Content text-center">
        <h1>Welcome to SocialTask</h1>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="form-control UserNameInput"
            required
          />
          <button type="submit" className="btn btn-primary mt-2">
            Start
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserNamePrompt;