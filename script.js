// 语言配置
const translations = {
    zh: {
        title: 'LearnFun 趣学习！',
        greeting: '你好！我是小兔子邦尼！准备好开始学习了吗？',
        english: '英语',
        math: '数学',
        programming: '编程',
        profile: '我的资料',
        forParents: '家长专区',
        copyright: '© 2023 趣学习平台'
    },
    en: {
        title: 'LearnFun with Benny!',
        greeting: 'Hi! I\'m Benny the Bunny! Ready to learn?',
        english: 'English',
        math: 'Math',
        programming: 'Programming',
        profile: 'My Profile',
        forParents: 'For Parents',
        copyright: '© 2023 Your LearnFun Site'
    }
};

// 当前语言
let currentLang = localStorage.getItem('preferredLanguage') || 'zh';

document.addEventListener('DOMContentLoaded', () => {
    const englishButton = document.getElementById('englishButton');
    const mathButton = document.getElementById('mathButton');
    const bennyMascot = document.getElementById('bennyMascot');
    const speechBubble = document.getElementById('speechBubble');

    // --- Sound Effects ---
    let clickSound;
    let welcomeSound;
    let soundsLoaded = false;
    let userInteracted = false;

    // 初始化音频
    function initializeSounds() {
        try {
            clickSound = new Audio('sounds/click.mp3');
            welcomeSound = new Audio('sounds/welcome_benny.mp3');
            soundsLoaded = true;
            
            // 预加载音频
            clickSound.load();
            welcomeSound.load();
        } catch (e) {
            console.warn("Could not load audio files. Make sure they are in the 'sounds' folder.", e);
            soundsLoaded = false;
        }
    }

    // 播放声音的安全包装函数
    function playSound(sound) {
        if (sound && soundsLoaded && userInteracted) {
            sound.currentTime = 0;
            sound.play().catch(error => {
                console.log("Sound playback was prevented:", error);
            });
        }
    }

    // 监听用户首次交互
    function handleFirstInteraction() {
        userInteracted = true;
        // 如果声音还没有加载，现在加载它们
        if (!soundsLoaded) {
            initializeSounds();
        }
        // 移除事件监听器，因为我们只需要它触发一次
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
    }

    // 添加用户交互监听器
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    // --- Event Listeners for Buttons ---
    if (englishButton) {
        englishButton.addEventListener('click', () => {
            playSound(clickSound);
            console.log("English button clicked!");
        });
    }

    if (mathButton) {
        mathButton.addEventListener('click', () => {
            playSound(clickSound);
            console.log("Math button clicked!");
        });
    }

    // --- Activity Protection ---
    const activityLinks = document.querySelectorAll('.activity-card');
    activityLinks.forEach(link => {
        const originalHref = link.getAttribute('href');
        if (originalHref) {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                if (requireLogin(originalHref)) {
                    playSound(clickSound);
                    window.location.href = originalHref;
                }
            });
        }
    });

    // --- Mascot Interaction ---
    if (bennyMascot) {
        bennyMascot.addEventListener('click', () => {
            playSound(welcomeSound);
        });
    }

    // --- Authentication Functions ---
    function isLoggedIn() {
        return localStorage.getItem('isLoggedIn') === 'true';
    }

    function getUsername() {
        return localStorage.getItem('username') || 'Friend';
    }

    function requireLogin(targetUrl) {
        if (!isLoggedIn()) {
            window.location.href = `login.html?returnUrl=${encodeURIComponent(targetUrl)}`;
            return false;
        }
        return true;
    }

    function logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        window.location.href = 'index.html';
    }

    // --- Update UI based on login state ---
    function updateUIForAuthState() {
        if (speechBubble && isLoggedIn()) {
            speechBubble.textContent = `Hi ${getUsername()}! Ready to continue learning?`;
        }

        const header = document.querySelector('header');
        if (header) {
            let authLink = document.getElementById('authLink');
            
            if (!authLink) {
                authLink = document.createElement('a');
                authLink.id = 'authLink';
                authLink.style.marginLeft = '10px';
                authLink.className = 'parents-link';
                header.appendChild(authLink);
            }
            
            if (isLoggedIn()) {
                authLink.textContent = 'Logout';
                authLink.href = '#';
                authLink.onclick = (e) => {
                    e.preventDefault();
                    logout();
                };
            } else {
                authLink.textContent = 'Login';
                authLink.href = 'login.html';
                authLink.onclick = null;
            }
        }
    }

    // 初始化UI状态
    updateUIForAuthState();

    // 初始化语言
    setLanguage(currentLang);
    
    // 语言切换按钮事件监听
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = currentLang;
        languageSelect.addEventListener('change', (e) => {
            currentLang = e.target.value;
            setLanguage(currentLang);
            playSound(clickSound);
            
            document.body.style.opacity = '0.5';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 200);
        });
    }
});

// 设置语言函数
function setLanguage(lang) {
    // 更新 HTML lang 属性
    document.documentElement.lang = lang;
    
    // 更新页面标题
    document.title = translations[lang].title;
    
    // 更新问候语
    const speechBubble = document.getElementById('speechBubble');
    if (speechBubble) {
        speechBubble.textContent = translations[lang].greeting;
    }
    
    // 更新导航按钮文本
    const englishButton = document.querySelector('#englishButton span');
    if (englishButton) {
        englishButton.textContent = translations[lang].english;
    }

    const mathButton = document.querySelector('#mathButton span');
    if (mathButton) {
        mathButton.textContent = translations[lang].math;
    }

    const programmingButton = document.querySelector('#programmingButton span');
    if (programmingButton) {
        programmingButton.textContent = translations[lang].programming;
    }

    const profileButton = document.querySelector('#profileButton span');
    if (profileButton) {
        profileButton.textContent = translations[lang].profile;
    }
    
    // 更新其他元素
    const parentsLink = document.querySelector('.parents-link');
    if (parentsLink) {
        parentsLink.textContent = translations[lang].forParents;
    }

    // Save the language preference
    localStorage.setItem('preferredLanguage', lang);
}