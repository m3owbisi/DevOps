import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiStatus, setApiStatus] = useState('');

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`);
      setApiStatus(`API Status: ${response.data.status} | DB: ${response.data.database}`);
    } catch (err) {
      setApiStatus('API Status: disconnected');
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch users: ' + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/users`, newUser);
      setNewUser({ name: '', email: '' });
      setError('');
      fetchUsers(); // Refresh the list
    } catch (err) {
      setError('Failed to create user: ' + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${API_BASE_URL}/users/${userId}`);
      fetchUsers(); // Refresh the list
    } catch (err) {
      setError('Failed to delete user: ' + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>3-Tier Application</h1>
        <p className="status">{apiStatus}</p>
      </header>

      <main>
        <section className="form-section">
          <h2>Add New User</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                disabled={loading}
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add User'}
            </button>
          </form>
          {error && <p className="error">{error}</p>}
        </section>

        <section className="users-section">
          <h2>Users ({users.length})</h2>
          {loading && users.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <div className="users-list">
              {users.length === 0 ? (
                <p>No users found. Add some users above!</p>
              ) : (
                users.map((user) => (
                  <div key={user.id} className="user-card">
                    <div className="user-info">
                      <strong>{user.name}</strong>
                      <br />
                      <span className="email">{user.email}</span>
                    </div>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="delete-btn"
                      title="Delete user"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;