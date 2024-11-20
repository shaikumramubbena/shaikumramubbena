// App.js
import React, { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './App.css';

const App = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const handleAddUser = () => {
    setUserToEdit(null);
    setIsFormVisible(true);
  };

  const handleEditUser = (user) => {
    setUserToEdit(user);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setUserToEdit(null);
  };

  const handleUserSaved = () => {
    setIsFormVisible(false);
    setUserToEdit(null);
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <button onClick={handleAddUser}>Add User</button>
      {isFormVisible ? (
        <UserForm userToEdit={userToEdit} onUserSaved={handleUserSaved} onCancel={handleCancel} />
      ) : (
        <UserList onEdit={handleEditUser} />
      )}
    </div>
  );
};

export default App;
