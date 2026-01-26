// --- SUPABASE CONFIGURATION ---
const SUPABASE_URL = "https://fgmjuamzpaycqwhzsqdf.supabase.co";
const SUPABASE_KEY = "sb_publishable_vbcZf80-k3No54TZngUNNQ_-UfW-7Cp";
const supabaseClient = typeof supabase !== 'undefined' ? supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

// Global State
let dynamicMenuItems = [];
let cart = JSON.parse(localStorage.getItem('zaika_cart')) || [];
let currentLang = localStorage.getItem('zaika_lang') || 'en';

// --- COMPREHENSIVE TRANSLATIONS ---
const translations = {
    'en': {
        'home': 'Home', 'menu': 'Menu', 'booking': 'Booking', 'story': 'Story', 'contact': 'Contact',
        'hero-title': 'Taste the <br> <span style="color:var(--primary)">Quality</span>',
        'hero-desc': 'Premium Burgers, Authentic Chowmein, and Special Snacks.',
        'story-title': 'Our Story',
        'story-text1': 'Zaika Junction started with a simple dream: to bring authentic street flavors to every home.',
        'story-text2': 'We believe food is a bridge to memories. Every bite is crafted with love and fresh ingredients.',
        'sub-wedding': 'Shadi Vivah / Birthday', 'sub-hall': 'Hall Book for Party',
        'cat-burgers': 'Burgers', 'cat-chowmein': 'Chowmein', 'cat-rice': 'Rice & Manchurian', 'cat-starters': 'Starters',
        'price-label': 'Best Price', 'add-to-cart': 'ADD TO CART', 'added': 'Added!',
        'grand-total': 'Grand Total', 'top-pics': 'Top Pics',
        'search-placeholder': 'Search for Paneer, Burger, etc...',
        'build-recipe': 'Build Recipe', 'order-btn': 'ORDER',
        'cart-empty': 'Your cart is empty.',
        // Category Descriptions
        'desc-burgers': 'The burger journey began in the late 19th century, evolving from a simple steak to a global icon. We honor this history by grilling our patties to perfection.',
        'desc-chowmein': 'Classic street-style wok-tossed noodles with fresh seasonal veggies and authentic smoky "Wok Hei" flavor.',
        'desc-rice': 'Fluffy basmati rice and handcrafted manchurian balls, a perfect Indo-Chinese fusion for your soul.',
        'desc-starters': 'Crunchy, spicy, and absolutely addictive. The perfect opening act for your Zaika experience.',

        // Descriptions Fallback
        'desc-vegburger': 'A symphony of farm-fresh crunch! Golden-fried veggie patty in a soft toasted bun.',
        'desc-cheeseburger': 'Melted cheese goodness with our signature veggie patty and fresh toppings.',
        'desc-paneerburger': 'Premium grilled paneer slice with spicy mayo and crunchy lettuce.',
        'desc-crispyburger': 'Our bestseller! Double crunch patty with extra secret sauce.',
        'desc-vegchowmein': 'Classic street-style wok-tossed noodles with fresh seasonal veggies.',
        'desc-paneerchowmein': 'Wok-tossed noodles loaded with soft paneer cubes and spicy sauces.',
        'desc-specialchowmein': 'Chef\'s special mix of exotic veggies and premium seasonings.',
        'desc-vegmanchurian': 'Crispy veggie balls in a tangy, spicy ginger-garlic gravy.',
        'desc-paneermanchurian': 'Soft paneer cubes tossed in classic Manchurian sauce.',
        'desc-vegfriedrice': 'Fluffy aromatic rice stir-fried with finely chopped vegetables.',
        'desc-paneerfriedrice': 'Healthy and tasty fried rice with protein-rich paneer chunks.',
        'desc-specialfriedrice': 'Indo-Chinese fusion rice with unique spices and double veggies.',
        'desc-honeypotato': 'Sweet and spicy crispy potato fingers tossed in honey and sesame.',
        'desc-chefhoneypotato': 'Extra crispy potatoes with a unique blend of Chef\'s secret spices.',
        'desc-paneertikka': 'Marinated paneer cubes grilled to perfection with onions and capsicum.',
        'desc-tandooritikka': 'Authentic tandoori flavor paneer tikka with smoky coal aroma.',
        'desc-vegspringroll': 'Crispy fried rolls stuffed with seasoned vegetable filling.',
        'desc-paneerspringroll': 'Delicious crispy rolls with a rich paneer and veggie stuffing.',
        'desc-dahibda': 'Soft lentil dumplings soaked in creamy spiced yogurt with chutneys.'
    },
    'hi': {
        'home': 'मुख्य पृष्ठ', 'menu': 'मेन्यू', 'booking': 'बुकिंग', 'story': 'कहानी', 'contact': 'संपर्क',
        'hero-title': 'चखें असली <br> <span style="color:var(--primary)">स्वाद</span>',
        'hero-desc': 'प्रीमियम बर्गर, असली चाउमीन और खास स्नैक्स।',
        'story-title': 'हमारी कहानी',
        'story-text1': 'ज़ायका जंक्शन की शुरुआत एक साधारण सपने के साथ हुई थी: असली स्ट्रीट स्वाद को हर घर तक पहुँचाना।',
        'story-text2': 'हमारा मानना है कि भोजन यादों का एक सेतु है। हर बाइट प्यार और ताजी सामग्री के साथ बनाई जाती है।',
        'sub-wedding': 'शादी विवाह / बर्थडे', 'sub-hall': 'हॉल बुकिंग (पार्टी हेतु)',
        'cat-burgers': 'बर्गर', 'cat-chowmein': 'चाउमीन', 'cat-rice': 'राइस और मंचूरिय', 'cat-starters': 'स्टार्टर्स',
        'price-label': 'सबसे कम दाम', 'add-to-cart': 'कार्ट में जोड़ें', 'added': 'जोड़ा गया!',
        'grand-total': 'कुल जमा', 'top-pics': 'टॉप पिक्स',
        'search-placeholder': 'पनीर, बर्गर आदि खोजें...',
        'build-recipe': 'रेसिपी बनाएं', 'order-btn': 'ऑर्डर',
        'cart-empty': 'आपकी कार्ट खाली है।',
        // Category Descriptions (Hindi)
        'desc-burgers': 'बर्गर का सफर 19वीं सदी के अंत में एक साधारण स्टेक से शुरू होकर दुनिया भर का पसंदीदा बनने तक का है। हम इस इतिहास का सम्मान करते हैं और अपनी टिक्कियों को पूर्णता तक ग्रिल करते हैं।',
        'desc-chowmein': 'ताज़ा मौसमी सब्जियों और असली स्मोकी "वोक हेई" स्वाद के साथ क्लासिक स्ट्रीट-स्टाइल वोक-टॉस्ड नूडल्स।',
        'desc-rice': 'खिले हुए बासमती चावल और हाथ से बने मंचूरियन, आपकी आत्मा के लिए एक बेहतरीन इंडो-चाइनीज फ्यूजन।',
        'desc-starters': 'कुरकुरे, तीखे और पूरी तरह से लत लगाने वाले। आपके ज़ायका अनुभव के लिए बेहतरीन शुरुआत।',

        // Descriptions Fallback (Hindi)
        'desc-vegburger': 'खेत की ताज़ा सब्जियों का स्वाद! मुलायम टोस्टेड बन में कुरकुरी वेज पैटी।',
        'desc-cheeseburger': 'हमारी खास वेज पैटी और ताज़ा टॉपिंग्स के साथ पिघले हुए चीज़ का मज़ा।',
        'desc-paneerburger': 'स्पाइसी मेयो और कुरकुरी लेट्यूस के साथ प्रीमियम ग्रिल्ड पनीर स्लाइस।',
        'desc-crispyburger': 'हमारा सबसे ज्यादा बिकने वाला! एक्स्ट्रा सीक्रेट सॉस के साथ डबल क्रंच पैटी।',
        'desc-vegchowmein': 'ताज़ा मौसमी सब्जियों के साथ क्लासिक स्ट्रीट-स्टाइल वोक-टॉस्ड नूडल्स।',
        'desc-paneerchowmein': 'मुलायम पनीर के टुकड़ों और तीखी सॉस के साथ वोक-टॉस्ड नूडल्स।',
        'desc-specialchowmein': 'विदेशी सब्जियों और प्रीमियम मसालों का शेफ का खास मिश्रण।',
        'desc-vegmanchurian': 'चटपटी, तीखी अदरक-लहसुन ग्रेवी में कुरकुरी वेज बॉल्स।',
        'desc-paneermanchurian': 'क्लासिक मंचूरियन सॉस में टॉस किए गए मुलायम पनीर के टुकड़े।',
        'desc-vegfriedrice': 'बारीक कटी सब्जियों के साथ खिले हुए खुशबूदार फ्राइड राइस।',
        'desc-paneerfriedrice': 'प्रोटीन से भरपूर पनीर के टुकड़ों के साथ स्वस्थ और स्वादिष्ट फ्राइड राइस।',
        'desc-specialfriedrice': 'अनोखे मसालों और दोगुणी सब्जियों के साथ इंडो-चाइनीज फ्यूजन राइस।',
        'desc-honeypotato': 'शहद और तिल के साथ टॉस किए गए मीठे और तीखे कुरकुरे आलू फिंगर्स।',
        'desc-chefhoneypotato': 'शेफ के गुप्त मसालों के अनोखे मिश्रण के साथ एक्स्ट्रा कुरकुरे आलू।',
        'desc-paneertikka': 'प्याज और शिमला मिर्च के साथ ग्रिल किए हुए स्वादिष्ट पनीर क्यूब्स।',
        'desc-tandooritikka': 'स्मोकी कोयले की खुशबू के साथ असली तंदूरी स्वाद वाला पनीर टिक्का।',
        'desc-vegspringroll': 'स्वादिष्ट सब्जियों से भरे हुए कुरकुरे फ्राइड रोल्स।',
        'desc-paneerspringroll': 'पनीर और सब्जियों की स्टफिंग के साथ लाजवाब कुरकुरे रोल्स।',
        'desc-dahibda': 'मसालेदार दही और चटनी में भीगे हुए नरम दाल के बड़े।'
    }
};

