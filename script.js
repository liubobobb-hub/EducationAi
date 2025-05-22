// 语言配置
const translations = {
    zh: {
        // 通用
        title: 'LearnFun 趣学习！',
        greeting: '你好！我是小兔子邦尼！准备好开始学习了吗？',
        english: '英语',
        math: '数学',
        programming: '编程',
        profile: '我的资料',
        forParents: '家长专区',
        copyright: '© 2023 趣学习平台',

        // 个人资料页面
        profileTitle: '我的资料 | LearnFun',
        profileHeader: '我的资料',
        profileDescription: '追踪你的学习冒险！',
        learningExplorer: '学习探险家',
        activitiesCompleted: '已完成活动',
        averageScore: '平均分数',
        learningStreaks: '学习连续天数',
        recentActivities: '最近活动',
        additionPractice: '加法练习',
        alphabetTracing: '字母描写',
        countingGame: '数数游戏',
        perfect: '完美！',
        today: '今天',
        yesterday: '昨天',
        daysAgo: '天前',
        backToHome: '返回主页',

        // 英语页面
        englishTitle: 'LearnFun 英语学习！',
        englishHeader: '英语时间！',
        englishDescription: '让我们和邦尼一起学习字母、单词，阅读有趣的故事！',
        alphabetFun: '字母乐园',
        alphabetDesc: '学习ABC！',
        wordGames: '单词游戏',
        wordDesc: '发现新单词！',
        storyTime: '故事时间',
        storyDesc: '听精彩故事！',
        phonicsPlay: '自然拼读',
        phonicsDesc: '学习发音！',

        // 数学页面
        mathTitle: 'LearnFun 数学天地！',
        mathHeader: '数学冒险！',
        mathDescription: '让我们和邦尼一起数数、探索形状、解决谜题！',
        countingCorner: '数数角落',
        countingDesc: '学习123！',
        shapeShifters: '形状变变变',
        shapesDesc: '探索圆形、方形等！',
        simpleSums: '简单加法',
        sumsDesc: '一起来做加法！',
        numberPuzzles: '数字谜题',
        puzzlesDesc: '解决有趣的数学谜题！',

        // 编程页面
        programmingTitle: 'LearnFun 编程乐园！',
        programmingHeader: '编程乐趣！',
        programmingDescription: '让我们和邦尼一起学习编程概念，创造神奇的东西！',
        blockCoding: '积木编程',
        blockDesc: '拖拽编程！',
        logicPuzzles: '逻辑谜题',
        logicDesc: '解决编程挑战！',
        robotFriends: '机器人伙伴',
        robotDesc: '编程你的机器人伙伴！',
        gameMaker: '游戏制作',
        gameDesc: '创造你自己的游戏！'
    },
    en: {
        // Common
        title: 'LearnFun with Benny!',
        greeting: 'Hi! I\'m Benny the Bunny! Ready to learn?',
        english: 'English',
        math: 'Math',
        programming: 'Programming',
        profile: 'My Profile',
        forParents: 'For Parents',
        copyright: '© 2023 Your LearnFun Site',

        // Profile Page
        profileTitle: 'My Profile | LearnFun',
        profileHeader: 'My Profile',
        profileDescription: 'Keep track of your learning adventure!',
        learningExplorer: 'Learning Explorer',
        activitiesCompleted: 'Activities Completed',
        averageScore: 'Average Score',
        learningStreaks: 'Learning Streaks',
        recentActivities: 'Recent Activities',
        additionPractice: 'Addition Practice',
        alphabetTracing: 'Alphabet Tracing',
        countingGame: 'Counting Game',
        perfect: 'Perfect!',
        today: 'Today',
        yesterday: 'Yesterday',
        daysAgo: 'days ago',
        backToHome: 'Back to Home',

        // English Page
        englishTitle: 'LearnFun English with Benny!',
        englishHeader: 'English Time!',
        englishDescription: 'Let\'s learn letters, words, and read fun stories with Benny!',
        alphabetFun: 'Alphabet Fun',
        alphabetDesc: 'Learn your ABCs!',
        wordGames: 'Word Games',
        wordDesc: 'Discover new words!',
        storyTime: 'Story Time',
        storyDesc: 'Listen to exciting stories!',
        phonicsPlay: 'Phonics Play',
        phonicsDesc: 'Sound out letters!',

        // Math Page
        mathTitle: 'LearnFun Math with Benny!',
        mathHeader: 'Math Adventures!',
        mathDescription: 'Let\'s count, explore shapes, and solve puzzles with Benny!',
        countingCorner: 'Counting Corner',
        countingDesc: 'Learn to count 1, 2, 3!',
        shapeShifters: 'Shape Shifters',
        shapesDesc: 'Discover circles, squares, and more!',
        simpleSums: 'Simple Sums',
        sumsDesc: 'Let\'s add numbers together!',
        numberPuzzles: 'Number Puzzles',
        puzzlesDesc: 'Solve fun math puzzles!',

        // Programming Page
        programmingTitle: 'LearnFun Programming with Benny!',
        programmingHeader: 'Programming Fun!',
        programmingDescription: 'Let\'s learn coding concepts and create amazing things with Benny!',
        blockCoding: 'Block Coding',
        blockDesc: 'Drag and drop to code!',
        logicPuzzles: 'Logic Puzzles',
        logicDesc: 'Solve fun coding challenges!',
        robotFriends: 'Robot Friends',
        robotDesc: 'Program your robot buddy!',
        gameMaker: 'Game Maker',
        gameDesc: 'Create your own games!'
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
    
    // 获取当前页面名称
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // 根据当前页面设置标题
    if (currentPage.includes('english')) {
        document.title = translations[lang].englishTitle;
    } else if (currentPage.includes('math')) {
        document.title = translations[lang].mathTitle;
    } else if (currentPage.includes('programming')) {
        document.title = translations[lang].programmingTitle;
    } else if (currentPage.includes('user-profile')) {
        document.title = translations[lang].profileTitle;
    } else {
        document.title = translations[lang].title;
    }
    
    // 更新问候语（如果在主页）
    const speechBubble = document.getElementById('speechBubble');
    if (speechBubble) {
        speechBubble.textContent = translations[lang].greeting;
    }
    
    // 更新页面标题和描述
    const subjectTitle = document.querySelector('.subject-title h2');
    const subjectDesc = document.querySelector('.subject-title p');
    
    if (currentPage.includes('user-profile')) {
        document.title = translations[lang].profileTitle;
        if (subjectTitle) subjectTitle.textContent = translations[lang].profileHeader;
        if (subjectDesc) subjectDesc.textContent = translations[lang].profileDescription;
        
        // 更新个人资料页面的其他元素
        const learningExplorer = document.querySelector('.profile-info p');
        if (learningExplorer) learningExplorer.textContent = translations[lang].learningExplorer;
        
        const statLabels = document.querySelectorAll('.stat-label');
        if (statLabels.length >= 3) {
            statLabels[0].textContent = translations[lang].activitiesCompleted;
            statLabels[1].textContent = translations[lang].averageScore;
            statLabels[2].textContent = translations[lang].learningStreaks;
        }
        
        const recentActivitiesHeader = document.querySelector('.recent-activities h3');
        if (recentActivitiesHeader) recentActivitiesHeader.textContent = translations[lang].recentActivities;
        
        const activityNames = document.querySelectorAll('.activity-name');
        const activityTimes = document.querySelectorAll('.activity-time');
        const activityScores = document.querySelectorAll('.activity-score');
        
        activityNames.forEach((name, index) => {
            if (index === 0) name.textContent = translations[lang].additionPractice;
            if (index === 1) name.textContent = translations[lang].alphabetTracing;
            if (index === 2) name.textContent = translations[lang].countingGame;
        });
        
        activityTimes.forEach((time, index) => {
            if (index === 0) time.textContent = `${translations[lang].today}, 10:15 AM`;
            if (index === 1) time.textContent = `${translations[lang].yesterday}, 3:30 PM`;
            if (index === 2) time.textContent = `3 ${translations[lang].daysAgo}`;
        });
        
        activityScores.forEach((score, index) => {
            if (index === 1 && score.textContent === 'Perfect!') {
                score.textContent = translations[lang].perfect;
            }
        });
        
        const backButton = document.querySelector('.back-button');
        if (backButton) backButton.textContent = translations[lang].backToHome;
    } else if (currentPage.includes('english')) {
        if (subjectTitle) subjectTitle.textContent = translations[lang].englishHeader;
        if (subjectDesc) subjectDesc.textContent = translations[lang].englishDescription;
    } else if (currentPage.includes('math')) {
        if (subjectTitle) subjectTitle.textContent = translations[lang].mathHeader;
        if (subjectDesc) subjectDesc.textContent = translations[lang].mathDescription;
    } else if (currentPage.includes('programming')) {
        if (subjectTitle) subjectTitle.textContent = translations[lang].programmingHeader;
        if (subjectDesc) subjectDesc.textContent = translations[lang].programmingDescription;
    }
    
    // 更新活动卡片文本
    const activityCards = document.querySelectorAll('.activity-card');
    activityCards.forEach(card => {
        const span = card.querySelector('span');
        const desc = card.querySelector('.activity-description');
        const href = card.getAttribute('href');
        
        if (href) {
            if (href.includes('alphabet')) {
                if (span) span.textContent = translations[lang].alphabetFun;
                if (desc) desc.textContent = translations[lang].alphabetDesc;
            } else if (href.includes('words')) {
                if (span) span.textContent = translations[lang].wordGames;
                if (desc) desc.textContent = translations[lang].wordDesc;
            } else if (href.includes('stories')) {
                if (span) span.textContent = translations[lang].storyTime;
                if (desc) desc.textContent = translations[lang].storyDesc;
            } else if (href.includes('phonics')) {
                if (span) span.textContent = translations[lang].phonicsPlay;
                if (desc) desc.textContent = translations[lang].phonicsDesc;
            } else if (href.includes('counting')) {
                if (span) span.textContent = translations[lang].countingCorner;
                if (desc) desc.textContent = translations[lang].countingDesc;
            } else if (href.includes('shapes')) {
                if (span) span.textContent = translations[lang].shapeShifters;
                if (desc) desc.textContent = translations[lang].shapesDesc;
            } else if (href.includes('addition')) {
                if (span) span.textContent = translations[lang].simpleSums;
                if (desc) desc.textContent = translations[lang].sumsDesc;
            } else if (href.includes('puzzles')) {
                if (span) span.textContent = translations[lang].numberPuzzles;
                if (desc) desc.textContent = translations[lang].puzzlesDesc;
            } else if (href.includes('blocks')) {
                if (span) span.textContent = translations[lang].blockCoding;
                if (desc) desc.textContent = translations[lang].blockDesc;
            } else if (href.includes('logic')) {
                if (span) span.textContent = translations[lang].logicPuzzles;
                if (desc) desc.textContent = translations[lang].logicDesc;
            } else if (href.includes('robot')) {
                if (span) span.textContent = translations[lang].robotFriends;
                if (desc) desc.textContent = translations[lang].robotDesc;
            } else if (href.includes('games')) {
                if (span) span.textContent = translations[lang].gameMaker;
                if (desc) desc.textContent = translations[lang].gameDesc;
            }
        }
    });
    
    // 更新导航按钮文本（如果在主页）
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

    const copyright = document.querySelector('footer p');
    if (copyright) {
        copyright.textContent = translations[lang].copyright;
    }

    // 保存语言偏好
    localStorage.setItem('preferredLanguage', lang);
}