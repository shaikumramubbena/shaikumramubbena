//UserForm.js
import React, { useState, useEffect } from 'react';
import { addUser, updateUser } from '../api';
import ErrorMessage from './ErrorMessage';

const UserForm = ({ userToEdit, onUserSaved, onCancel }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    company: { name: '' },
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (userToEdit) {
      setUser({
        name: userToEdit.name,
        email: userToEdit.email,
        company: { name: userToEdit.company.name },
      });
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name' || name === 'email') {
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        company: { ...prevUser.company, name: value },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userToEdit) {
        await updateUser(userToEdit.id, user);
      } else {
        await addUser(user);
      }
      onUserSaved();
    } catch (err) {
      setError('Failed to save user.');
    }
  };

  return (
    <div>
      {error && <ErrorMessage message={error} />}
      <h2>{userToEdit ? 'Edit User' : 'Add New User'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={user.company.name}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default UserForm;
