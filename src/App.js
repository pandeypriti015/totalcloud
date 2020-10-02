import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './component/userList'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div><h3>Users Profile</h3></div>
      </header>
      <div className="main-container">
        <UserList></UserList>

      </div>
    </div>
  );
}

export default App;
