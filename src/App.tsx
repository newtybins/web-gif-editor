import React, { useState, useEffect } from 'react';
import './App.css';

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg = createFFmpeg({ log: true });

interface AppProps {}

function App({}: AppProps) {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState<File | null>();

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  };

  // Load ffmpeg as the component is mounted
  useEffect(() => {
    load();
  }, []);

  return ready ? (
    <div>
      {video && (
        <video controls width={250} src={URL.createObjectURL(video)}></video>
      )}

      <input type="file" onChange={(e) => setVideo(e.target.files?.item(0))} />
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default App;