const dailySpecials = { 0: "SUNDAY FUNDAY: Combo @ 25% OFF!", 1: "🔴 CLOSED TODAY", 2: "TASTY TUESDAY: BOGO Burgers!", 3: "WACKY WEDNESDAY: 20% OFF!", 4: "FREE DRINK THURSDAY!", 5: "10% STUDENT DISCOUNT!", 6: "PANEER TIKKA @ ₹149!" };

function updateLanguageUI() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            if (el.tagName === 'INPUT') el.placeholder = translations[currentLang][key];
            else el.innerHTML = translations[currentLang][key];
        }
    });
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) langBtn.innerText = currentLang === 'en' ? 'हिन्दी' : 'English';
}

function getTranslationKey(name) {
    const map = {
        "Classic Veg Burger": "vegburger", "Cheese Burger": "cheeseburger", "Paneer Burger": "paneerburger", "Crispy Special Burger": "crispyburger",
        "Veg Chowmein": "vegchowmein", "Paneer Chowmein": "paneerchowmein", "Special Chowmein": "specialchowmein",
        "Veg Manchurian": "vegmanchurian", "Paneer Manchurian": "paneermanchurian", "Veg Fried Rice": "vegfriedrice",
        "Paneer Fried Rice": "paneerfriedrice", "Special Fried Rice": "specialfriedrice",
        "Crispy Honey Potato": "honeypotato", "Chef Special Honey Potato": "chefhoneypotato",
        "Classic Paneer Tikka": "paneertikka", "Tandoori Paneer Tikka": "tandooritikka",
        "Veg Spring Roll": "vegspringroll", "Paneer Spring Roll": "paneerspringroll", "Dahi Bda": "dahibda"
    };
    return map[name] || null;
}

