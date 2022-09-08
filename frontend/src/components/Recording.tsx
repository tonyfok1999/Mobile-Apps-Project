// import React from 'react'





let mediaRecorder: MediaRecorder




export  async function recordingInit() {
	 mediaRecorder = await navigator.mediaDevices
		.getUserMedia({ audio: true })
		.then((stream) => {
			let mediaRecorder = new MediaRecorder(stream)

			console.log('getUserMedia supported.')
			return mediaRecorder
		})
	console.log(mediaRecorder)
}


	// let chunks: any = []

	// 	mediaRecorder.ondataavailable = function (e) {
	// 	chunks.push(e.data)
	// 	console.log(chunks)
	// 	console.log(mediaRecorder.state)
	
	// }
	



	// async function startRecord() {
	// 	mediaRecorder.start()
	// 	console.log(mediaRecorder.state)

	// 	console.log('recorder started')
	// }

	// async function stopRecord() {

	// 	if (mediaRecorder.state == 'recording') {
    //      console.log(mediaRecorder.state)
	// 		mediaRecorder.requestData()
         
	// 		mediaRecorder.stop()
	// 	}
	// 	// console.log(mediaRecorder.state)
	// 	// console.log('recorder stopped')
	// }

