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