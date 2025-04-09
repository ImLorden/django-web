// 当DOM完全加载后执行所有初始化
document.addEventListener('DOMContentLoaded', function () {
    // 背景视差滚动与模糊
    initParallaxEffect();
    
    // 打字机文字动画
    initTypewriterEffect();
    
    // 导航栏透明效果
    initNavbarTransparency();
    
    // 暗黑模式切换
    initDarkModeToggle();
});

// 背景视差滚动与变暗
function initParallaxEffect() {
    let parallaxElement = document.querySelector('.parallax');
    if (!parallaxElement) return;
    
    let scrollSpeed = 0.3;
    let darkSpeed = 0.03;  // 变暗的速率
    let darkThreshold = 600;  // 开始变暗的滚动阈值
    let maxDarkness = 0.8;    // 最大变暗程度（最暗时的亮度值）

    let lastScrollPosition = 0;  // 用来节流滚动事件
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                let scrollPosition = window.scrollY;
                let brightnessValue = 1;  // 初始的亮度值（不变暗）

                if (scrollPosition > darkThreshold) {
                    brightnessValue = Math.max(1 - (scrollPosition - darkThreshold) * darkSpeed, maxDarkness);
                }

                // 设置背景变暗效果
                parallaxElement.style.transform = 'translateY(' + (scrollPosition * scrollSpeed) + 'px)';
                parallaxElement.style.filter = 'brightness(' + brightnessValue + ')';
                parallaxElement.style.transition = 'filter 0.1s ease-out';  // 添加平滑过渡

                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll);
    // 确保页面加载时也执行一次
    onScroll();
}



// 打字机文字动画
function initTypewriterEffect() {
    const typedText = document.getElementById("typed-text");
    if (!typedText) return;
    
    const phrases = [
        "人生如戏。",
        "Life is a Fucking movie.",
    ];
    let currentPhrase = 0;
    let currentChar = 0;

    function typePhrase() {
        const phrase = phrases[currentPhrase];
        if (currentChar < phrase.length) {
            typedText.textContent += phrase.charAt(currentChar);
            currentChar++;
            setTimeout(typePhrase, 130);
        } else {
            setTimeout(erasePhrase, 3000);
        }
    }

    function erasePhrase() {
        if (typedText.textContent.length > 0) {
            typedText.textContent = typedText.textContent.slice(0, -1);
            setTimeout(erasePhrase, 50);
        } else {
            currentPhrase = (currentPhrase + 1) % phrases.length;
            currentChar = 0;
            setTimeout(typePhrase, 300);
        }
    }

    typePhrase();
}

// 导航栏透明效果
function initNavbarTransparency() {
    const navbar = document.getElementById('transparent-navbar');
    const darkModeActive = document.body.classList.contains('dark-mode'); // 检查是否为暗黑模式
    if (!navbar) return;

    navbar.style.transition = 'background-color 0.5s, color 0.5s';  // 设置过渡效果
    let opacityThreshold = 700; // 增加透明度变化的阈值，用户需要滚动更多距离才能变得不透明
    let maxOpacity = 0.5;  // 最大透明度（不透明）

    function checkScroll() {
        let scrollPosition = window.scrollY;
        // 计算透明度比例，确保透明度变化更平缓
        let opacityValue = Math.min(scrollPosition / opacityThreshold, maxOpacity);
        
        // 根据当前模式动态设置背景色和文字颜色
        if (darkModeActive) {
            navbar.style.backgroundColor = `rgba(0, 0, 0, ${opacityValue})`;  // 暗黑模式下背景逐渐变深
            navbar.style.color = opacityValue > 0.1 ? 'white' : 'gray';  // 暗黑模式下文字为白色或灰色
        } else {
            navbar.style.backgroundColor = `rgba(255, 255, 255, ${opacityValue})`;  // 明亮模式下背景逐渐变亮
            navbar.style.color = opacityValue > 0.1 ? 'black' : 'gray';  // 明亮模式下文字为黑色或灰色
        }

        // 如果页面滚动超过阈值，则添加transparent类，控制其他透明效果
        if (scrollPosition > opacityThreshold) {
            navbar.classList.add('transparent');
        } else {
            navbar.classList.remove('transparent');
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    // 确保页面加载时也执行一次
    checkScroll();
}


// 暗黑模式切换
function initDarkModeToggle() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (!darkModeToggle) return;
    
    const currentMode = localStorage.getItem('theme') || 'light';

    // 设置初始模式和按钮文本
    if (currentMode === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';  // 设置按钮为"明亮模式"
    } else {
        document.body.classList.remove('dark-mode');
        darkModeToggle.textContent = '🌙';  // 设置按钮为"暗黑模式"
    }

    // 监听暗黑模式切换按钮的点击事件
    darkModeToggle.addEventListener('click', () => {
        // 切换暗黑模式
        document.body.classList.toggle('dark-mode');

        // 更新本地存储中的模式
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            darkModeToggle.textContent = '☀️';  // 切换为"明亮模式"
        } else {
            localStorage.setItem('theme', 'light');
            darkModeToggle.textContent = '🌙';  // 切换为"暗黑模式"
        }

        // 更新导航栏的透明度效果
        initNavbarTransparency();
    });

    // 确保页面加载时执行一次，确保正确设置初始状态
    initNavbarTransparency();
}
