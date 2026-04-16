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

// Translations
const translations = {
    ko: {
        head_title: "AI Portal - 동물상 테스트 & 로또 확률 분석",
        nav_animal: "동물상 테스트",
        nav_lotto: "로또 생성기",
        nav_about: "사이트 소개",
        nav_contact: "문의",
        nav_blog: "지식 센터",
        hero_title: "당신의 특징과 행운을 분석하는 AI 포털",
        hero_subtitle: "데이터와 인공지능이 제안하는 새로운 경험을 만나보세요.",
        hero_btn_animal: "동물상 테스트",
        hero_btn_lotto: "로또 번호 생성",
        hero_btn_blog: "AI 지식 센터",
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
        footer_contact: "문의하기",
        // About Page
        about_head_title: "사이트 소개 - AI Portal",
        about_title: "프로젝트 소개",
        about_subtitle: "AI Portal은 복잡한 인공지능 기술을 일상 속에서 쉽고 재미있게 경험할 수 있도록 설계된 실험적 포털 사이트입니다.",
        about_vision_title: "우리의 비전",
        about_vision_desc: "우리는 기술이 소수의 전문가들만의 전유물이 되어서는 안 된다고 믿습니다. AI Portal은 머신러닝, 확률 통계와 같은 기술적 요소를 직관적인 인터페이스로 풀어내어, 사용자들이 자연스럽게 최신 기술의 혜택을 누릴 수 있는 환경을 제공합니다.",
        about_services_title: "제공 서비스",
        about_s1_title: "🤖 AI 동물상 분석",
        about_s1_desc: "Google의 Teachable Machine을 기반으로 제작된 이미지 분류 모델을 사용하여, 사용자의 외모적 특징을 분석하고 가장 닮은 동물을 찾아줍니다. 브라우저 내 로컬 분석으로 완벽한 프라이버시를 보장합니다.",
        about_s2_title: "🍀 스마트 로또 생성기",
        about_s2_desc: "단순한 번호 생성을 넘어, 확률적 통계 데이터를 기반으로 한 최적의 번호 조합 팁과 함께 무작위 번호 추출 기능을 제공합니다.",
        about_tech_title: "기술적 투명성",
        about_tech_desc: "AI Portal은 오픈소스 정신을 지향합니다. 본 서비스는 TensorFlow.js, Teachable Machine 등 신뢰할 수 있는 라이브러리를 활용하여 제작되었으며, 모든 데이터 처리는 투명하게 공개된 로직에 따라 수행됩니다.",
        about_back_btn: "메인 도구 체험하기",
        footer_text_vision: "© 2024 AI Portal Project. 혁신을 일상으로 연결합니다.",
        // Privacy Page
        privacy_head_title: "개인정보 처리방침 - AI Portal",
        privacy_title: "개인정보 처리방침",
        privacy_p1: "본 사이트(\"AI Portal\")는 사용자의 개인정보를 소중히 다루며, 관련 법령을 준수합니다.",
        privacy_h1: "1. 수집하는 개인정보 항목",
        privacy_p2: "본 사이트는 사용자의 직접적인 개인정보(이름, 연락처 등)를 별도로 저장하거나 수집하지 않습니다. 다만, 구글 애드센스 등 제3자 광고 서비스를 이용하는 경우 쿠키(Cookie)가 사용될 수 있습니다.",
        privacy_h2: "2. 개인정보의 이용 목적",
        privacy_p3: "수집된 비개인적 정보(쿠키 등)는 서비스 개선, 사용자 맞춤형 광고 제공, 통계 분석을 위해 사용됩니다.",
        privacy_h3: "3. 제3자 서비스 (구글 애드센스 등)",
        privacy_p4: "Google을 포함한 제3자 제공업체는 쿠키를 사용하여 사용자의 이전 웹사이트 방문 기록을 토대로 광고를 게재합니다. 사용자는 구글의 광고 설정을 방문하여 맞춤설정 광고를 해제할 수 있습니다.",
        privacy_h4: "4. 데이터 보안 (이미지 분석)",
        privacy_p5: "동물상 테스트를 위해 업로드되는 이미지는 브라우저 상에서 AI 모델(Teachable Machine)을 통해 즉시 분석되며, 서버로 전송되거나 저장되지 않습니다.",
        privacy_h5: "5. 문의처",
        privacy_p6: "개인정보 관련 문의사항은 하단의 제휴 문의 폼을 이용해 주시기 바랍니다.",
        privacy_back_btn: "메인으로 돌아가기",
        footer_text_privacy: "© 2024 AI Portal Project. All rights reserved."
    },
    en: {
        head_title: "AI Portal - Animal Face Test & Lotto Analysis",
        nav_animal: "Animal Test",
        nav_lotto: "Lotto Generator",
        nav_about: "About",
        nav_contact: "Contact",
        nav_blog: "Knowledge Center",
        hero_title: "AI Portal for Analyzing Your Traits & Luck",
        hero_subtitle: "Experience new insights provided by data and AI.",
        hero_btn_animal: "Animal Test",
        hero_btn_lotto: "Lotto Generator",
        hero_btn_blog: "Knowledge Center",
        animal_title: "AI Animal Face Test",
        animal_desc: "Analyze your face with just one photo! Dog or Cat? Find out your animal type with precision AI.",
        upload_text: "Click to upload your photo",
        loading_text: "AI is analyzing...",
        how_it_works_title: "How does it work? (Deep Learning)",
        how_1_title: "1. Data Training",
        how_1_desc: "We use a model pre-trained on hundreds of thousands of animal photos using CNN algorithms.",
        how_2_title: "2. Feature Extraction",
        how_2_desc: "Key facial features like eyes, jawline, and nose angle are extracted in real-time.",
        how_3_title: "3. Probability Matching",
        how_3_desc: "We show the animal type that most closely matches the trained data in percentages (%).",
        lotto_title: "Smart Lotto Number Generator",
        lotto_desc: "Lucky 6 numbers generated through a rigorous random algorithm. Try your luck every week.",
        lotto_btn: "Generate Lucky Numbers",
        lotto_tips_title: "Lotto Number Selection Tips",
        lotto_tip_1: "Balanced Combination: Mixing odd and even numbers in a 3:3 or 2:4 ratio is statistically stable.",
        lotto_tip_2: "Avoid Consecutive Numbers: The probability of 3 or more consecutive numbers like 1, 2, 3 is very low.",
        lotto_tip_3: "Sum Range: The total sum of the 6 selected numbers is most often between 100 and 170.",
        faq_title: "Frequently Asked Questions (FAQ)",
        faq_q1: "Q. Is my photo data protected?",
        faq_a1: "A. Yes, this service uses browser-based AI. Your photos are not sent to any server and are deleted immediately after analysis.",
        faq_q2: "Q. What is the lotto number generation algorithm?",
        faq_a2: "A. It's based on JavaScript's Math.random() but removes duplicates to generate numbers between 1-45.",
        contact_title: "Partnership & Suggestions",
        contact_desc: "Your valuable feedback helps us build a better service.",
        contact_placeholder_name: "Name or Company",
        contact_placeholder_email: "Email for reply",
        contact_placeholder_message: "Please write your suggestions or complaints",
        contact_btn: "Send Inquiry",
        comment_title: "Community Feedback",
        footer_text: "© 2024 AI Portal Project. Providing high-quality info and tools.",
        footer_home: "Home",
        footer_about: "About",
        footer_privacy: "Privacy Policy",
        footer_contact: "Contact Us",
        // About Page
        about_head_title: "About - AI Portal",
        about_title: "Project Introduction",
        about_subtitle: "AI Portal is an experimental portal designed to make complex AI technology easy and fun to experience in daily life.",
        about_vision_title: "Our Vision",
        about_vision_desc: "We believe technology shouldn't be for experts only. AI Portal provides an intuitive interface for machine learning and statistics so users can naturally benefit from the latest tech.",
        about_services_title: "Our Services",
        about_s1_title: "🤖 AI Animal Analysis",
        about_s1_desc: "Uses an image classification model built on Google's Teachable Machine to find your animal look-alike. Full privacy with local analysis.",
        about_s2_title: "🍀 Smart Lotto Generator",
        about_s2_desc: "Goes beyond simple generation to provide optimal combination tips based on statistical data.",
        about_tech_title: "Technical Transparency",
        about_tech_desc: "We value the open-source spirit. This service uses trusted libraries like TensorFlow.js and Teachable Machine.",
        about_back_btn: "Try Main Tools",
        footer_text_vision: "© 2024 AI Portal Project. Connecting innovation to daily life.",
        // Privacy Page
        privacy_head_title: "Privacy Policy - AI Portal",
        privacy_title: "Privacy Policy",
        privacy_p1: "This site (\"AI Portal\") values your privacy and complies with relevant laws.",
        privacy_h1: "1. Information Collected",
        privacy_p2: "We do not store or collect personal information (name, contact, etc.). Cookies may be used by third-party ads like Google AdSense.",
        privacy_h2: "2. Purpose of Use",
        privacy_p3: "Collected non-personal info is used for service improvement, tailored ads, and statistical analysis.",
        privacy_h3: "3. Third-party Services",
        privacy_p4: "Google and other third-party vendors use cookies to serve ads based on prior visits. You can opt out at Google's Ad Settings.",
        privacy_h4: "4. Data Security",
        privacy_p5: "Images are analyzed instantly on the browser and are NOT transmitted to or stored on servers.",
        privacy_h5: "5. Contact",
        privacy_p6: "For privacy inquiries, please use the contact form at the bottom.",
        privacy_back_btn: "Back to Home",
        footer_text_privacy: "© 2024 AI Portal Project. All rights reserved."
    },
    ja: {
        head_title: "AI Portal - 動物顔診断 & ロト番号生成",
        nav_animal: "動物顔診断",
        nav_lotto: "ロト生成機",
        nav_about: "サイト紹介",
        nav_contact: "お問い合わせ",
        nav_blog: "ナレッジセンター",
        hero_title: "あなたの特徴と運勢を分析するAIポータル",
        hero_subtitle: "데이터와 AI가 제안하는 새로운 체험을 만나보세요.",
        hero_btn_animal: "動物顔診断",
        hero_btn_lotto: "ロト番号生成",
        hero_btn_blog: "AIナ레ッジセンター",
        animal_title: "AI 動物顔診断",
        animal_desc: "写真1枚で分析하는 나의 동물상! 犬、猫のうち、あなたはどのタイプ？AIが精密に分析します。",
        upload_text: "클릭하여 사진을 업로드하세요",
        loading_text: "AI가 분석 중입니다...",
        how_it_works_title: "어떻게 분석되나요? (Deep Learning)",
        how_1_title: "1. 데이터 학습",
        how_1_desc: "수십만 장의 동물 사진 데이터를 CNN 알고리즘으로 사전 학습한 모델을 사용합니다.",
        how_2_title: "2. 특징 추출",
        how_2_desc: "업로드된 이미지에서 눈매, 턱선, 코의 각도 등 얼굴의 핵심 특징점을 실시간으로 추출합니다.",
        how_3_title: "3. 확률 매칭",
        how_3_desc: "학습된 데이터와 비교하여 가장 높은 일치율을 보이는 동물상을 퍼센트(%) 단위로 보여드립니다.",
        lotto_title: "스마트 로또 번호 생성기",
        lotto_desc: "엄격한 난수 발생 알고리즘을 통해 추출된 행운의 6개 번호입니다. 매주 새로운 행운에 도전해보세요.",
        lotto_btn: "幸運の番号を生成する",
        lotto_tips_title: "로또 번호 선택 팁",
        lotto_tip_1: "균형 있는 조합: 홀수와 짝수의 비율을 3:3 또는 2:4 정도로 섞는 것이 통계적으로 안정적입니다.",
        lotto_tip_2: "연속 번호 피하기: 1, 2, 3처럼 3개 이상의 연속 번호가 나올 확률은 매우 낮습니다.",
        lotto_tip_3: "총합의 범위: 선택한 6개 번호의 총합이 100에서 170 사이에 위치하는 경우가 가장 많습니다.",
        faq_title: "자주 묻는 질문 (FAQ)",
        faq_q1: "Q. 사진 데이터는 안전하게 보호되나요?",
        faq_a1: "A. 네, 본 서비스는 브라우저 기반 AI를 사용합니다. 업로드하신 사진은 서버로 전송되지 않으며, 분석 즉시 메모리에서 삭제됩니다.",
        faq_q2: "Q. 로또 번호 생성 알고리즘은 무엇인가요?",
        faq_a2: "A. JavaScript의 Math.random()을 기반으로 하되, 중복을 완벽히 제거한 1~45 사이의 난수를 생성합니다.",
        contact_title: "提携および改善の提案",
        contact_desc: "여러분들의 소중한 의견은 더 나은 서비스를 만드는 밑거름이 됩니다.",
        contact_placeholder_name: "お名前または会社名",
        contact_placeholder_email: "回答を受け取るメールアドレス",
        contact_placeholder_message: "提案内容や不便な点を記入してください",
        contact_btn: "お問い合わせ内容を送信する",
        comment_title: "コミュニティフィードバック",
        footer_text: "© 2024 AI Portal Project. 高品質な情報とツールを提供します。",
        footer_home: "ホーム",
        footer_about: "サイト紹介",
        footer_privacy: "個人情報保護方針",
        footer_contact: "お問い合わせ",
        // About Page
        about_head_title: "サイト紹介 - AI Portal",
        about_title: "プロジェクト紹介",
        about_subtitle: "AI Portal은 복잡한 인공지능 기술을 일상 속에서 쉽고 재미있게 경험할 수 있도록 설계된 실험적 포털 사이트입니다.",
        about_vision_title: "私たちのビジョン",
        about_vision_desc: "우리는 기술이 소수의 전문가들만의 전유물이 되어서는 안 된다고 믿습니다. AI Portal은 머신러닝, 확률 통계와 같은 기술적 요소를 직관적인 인터페이스로 풀어내어, 사용자들이 자연스럽게 최신 기술의 혜택을 누릴 수 있는 환경을 제공합니다.",
        about_services_title: "提供サービス",
        about_s1_title: "🤖 AI 動物顔分析",
        about_s1_desc: "Google의 Teachable Machine을 기반으로 제작된 이미지 분류 모델을 사용하여, 사용자의 외모적 특징을 분석하고 가장 닮은 동물을 찾아줍니다. 브라우저 내 로컬 분석으로 완벽한 프라이버시를 보장합니다.",
        about_s2_title: "🍀 스마트 로또 생성기",
        about_s2_desc: "단순한 번호 생성을 넘어, 확률적 통계 데이터를 기반으로 한 최적의 번호 조합 팁과 함께 무작위 번호 추출 기능을 제공합니다.",
        about_tech_title: "技術的透明性",
        about_tech_desc: "AI Portal은 오픈소스 정신을 지향합니다. 본 서비스는 TensorFlow.js, Teachable Machine 등 신뢰할 수 있는 라이브러리를 활용하여 제작되었으며, 모든 데이터 처리는 투명하게 공개된 로직에 따라 수행됩니다.",
        about_back_btn: "メインツールを体験する",
        footer_text_vision: "© 2024 AI Portal Project. イノベーションを日常につなげます。",
        // Privacy Page
        privacy_head_title: "個人情報保護方針 - AI Portal",
        privacy_title: "個人情報保護方針",
        privacy_p1: "本사이트(\"AI Portal\")는 사용자의 개인정보를 소중히 다루며, 관련 법령을 준수합니다.",
        privacy_h1: "1. 収集する個人情報",
        privacy_p2: "본 사이트는 사용자의 직접적인 개인정보(이름, 연락처 등)를 별도로 저장하거나 수집하지 않습니다. 다만, 구글 애드센스 등 제3자 광고 서비스를 이용하는 경우 쿠키(Cookie)가 사용될 수 있습니다.",
        privacy_h2: "2. 利用目的",
        privacy_p3: "수집된 비개인적 정보(쿠키 등)는 서비스 개선, 사용자 맞춤형 광고 제공, 통계 분석을 위해 사용됩니다.",
        privacy_h3: "3. 第三者サービス",
        privacy_p4: "Google을 포함한 제3자 제공업체는 쿠키를 사용하여 사용자의 이전 웹사이트 방문 기록을 토대로 광고를 게재합니다. 사용자는 구글의 광고 설정을 방문하여 맞춤설정 광고를 해제할 수 있습니다.",
        privacy_h4: "4. データセキュリティ",
        privacy_p5: "동물상 테스트를 위해 업로드되는 이미지는 브라우저 상에서 AI 모델(Teachable Machine)을 통해 즉시 분석되며, 서버로 전송되거나 저장되지 않습니다.",
        privacy_h5: "5. お問い合わせ",
        privacy_p6: "개인정보 관련 문의사항은 하단의 제휴 문의 폼을 이용해 주시기 바랍니다.",
        privacy_back_btn: "ホームに戻る",
        footer_text_privacy: "© 2024 AI Portal Project. All rights reserved."
    },
    zh: {
        head_title: "AI Portal - 动物相测试 & 乐透概率分析",
        nav_animal: "动物相测试",
        nav_lotto: "乐透生成器",
        nav_about: "网站介绍",
        nav_contact: "联系我们",
        nav_blog: "知识中心",
        hero_title: "分析您的特征与好运的 AI 门户",
        hero_subtitle: "数据和人工智能带来的全新体验。",
        hero_btn_animal: "动物相测试",
        hero_btn_lotto: "乐透号码生成",
        hero_btn_blog: "AI知识中心",
        animal_title: "AI 动物相测试",
        animal_desc: "只需一张照片即可分析您的动物相！是犬系还是猫系？AI 为您精准分析。",
        upload_text: "点击上传您的照片",
        loading_text: "AI 正在分析中...",
        how_it_works_title: "它是如何运作的？ (Deep Learning)",
        how_1_title: "1. 数据训练",
        how_1_desc: "我们使用通过 CNN 算法对数十万张动物照片进行预训练的模型。",
        how_2_title: "2. 特征提取",
        how_2_desc: "实时提取眼角、下颚线和鼻角等核心面部特征点。",
        how_3_title: "3. 概率匹配",
        how_3_desc: "我们会以百分比 (%) 形式展示与训练数据最匹配的动物类型。",
        lotto_title: "智能乐透号码生成器",
        lotto_desc: "通过严格的随机算法生成的幸运 6 位数字。每周挑战您的好运。",
        lotto_btn: "生成幸运号码",
        lotto_tips_title: "乐透号码选择技巧",
        lotto_tip_1: "均衡组合：统计显示，奇数和偶数比例为 3:3 或 2:4 比较稳定。",
        lotto_tip_2: "避免连续数字：像 1, 2, 3 这样出现 3 个及以上连续数字的概率极低。",
        lotto_tip_3: "总和范围：选中的 6 个数字总和通常在 100 到 170 之间。",
        faq_title: "常见问题 (FAQ)",
        faq_q1: "Q. 我的照片数据安全吗？",
        faq_a1: "A. 是的，本服务使用基于浏览器的 AI。照片不会发送到服务器，分析后会立即从内存中删除。",
        faq_q2: "Q. 乐透号码生成算法是什么？",
        faq_a2: "A. 基于 JavaScript 的 Math.random()，并去重生成 1-45 之间的随机数。",
        contact_title: "商务合作与改进建议",
        contact_desc: "您的宝贵意见是我们将服务做得更好的基石。",
        contact_placeholder_name: "姓名或公司名称",
        contact_placeholder_email: "接收回复的邮箱地址",
        contact_placeholder_message: "请填写您的建议或投诉内容",
        contact_btn: "发送咨询内容",
        comment_title: "社区反馈",
        footer_text: "© 2024 AI Portal Project. 提供高质量的信息和工具。",
        footer_home: "首页",
        footer_about: "网站介绍",
        footer_privacy: "隐私政策",
        footer_contact: "联系我们",
        // About Page
        about_head_title: "网站介绍 - AI Portal",
        about_title: "项目介绍",
        about_subtitle: "AI Portal 是一个实验性门户网站，旨在让复杂的 AI 技术在日常生活中变得简单有趣。",
        about_vision_title: "我们的愿景",
        about_vision_desc: "我们相信技术不应只是少数专家的专利。AI Portal 提供直觉化的界面，让用户能自然地享受最新技术的成果。",
        about_services_title: "提供的服务",
        about_s1_title: "🤖 AI 动物相分析",
        about_s1_desc: "使用基于 Google Teachable Machine 的模型分析您的面部特征。通过本地分析确保隐私。",
        about_s2_title: "🍀 智能乐透生成器",
        about_s2_desc: "不仅是生成号码，还提供基于统计数据的最佳组合建议。",
        about_tech_title: "技术透明度",
        about_tech_desc: "我们崇尚开源精神。本服务使用了 TensorFlow.js 和 Teachable Machine 等可靠的库。",
        about_back_btn: "体验主要工具",
        footer_text_vision: "© 2024 AI Portal Project. 将创新与生活相连。",
        // Privacy Page
        privacy_head_title: "隐私政策 - AI Portal",
        privacy_title: "隐私政策",
        privacy_p1: "本网站（\"AI Portal\"）重视您的个人隐私，并遵守相关法律法规。",
        privacy_h1: "1. 收集的个人信息项",
        privacy_p2: "我们不存储或收集个人识别信息（姓名、联系方式等）。Google AdSense 等第三方服务可能会使用 Cookie。",
        privacy_h2: "2. 使用目的",
        privacy_p3: "收集的非个人信息用于服务改进、定制化广告和统计分析。",
        privacy_h3: "3. 第三方服务",
        privacy_p4: "Google 等第三方供应商会根据用户之前的访问记录使用 Cookie 投放广告。您可以在 Google 广告设置中禁用。",
        privacy_h4: "4. 数据安全",
        privacy_p5: "照片在浏览器上即时分析，不会传输到服务器或进行存储。",
        privacy_h5: "5. 联系方式",
        privacy_p6: "如有隐私相关疑问，请使用底部的咨询表单。",
        privacy_back_btn: "返回首页",
        footer_text_privacy: "© 2024 AI Portal Project. All rights reserved."
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
}