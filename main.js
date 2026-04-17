const generateBtn = document.getElementById('generate-btn');
const numberSpans = document.querySelectorAll('.number');
const themeBtn = document.getElementById('theme-btn');
const body = document.body;
const imageUpload = document.getElementById('image-upload');
const previewImage = document.getElementById('preview-image');
const labelContainer = document.getElementById('label-container');
const loadingSpinner = document.getElementById('loading-spinner');
const backToTop = document.getElementById('back-to-top');
const langSelect = document.getElementById('lang-select');

// TTS Elements
const ttsInput = document.getElementById('tts-input');
const ttsExecuteBtn = document.getElementById('tts-execute-btn');
const ttsPlayBtn = document.getElementById('tts-play-btn');
const ttsDownloadBtn = document.getElementById('tts-download-btn');
const ttsStatus = document.getElementById('tts-status');
const ttsAudio = document.getElementById('tts-audio');
const ttsSpeedInput = document.getElementById('tts-speed');
const ttsSpeedValueDisplay = document.getElementById('tts-speed-value');

if (ttsSpeedInput) {
    ttsSpeedInput.addEventListener('input', (e) => {
        if (ttsSpeedValueDisplay) ttsSpeedValueDisplay.textContent = e.target.value;
    });
}

let ttsAudioBlob = null;
let ttsAudioUrl = null;

