'use strict';
let videoElement;
let resultElement;
let html5QrCode; 


function initElement() {
    videoElement = document.getElementById('videoElement'); 
    resultElement = document.getElementById('result');      
}


function startCameraFeed() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            videoElement.srcObject = stream;
            videoElement.play(); 
            startQRScanner(); 
        })
        .catch(function (err) {
            console.error("Error accessing camera: " + err);
            resultElement.innerHTML = "Error accessing camera: " + err.message;
        });
}


function startQRScanner() {

    html5QrCode = new Html5Qrcode("qr-reader");


    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        console.log(`Decoded Text: ${decodedText}`);
        resultElement.innerHTML = `Scanned USN: ${decodedText}`; 
    };

 
    const qrCodeErrorCallback = (errorMessage) => {
        console.log(`QR Code scanning failed: ${errorMessage}`); 
    };

   
    html5QrCode.start(
        { facingMode: "environment" }, 
        {
            fps: 10,    
            qrbox: { width: 250, height: 250 }
        },
        qrCodeSuccessCallback,
        qrCodeErrorCallback
    ).catch(err => {
        console.error("Unable to start scanning: ", err);
        resultElement.innerHTML = "Unable to start scanning: " + err.message;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initElement();

  
    if (typeof Html5Qrcode !== 'undefined') {
        startCameraFeed();
    } else {
        console.error("Html5Qrcode is not loaded.");
        resultElement.innerHTML = "Error: QR code scanner not initialized.";
    }
});



