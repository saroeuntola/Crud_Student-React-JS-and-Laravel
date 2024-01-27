import React, { useState } from 'react'
 


const Contact = () => {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("");
  const data ={
    Username,
    Email,
    Message
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
        console.log (data)
    }
    catch(err){
        console.log(err)
    }
    
  };

  return (
    <main className="container">
      <h2 className='px-4'>Contact Us</h2>
      <form>
        <div className="mb-3 mt-2">
          <label className="form-label">Username</label>
          <input type="text" className="form-control shadow-none border-3" 
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control shadow-none border-3" 
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">
            Message
          </label>
          <textarea
            class="form-control shadow-none border-3"
            rows="4"
            value={Message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" onClick={handleSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    </main>
  );
}

export default Contact