import { useState } from 'react';
import axios from 'axios';
import sparrow from "./../sparrow.png"

const projectID = process.env.REACT_APP_CHAT_ENGINE_ID;

const Modal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': password };

    try {
      await axios.get('https://api.chatengine.io/chats', { headers: authObject });

      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      window.location.reload();
      setError('');
    } catch (err) {
      setError('Oops!! incorrect credentials.');
    }
  };

  return (
    <div  className="wrapper min-h-screen ">
      <div className="form">
     <div style={{display:'flex',alignItems:"center",justifyContent:"center",marginRight:"30px"}}>

      <img className='' style={{height:'90px',marginBottom:'20px',marginLeft:"10px"}} src={sparrow} alt=""  />
        <h1 className="title">Chat Sparrow</h1>
     </div>
      
        <form onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
          <div align="center">
            <button type="submit" className="button">
              <span>Start chatting</span>
            </button>
          </div>
        </form>
        <h1>{error}</h1>
      </div>
    </div>

  );
};

export default Modal;