import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';

function Embed({ url }) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    if (url) {
      const encodedUrl = encodeURIComponent(url);
      fetch(`https://noembed.com/embed?url=${encodedUrl}`)
        .then(response => {
          if (!response.ok) {
            setHtml('');
            throw new Error('Response was not ok');
          }

          if (!response.json) {
            setHtml('');
            throw new Error('No json in response');
          }

          return response.json();
        })
        .then(data => {
          if (!data.html) {
            setHtml('');
            throw new Error('No html in response');
          }
  
          setHtml(data.html);
        })
        .catch(error => console.error(error))
    }
  });

  if (!url) {
    return <div>Need an url to fetch</div>;
  }

  if (!html) {
    return <div>No html available.</div>;
  }

  // Could expose users to an XSS attack
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

Embed.propTypes = {
  url: string
};

export default Embed;
