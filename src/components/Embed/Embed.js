import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import { extract } from 'oembed-parser';

function Embed({ url }) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    if (url) {
      extract(url)
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