async function updateTicker() {
    const ticker = document.querySelector('.ticker'); if (!ticker) return;
    try {
        const { data } = await supabaseClient.from('site_settings').select('value').eq('key', 'ticker_text').single();
        ticker.textContent = data ? data.value : dailySpecials[new Date().getDay()];
    } catch (e) { ticker.textContent = dailySpecials[new Date().getDay()]; }
}

async function fetchDynamicMenu() {
    if (!supabaseClient) { syncMenuButtons(); return; }
    try {
        const { data, error } = await supabaseClient.from('menu_items').select('*').eq('is_available', true);
        if (data && data.length > 0) { dynamicMenuItems = data; renderDynamicMenu(); }
        else syncMenuButtons();
    } catch (e) { syncMenuButtons(); }
}

function renderDynamicMenu(filter = "") {
    const catMap = {
        'Burgers': 'grid-burgers',
        'Chowmein': 'grid-chowmein',
        'Rice & Manchurian': 'grid-rice',
        'Starters': 'grid-starters'
    };

    const filtered = filter ? dynamicMenuItems.filter(i => i.name.toLowerCase().includes(filter.toLowerCase())) : dynamicMenuItems;
    Object.keys(catMap).forEach(key => {
        const grid = document.getElementById(catMap[key]); if (!grid) return;
        const items = filtered.filter(i => i.category === key);
        grid.innerHTML = '';
        if (items.length > 0) items.forEach(item => grid.appendChild(createFoodCard(item)));
    });
    updateLanguageUI(); syncMenuButtons();
}

