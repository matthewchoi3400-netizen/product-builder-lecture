const generateBtn = document.getElementById('generate-btn');
const numberSpans = document.querySelectorAll('.number');
const themeBtn = document.getElementById('theme-btn');
const body = document.body;
const imageUpload = document.getElementById('image-upload');
const previewImage = document.getElementById('preview-image');
const labelContainer = document.getElementById('label-container');

// Theme Logic
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    themeBtn.textContent = savedTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
}

themeBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeBtn.textContent = newTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
});

// Lotto Generation Logic
generateBtn.addEventListener('click', () => {
    const lottoNumbers = new Set();
    while (lottoNumbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        lottoNumbers.add(randomNumber);
    }

    const sortedNumbers = Array.from(lottoNumbers).sort((a, b) => a - b);

    numberSpans.forEach((span, index) => {
        span.classList.remove('active');
        setTimeout(() => {
            span.textContent = sortedNumbers[index];
            span.style.transform = 'scale(1.1)';
            setTimeout(() => {
                span.style.transform = 'scale(1)';
            }, 100);
        }, index * 100);
    });
});

// Animal Face Test Logic (Teachable Machine)
const ANIMAL_URL = "https://teachablemachine.withgoogle.com/models/2bWrPxNKA/";
let animalModel, animalMaxPredictions;

async function loadModel() {
    const modelURL = ANIMAL_URL + "model.json";
    const metadataURL = ANIMAL_URL + "metadata.json";
    animalModel = await tmImage.load(modelURL, metadataURL);
    animalMaxPredictions = animalModel.getTotalClasses();
}

loadModel();

imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
        previewImage.src = event.target.result;
        previewImage.style.display = 'block';
        
        // Wait for image to load before predicting
        previewImage.onload = async () => {
            await predictAnimal();
        };
    };
    reader.readAsDataURL(file);
});

async function predictAnimal() {
    if (!animalModel) await loadModel();
    
    const prediction = await animalModel.predict(previewImage);
    labelContainer.innerHTML = '';
    
    for (let i = 0; i < animalMaxPredictions; i++) {
        const prob = (prediction[i].probability * 100).toFixed(0);
        const div = document.createElement('div');
        div.style.margin = "5px 0";
        div.innerHTML = `${prediction[i].className}: ${prob}%`;
        labelContainer.appendChild(div);
    }
}