import { useRef, useEffect } from 'react';
import jsQr from "jsqr";

import Icon from './Icon';

const QrReader = ({ hideModal, qrReaderLoading, setQrReaderLoading, setCode }) => {
    const video = document.createElement('video')
    const canvas = useRef(null)

    useEffect(() => {
        let localstream

        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                facingMode: 'environment'
            }
        })
            .then(stream => {
                setQrReaderLoading(true)
                localstream = stream
                video.setAttribute("playsinline", true);
                video.srcObject = stream;
                return video.play() 
            })
            .then(() => {
                setQrReaderLoading(false)
                requestAnimationFrame(tick)
            })
            .catch(error => {
                console.log(error)
            })

        return () => localstream.getTracks()[0].stop()
    }, [])

    const tick = () => {
        if (video.readyState === video.HAVE_ENOUGH_DATA && canvas?.current) {
            const canvasElement = canvas.current
            const ctx = canvasElement.getContext('2d')
            const res = video.videoHeight / video.videoWidth
            const canvasWidth = canvasElement.width
            canvasElement.height = res * canvasWidth

            ctx.drawImage(video, 0, 0, canvasElement.width, canvasElement.height)
            
            const imageData = ctx.getImageData(0, 0, canvasElement.width - 1, canvasElement.height - 1)
            const code = jsQr(imageData.data, imageData.width, imageData.height)
            if (code) {
                setCode(code)
                hideModal()
            }
            requestAnimationFrame(tick)
        }
    }

    return (
        <>
            { 
                qrReaderLoading 
                    ? <Icon 
                        className="animate-spin block mx-auto" 
                        name="spinner" 
                        width="30" 
                        height="30" 
                    />  
                    : <canvas ref={canvas} className="w-full"></canvas>
            }
        </>
    );
}

export default QrReader