function createFoodCard(item) {
    const card = document.createElement('div');
    card.className = 'food-card glass';
    // Robust Price Logic
    const price = parseFloat(item.price);
    const rawPrice = isNaN(price) ? 0 : price;
    const disc = isNaN(parseFloat(item.discount_percent)) ? 0 : parseFloat(item.discount_percent);

    const finalPrice = Math.max(0, Math.round(rawPrice * (1 - disc / 100)));
    const tKey = getTranslationKey(item.name);

    card.innerHTML = `
        ${disc > 0 ? `<div class="badge">${disc}% OFF</div>` : ''}
        ${(item.offer_text && !disc) ? `<div class="badge">${item.offer_text}</div>` : ''}
        <h3 class="food-title" ${tKey ? `data-i18n="item-${tKey}"` : ''}>${item.name}</h3>
        <p class="food-desc" ${tKey ? `data-i18n="desc-${tKey}"` : ''}>${item.description || 'Authentic taste from Zaika Junction.'}</p>
        <div class="price-container"></div>
        <span class="p-final" style="display:none;">${finalPrice}</span>
        <span class="p-org" style="display:none;">${rawPrice}</span>
        <span class="p-disc" style="display:none;">${disc}</span>
        <span class="p-offer" style="display:none;">${item.offer_text || ''}</span>
    `;
    return card;
}



function syncMenuButtons() {
    document.querySelectorAll('.food-card').forEach(card => {
        const titleEl = card.querySelector('.food-title');
        const container = card.querySelector('.price-container');
        if (!titleEl || !container) return;
        const name = titleEl.innerText;

        // Backward compatible price parsing
        let pFinal = parseInt(card.querySelector('.p-final')?.innerText || '0');
        if (pFinal === 0) {
            pFinal = parseInt(card.querySelector('.price-amount')?.innerText || '0');
        }

        const pOrg = parseInt(card.querySelector('.p-org')?.innerText || pFinal);
        const pDisc = parseInt(card.querySelector('.p-disc')?.innerText || '0');
        const pOffer = card.querySelector('.p-offer')?.innerText || '';
        const inCart = cart.find(i => i.name === name);

        // Sync Badge for Static Cards
        if (pDisc > 0 && !card.querySelector('.badge')) {
            const badge = document.createElement('div');
            badge.className = 'badge';
            badge.innerText = `${pDisc}% OFF`;
            card.prepend(badge);
        } else if (pOffer && !card.querySelector('.badge')) {
            const badge = document.createElement('div');
            badge.className = 'badge';
            badge.innerText = pOffer;
            card.prepend(badge);
        } else if (pDisc === 0 && !pOffer) {
            card.querySelector('.badge')?.remove();
        }


        const priceHTML = `
            <div class="price-info">
                <span class="price-label" data-i18n="price-label">${translations[currentLang]['price-label']}</span>
                <div class="price-row">
                    <span class="price-amount">₹${pFinal}</span>
                    ${pDisc > 0 ? `<span class="price-old">₹${pOrg}</span>` : ''}
                </div>
            </div>`;

        const safeName = name.replace(/'/g, "\\'").replace(/"/g, "&quot;");
        const safeOffer = pOffer.replace(/'/g, "\\'").replace(/"/g, "&quot;");

        if (inCart && inCart.qty > 0) {
            container.innerHTML = `
                ${priceHTML}
                <div class="menu-counter">
                    <button class="c-btn minus" onclick="changeQtyByName('${safeName}', -1)">
                        ${inCart.qty === 1 ? '<i class="fas fa-trash-alt"></i>' : '<i class="fas fa-minus"></i>'}
                    </button>
                    <span class="counter-value">${inCart.qty}</span>
                    <button class="c-btn plus" onclick="changeQtyByName('${safeName}', 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>`;
        } else {
            container.innerHTML = `${priceHTML}<button class="add-to-cart-btn neon-btn" onclick="addToCartDetailed('${safeName}', ${pFinal}, ${pOrg}, ${pDisc}, '${safeOffer}')" data-i18n="add-to-cart">${translations[currentLang]['add-to-cart']} <i class="fas fa-plus"></i></button>`;
        }
    });
}

