import React from 'react';

/* eslint-disable */
const UrlList = (props) => {
  return (
    <ul>
    {
      props.urls.map((url) => {
        return (
            <li key={url.urlCode}>
                <p>{url.originalUrl} { props.count && <span> - {url.count} visit(s)</span> }</p>
                <p><a href={url.shortUrl} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a></p>
            </li>
        );
      })
    }
    </ul>
  )
}

export default UrlList;
