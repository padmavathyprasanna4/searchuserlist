// SearchUser.jsx
import React, { useEffect, useState } from "react";
import "./SearchUser.css";

export default function SearchUser() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch users when component mounts
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  // Update filtered list whenever search text changes
  useEffect(() => {
    const lower = search.toLowerCase();

    const result = users.filter((user) =>
      user.name.toLowerCase().includes(lower)
    );

    setFiltered(result);
  }, [search, users]);

  return (
    <div className="searchuser-container">
      <h1>Search User List</h1>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="searchuser-input"
      />

      {loading && <p className="searchuser-status">Loading users...</p>}

      {!loading && filtered.length === 0 && (
        <p className="searchuser-status">No users found.</p>
      )}

      {!loading && filtered.length > 0 && (
        <ul className="searchuser-list">
          {filtered.map((user) => (
            <li key={user.id} className="searchuser-item">
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
