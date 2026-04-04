// Intersection Observer for Reveal Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 50,
                behavior: 'smooth'
            });
        }
    });
});

// Provenance & Performance Modal Logic
const modalData = {
    alpine: {
        title: "Alpine Dawn",
        narrative: "Sourced from the high-altitude volcanic terraces of the Gedeh estate. The thin atmosphere at 2,400M forces the coffee cherries to mature slowly, concentrating sugars and creating a translucent, citrus-forward profile that carries the sheer clarity of the peak.",
        processing: "Traditional Fully Washed. 36-hour cold fermentation followed by raised-bed sun drying for 18 days.",
        alt: "2,400M / 7,874FT",
        lot: "SS-012",
        premium: "85% Above Fair Trade",
        ratio: "1:16.8",
        temp: "92.5°C",
        grind: "720 µm",
        brewing: "We recommend a high-agitation pour for Alpine Dawn. Start with a 3x bloom for 45 seconds to unlock the citrus clarity. Use a slow, circular pour to maintain a constant thermal mass. Target a total drawdown time of 3 minutes and 15 seconds.",
        green: "$5.12 / lb",
        market: "$2.88 / lb",
        score: "87.5 / 100",
        tier: "Specialty High-Alpine"
    },
    midnight: {
        title: "Midnight Peak",
        narrative: "An isolated micro-lot from the 'Shadow Valley'. The volcanic soil provides a unique smoky undertone that we intensify through low-oxygen roasting.",
        processing: "Slow-Dry Anaerobic. 72-hour whole-cherry fermentation in sealed stainless steel tanks.",
        alt: "2,100M / 6,889FT",
        lot: "SS-044",
        premium: "92% Above Fair Trade",
        ratio: "1:15.5",
        temp: "94.0°C",
        grind: "850 µm",
        brewing: "Midnight Peak requires a higher temperature to penetrate its anaerobic structure. We suggest a 1:15.5 ratio for a syrup-like body. Minimize agitation to prevent over-extraction of the deep smokiness. Best enjoyed in a Chemex at coarse settings.",
        green: "$5.45 / lb",
        market: "$3.05 / lb",
        score: "89.0 / 100",
        tier: "Limited Edition Reserve"
    },
    glacier: {
        title: "Glacier Obsidian",
        narrative: "Grown on the precipice of an active geothermal plateau. The biological stress-response in the plant results in a flavor density unseen in lower elevations.",
        processing: "Pulped Natural (Honey Process). 50% mucilage retention during drying.",
        alt: "2,650M / 8,694FT",
        lot: "SS-098",
        premium: "88% Above Fair Trade",
        ratio: "1:2.1 (Espresso)",
        temp: "93.0°C",
        grind: "240 µm",
        brewing: "For Glacier Obsidian, we target a concentrated 1:2.1 extraction. Pre-infuse for 8 seconds at 3 bars, followed by a flat 9-bar ramp. The geothermal density allows for high extraction yields without astringency. Expect a viscous, obsidian-dark crema.",
        green: "$5.88 / lb",
        market: "$3.20 / lb",
        score: "89.5 / 100",
        tier: "Competition Signature"
    }
};

const modal = document.getElementById('provenance-modal');
const closeBtn = document.getElementById('modal-close-btn');
const tabs = document.querySelectorAll('.modal-tab');
const panes = document.querySelectorAll('.modal-pane');

document.querySelectorAll('.provenance-link').forEach(link => {
    link.addEventListener('click', () => {
        const id = link.getAttribute('data-archive-id');
        const data = modalData[id];
        
        // Populate Origin
        document.getElementById('modal-title').innerText = data.title;
        document.getElementById('modal-narrative').innerText = data.narrative;
        document.getElementById('modal-processing').innerText = data.processing;
        document.getElementById('modal-alt').innerText = data.alt;
        document.getElementById('modal-lot').innerText = data.lot;
        document.getElementById('modal-premium').innerText = data.premium;
        
        // Populate Performance
        document.getElementById('modal-ratio').innerText = data.ratio;
        document.getElementById('modal-temp').innerText = data.temp;
        document.getElementById('modal-grind').innerText = data.grind;
        document.getElementById('modal-brewing').innerText = data.brewing;
        
        // Populate Transparency
        document.getElementById('modal-green').innerText = data.green;
        document.getElementById('modal-market').innerText = data.market;
        document.getElementById('modal-score').innerText = data.score;
        document.getElementById('modal-tier').innerText = data.tier;
        
        // Reset to Origin tab
        tabs.forEach(t => t.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));
        document.getElementById('tab-origin').classList.add('active');
        document.getElementById('pane-origin').classList.add('active');

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Tab Switching
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');
        tabs.forEach(t => t.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(`pane-${target}`).classList.add('active');
    });
});

const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
};

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Vault Checkout Logic
const checkoutOverlay = document.getElementById('vault-checkout');
const closeCheckoutBtn = document.getElementById('checkout-close');
const checkoutItemName = document.getElementById('checkout-item-name');
const checkoutItemPrice = document.getElementById('checkout-item-price');
const checkoutTotal = document.getElementById('checkout-total');
const vaultForm = document.getElementById('vault-form');

