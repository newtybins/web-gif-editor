import React, { useState, useEffect } from 'react';
import './App.css';

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg = createFFmpeg({ log: true });

interface AppProps {}

function App({}: AppProps) {
  const [ready, setReady] = useState(false);

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  };

  // Load ffmpeg as the component is mounted
  useEffect(() => {
    load();
  }, []);

  return ready ? <div></div> : <p>Loading...</p>;
}

export default App;