// --- SMART OFFER UTILS ---
function getOfferDetails(offerText) {
    if (!offerText) return null;
    const lower = offerText.toLowerCase();
    const match = lower.match(/buy\s*(\d+)\s*get\s*(\d+)/);
    if (match) return { buy: parseInt(match[1]), get: parseInt(match[2]), bogo: true };
    if (lower.includes('bogo')) return { buy: 1, get: 1, bogo: true };
    return null;
}

function calculateBillingQty(qty, details) {
    if (!details || !details.bogo) return qty;
    const totalSet = details.buy + details.get;
    return (Math.floor(qty / totalSet) * details.buy) + Math.min(qty % totalSet, details.buy);
}

window.addToCartDetailed = (name, price, org, disc, offer) => {
    const idx = cart.findIndex(i => i.name === name);
    if (idx !== -1) {
        cart[idx].qty++;
    } else {
        cart.push({ name, price, org, disc, offer, qty: 1 });
    }

    // Generalized Smart Offer Alert
    const details = getOfferDetails(offer);
    let offerTriggered = false;

    if (details) {
        offerTriggered = true;
        const item = cart.find(i => i.name === name);
        const currentFree = item.qty - calculateBillingQty(item.qty, details);
        const prevFree = (item.qty - 1) - calculateBillingQty(item.qty - 1, details);

        if (currentFree > prevFree) {
            showToast("Mubarak! Free item applied! ✅");
        } else {
            const nextFree = (item.qty + 1) - calculateBillingQty(item.qty + 1, details);
            if (nextFree > currentFree) {
                showToast(`Dost! Ek aur add karo, ${details.get > 1 ? 'FREE item' : '1 FREE'} milega! 🎁`);
            }
        }
    }

    localStorage.setItem('zaika_cart', JSON.stringify(cart));
    if (!offerTriggered) {
        showToast(translations[currentLang]['added']);
    }
    updateCartUI();
};

window.changeQtyByName = (name, delta) => {
    const idx = cart.findIndex(i => i.name === name);
    if (idx !== -1) { cart[idx].qty += delta; if (cart[idx].qty <= 0) cart.splice(idx, 1); }
    localStorage.setItem('zaika_cart', JSON.stringify(cart)); updateCartUI();
};

