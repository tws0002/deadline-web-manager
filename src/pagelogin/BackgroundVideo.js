import React from 'react';

const BackgroundVideo = props => {
  const { url, ...others } = props;

  return (
    <div {...others}>
      <video loop muted autoPlay playsInline
        poster={url + '.jpg'}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
        }}
        src={url + '.mp4'}
      />
    </div>
  )
};

export default BackgroundVideo;