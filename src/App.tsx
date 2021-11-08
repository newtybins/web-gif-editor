import React, { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import { Ring } from 'react-awesome-spinners';

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg = createFFmpeg({ log: true });

function App() {
    const [ready, setReady] = useState(false);
    const [video, setVideo] = useState<File | null>();
    const [gif, setGif] = useState<string>();

    const load = async () => {
        await ffmpeg.load();
        setReady(true);
    };

    // Load ffmpeg as the component is mounted
    useEffect(() => {
        load();
    }, []);

    const convertToGif = async () => {
        // Write the file to the memory
        ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(video));

        // Run the ffmpeg command
        await ffmpeg.run('-i', 'input.mp4', '-f', 'gif', 'out.gif');

        // Read the result
        const data = ffmpeg.FS('readFile', 'out.gif');

        // Create a URL
        const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));

        setGif(url);
    };

    return ready ? (
        <div className="font-sans text-xl">
            <Dropzone onDrop={files => setVideo(files[0])}>
                {({ getRootProps, getInputProps }) => (
                    <section className="grid justify-center mt-10">
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />

                            <p>Upload your video here (:</p>
                        </div>
                    </section>
                )}
            </Dropzone>

            {video && (
                <div className="grid justify-center mt-10">
                    <video controls width={250} src={URL.createObjectURL(video)}></video>

                    <button onClick={convertToGif} className="m-10">
                        Convert
                    </button>

                    {gif && <img src={gif} width={250} />}
                </div>
            )}
        </div>
    ) : (
        <div className="fixed top-1/4 left-1/2" style={{ transform: 'translate(-50%, -50%)' }}>
            <Ring color="#212121" size={128} />
        </div>
    );
}

export default App;