function updateCartUI() {
    const badge = document.getElementById('cart-count');
    const totalQty = cart.reduce((a, b) => a + b.qty, 0);
    if (badge) badge.innerText = totalQty;

    const cartItems = document.getElementById('cart-items');
    if (cartItems) {
        cartItems.innerHTML = '';
        let subtotal = 0;
        if (cart.length === 0) {
            cartItems.innerHTML = `<p style="color:#aaa; text-align:center;">${translations[currentLang]['cart-empty']}</p>`;
        } else {
            cart.forEach(i => {
                const row = document.createElement('div');
                row.className = 'cart-row';
                row.style.display = 'flex';
                row.style.justifyContent = 'space-between';
                row.style.marginBottom = '8px';

                // Generalized BOGO Visual in Cart
                const details = getOfferDetails(i.offer);
                const billingQty = calculateBillingQty(i.qty, details);

                const rowPrice = i.price * billingQty;
                row.innerHTML = `
                    <span style="color:white;">${i.name} x${i.qty} ${billingQty < i.qty ? '<small style="color:var(--primary)">(Offer Applied)</small>' : ''}</span>
                    <span style="color:var(--primary); font-weight:bold;">₹${rowPrice}</span>
                `;
                cartItems.appendChild(row);
                subtotal += rowPrice;
            });
        }

        const cartTotalPrice = document.getElementById('cart-total-price');
        const cartTotalCount = document.getElementById('cart-total-count');
        if (cartTotalPrice) cartTotalPrice.innerText = subtotal;
        if (cartTotalCount) cartTotalCount.innerText = totalQty;
    }
    const cartPageItems = document.getElementById('cart-page-items');
    if (cartPageItems) {
        cartPageItems.innerHTML = '';
        if (cart.length === 0) {
            cartPageItems.innerHTML = `<p style="text-align:center; color:#888;">${translations[currentLang]['cart-empty']}</p>`;
        } else {
            let pageTotal = 0;
            cart.forEach(i => {
                const details = getOfferDetails(i.offer);
                const billingQty = calculateBillingQty(i.qty, details);
                const itemTotal = i.price * billingQty;
                pageTotal += itemTotal;

                const div = document.createElement('div');
                div.className = 'cart-row glass';
                div.style.padding = '1.2rem';
                div.style.marginBottom = '1rem';
                div.style.display = 'flex';
                div.style.justifyContent = 'space-between';
                div.style.alignItems = 'center';
                div.innerHTML = `
                    <div style="flex-grow:1;">
                        <span style="font-weight:700; color:white; font-size:1.1rem;">${i.name}</span><br>
                        <small style="color:var(--primary);">${i.offer ? `Offer: ${i.offer}` : `₹${i.price} each`}</small>
                    </div>
                    <div class="menu-counter" style="margin-right:1.5rem;">
                        <button class="c-btn minus" onclick="changeQtyByName('${i.name.replace(/'/g, "\\'").replace(/"/g, "&quot;")}', -1)">
                            ${i.qty === 1 ? '<i class="fas fa-trash-alt"></i>' : '<i class="fas fa-minus"></i>'}
                        </button>
                        <span class="counter-value">${i.qty}</span>
                        <button class="c-btn plus" onclick="changeQtyByName('${i.name.replace(/'/g, "\\'").replace(/"/g, "&quot;")}', 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div style="text-align:right;">
                        <span style="font-weight:800; color:var(--primary); font-size:1.2rem;">₹${itemTotal}</span>
                        ${billingQty < i.qty ? `<br><small style="color:#888; text-decoration:line-through;">₹${i.price * i.qty}</small>` : ''}
                    </div>
                `;
                cartPageItems.appendChild(div);
            });
            const pgTotal = document.getElementById('cart-page-total-price');
            const pgCount = document.getElementById('cart-page-total');
            if (pgTotal) pgTotal.innerText = pageTotal;
            if (pgCount) pgCount.innerText = cart.reduce((a, b) => a + b.qty, 0);
        }
    }

    syncMenuButtons();
}

function showToast(msg) {
    let t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
    t.innerText = msg; t.className = 'show'; setTimeout(() => t.className = '', 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    updateLanguageUI(); updateTicker(); fetchDynamicMenu(); updateCartUI();
    document.getElementById('lang-btn')?.addEventListener('click', () => { currentLang = currentLang === 'en' ? 'hi' : 'en'; localStorage.setItem('zaika_lang', currentLang); updateLanguageUI(); syncMenuButtons(); });
    document.getElementById('menu-search')?.addEventListener('input', (e) => renderDynamicMenu(e.target.value));

    // Modal Logic
    const cartModal = document.getElementById('cart-modal');
    document.getElementById('cart-icon')?.addEventListener('click', () => cartModal.style.display = 'flex');
    document.getElementById('close-cart')?.addEventListener('click', () => cartModal.style.display = 'none');
    document.getElementById('cart-float-btn')?.addEventListener('click', () => cartModal.style.display = 'flex');

    const performCheckout = () => {
        if (cart.length === 0) return;
        let totalSavings = 0;
        let grandTotal = 0;
        let msg = `*New Order - Zaika Junction*%0a%0a`;

        cart.forEach(i => {
            const details = getOfferDetails(i.offer);
            const billingQty = calculateBillingQty(i.qty, details);
            let offerNote = "";

            if (billingQty < i.qty) {
                offerNote = ` (Offer Applied: Charged for ${billingQty})`;
            }

            const itemTotal = i.price * billingQty;
            const originalTotal = i.org * i.qty;
            totalSavings += (originalTotal - itemTotal);
            grandTotal += itemTotal;

            msg += `▪️ ${i.name} (x${i.qty}) - ₹${itemTotal}${offerNote}%0a`;
        });

        msg += `%0a*Grand Total: ₹${grandTotal}*`;
        if (totalSavings > 0) msg += `%0aTotal Savings: ₹${totalSavings} 🤑`;
        msg += `%0a%0a_Sent via Zaika Junction Website_`;

        window.open(`https://wa.me/917786990999?text=${msg}`);
    };

    document.getElementById('checkout-btn')?.addEventListener('click', performCheckout);
    document.getElementById('cart-page-checkout')?.addEventListener('click', performCheckout);
});
