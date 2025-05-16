// DOM Elements
const audioUpload = document.getElementById('audio-upload');
const convertButton = document.querySelector('button');
const audioPlayer = document.querySelector('.audio-player');

// State
let selectedFile = null;
let isConverting = false;

// Event Listeners
audioUpload.addEventListener('change', handleFileSelect);
convertButton.addEventListener('click', handleConvert);

// Handle file selection
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('audio/')) {
        selectedFile = file;
        // Update UI to show selected file
        const fileName = document.createElement('p');
        fileName.textContent = `Selected: ${file.name}`;
        fileName.className = 'text-sm text-gray-600 mt-2';
        audioUpload.parentElement.appendChild(fileName);
    } else {
        alert('Please select a valid audio file');
    }
}

// Handle conversion
async function handleConvert() {
    if (!selectedFile) {
        alert('Please select an audio file first');
        return;
    }

    if (isConverting) {
        return;
    }

    try {
        isConverting = true;
        convertButton.disabled = true;
        convertButton.classList.add('loading');
        convertButton.textContent = 'Converting...';

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Update UI with success
        const successMessage = document.createElement('div');
        successMessage.className = 'text-green-600 text-sm mt-2';
        successMessage.textContent = 'Conversion completed successfully!';
        convertButton.parentElement.appendChild(successMessage);

    } catch (error) {
        console.error('Conversion failed:', error);
        alert('Conversion failed. Please try again.');
    } finally {
        isConverting = false;
        convertButton.disabled = false;
        convertButton.classList.remove('loading');
        convertButton.textContent = 'Convert Voice';
    }
}

// Drag and drop functionality
const dropZone = document.querySelector('.border-dashed');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
    dropZone.classList.add('border-indigo-500');
}

function unhighlight(e) {
    dropZone.classList.remove('border-indigo-500');
}

dropZone.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const file = dt.files[0];
    
    if (file && file.type.startsWith('audio/')) {
        audioUpload.files = dt.files;
        handleFileSelect({ target: { files: [file] } });
    } else {
        alert('Please drop a valid audio file');
    }
} 