// Translations
const translations = {
    ko: {
        head_title: "AI Portal - 동물상 테스트 & 로또 확률 분석",
        nav_animal: "동물상 테스트",
        nav_lotto: "로또 생성기",
        nav_about: "사이트 소개",
        nav_contact: "문의",
        nav_blog: "지식 센터",
        nav_tts: "TTS 변환",
        hero_title: "당신의 특징과 행운을 분석하는 AI 포털",
        hero_subtitle: "데이터와 인공지능이 제안하는 새로운 경험을 만나보세요.",
        hero_btn_animal: "동물상 테스트",
        hero_btn_lotto: "로또 번호 생성",
        hero_btn_blog: "AI 지식 센터",
        hero_btn_tts: "TTS 변환",
        animal_title: "AI 동물상 테스트",
        animal_desc: "사진 한 장으로 분석하는 나의 동물상! 강아지, 고양이 중 당신은 어떤 타입일까요? AI가 정밀하게 분석합니다.",
        upload_text: "클릭하여 사진을 업로드하세요",
        loading_text: "AI가 분석 중입니다...",
        how_it_works_title: "어떻게 분석되나요? (Deep Learning)",
        how_1_title: "1. 데이터 학습",
        how_1_desc: "수십만 장의 동물 사진 데이터를 CNN(합성곱 신경망) 알고리즘으로 사전 학습한 모델을 사용합니다.",
        how_2_title: "2. 특징 추출",
        how_2_desc: "업로드된 이미지에서 눈매, 턱선, 코의 각도 등 얼굴의 핵심 특징점을 실시간으로 추출합니다.",
        how_3_title: "3. 확률 매칭",
        how_3_desc: "학습된 데이터와 비교하여 가장 높은 일치율을 보이는 동물상을 퍼센트(%) 단위로 보여드립니다.",
        lotto_title: "스마트 로또 번호 생성기",
        lotto_desc: "엄격한 난수 발생 알고리즘을 통해 추출된 행운의 6개 번호입니다. 매주 새로운 행운에 도전해보세요.",
        lotto_btn: "행운의 번호 생성하기",
        lotto_tips_title: "로또 번호 선택 팁",
        lotto_tip_1: "균형 있는 조합: 홀수와 짝수의 비율을 3:3 또는 2:4 정도로 섞는 것이 통계적으로 안정적입니다.",
        lotto_tip_2: "연속 번호 피하기: 1, 2, 3처럼 3개 이상의 연속 번호가 나올 확률은 매우 낮습니다.",
        lotto_tip_3: "총합의 범위: 선택한 6개 번호의 총합이 100에서 170 사이에 위치하는 경우가 가장 많습니다.",
        tts_title: "AI 음성 변환 (TTS)",
        tts_desc: "텍스트를 자연스러운 음성으로 변환해보세요. 입력한 텍스트가 WAV 파일로 생성됩니다.",
        tts_placeholder: "변환할 내용을 입력하세요...",
        tts_btn_execute: "TTS 실행",
        tts_btn_play: "Play",
        tts_btn_download: "다운로드",
        tts_status_loading: "음성 파일 생성 중...",
        tts_status_success: "성공: 음성 파일이 준비되었습니다.",
        tts_status_error: "API 호출 실패: 서버 연결을 확인하세요.",
        faq_title: "자주 묻는 질문 (FAQ)",
        faq_q1: "Q. 사진 데이터는 안전하게 보호되나요?",
        faq_a1: "A. 네, 본 서비스는 브라우저 기반 AI를 사용합니다. 업로드하신 사진은 서버로 전송되지 않으며, 분석 즉시 메모리에서 삭제됩니다.",
        faq_q2: "Q. 로또 번호 생성 알고리즘은 무엇인가요?",
        faq_a2: "A. JavaScript의 Math.random()을 기반으로 하되, 중복을 완벽히 제거한 1~45 사이의 난수를 생성합니다.",
        contact_title: "제휴 및 개선 제안",
        contact_desc: "여러분의 소중한 의견은 더 나은 서비스를 만드는 밑거름이 됩니다.",
        contact_placeholder_name: "성함 또는 업체명",
        contact_placeholder_email: "답변 받으실 이메일 주소",
        contact_placeholder_message: "제안하고 싶은 내용이나 불편사항을 적어주세요",
        contact_btn: "문의 내용 전송하기",
        comment_title: "커뮤니티 피드백",
        footer_text: "© 2024 AI Portal Project. 고품질 정보와 도구를 제공합니다.",
        footer_home: "홈",
        footer_about: "사이트 소개",
        footer_privacy: "개인정보 처리방침",
        footer_contact: "문의하기"
    },
    en: {
        head_title: "AI Portal - Animal Face Test & Lotto Analysis",
        nav_animal: "Animal Test",
        nav_lotto: "Lotto Generator",
        nav_about: "About",
        nav_contact: "Contact",
        nav_blog: "Knowledge Center",
        nav_tts: "TTS Conv",
        hero_title: "AI Portal for Analyzing Your Traits & Luck",
        hero_subtitle: "Experience new insights provided by data and AI.",
        hero_btn_animal: "Animal Test",
        hero_btn_lotto: "Lotto Generator",
        hero_btn_blog: "Knowledge Center",
        hero_btn_tts: "TTS Conv",
        animal_title: "AI Animal Face Test",
        animal_desc: "Analyze your face with just one photo! Find out your animal type with precision AI.",
        upload_text: "Click to upload your photo",
        loading_text: "AI is analyzing...",
        how_it_works_title: "How does it work? (Deep Learning)",
        how_1_title: "1. Data Training",
        how_1_desc: "Pre-trained on animal photos using CNN algorithms.",
        how_2_title: "2. Feature Extraction",
        how_2_desc: "Facial features like eyes and jawline are extracted in real-time.",
        how_3_title: "3. Probability Matching",
        how_3_desc: "Shows the matching animal type in percentages.",
        lotto_title: "Smart Lotto Number Generator",
        lotto_desc: "Lucky 6 numbers generated through a random algorithm.",
        lotto_btn: "Generate Lucky Numbers",
        lotto_tips_title: "Lotto Number Selection Tips",
        lotto_tip_1: "Balanced: Mix odd and even numbers in 3:3 or 2:4.",
        lotto_tip_2: "Consecutive: Avoid 3 or more consecutive numbers.",
        lotto_tip_3: "Sum: Total sum often between 100 and 170.",
        tts_title: "AI Text to Speech (TTS)",
        tts_desc: "Convert text to natural speech. A WAV file will be generated.",
        tts_placeholder: "Enter text to convert...",
        tts_btn_execute: "Execute TTS",
        tts_btn_play: "Play",
        tts_btn_download: "Download",
        tts_status_loading: "Generating audio...",
        tts_status_success: "Success: Audio file is ready.",
        tts_status_error: "API failed: Please check server connection.",
        faq_title: "FAQ",
        faq_q1: "Q. Is my photo data protected?",
        faq_a1: "A. Yes, browser-based AI ensures your photos stay local.",
        faq_q2: "Q. Lotto algorithm?",
        faq_a2: "A. Based on Math.random() with duplicate removal.",
        contact_title: "Contact Us",
        contact_desc: "We value your feedback.",
        contact_placeholder_name: "Name",
        contact_placeholder_email: "Email",
        contact_placeholder_message: "Message",
        contact_btn: "Send",
        comment_title: "Feedback",
        footer_text: "© 2024 AI Portal Project.",
        footer_home: "Home",
        footer_about: "About",
        footer_privacy: "Privacy",
        footer_contact: "Contact"
    },
    ja: {
        head_title: "AI Portal - 動物顔診断 & ロト番号生成",
        nav_animal: "動物顔診断",
        nav_lotto: "ロト生成機",
        nav_about: "サイト紹介",
        nav_contact: "お問い合わせ",
        nav_blog: "ナレッジセンター",
        nav_tts: "TTS変換",
        hero_title: "AIポータル",
        hero_subtitle: "AIが提案する新しい体験。",
        hero_btn_animal: "動物顔診断",
        hero_btn_lotto: "ロト生成機",
        hero_btn_blog: "ナレッジセンター",
        hero_btn_tts: "TTS変換",
        animal_title: "AI 動物顔診断",
        animal_desc: "写真1枚で動物顔を分析！AIが精密に分析します。",
        upload_text: "写真をクリックしてアップロード",
        loading_text: "分析中...",
        how_it_works_title: "分析の仕組み",
        how_1_title: "1. 学習",
        how_1_desc: "CNNアルゴリズムで学習されたモデルを使用します。",
        how_2_title: "2. 抽出",
        how_2_desc: "顔の特徴をリアルタイムで抽出します。",
        how_3_title: "3. 一致",
        how_3_desc: "一致率をパーセントで表示します。",
        lotto_title: "スマートロト生成機",
        lotto_desc: "乱数アルゴリズムによる幸運の6番号。",
        lotto_btn: "番号を生成する",
        lotto_tips_title: "選択のヒント",
        lotto_tip_1: "バランス: 奇数と偶数を混ぜる。",
        lotto_tip_2: "連続回避: 3つ以上の連続を避ける。",
        lotto_tip_3: "合計: 合計100〜170の間。",
        tts_title: "AI 音声変換 (TTS)",
        tts_desc: "テキストを音声に変換。WAVファイルが生成されます。",
        tts_placeholder: "内容を入力...",
        tts_btn_execute: "TTS実行",
        tts_btn_play: "再生",
        tts_btn_download: "ダウンロード",
        tts_status_loading: "音声を生成中...",
        tts_status_success: "成功: 準備完了。",
        tts_status_error: "失敗: サーバーを確認してください。",
        faq_title: "FAQ",
        faq_q1: "Q. 写真保護?",
        faq_a1: "A. ローカルAIで安全です。",
        faq_q2: "Q. ロトアルゴリズム?",
        faq_a2: "A. Math.random()ベースの重複排除。",
        contact_title: "お問い合わせ",
        contact_desc: "意見をお聞かせください。",
        contact_placeholder_name: "お名前",
        contact_placeholder_email: "メール",
        contact_placeholder_message: "内容",
        contact_btn: "送信",
        comment_title: "フィードバック",
        footer_text: "© 2024 AI Portal Project.",
        footer_home: "ホーム",
        footer_about: "紹介",
        footer_privacy: "方針",
        footer_contact: "連絡"
    },
    zh: {
        head_title: "AI Portal - 动物相测试 & 乐透概率分析",
        nav_animal: "动物相测试",
        nav_lotto: "乐透生成器",
        nav_about: "网站介绍",
        nav_contact: "联系我们",
        nav_blog: "知识中心",
        nav_tts: "TTS转换",
        hero_title: "AI 门户",
        hero_subtitle: "体验由数据带来的全新感官。",
        hero_btn_animal: "动物相测试",
        hero_btn_lotto: "乐透生成器",
        hero_btn_blog: "知识中心",
        hero_btn_tts: "TTS转换",
        animal_title: "AI 动物相测试",
        animal_desc: "分析您的动物相！AI为您精准分析。",
        upload_text: "点击上传照片",
        loading_text: "分析中...",
        how_it_works_title: "运作原理",
        how_1_title: "1. 训练",
        how_1_desc: "使用CNN算法预训练模型。",
        how_2_title: "2. 提取",
        how_2_desc: "实时提取面部特征。",
        how_3_title: "3. 匹配",
        how_3_desc: "展示匹配百分比。",
        lotto_title: "智能乐透生成器",
        lotto_desc: "随机算法生成6位数字。",
        lotto_btn: "生成号码",
        lotto_tips_title: "选择技巧",
        lotto_tip_1: "均衡: 奇偶比例均衡。",
        lotto_tip_2: "连续: 避免3个以上连续数字。",
        lotto_tip_3: "总和: 总和在100-170之间。",
        tts_title: "AI 语音转换 (TTS)",
        tts_desc: "将文本转换为自然语音。生成WAV文件。",
        tts_placeholder: "输入内容...",
        tts_btn_execute: "执行TTS",
        tts_btn_play: "播放",
        tts_btn_download: "下载",
        tts_speed_label: "速度:",
        tts_status_loading: "正在生成音频...",
        tts_status_success: "成功: 音频已就绪。",
        tts_status_error: "失败: 请检查服务器连接。",
        faq_title: "常见问题",
        faq_q1: "Q. 照片安全?",
        faq_a1: "A. 本地AI确保隐私。",
        faq_q2: "Q. 乐透算法?",
        faq_a2: "A. Math.random()基础去重。",
        contact_title: "联系我们",
        contact_desc: "感谢您的反馈。",
        contact_placeholder_name: "姓名",
        contact_placeholder_email: "邮箱",
        contact_placeholder_message: "留言",
        contact_btn: "发送",
        comment_title: "反馈",
        footer_text: "© 2024 AI Portal Project.",
        footer_home: "首页",
        footer_about: "介绍",
        footer_privacy: "政策",
        footer_contact: "联系"
    }
};

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    if (langSelect) langSelect.value = lang;
}

