// UserList.js
import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../api';
import UserCard from './UserCard';
import ErrorMessage from './ErrorMessage';

const UserList = ({ onEdit }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError('Failed to load users.');
      }
    };

    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError('Failed to delete user.');
    }
  };

  return (
    <div>
      {error && <ErrorMessage message={error} />}
      <h2>User List</h2>
      <div>
        {users.map(user => (
          <UserCard key={user.id} user={user} onEdit={onEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
