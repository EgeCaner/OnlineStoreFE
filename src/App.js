import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';

function App() {

  const [username,setUsername] = useState("");
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")

  const handleSubmit= (e) => {
    e.preventDefault();
    console.log(username,email,password);

  }

  return (
    <React.Fragment>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <section className="section">
<form className="form" onSubmit={handleSubmit}>
  <div className="form-control">
  <label htmlFor="username">Username</label>
  <input className="form-input" type="text" id="username" name="username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
  </div>
  <div className="form-control">
  <label htmlFor="email">Email</label>
  <input className="form-input" type="text" id="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
  </div>
  <div className="form-control">
  <label htmlFor="username">Password</label>
  <input className="form-input" type="text" id="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
  </div>
  <button className="answer-btn" type="submit ">Register</button>

</form>


        </section>
            </header>
    </div>
    </React.Fragment>
  );
}

export default App;
