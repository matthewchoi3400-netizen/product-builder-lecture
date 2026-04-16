const generateBtn = document.getElementById('generate-btn');
const numberSpans = document.querySelectorAll('.number');
const themeBtn = document.getElementById('theme-btn');
const body = document.body;
const imageUpload = document.getElementById('image-upload');
const previewImage = document.getElementById('preview-image');
const labelContainer = document.getElementById('label-container');
const loadingSpinner = document.getElementById('loading-spinner');
const backToTop = document.getElementById('back-to-top');

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
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Back to Top Button
window.onscroll = function() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
};

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            span.style.transform = 'translateY(20px)';
            span.style.opacity = '0';
            setTimeout(() => {
                span.textContent = sortedNumbers[index];
                span.style.transform = 'translateY(0)';
                span.style.opacity = '1';
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
    span.style.boxShadow = `0 0 10px ${color}44`;
}

// Animal Face Test Logic (Teachable Machine)
const ANIMAL_URL = "https://teachablemachine.withgoogle.com/models/2bWrPxNKA/";
let animalModel, animalMaxPredictions;

async function loadModel() {
    try {
        if (loadingSpinner) loadingSpinner.style.display = 'block';
        const modelURL = ANIMAL_URL + "model.json";
        const metadataURL = ANIMAL_URL + "metadata.json";
        animalModel = await tmImage.load(modelURL, metadataURL);
        animalMaxPredictions = animalModel.getTotalClasses();
        if (loadingSpinner) loadingSpinner.style.display = 'none';
    } catch (e) {
        console.error("Model load failed", e);
        if (loadingSpinner) loadingSpinner.style.display = 'none';
    }
}

if (imageUpload) {
    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            previewImage.src = event.target.result;
            previewImage.style.display = 'block';
            document.getElementById('upload-placeholder').style.display = 'none';
            
            previewImage.onload = async () => {
                if (loadingSpinner) loadingSpinner.style.display = 'block';
                await predictAnimal();
                if (loadingSpinner) loadingSpinner.style.display = 'none';
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
    
    prediction.sort((a, b) => b.probability - a.probability);

    prediction.forEach(p => {
        const prob = (p.probability * 100).toFixed(0);
        const item = document.createElement('div');
        item.className = 'prediction-item';
        item.style.marginBottom = '20px';
        
        item.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="font-weight: 700;">${p.className}</span>
                <span style="font-weight: 700; color: var(--btn-bg);">${prob}%</span>
            </div>
            <div class="prob-bar" style="height: 12px; background: var(--number-border); border-radius: 6px; overflow: hidden;">
                <div style="width: ${prob}%; height: 100%; background: linear-gradient(90deg, #6e8efb, #a777e3); transition: width 0.8s ease-out;"></div>
            </div>
        `;
        labelContainer.appendChild(item);
    });
}