// Language Logic
const savedLang = localStorage.getItem('lang') || 'ko';
setLanguage(savedLang);

if (langSelect) {
    langSelect.addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });
}

// Theme Logic
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    if (body) body.setAttribute('data-theme', savedTheme);
    if (themeBtn) themeBtn.textContent = savedTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
}

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeBtn.textContent = newTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
    });
}

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Back to Top Button
window.onscroll = function() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        if (backToTop) backToTop.style.display = "block";
    } else {
        if (backToTop) backToTop.style.display = "none";
    }
};

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// TTS Logic
if (ttsExecuteBtn) {
    ttsExecuteBtn.addEventListener('click', async () => {
        const text = ttsInput.value.trim();
        if (!text) return;

        const lang = localStorage.getItem('lang') || 'ko';
        ttsStatus.textContent = translations[lang].tts_status_loading;
        ttsStatus.style.color = 'var(--accent-color)';
        
        ttsExecuteBtn.disabled = true;
        ttsPlayBtn.disabled = true;
        ttsDownloadBtn.disabled = true;

        try {
            const response = await fetch('http://211.115.87.241:3000/tts-api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: text,
                    speed: parseInt(ttsSpeedInput ? ttsSpeedInput.value : 100)
                })
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const blob = await response.blob();
            ttsAudioBlob = blob;
            
            if (ttsAudioUrl) URL.revokeObjectURL(ttsAudioUrl);
            ttsAudioUrl = URL.createObjectURL(blob);
            
            ttsAudio.src = ttsAudioUrl;
            ttsStatus.textContent = translations[lang].tts_status_success;
            ttsStatus.style.color = '#4CAF50';
            
            ttsPlayBtn.disabled = false;
            ttsDownloadBtn.disabled = false;
        } catch (error) {
            console.error('TTS API error:', error);
            ttsStatus.textContent = translations[lang].tts_status_error;
            ttsStatus.style.color = '#f44336';
        } finally {
            ttsExecuteBtn.disabled = false;
        }
    });
}

if (ttsPlayBtn) {
    ttsPlayBtn.addEventListener('click', () => {
        if (ttsAudio.src) {
            ttsAudio.play();
        }
    });
}

if (ttsDownloadBtn) {
    ttsDownloadBtn.addEventListener('click', () => {
        if (ttsAudioUrl) {
            const a = document.createElement('a');
            a.href = ttsAudioUrl;
            a.download = 'tts_result.wav';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    });
}

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
        if (animalModel) animalMaxPredictions = animalModel.getTotalClasses();
        if (loadingSpinner) loadingSpinner.style.display = 'none';
    } catch (e) {
        console.error("Model load failed", e);
        if (loadingSpinner) loadingSpinner.style.display = 'none';
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
            const placeholder = document.getElementById('upload-placeholder');
            if (placeholder) placeholder.style.display = 'none';
            
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
    if (labelContainer) {
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
}              <div style="width: ${prob}%; height: 100%; background: linear-gradient(90deg, #6e8efb, #a777e3); transition: width 0.8s ease-out;"></div>
                </div>
            `;
            labelContainer.appendChild(item);
        });
    }
}
    }
}