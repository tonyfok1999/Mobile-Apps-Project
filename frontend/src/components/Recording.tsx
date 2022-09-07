
import React from 'react'
export default async function Recording() {
     await navigator.mediaDevices.getUserMedia({audio:true}).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
     })
    }