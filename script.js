document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. Navbar Scroll Effect
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // 3. Scroll Reveal Animation
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-enter');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.food-card, .section-title');
    hiddenElements.forEach(el => observer.observe(el));

    // --- NEW FEATURES ---

    // 1. Language Toggle Logic
    const translations = {
        'en': {
            'home': 'Home', 'menu': 'Menu', 'booking': 'Booking', 'booking-title': 'Booking',
            'sub-wedding': 'Shadi Vivah / Birthday', 'sub-hall': 'Hall Book for Party',
            'story': 'Story', 'contact': 'Contact',
            'hero-title': 'Taste the <br> <span style="color:var(--primary)">Quality</span>',
            'hero-desc': 'Premium Burgers, Authentic Chowmein, and Special Snacks.',
            'cat-burgers': 'Burgers', 'desc-burgers': 'The burger journey began in the late 19th century...',
            'cat-chowmein': 'Chowmein', 'desc-chowmein': 'Originating from China and loved by India...',
            'cat-rice': 'Rice & Manchurian', 'desc-rice': 'A fusion of bold flavors...',
            'cat-starters': 'Starters',
            'byob-title': 'Build Your <span style="color:var(--primary)">Recipe</span>'
        },
        'hi': {
            'home': 'मुख पृष्ठ', 'menu': 'मेनू', 'booking': 'बुकिंग', 'booking-title': 'बुकिंग',
            'sub-wedding': 'शादी विवाह / जन्मदिन', 'sub-hall': 'पार्टी हॉल बुकिंग',
            'story': 'कहानी', 'contact': 'संपर्क',
            'hero-title': 'स्वाद <br> <span style="color:var(--primary)">लाजवाब</span>',
            'hero-desc': 'प्रीमियम बर्गर, असली चाउमीन और खास स्नैक्स।',
            'cat-burgers': 'बर्गर', 'desc-burgers': 'बर्गर का सफर 19वीं सदी के अंत में शुरू हुआ था...',
            'cat-chowmein': 'चाउमीन', 'desc-chowmein': 'चीन से आया और भारत का पसंदीदा...',
            'cat-rice': 'राइस और मंचूरियन', 'desc-rice': 'ज़बरदस्त स्वादों का संगम...',
            'cat-starters': 'स्टार्टर्स',
            'byob-title': 'अपनी रेसिपी <span style="color:var(--primary)">बनाएं</span>'
        }
    };

    const langBtn = document.getElementById('lang-btn');
    let currentLang = 'en';

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'hi' : 'en';
            langBtn.innerText = currentLang === 'en' ? 'हिंदी' : 'English';
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[currentLang][key]) el.innerHTML = translations[currentLang][key];
            });
            updateTicker();
        });
    }

    // 3. Dynamic Daily Specials Ticker
    const dailySpecials = {
        0: { en: "SUNDAY FUNDAY: Family Combo Pack at 25% OFF!", hi: "रविवार धमाका: फैमिली कॉम्बो पैक पर 25% की छूट!" },
        1: { en: "🔴 SHOP CLOSED TODAY (Monday).", hi: "🔴 आज दुकान बंद है (सोमवार)।" },
        2: { en: "TASTY TUESDAY: Buy 1 Get 1 FREE on all Burgers!", hi: "स्वादिष्ट मंगलवार: सभी बर्गर पर 1 खरीदें 1 मुफ्त पाएं!" },
        3: { en: "WACKY WEDNESDAY: Flat 20% OFF on all Chinese Items.", hi: "बुधवार ऑफर: सभी चाइनीज आइटम्स पर 20% की छूट।" },
        4: { en: "THIRSTY THURSDAY: Free Cold Drink with every Combo.", hi: "गुरुवार स्पेशल: हर कॉम्बो के साथ कोल्ड ड्रिंक मुफ्त।" },
        5: { en: "FRI-YAY: 10% OFF for Students.", hi: "शुक्रवार मज़ा: छात्रों के लिए 10% की छूट।" },
        6: { en: "SIZZLING SATURDAY: Special Paneer Tikka Platter @ ₹149!", hi: "शनिवार स्पेशल: स्पेशल पनीर टिक्का प्लैटर मात्र ₹149 में!" }
    };

    function updateTicker() {
        const day = new Date().getDay();
        const ticker = document.querySelector('.ticker');
        if (ticker && dailySpecials[day]) {
            ticker.textContent = dailySpecials[day][currentLang];
            const tickerWrap = document.querySelector('.ticker-wrap');
            if (tickerWrap) tickerWrap.style.backgroundColor = (day === 1) ? '#d32f2f' : 'var(--primary)';
        }
    }
    updateTicker();

    // 4. Menu Search Logic
    const searchInput = document.getElementById('menu-search');
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const term = e.target.value.toLowerCase();
            document.querySelectorAll('.food-card').forEach(card => {
                const title = card.querySelector('.food-title').innerText.toLowerCase();
                const desc = card.querySelector('p').innerText.toLowerCase();
                card.style.display = (title.includes(term) || desc.includes(term)) ? 'block' : 'none';
                if (card.style.display === 'block') card.parentElement.style.display = 'grid';
            });
        });
    }

    // 5. WhatsApp Cart System
    let cart = JSON.parse(localStorage.getItem('bk_cart')) || [];
    const cartFloatBtn = document.getElementById('cart-float-btn');
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');

    // --- BACKGROUND ANIMATION LOGIC ---


    function updateCartUI() {
        if (!cartFloatBtn) return;
        const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
        if (cartCount) cartCount.innerText = totalItems;
        cartFloatBtn.style.display = totalItems > 0 ? 'block' : 'none';
        localStorage.setItem('bk_cart', JSON.stringify(cart));
    }

    window.changeQty = (index, delta) => {
        cart[index].qty += delta;
        if (cart[index].qty <= 0) cart.splice(index, 1);
        updateCartUI();
        renderCartItems();
    };

    function renderCartItems() {
        if (!cartItemsContainer) return;
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="color: #ccc; text-align:center;">Your cart is empty.</p>';
            return;
        }
        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'glass';
            itemDiv.style.padding = '10px';
            itemDiv.style.marginBottom = '10px';
            itemDiv.style.display = 'flex';
            itemDiv.style.justifyContent = 'space-between';
            itemDiv.style.alignItems = 'center';
            itemDiv.innerHTML = `
                <div><h4 style="color:white; font-size:0.9rem;">${item.name}</h4></div>
                <div style="display:flex; align-items:center; gap:10px;">
                    <button class="btn-mini" onclick="window.changeQty(${index}, -1)" style="background:red; color:white; border:none; border-radius:5px; width:25px; cursor:pointer;">-</button>
                    <span style="color:white;">${item.qty}</span>
                    <button class="btn-mini" onclick="window.changeQty(${index}, 1)" style="background:green; color:white; border:none; border-radius:5px; width:25px; cursor:pointer;">+</button>
                </div>`;
            cartItemsContainer.appendChild(itemDiv);
        });
    }

    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.food-card');
            if (card) {
                const name = card.querySelector('.food-title').innerText;
                const existingItem = cart.find(i => i.name === name);
                if (existingItem) existingItem.qty++;
                else cart.push({ name: name, qty: 1 });

                const originalText = btn.innerHTML;
                btn.innerHTML = 'Added <i class="fas fa-check"></i>';
                btn.style.background = 'green';
                setTimeout(() => { btn.innerHTML = originalText; btn.style.background = 'var(--primary)'; }, 1000);
                updateCartUI();
            }
        });
    });

    if (cartFloatBtn) {
        cartFloatBtn.addEventListener('click', () => {
            const cartModal = document.getElementById('cart-modal');
            if (cartModal) { cartModal.style.display = 'flex'; renderCartItems(); }
        });
    }
    const closeCart = document.getElementById('close-cart');
    if (closeCart) {
        closeCart.addEventListener('click', () => {
            const cartModal = document.getElementById('cart-modal');
            if (cartModal) cartModal.style.display = 'none';
        });
    }
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return;
            let message = "Hi Burger Kingdom, I would like to place an order:%0a%0a";
            cart.forEach(item => { message += `▪️ ${item.name} x ${item.qty}%0a`; });
            message += "%0aPlease confirm my order!";
            window.open(`https://wa.me/917786990999?text=${message}`, '_blank');
        });
    }

    // --- 6. BUILD RECIPE (MULTI-CATEGORY) LOGIC ---
    // Key Fix: This replaces the old BYOB Logic
    const customTotalEl = document.getElementById('custom-total');
    const customOrderBtn = document.getElementById('custom-order-btn');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const buildForms = document.querySelectorAll('.build-form');

    let activeCategory = 'burger'; // Default active category

    function updateCustomPrice() {
        if (!customTotalEl) return;

        let total = 0;
        const activeForm = document.getElementById(`${activeCategory}-form`);

        if (activeForm) {
            // Checked radio buttons (base price)
            activeForm.querySelectorAll('input[type="radio"]:checked').forEach(input => {
                total += parseInt(input.getAttribute('data-price')) || 0;
            });

            // Checked checkboxes (add-ons)
            activeForm.querySelectorAll('input[type="checkbox"]:checked').forEach(input => {
                total += parseInt(input.getAttribute('data-price')) || 0;
            });
        }

        customTotalEl.innerText = total;
    }

    // Tab Switching Logic
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Deactivate all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            // 2. Hide all forms
            buildForms.forEach(f => f.style.display = 'none');

            // 3. Activate clicked tab
            btn.classList.add('active');

            // 4. Update active category & Show corresponding form
            activeCategory = btn.getAttribute('data-tab');
            const targetForm = document.getElementById(`${activeCategory}-form`);
            if (targetForm) {
                targetForm.style.display = 'block';
                targetForm.classList.add('animate-enter');
            }

            // 5. Update Price
            updateCustomPrice();
        });
    });

    // Input Change Listeners (Dynamic for all forms)
    document.querySelectorAll('.build-form input').forEach(input => {
        input.addEventListener('change', updateCustomPrice);
    });

    if (customOrderBtn) {
        customOrderBtn.addEventListener('click', () => {
            const activeForm = document.getElementById(`${activeCategory}-form`);
            if (!activeForm) return;

            let message = `Hi Burger Kingdom! I built a custom *${activeCategory.toUpperCase()}* recipe:%0a%0a`;

            // Gather details from Radio buttons
            activeForm.querySelectorAll('input[type="radio"]:checked').forEach(input => {
                const label = input.closest('.ingredient-card').querySelector('.card-content').innerText.split('\n')[0];
                message += `▪️ ${label}%0a`;
            });

            // Gather Add-ons
            const addons = [];
            activeForm.querySelectorAll('input[type="checkbox"]:checked').forEach(input => {
                const label = input.closest('.ingredient-card').querySelector('.card-content').innerText.split('\n')[0];
                addons.push(label);
            });

            if (addons.length > 0) {
                message += `➕ Add-ons: ${addons.join(', ')}%0a`;
            }

            const total = customTotalEl.innerText;
            message += `%0a💰 *Total Estimate:* ₹${total}%0a%0aPlease accept my order!`;

            window.open(`https://wa.me/917786990999?text=${message}`, '_blank');
        });
    }

    // Initialize Price for default view
    updateCustomPrice();

    // 7. Spin the Wheel Logic
    const spinFloatBtn = document.getElementById('spin-float-btn');
    const spinModal = document.getElementById('spin-modal');
    const closeSpin = document.getElementById('close-spin');
    const spinBtn = document.getElementById('spin-btn');
    const canvas = document.getElementById('wheel-canvas');
    let ctx = null;

    const prizes = ["10% OFF", "Free Coke", "Better Luck", "20% OFF", "Free Fries", "Try Again"];
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFC300", "#DAF7A6"];
    let startAngle = 0;
    const arc = Math.PI * 2 / prizes.length;
    let spinTimeout = null;
    let spinAngleStart = 10;
    let spinTime = 0;
    let spinTimeTotal = 0;

    if (canvas) {
        ctx = canvas.getContext("2d");
        drawRouletteWheel();
    }

    function drawRouletteWheel() {
        if (!canvas || !ctx) return;
        ctx.clearRect(0, 0, 300, 300);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.font = 'bold 14px sans-serif';

        for (let i = 0; i < prizes.length; i++) {
            const angle = startAngle + i * arc;
            ctx.fillStyle = colors[i];
            ctx.beginPath();
            ctx.arc(150, 150, 140, angle, angle + arc, false);
            ctx.arc(150, 150, 0, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();
            ctx.save();
            ctx.fillStyle = "white";
            ctx.translate(150 + Math.cos(angle + arc / 2) * 110, 150 + Math.sin(angle + arc / 2) * 110);
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            ctx.fillText(prizes[i], -ctx.measureText(prizes[i]).width / 2, 0);
            ctx.restore();
        }
    }

    function rotateWheel() {
        spinTime += 30;
        if (spinTime >= spinTimeTotal) {
            stopRotateWheel();
            return;
        }
        const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
        startAngle += (spinAngle * Math.PI / 180);
        drawRouletteWheel();
        spinTimeout = setTimeout(rotateWheel, 30);
    }

    function stopRotateWheel() {
        clearTimeout(spinTimeout);
        const degrees = startAngle * 180 / Math.PI + 90;
        const arcd = arc * 180 / Math.PI;
        const index = Math.floor((360 - degrees % 360) / arcd);
        alert(`You won: ${prizes[index]}`);
        if (spinBtn) spinBtn.disabled = false;
    }

    function easeOut(t, b, c, d) {
        t /= d; t--; return c * (t * t * t + 1) + b;
    }

    if (spinFloatBtn) {
        spinFloatBtn.addEventListener('click', () => {
            if (spinModal) { spinModal.style.display = 'flex'; drawRouletteWheel(); }
        });
    }
    if (closeSpin) {
        closeSpin.addEventListener('click', () => {
            if (spinModal) spinModal.style.display = 'none';
        });
    }
    if (spinBtn) {
        spinBtn.addEventListener('click', () => {
            spinTime = 0;
            spinTimeTotal = Math.random() * 3000 + 4000;
            spinBtn.disabled = true;
            rotateWheel();
        });
    }

    // 8. Booking Form WhatsApp Logic
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('booking-name').value;
            const phone = document.getElementById('booking-phone').value;
            const type = document.getElementById('booking-type').value;
            const guests = document.getElementById('booking-guests').value;
            const date = document.getElementById('booking-date').value;

            const message = `Hi Burger Kingdom! I want to request a booking:%0a%0a` +
                `👤 Name: ${name}%0a` +
                `📞 Phone: ${phone}%0a` +
                `🎉 Type: ${type}%0a` +
                `👥 Guests: ${guests}%0a` +
                `📅 Date: ${date}%0a%0a` +
                `Please confirm availability!`;

            window.open(`https://wa.me/917786990999?text=${message}`, '_blank');
        });
    }

    updateCartUI();
});