document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // If it's a general CTA (like hero or footer)
        const card = btn.closest('.product-info');
        
        if (!card) {
            // General CTA: Scroll to entries
            e.preventDefault();
            const shopSection = document.getElementById('shop');
            if (shopSection) shopSection.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        // Specific Product CTA: Open Checkout
        const name = card.querySelector('h3').innerText;
        const priceText = card.querySelector('.price').innerText;
        const price = priceText.split(' /')[0];
        
        checkoutItemName.innerText = name;
        checkoutItemPrice.innerText = price;
        checkoutTotal.innerText = price;
        
        checkoutOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

closeCheckoutBtn.addEventListener('click', () => {
    checkoutOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

vaultForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = vaultForm.querySelector('button');
    btn.innerText = "AUTHENTICATING...";
    btn.disabled = true;
    
    setTimeout(() => {
        alert("ACCESS GRANTED. YOUR APEX ENTRY HAS BEEN AUTHENTICATED AND IS NOW IN THE COURIER VAULT.");
        checkoutOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        btn.innerText = "Finalize Archive Entry";
        btn.disabled = false;
        vaultForm.reset();
    }, 2000);
});

// Archive Evaluation Quiz Logic
const quizModal = document.getElementById('archive-quiz');
const quizSteps = document.querySelectorAll('.quiz-step');
const quizProgress = document.getElementById('quiz-progress-fill');
const beginQuizBtn = document.getElementById('begin-quiz-btn');
const closeQuizBtn = document.getElementById('quiz-close');

let currentStep = 1;
let quizScores = { atmosphere: '', texture: '' };

const updateQuiz = (step) => {
    quizSteps.forEach(s => s.classList.remove('active'));
    document.querySelector(`.quiz-step[data-step="${step}"]`)?.classList.add('active');
    quizProgress.style.width = `${(step / 3) * 100}%`;
};

const showResult = () => {
    quizSteps.forEach(s => s.classList.remove('active'));
    document.getElementById('quiz-step-result').classList.add('active');
    quizProgress.style.width = '100%';
    
    const title = document.getElementById('recommended-title');
    const desc = document.getElementById('recommended-desc');
    
    if (quizScores.atmosphere === 'light' && quizScores.texture === 'was') {
        title.innerText = "Alpine Dawn";
        desc.innerText = "Your preference for first-light clarity and focused textures makes Alpine Dawn your ideal entry point. Crystalized, clean, and soaring.";
    } else if (quizScores.atmosphere === 'dark' && quizScores.texture === 'ana') {
        title.innerText = "Midnight Peak";
        desc.innerText = "You gravitate toward the depth of the valley and the velvety mouthfeel of artisanal processing. Midnight Peak is your absolute match.";
    } else {
        title.innerText = "Glacier Obsidian";
        desc.innerText = "A master of balance. You appreciate intensity from geothermal plateaus mixed with the silkiness of a specialized honey process.";
    }
};

beginQuizBtn.addEventListener('click', () => {
    currentStep = 1;
    quizScores = { atmosphere: '', texture: '' };
    quizModal.classList.add('active');
    updateQuiz(1);
    document.body.style.overflow = 'hidden';
});

closeQuizBtn.addEventListener('click', () => {
    quizModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

document.querySelectorAll('.quiz-option').forEach(opt => {
    opt.addEventListener('click', () => {
        const step = opt.closest('.quiz-step').getAttribute('data-step');
        const val = opt.getAttribute('data-value');
        
        if (step === '1') {
            quizScores.atmosphere = val;
            currentStep = 2;
            updateQuiz(2);
        } else if (step === '2') {
            quizScores.texture = val;
            showResult();
        }
    });
});

document.getElementById('acquire-recommendation').addEventListener('click', () => {
    quizModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Mobile Burger Logic
const burger = document.getElementById('nav-burger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Close menu on link click
navItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// Simple Navbar transparency on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.backgroundColor = 'rgba(20, 46, 33, 0.98)';
        nav.style.padding = '1rem 0';
        nav.style.boxShadow = '0 10px 40px rgba(0,0,0,0.15)';
        nav.style.position = 'fixed';
    } else {
        nav.style.backgroundColor = 'transparent';
        nav.style.padding = '3rem 0';
        nav.style.boxShadow = 'none';
        nav.style.position = 'absolute';
    }
});

// Vault Login Modal Logic
const loginOverlay = document.getElementById('vault-login');
const openLoginBtn = document.getElementById('open-login');
const loginClose = document.getElementById('login-close');
const loginForm = document.getElementById('login-form');

if (openLoginBtn) {
    openLoginBtn.addEventListener('click', () => {
        loginOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (loginClose) {
    loginClose.addEventListener('click', () => {
        loginOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = loginForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = "TRACE-DB: DECRYPTING PROFILE...";
        btn.disabled = true;

        setTimeout(() => {
            alert("ACCESS GRANTED. SYNCING APEX PROFILE DATA & SUBSCRIPTION ARCHIVES.");
            loginOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            btn.innerText = originalText;
            btn.disabled = false;
            loginForm.reset();
        }, 2500);
    });
}

// Close login modal on outside click
if (loginOverlay) {
    loginOverlay.addEventListener('click', (e) => {
        if (e.target === loginOverlay) {
            loginOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

console.log('APEX | High-Altitude Roast. Pure Apex.');
