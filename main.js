const generateBtn = document.getElementById('generate-btn');
const numberSpans = document.querySelectorAll('.number');
const themeBtn = document.getElementById('theme-btn');
const body = document.body;

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
        // Add a small delay for animation effect
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
let animalModel, animalWebcam, animalLabelContainer, animalMaxPredictions;

async function initAnimalTest() {
    document.getElementById('start-webcam-btn').style.display = 'none';
    const modelURL = ANIMAL_URL + "model.json";
    const metadataURL = ANIMAL_URL + "metadata.json";

    animalModel = await tmImage.load(modelURL, metadataURL);
    animalMaxPredictions = animalModel.getTotalClasses();

    const flip = true;
    animalWebcam = new tmImage.Webcam(200, 200, flip);
    await animalWebcam.setup();
    await animalWebcam.play();
    window.requestAnimationFrame(animalLoop);

    document.getElementById("webcam-container").appendChild(animalWebcam.canvas);
    animalLabelContainer = document.getElementById("label-container");
    for (let i = 0; i < animalMaxPredictions; i++) {
        animalLabelContainer.appendChild(document.createElement("div"));
    }
}

async function animalLoop() {
    animalWebcam.update();
    await animalPredict();
    window.requestAnimationFrame(animalLoop);
}

async function animalPredict() {
    const prediction = await animalModel.predict(animalWebcam.canvas);
    for (let i = 0; i < animalMaxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + (prediction[i].probability * 100).toFixed(0) + "%";
        animalLabelContainer.childNodes[i].innerHTML = classPrediction;
    }
}