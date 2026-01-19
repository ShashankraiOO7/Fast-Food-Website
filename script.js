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
            'cat-burgers': 'Burgers', 'desc-burgers': 'The burger journey began in the late 19th century, evolving from a simple steak to a global icon. We honor this history by grilling our patties to perfection, ensuring every bite is a celebration of flavor.',
            'cat-chowmein': 'Chowmein', 'desc-chowmein': 'Originating from China and loved by India, our Chowmein is a fusion of cultures. Wok-tossed noodles, crunchy fresh vegetables, and our secret blend of sauces create a taste that feels like home yet tastes like an adventure.',
            'cat-rice': 'Rice & Manchurian', 'desc-rice': 'A fusion of bold flavors. Our Manchurian balls are handcrafted daily, and our rice is stir-fried to fluffy perfection with aromatic spices, creating a comforting yet exciting meal.',
            'cat-starters': 'Starters',
            'byob-title': 'Build Your <span style="color:var(--primary)">Recipe</span>',

            // Menu Items
            'item-vegburger': 'Classic Veg Burger', 'desc-vegburger': 'A symphony of farm-fresh crunch! Our golden-fried vegetable patty is nestled in a soft, toasted bun, drizzled with our signature creamy tangy sauce and topped with crisp lettuce. A classic done right.',
            'item-cheeseburger': 'Cheese Burger', 'desc-cheeseburger': 'Indulgence redefined. A thick, juicy patty blanketed under a molten layer of premium cheddar cheese. Every bite is a gooey, cheesy explosion that melts in your mouth.',
            'item-paneerburger': 'Paneer Burger', 'desc-paneerburger': 'Royal Indian fusion! A thick slice of fresh, soft paneer, marinated in zesty spices and grilled to perfection. Paired with our secret tandoori mayo for a smoky kick.',
            'item-crispyburger': 'Crispy Special Burger', 'desc-crispyburger': 'The King of Crunch! Double-coated in our secret herb batter and fried to a golden crisp. It’s loud, it’s crunchy, and it’s overflowing with flavors.',

            'item-vegchowmein': 'Veg Chowmein', 'desc-vegchowmein': 'Street-style magic! Wok-tossed noodles dancing with crunchy cabbage, carrots, and capsicum, all coated in a smoky soy-chili glaze. The authentic taste of Desi Chinese.',
            'item-paneerchowmein': 'Paneer Chowmein', 'desc-paneerchowmein': 'Soft meets spicy. Fresh paneer cubes tossed with high-heat noodles and vegetables. The creamy texture of paneer balances the spicy kick of the sauces perfectly.',
            'item-specialchowmein': 'Special Chowmein', 'desc-specialchowmein': 'A carnival of flavors! Loaded with exotic vegetables like broccoli, baby corn, and mushrooms, tossed in our chef’s secret spicy "Dragon Sauce".',

            'item-vegmanchurian': 'Veg Manchurian', 'desc-vegmanchurian': 'Melt-in-your-mouth dumplings! Finely minced fresh veggies shaped into balls, fried golden, and simmered in a rich, glossy garlic-soy gravy. Absolute comfort food.',
            'item-paneermanchurian': 'Paneer Manchurian', 'desc-paneermanchurian': 'Crispy outside, soft inside! Batter-fried paneer cubes tossed in a tangy, spicy Manchurian sauce with plenty of garlic and green chilies.',
            'item-vegfriedrice': 'Veg Fried Rice', 'desc-vegfriedrice': 'Aromatic Basmati bliss! Each grain is separate and fragrant, wok-tossed with colorful finely chopped veggies and a hint of white pepper.',
            'item-paneerfriedrice': 'Paneer Fried Rice', 'desc-paneerfriedrice': 'Protein-packed delight! Our classic fried rice upgraded with generous chunks of golden-fried paneer. A hearty meal that satisfies the soul.',
            'item-specialfriedrice': 'Special Fried Rice', 'desc-specialfriedrice': 'The Royal Feast! Rich Basmati rice tossed with crunchy cashews, sweet raisins, and exotic veggies. A sweet and savory masterpiece fit for a King.',

            'item-honeypotato': 'Crispy Honey Potato', 'desc-honeypotato': 'Sweet, spicy, and sticky! Crispy potato fingers glazed in a glistening honey-chili sauce and topped with roasted sesame seeds. Impossible to stop at one.',
            'item-chefhoneypotato': 'Chef\'s Special Honey Potato', 'desc-chefhoneypotato': 'The ultimate crunch! Extra-crispy potatoes tossed with ginger, garlic, and our secret chef\'s glaze. A texture combination that will blow your mind.',
            'item-paneertikka': 'Classic Paneer Tikka', 'desc-paneertikka': 'Smoky perfection! Fresh cottage cheese marinated in hung curd and aromatic spices, then roasted in a clay tandoor until charred and irresistible.',
            'item-tandooritikka': 'Tandoori Paneer Tikka', 'desc-tandooritikka': 'Fiery and bold! Paneer cubes marinated in a spicy red chili and yogurt mix, roasted to give a deep, smoky flavor that lingers on your palate.',
            'item-vegspringroll': 'Veg Spring Roll', 'desc-vegspringroll': 'The Golden Crunch! A paper-thin crispy wrapper stuffed with a savory, spiced vegetable stir-fry. Served piping hot with our special schezwan dip.',
            'item-paneerspringroll': 'Paneer Spring Roll', 'desc-paneerspringroll': 'Cheesy and crispy! The classic spring roll stuffed with a rich filling of grated spiced paneer and veggies. A creamy surprise in every bite.',
            'item-dahibda': 'Dahi Bda', 'desc-dahibda': 'A cool explosion! Cloud-soft lentil dumplings soaked in chilled, creamy yogurt, topped with tangy tamarind chutney and a sprinkle of roasted spices.',

            // Story Section
            'story-title': 'The Royal Journey',
            'story-subtitle1': 'From Humble Beginnings',
            'story-text1': 'It all started at <strong>Rai Bhawan</strong> with a simple mission: to bring world-class fast food flavors to our local community. What began as a small passion project has now grown into the <strong>Burger Kingdom</strong> - a place where every meal is treated like a royal feast.',
            'story-text2': 'Our founder believed that fast food shouldn\'t just be \'fast\' - it should be fresh, flavorful, and memorable. That\'s why we don\'t just assemble burgers; we craft them.',
            'story-subtitle2': 'Our Secret Process',
            'story-point1': '<i class="fas fa-check-circle" style="color:var(--secondary); margin-right:10px;"></i> <strong>Fresh Grind:</strong> We grind our own spices daily to ensure the aroma hits you before the taste does.',
            'story-point2': '<i class="fas fa-check-circle" style="color:var(--secondary); margin-right:10px;"></i> <strong>Farm to Fork:</strong> All our veggies - lettuce, tomatoes, onions - are sourced from local farms every morning.',
            'story-point3': '<i class="fas fa-check-circle" style="color:var(--secondary); margin-right:10px;"></i> <strong>Chef\'s Magic:</strong> Our sauces are house-made secrets. You won\'t find these flavors in a bottle anywhere else.',
            'story-quote': '"We don\'t serve customers; we serve guests in our Kingdom."',

            // Featured Items
            'feat-desc-crispyburger': 'Our Chef\'s Masterpiece. A double-coated crispy patty that stays crunchy till the last bite.',
            'feat-desc-specialchowmein': 'Wok-tossed at high heat to capture the smoky \'dragon\'s breath\' flavor with exotic veggies.',
            'feat-desc-tandooritikka': 'Marinated overnight and roasted in a traditional clay oven for that authentic charred taste.',

            // Build Recipe
            'your-creation': 'YOUR CREATION:',
            'preview-placeholder': 'Start selecting ingredients'
        },
        'hi': {
            'home': 'मुख पृष्ठ', 'menu': 'मेनू', 'booking': 'बुकिंग', 'booking-title': 'बुकिंग',
            'sub-wedding': 'शादी विवाह / जन्मदिन', 'sub-hall': 'पार्टी हॉल बुकिंग',
            'story': 'कहानी', 'contact': 'संपर्क',
            'hero-title': 'स्वाद <br> <span style="color:var(--primary)">लाजवाब</span>',
            'hero-desc': 'प्रीमियम बर्गर, असली चाउमीन और खास स्नैक्स।',
            'cat-burgers': 'बर्गर', 'desc-burgers': 'बर्गर का सफर 19वीं सदी के अंत में एक साधारण स्टीक से शुरू होकर दुनिया भर का पसंदीदा बनने तक का है। हम इस इतिहास का सम्मान करते हैं और अपनी टिक्कियों को पूर्णता तक ग्रिल करते हैं, ताकि हर निवाला स्वाद का उत्सव बन सके।',
            'cat-chowmein': 'चाउमीन', 'desc-chowmein': 'चीन से आया और भारत का पसंदीदा, हमारा चाउमीन संस्कृतियों का संगम है। कड़ाही में भुनी हुई नूडल्स, कुरकुरी ताजी सब्जियां और हमारे गुप्त सॉस का मिश्रण एक ऐसा स्वाद देता है जो घर जैसा लगता है लेकिन एक रोमांचक अनुभव भी कराता है।',
            'cat-rice': 'राइस और मंचूरियन', 'desc-rice': 'ज़बरदस्त स्वादों का संगम। हमारे मंचूरियन बॉल्स रोज़ हाथ से बनाए जाते हैं, और हमारे चावल को खुशबूदार मसालों के साथ पूर्णता तक भूनकर तैयार किया जाता है, जो एक आरामदायक लेकिन मजेदार भोजन बनाता है।',
            'cat-starters': 'स्टार्टर्स',
            'byob-title': 'अपनी रेसिपी <span style="color:var(--primary)">बनाएं</span>',

            // Menu Items (Hindi)
            'item-vegburger': 'क्लासिक वेज बर्गर', 'desc-vegburger': 'खेत की ताजगी का स्वाद! हमारे सुनहरे कुरकुरे वेज पैटी को नरम बन में रखा गया है, जिस पर हमारी खास मलाईदार चटपटी सॉस और कुरकुरा सलाद पत्ता है। एक क्लासिक जो दिल जीत ले।',
            'item-cheeseburger': 'चीज़ बर्गर', 'desc-cheeseburger': 'असली नशा! एक रसीली, गरम टिक्की जो पिघली हुई प्रीमियम चीज़ की चादर में लिपटी है। हर निवाला एक मलाईदार, चीज़ से भरा धमाका है जो मुँह में घुल जाता है।',
            'item-paneerburger': 'पनीर बर्गर', 'desc-paneerburger': 'शाही भारतीय स्वाद! ताजे, नरम पनीर का मोटा टुकड़ा, जिसे मसालों में लपेटकर ग्रिल किया गया है। साथ में तंदूरी मेयो का स्मोकी तड़का।',
            'item-crispyburger': 'क्रिस्पी स्पेशल बर्गर', 'desc-crispyburger': 'करारेपन का राजा! हमारे गुप्त हर्ब्स के घोल में डबल-कोट करके सुनहरा तला गया। यह बहुत क्रिस्पी है, बहुत रसीला है, और स्वादों से भरा हुआ है।',

            'item-vegchowmein': 'वेज चाउमीन', 'desc-vegchowmein': 'सड़क वाला जादू! कुरकुरी पत्ता गोभी, गाजर और शिमला मिर्च के साथ हाई फ्लेम पर भुनी हुई नूडल्स, जो स्मोकी सोया-चिली सॉस में लिपटी हैं। असली देसी चाइनीज का मजा।',
            'item-paneerchowmein': 'पनीर चाउमीन', 'desc-paneerchowmein': 'नरम और तीखे का संगम। ताजे पनीर के टुकड़ों को तीखी नूडल्स और सब्जियों के साथ टॉस किया गया है। पनीर की मलाईदार बनावट सॉस की तीखेपन को बेहतरीन तरीके से संतुलित करती है।',
            'item-specialchowmein': 'स्पेशल चाउमीन', 'desc-specialchowmein': 'स्वाद का मेला! ब्रोकोली, बेबी कॉर्न और मशरूम जैसी विदेशी सब्जियों से भरपूर, हमारे शेफ के गुप्त "ड्रैगन सॉस" में पकाया गया।',

            'item-vegmanchurian': 'वेज मंचूरियन', 'desc-vegmanchurian': 'मुँह में घुल जाने वाले पकौड़े! बारीक कटी ताजी सब्जियों के गोले, जिन्हे सुनहरा तला गया और एक गाढ़ी, चमकदार लहसुन-सोया ग्रेवी में पकाया गया। सुकून देने वाला स्वाद।',
            'item-paneermanchurian': 'पनीर मंचूरियन', 'desc-paneermanchurian': 'बाहर से कुरकुरा, अंदर से नरम! पनीर के टुकड़ों को एक तीखी, चटपटी मंचूरियन सॉस में ढेर सारे लहसुन और हरी मिर्च के साथ टॉस किया गया है।',
            'item-vegfriedrice': 'वेज फ्राइड राइस', 'desc-vegfriedrice': 'बासमती की खुशबू! चावल का हर दाना अलग और खुशबूदार, जिसे रंगीन बारीक कटी सब्जियों और हल्की काली मिर्च के साथ वोक में भुना गया है।',
            'item-paneerfriedrice': 'पनीर फ्राइड राइस', 'desc-paneerfriedrice': 'प्रोटीन से भरपूर! हमारे क्लासिक फ्राइड राइस में सुनहरे तले हुए पनीर के ढेर सारे टुकड़े। एक ऐसा खाना जो पेट और रूह दोनों को खुश कर दे।',
            'item-specialfriedrice': 'स्पेशल फ्राइड राइस', 'desc-specialfriedrice': 'शाही दावत! काजू, किशमिश और विदेशी सब्जियों के साथ भुना हुआ अमीर बासमती चावल। एक मीठा और नमकीन मास्टरपीस जो राजाओं के लिए बना है।',

            'item-honeypotato': 'क्रिस्पी हनी पोटैटो', 'desc-honeypotato': 'मीठा, तीखा और नशीला! कुरकुरे आलू के फिंगर्स जो एक चमकदार शहद-मिर्च सॉस में लिपटे हैं और ऊपर से भुने हुए तिल। एक पर रुकना नामुमकिन है।',
            'item-chefhoneypotato': 'शेफ स्पेशल हनी पोटैटो', 'desc-chefhoneypotato': 'अल्टिमेट क्रंच! अदरक, लहसुन और हमारे शेफ के गुप्त ग्लैज़ के साथ टॉस किए गए एक्स्ट्रा-क्रिस्पी आलू। एक ऐसा टेक्सचर जो आपका दिमाग हिला देगा।',
            'item-paneertikka': 'क्लासिक पनीर टिक्का', 'desc-paneertikka': 'स्मोकी परफेक्शन! ताजे पनीर को गाढ़े दही और खुशबूदार मसालों में मैरीनेट किया गया, फिर मिट्टी के तंदूर में भूना गया जब तक कि वह चार-ग्रिल्ड न हो जाए।',
            'item-tandooritikka': 'तंदूरी पनीर टिक्का', 'desc-tandooritikka': 'तीखा और बोल्ड! लाल मिर्च और दही के मिश्रण में मैरीनेट किए गए पनीर के टुकड़े, जिन्हें भूनकर एक गहरा, स्मोकी स्वाद दिया गया है जो जुबान पर बना रहता है।',
            'item-vegspringroll': 'वेज स्प्रिंग रोल', 'desc-vegspringroll': 'गोल्डन क्रंच! एक कागज जैसी पतली कुरकुरी परत जिसमें मसालेदार सब्जियों का मिश्रण भरा है। हमारी खास शेजवान डिप के साथ गरमा गरम परोसा जाता है।',
            'item-paneerspringroll': 'पनीर स्प्रिंग रोल', 'desc-paneerspringroll': 'चीज़ी और क्रिस्पी! क्लासिक स्प्रिंग रोल जिसमें कसा हुआ मसालेदार पनीर और सब्जियां भरी हैं। हर निवाले में एक मलाईदार सरप्राइज।',
            'item-dahibda': 'दही बड़ा', 'desc-dahibda': 'ठंडक का धमाका! ठंडी, मलाईदार दही में भिगोए गए बादल जैसे नरम दाल के बड़े, ऊपर से तीखी इमली की चटनी और भुने हुए जीरे की बारिश।',

            // Story Section (Hindi)
            'story-title': 'शाही सफर',
            'story-subtitle1': 'एक विनम्र शुरुआत',
            'story-text1': 'यह सब <strong>राय भवन</strong> से एक साधारण मिशन के साथ शुरू हुआ: हमारे स्थानीय समुदाय के लिए विश्व स्तरीय फास्ट फूड का स्वाद लाना। जो एक छोटे से प्रोजेक्ट के रूप में शुरू हुआ था, वह अब <strong>बर्गर किंगडम</strong> बन गया है - एक ऐसी जगह जहां हर भोजन को शाही दावत की तरह माना जाता है।',
            'story-text2': 'हमारे संस्थापक का मानना था कि फास्ट फूड सिर्फ \'फास्ट\' नहीं होना चाहिए—इसे ताज़ा, स्वादिष्ट और यादगार होना चाहिए। इसलिए हम सिर्फ बर्गर बनाते नहीं हैं; हम उन्हें तराशते हैं।',
            'story-subtitle2': 'हमारी गुप्त प्रक्रिया',
            'story-point1': '<i class="fas fa-check-circle" style="color:var(--secondary); margin-right:10px;"></i> <strong>ताज़ा पिसाई:</strong> हम अपने मसाले रोज़ पीसते हैं ताकि स्वाद से पहले आपको खुशबू का अहसास हो।',
            'story-point2': '<i class="fas fa-check-circle" style="color:var(--secondary); margin-right:10px;"></i> <strong>खेत से प्लेट तक:</strong> हमारी सभी सब्जियां—सलाद पत्ता, टमाटर, प्याज—हर सुबह स्थानीय खेतों से मंगाई जाती हैं।',
            'story-point3': '<i class="fas fa-check-circle" style="color:var(--secondary); margin-right:10px;"></i> <strong>शेफ का जादू:</strong> हमारे सॉस घर के बने गुप्त नुस्खे हैं। ये स्वाद आपको किसी बोतल में नहीं मिलेंगे।',
            'story-quote': '"हम ग्राहकों की सेवा नहीं करते; हम अपने किंगडम में मेहमानों की सेवा करते हैं।"',

            // Featured Items (Hindi)
            'feat-desc-crispyburger': 'हमारे शेफ की कृत। डबल-कोटेड कुरकुरी टिक्की जो आखिरी निवाले तक करारी रहती है।',
            'feat-desc-specialchowmein': 'धुएँ के स्वाद और विदेशी सब्जियों के साथ हाई फ्लेम पर पकाया गया।',
            'feat-desc-tandooritikka': 'पूरी रात मैरीनेट किया हुआ और पारंपरिक मिट्टी के चूल्हे में भुना हुआ असली स्वाद।',

            // Build Recipe (Hindi)
            'your-creation': 'आपकी रचना:',
            'preview-placeholder': 'सामग्री चुनना शुरू करें'
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

    // 5. WhatsApp Cart System (Updated for Separate Page & Auto Offers)
    let cart = JSON.parse(localStorage.getItem('bk_cart')) || [];
    const cartFloatBtn = document.getElementById('cart-float-btn');
    const cartCount = document.getElementById('cart-count');

    // Elements on separate cart.html
    const cartPageItems = document.getElementById('cart-page-items');
    const cartPageTotal = document.getElementById('cart-page-total');
    const cartPageCheckout = document.getElementById('cart-page-checkout');

    // --- AUTO OFFER LOGIC ---
    function getDailyOffer(itemName) {
        const day = new Date().getDay();
        const lowerName = itemName.toLowerCase();

        // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
        if (day === 0) return " (Family Combo Offer Applied)"; // Sunday
        // Monday Closed
        if (day === 2 && lowerName.includes('burger')) return " (🔥 B1G1 FREE Applied)"; // Tuesday
        if (day === 3 && (lowerName.includes('chowmein') || lowerName.includes('manchurian') || lowerName.includes('rice') || lowerName.includes('roll'))) return " (🔥 20% OFF Applied)"; // Wednesday
        if (day === 4) return " (🥤 Free Cold Drink Applied)"; // Thursday
        if (day === 5) return " (Student Offer)"; // Friday
        if (day === 6 && lowerName.includes('paneer tikka')) return " (Special Price ₹149 Applied)"; // Saturday

        return "";
    }

    function updateCartUI() {
        const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

        // Update Floating Button (Global)
        if (cartFloatBtn) {
            cartFloatBtn.style.display = totalItems > 0 ? 'block' : 'none';
            if (cartCount) cartCount.innerText = totalItems;
        }

        // Update Cart Page (if open)
        if (cartPageTotal) cartPageTotal.innerText = totalItems;

        // Save to LocalStorage
        localStorage.setItem('bk_cart', JSON.stringify(cart));

        // If on cart page, render items
        if (cartPageItems) renderCartPage();
    }

    window.changeQty = (index, delta) => {
        cart[index].qty += delta;
        if (cart[index].qty <= 0) cart.splice(index, 1);
        updateCartUI();
    };

    function renderCartPage() {
        if (!cartPageItems) return;
        cartPageItems.innerHTML = '';
        if (cart.length === 0) {
            cartPageItems.innerHTML = '<p style="color: #ccc; text-align:center; font-size: 1.2rem;">Your cart is empty. <br> <a href="menu.html" style="color:var(--primary)">Go to Menu</a></p>';
        } else {
            cart.forEach((item, index) => {
                const offerText = getDailyOffer(item.name);

                const itemDiv = document.createElement('div');
                itemDiv.className = 'glass';
                itemDiv.style.padding = '15px';
                itemDiv.style.marginBottom = '15px';
                itemDiv.style.display = 'flex';
                itemDiv.style.justifyContent = 'space-between';
                itemDiv.style.alignItems = 'center';

                // Item HTML with Offer
                itemDiv.innerHTML = `
                    <div>
                        <h4 style="color:white; font-size:1.1rem; margin-bottom:5px;">${item.name}</h4>
                        ${offerText ? `<span style="color:var(--element-primary); font-size:0.8rem; background:rgba(57, 255, 20, 0.2); padding:2px 8px; border-radius:4px;">${offerText}</span>` : ''}
                    </div>
                    <div style="display:flex; align-items:center; gap:15px;">
                        <button class="btn-mini" onclick="window.changeQty(${index}, -1)" style="background:red; color:white; border:none; border-radius:50%; width:30px; height:30px; font-weight:bold; cursor:pointer;">-</button>
                        <span style="color:white; font-size:1.1rem; font-weight:bold;">${item.qty}</span>
                        <button class="btn-mini" onclick="window.changeQty(${index}, 1)" style="background:green; color:white; border:none; border-radius:50%; width:30px; height:30px; font-weight:bold; cursor:pointer;">+</button>
                    </div>`;

                cartPageItems.appendChild(itemDiv);
            });
        }

        // --- TRENDING ITEMS LOGIC ---
        const trendingGrid = document.getElementById('cart-trending-grid');
        if (trendingGrid && trendingGrid.children.length === 0) {
            // Static list of trending items to suggest
            const trendingItems = [
                { name: 'Crispy Special Burger', desc: 'Our Bestseller! Crunchy & Juicy.', price: 'Add' },
                { name: 'Special Chowmein', desc: 'Spicy, Smoky, Authentic.', price: 'Add' },
                { name: 'Dahi Bda', desc: 'Cool down with this classic treat.', price: 'Add' }
            ];

            trendingItems.forEach(item => {
                const card = document.createElement('div');
                card.className = 'food-card glass';
                card.innerHTML = `
                    <h3 class="food-title">${item.name}</h3>
                    <p style="color:#aaa; font-size:0.9rem; margin-top:5px;">${item.desc}</p>
                    <button class="btn-primary add-to-cart" style="margin-top:10px; font-size:0.8rem;">
                        Add to Cart <i class="fas fa-plus"></i>
                    </button>
                `;
                trendingGrid.appendChild(card);
            });

            // Re-bind listeners for new buttons
            bindAddToCart();
        }
    }

    // Function to bind Add to Cart (extracted to be reusable)
    function bindAddToCart() {
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            // Remove old listeners to avoid duplicates (cloning)
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            newBtn.addEventListener('click', (e) => {
                const card = e.target.closest('.food-card');
                if (card) {
                    const name = card.querySelector('.food-title').innerText;
                    const existingItem = cart.find(i => i.name === name);
                    if (existingItem) existingItem.qty++;
                    else cart.push({ name: name, qty: 1 });

                    const originalText = newBtn.innerHTML;
                    newBtn.innerHTML = 'Added <i class="fas fa-check"></i>';
                    newBtn.style.background = 'green';
                    newBtn.style.color = 'white';

                    setTimeout(() => {
                        newBtn.innerHTML = originalText;
                        newBtn.style.background = 'var(--primary)';
                        newBtn.style.color = 'black';
                    }, 1000);

                    updateCartUI();
                }
            });
        });
    }

    // Add to Cart Listeners
    bindAddToCart();

    // Initial Bind
    bindAddToCart();

    // Floating Button Click -> Go to Cart Page
    if (cartFloatBtn) {
        cartFloatBtn.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    }

    // Checkout Logic (from Cart Page)
    if (cartPageCheckout) {
        cartPageCheckout.addEventListener('click', () => {
            if (cart.length === 0) return;

            let message = "Hi Burger Kingdom, I would like to place an order:%0a%0a";

            cart.forEach(item => {
                const offerText = getDailyOffer(item.name);
                // Clean Offer Text for WhatsApp (remove emoji if needed, but keeping them looks good)
                const cleanOffer = offerText.replace(/[()]/g, '').trim();

                message += `▪️ ${item.name} x ${item.qty}`;
                if (cleanOffer) message += ` _[${cleanOffer}]_`;
                message += `%0a`;
            });

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
        let previewItems = [];
        const activeForm = document.getElementById(`${activeCategory}-form`);

        if (activeForm) {
            // Checked radio buttons (base price & names)
            activeForm.querySelectorAll('input[type="radio"]:checked').forEach(input => {
                total += parseInt(input.getAttribute('data-price')) || 0;
                // Get Label Text (cleaning up the Price part)
                let label = input.closest('.ingredient-card').querySelector('.card-content').innerText;
                label = label.split('\n')[0]; // Take only the first line (Name), ignore price line
                previewItems.push(label);
            });

            // Checked checkboxes (add-ons)
            activeForm.querySelectorAll('input[type="checkbox"]:checked').forEach(input => {
                total += parseInt(input.getAttribute('data-price')) || 0;
                let label = input.closest('.ingredient-card').querySelector('.card-content').innerText;
                label = label.split('\n')[0];
                previewItems.push(label);
            });
        }

        customTotalEl.innerText = total;

        // Update Live Preview Text
        const previewEl = document.getElementById('recipe-preview-text');
        if (previewEl) {
            if (previewItems.length > 0) {
                previewEl.innerHTML = previewItems.join(' <span style="color:var(--primary)">+</span> ');
            } else {
                previewEl.innerText = "Select ingredients to see your magic here...";
            }
        }
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

    // 9. Feedback Form Logic
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('feedback-name').value || 'Anonymous';
            const feedback = document.getElementById('feedback-text').value;

            const message = `*New Customer Feedback* 📝%0a%0a` +
                `👤 Name: ${name}%0a` +
                `💬 Feedback: ${feedback}%0a%0a` +
                `Sent from Website.`;

            window.open(`https://wa.me/917786990999?text=${message}`, '_blank');
        });
    }

    updateCartUI();
});
