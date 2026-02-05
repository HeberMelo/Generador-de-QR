
const qrTextInput = document.getElementById('qrText');
const qrSizeInput = document.getElementById('qrSize');
const qrColorInput = document.getElementById('qrColor');
const bgColorInput = document.getElementById('bgColor');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrContainer = document.getElementById('qrContainer');

let qrCode = null;

// Función para generar el código QR
function generateQRCode() {
    const text = qrTextInput.value.trim();
    
    // Validar que hay texto
    if (!text) {
        alert('Por favor, ingresa un texto o URL');
        qrTextInput.focus();
        return;
    }

    // Obtener configuración
    const size = parseInt(qrSizeInput.value);
    const colorDark = qrColorInput.value;
    const colorLight = bgColorInput.value;

    // Limpiar contenedor completamente
    qrContainer.innerHTML = '';

    // Crear nuevo código QR
    qrCode = new QRCode(qrContainer, {
        text: text,
        width: size,
        height: size,
        colorDark: colorDark,
        colorLight: colorLight,
        correctLevel: QRCode.CorrectLevel.H
    });

    // Mostrar botón de descarga
    setTimeout(() => {
        downloadBtn.style.display = 'block';
    }, 100);
}

// Función para descargar el QR
function downloadQR() {
    const img = qrContainer.querySelector('img');
    
    if (!img) {
        alert('Primero debes generar un código QR');
        return;
    }

    // Crear enlace de descarga
    const link = document.createElement('a');
    link.href = img.src;
    link.download = `codigo-qr-${Date.now()}.png`;
    

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

generateBtn.addEventListener('click', generateQRCode);
downloadBtn.addEventListener('click', downloadQR);

// Generar QR al presionar Enter en el textarea
qrTextInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        generateQRCode();
    }
});


qrColorInput.addEventListener('change', () => {
    if (qrTextInput.value.trim()) {
        generateQRCode();
    }
});

bgColorInput.addEventListener('change', () => {
    if (qrTextInput.value.trim()) {
        generateQRCode();
    }
});

qrSizeInput.addEventListener('change', () => {
    if (qrTextInput.value.trim()) {
        generateQRCode();
    }
});



