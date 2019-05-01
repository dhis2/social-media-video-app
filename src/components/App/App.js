import React, { useState } from 'react';
import Embed from '../Embed';

const style = { width: '40rem', display: 'block', margin: '1rem auto' };

function App() {
  const [url, setUrl] = useState('');

  return (
    <div>
      <input value={url} onChange={event => setUrl(event.target.value)} style={style} placeholder='Please enter a url to embed below' />
      <div style={style}>
        <Embed url={url} />      
      </div>
    </div>
  )
  
}

export default App;
