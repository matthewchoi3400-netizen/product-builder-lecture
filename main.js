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

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Lotto Generation Logic
if (generateBtn) {
    generateBtn.addEventListener('click', () => {
        const lottoNumbers = new Set();
        while (lottoNumbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            lottoNumbers.add(randomNumber);
        }

        const sortedNumbers = Array.from(lottoNumbers).sort((a, b) => a - b);

        numberSpans.forEach((span, index) => {
            span.style.transform = 'scale(0.5)';
            span.style.opacity = '0';
            setTimeout(() => {
                span.textContent = sortedNumbers[index];
                span.style.transform = 'scale(1)';
                span.style.opacity = '1';
                // Add color classes based on number range (optional enhancement)
                updateNumberColor(span, sortedNumbers[index]);
            }, index * 100);
        });
    });
}

function updateNumberColor(span, num) {
    let color = '#ccc';
    if (num <= 10) color = '#fbc400';
    else if (num <= 20) color = '#69c8f2';
    else if (num <= 30) color = '#ff7272';
    else if (num <= 40) color = '#aaa';
    else color = '#b0d840';
    span.style.borderColor = color;
}

// Animal Face Test Logic (Teachable Machine)
const ANIMAL_URL = "https://teachablemachine.withgoogle.com/models/2bWrPxNKA/";
let animalModel, animalMaxPredictions;

async function loadModel() {
    try {
        const modelURL = ANIMAL_URL + "model.json";
        const metadataURL = ANIMAL_URL + "metadata.json";
        animalModel = await tmImage.load(modelURL, metadataURL);
        animalMaxPredictions = animalModel.getTotalClasses();
    } catch (e) {
        console.error("Model load failed", e);
    }
}

if (imageUpload) {
    loadModel();

    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            previewImage.src = event.target.result;
            previewImage.style.display = 'block';
            
            previewImage.onload = async () => {
                await predictAnimal();
            };
        };
        reader.readAsDataURL(file);
    });
}

async function predictAnimal() {
    if (!animalModel) await loadModel();
    if (!animalModel) return;
    
    const prediction = await animalModel.predict(previewImage);
    labelContainer.innerHTML = '';
    
    // Sort prediction by probability
    prediction.sort((a, b) => b.probability - a.probability);

    prediction.forEach(p => {
        const prob = (p.probability * 100).toFixed(0);
        const item = document.createElement('div');
        item.className = 'prediction-item';
        item.style.marginBottom = '15px';
        
        item.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <span>${p.className}</span>
                <span>${prob}%</span>
            </div>
            <div class="prob-bar">
                <div style="width: ${prob}%; height: 100%; background: var(--btn-bg); transition: width 0.5s;"></div>
            </div>
        `;
        labelContainer.appendChild(item);
    });
}