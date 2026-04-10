// ========== صفحة القفل (index.html) ==========
function checkPassword() {
    const password = document.getElementById('password').value;
    // كلمة السر = 260403
    if (password === '260403') {
        localStorage.setItem('unlocked', 'true');
        window.location.href = 'vault.html';
    } else {
        const errorMsg = document.getElementById('errorMsg');
        if (errorMsg) {
            errorMsg.style.display = 'block';
        }
    }
}

// ========== صفحة الصندوق (vault.html) ==========
// التأكد من فتح القفل
if (window.location.pathname.includes('vault.html')) {
    if (!localStorage.getItem('unlocked')) {
        window.location.href = 'index.html';
    }

    // إعدادات الموسيقى
    const music = document.getElementById('bgMusic');
    if (music) {
        music.volume = 0.7;  // صوت هاديء
        
        // محاولة تشغيل تلقائي
        let playPromise = music.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // إذا منع المتصفح التشغيل التلقائي، نشتغل بأول نقرة
                document.body.addEventListener('click', function once() {
                    music.play();
                    document.body.removeEventListener('click', once);
                }, { once: true });
            });
        }
    }

    // تأثير ظهور الذكريات تدريجياً
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });
    
    document.querySelectorAll('.memory').forEach(memory => {
        observer.observe(memory);
    });
}

// دالة التحكم في الموسيقى (تستخدم في onclick)
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const btn = document.querySelector('.music-toggle');
    
    if (music.paused) {
        music.play();
        if (btn) btn.textContent = '🔊 إيقاف الموسيقى';
    } else {
        music.pause();
        if (btn) btn.textContent = '🔇 تشغيل الموسيقى';
    }
}