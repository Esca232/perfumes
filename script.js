



// ========================
// PRODUCT DATABASE 
// ========================
const productsDB = {
    // MEN
    "Apex": {
        img: "men1.jpg.jpeg",
        price50: 625,
        price100: 899,
        notes: "🌿 TOP NOTES:\n• Bergamot - Italian citrus freshness\n• Lemon - Sparkling and bright\n• Pink Pepper - Spicy and vibrant\n\n🌸 HEART NOTES:\n• Lavender - Calming aromati[...]
    },
    "Horizon": {
        img: "men2.jpg.jpeg",
        price50: 625,
        price100: 899,
        notes: " Horizon insperd by LV\n🌿 TOP NOTES:\n• Calabrian Bergamot\n• Sicilian Citron\n• Orange\n\n🌸 HEART NOTES:\n• Nigerian Ginger\n• Tunisian Neroli\n• Black Tea\n\n��[...]
    },
    "Tropic": {
    img: "tropic.jpg",
    price50: 625,
    price100: 899,
    notes: "🌿 TOP NOTES:
• Bergamot
• Grapefruit
• Pineapple

🌸 HEART NOTES:
• Patchouli
• Jasmine
• cedarwood

🪵 BASE NOTES:
• oakmoss
• Clearwood
• Woody notes

✨ A vibrant and sunny fragrance with a warm tropical twist. Perfect for summer days and uplifting moments."
},
    "Crystal Wave": {
        img: "men3.jpg.jpeg",
        price50: 625,
        price100: 899,
        notes: "🌿 TOP NOTES:\n• Bergamot\n• Neroli\n• Green Mandarin\n\n🌸 HEART NOTES:\n• Marine Accord\n• Rosemary\n• Jasmine\n\n🪵 BASE NOTES:\n• Musk\n• Patchouli\n• A[...]
    },
    // WOMEN
    "Amber Dusk": {
        img: "women1.jpg.png",
        price50: 625,
        price100: 899,
        notes: "🌿 TOP NOTES:\n• Vanilla\n• Lavender\n• Cacao\n\n🌸 HEART NOTES:\n• Vanilla Extract\n\n🪵 BASE NOTES:\n• Vanilla Absolute\n\n✨ Warm, cozy, and irresistibly sweet.[...]
    },
    "the pink peak": {
        img: "women2.jpg.jpeg",
        price50: 625,
        price100: 899,
        notes: "🌿 TOP NOTES:\n• Lychee\n• Pink Pepper\n• Bergamot\n\n🌸 HEART NOTES:\n• Turkish Rose\n• Peony\n• Jasmine\n\n🪵 BASE NOTES:\n• Amber\n• Musk\n• Vetiver\n\n�[...]
    },
    "velvet sin": {
        img: "women3.jpg.jpeg",
        price50: 625,
        price100: 899,
        notes: "🌿 TOP NOTES:\n• Bitter Almond\n• Anise\n• Mandarin\n\n🌸 HEART NOTES:\n• Jasmine\n• Orange Blossom\n• Tuberose\n\n🪵 BASE NOTES:\n• Tonka Bean\n• Vanilla\n��[...]
    },
    "italian love": {
        img: "women4.jpg.jpeg",
        price50: 625,
        price100: 899,
        notes: "🌿 TOP NOTES:\n• Mandarin\n• Bergamot\n• Pink Pepper\n\n🌸 HEART NOTES:\n• White Floral\n• Coconut\n• Jasmine\n\n🪵 BASE NOTES:\n• Citrus Vanilla\n• Tropical [...]
    }
};

// ========================
// CART DATA - مع الكميات
// ========================
let cart = JSON.parse(localStorage.getItem("esca_cart")) || [];

// ========================
// GOOGLE SHEETS CONFIGURATION
// ========================
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzvMjgGkG8j-bxu2Hz9FM_EFmUzOkQ2Zbr7NnBWtvNbwMxIU-RSBxK2UdWG5EcyMHuW/exec';

function saveCart() {
    localStorage.setItem("esca_cart", JSON.stringify(cart));
    updateCartUI();
    updateCartCount();
    updateCartTotal();
}

function updateCartCount() {
    const badge = document.getElementById("cart-count");
    if (badge) {
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.innerText = totalItems;
    }
}

function updateCartTotal() {
    const totalElement = document.getElementById("cartTotal");
    if (!totalElement) return;
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalElement.innerText = total;
}

function updateCartUI() {
    const cartList = document.getElementById("cartList");
    if (!cartList) return;
    
    if (cart.length === 0) {
        cartList.innerHTML = '<div class="empty-cart-msg">✨ Your cart is empty. Add some luxury!</div>';
        updateCartTotal();
        return;
    }
    
    cartList.innerHTML = "";
    cart.forEach((item, idx) => {
        const li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-size">${item.size}</div>
                <div class="cart-item-price">${item.price} L.E</div>
            </div>
            <div class="cart-item-controls">
                <button class="qty-btn minus-btn" data-index="${idx}">−</button>
                <span class="cart-item-qty">${item.quantity}</span>
                <button class="qty-btn plus-btn" data-index="${idx}">+</button>
                <button class="remove-btn" data-index="${idx}">🗑️</button>
            </div>
        `;
        cartList.appendChild(li);
    });
    
    document.querySelectorAll(".minus-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const idx = parseInt(btn.getAttribute("data-index"));
            if (cart[idx].quantity > 1) {
                cart[idx].quantity--;
            } else {
                cart.splice(idx, 1);
            }
            saveCart();
        });
    });
    
    document.querySelectorAll(".plus-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const idx = parseInt(btn.getAttribute("data-index"));
            cart[idx].quantity++;
            saveCart();
        });
    });
    
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const idx = parseInt(btn.getAttribute("data-index"));
            cart.splice(idx, 1);
            saveCart();
        });
    });
    
    updateCartTotal();
}

function addToCart(productTitle, size, price) {
    const existingIndex = cart.findIndex(item => item.name === productTitle && item.size === size);
    
    if (existingIndex !== -1) {
        cart[existingIndex].quantity++;
    } else {
        cart.push({ 
            name: productTitle, 
            size: size, 
            price: price, 
            quantity: 1 
        });
    }
    
    saveCart();
    alert(`✅ ${productTitle} (${size}) added to cart!`);
    closeModal();
    openCart();
}

// ========================
// MODAL FUNCTIONS
// ========================
function openProduct(productName) {
    const data = productsDB[productName];
    if (!data) return;
    
    const modal = document.getElementById("productModal");
    const modalImg = document.getElementById("modalImg");
    const modalTitle = document.getElementById("modalTitle");
    const size50Btn = document.getElementById("size50Btn");
    const size100Btn = document.getElementById("size100Btn");
    const notesPara = document.getElementById("notesText");
    const priceHint = document.getElementById("modalPriceHint");
    
    modalImg.src = data.img;
    modalTitle.innerText = productName;
    size50Btn.innerText = `50 ML - ${data.price50} L.E`;
    size100Btn.innerText = `100 ML - ${data.price100} L.E`;
    notesPara.innerText = data.notes;
    priceHint.innerHTML = `⭐ from ${data.price50} L.E (50ml)`;
    
    const new50 = size50Btn.cloneNode(true);
    const new100 = size100Btn.cloneNode(true);
    size50Btn.parentNode.replaceChild(new50, size50Btn);
    size100Btn.parentNode.replaceChild(new100, size100Btn);
    
    new50.onclick = () => addToCart(productName, "50 ML", data.price50);
    new100.onclick = () => addToCart(productName, "100 ML", data.price100);
    
    modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("productModal");
    if (modal) modal.style.display = "none";
}

// ========================
// CART SIDEBAR
// ========================
function openCart() {
    const sidebar = document.getElementById("cartSidebar");
    if (sidebar) {
        sidebar.classList.add("show");
        updateCartUI();
    }
}

function closeCart() {
    const sidebar = document.getElementById("cartSidebar");
    if (sidebar) sidebar.classList.remove("show");
}

// ========================
// SUBMIT ORDER + Google Sheet
// ========================
function submitOrder() {
    // جلب بيانات العميل من الفورم
    const customerName = document.getElementById("customerName")?.value || "";
    const customerPhone = document.getElementById("customerPhone")?.value || "";
    const customerAddress = document.getElementById("customerAddress")?.value || "";
    
    // التحقق من البيانات
    if (!customerName || !customerPhone || !customerAddress) {
        alert("⚠️ Please fill in all delivery details (Name, Phone, Address)");
        return;
    }
    
    if (cart.length === 0) {
        alert("Your cart is empty! Add some perfumes first.");
        return;
    }
    
    // حساب الإجمالي
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // 1️⃣ حفظ الأوردر في Firestore (قاعدة البيانات الأساسية للوحة الإدارة)
    db.collection("orders").add({
        customerName: customerName,
        customerPhone: customerPhone,
        customerAddress: customerAddress,
        totalPrice: total,
        cartItems: cart, 
        status: "pending", 
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        console.log("Order saved to Firebase successfully!");
        
        // تفريغ السلة بعد نجاح الحفظ في فايربيز
        localStorage.removeItem('esca_cart');
        cart = [];
        saveCart();
        closeCart();
        
        // رسالة نجاح مريحة للعميل بدون فتح واتساب
        alert('✨ Thank you! Your order has been placed successfully. Our team will contact you soon.');
    })
    .catch((error) => {
        console.error("Firebase Error: ", error);
        alert("⚠️ Something went wrong. Please try again.");
    });

    // 2️⃣ إرسال البيانات للجوجل شيت وتفعيل إشعار الـ Gmail تلقائياً
    // 🔥 حط الرابط الأزرق اللي أنت نسخه بين العلامتين "" تحت هنا مكان الرابط ده لو مختلف
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzif12nAMyBuowO7F2Zb0jh9DrIVMtILJh8K_sDuABElLVXtt2heOqVCaRtpUTQI3ZuQg/exec";

    const orderData = {
        customerName: customerName,
        customerPhone: customerPhone,
        customerAddress: customerAddress,
        totalPrice: total + " L.E"
    };
    
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // لضمان الإرسال السريع بدون مشاكل حماية المتصفح
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    })
    .then(() => console.log('Notification triggered and saved to Sheet!'))
    .catch(error => console.error('Google Sheet Notification Error:', error));
}
// ========================
// إنشاء النجوم المتلألئة (نسخة واحدة بس)
// ========================
function createStars() {
    const starsContainer = document.getElementById("stars");
    if (!starsContainer) return;
    
    const numberOfStars = 150;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement("div");
        star.className = "star";
        
        const size = Math.random() * 2.5 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animationDuration = `${Math.random() * 2 + 1.5}s`;
        
        // 10% نجوم ذهبية
        if (Math.random() > 0.9) {
            star.classList.add("gold");
        }
        
        starsContainer.appendChild(star);
    }
}

// ========================
// ATTACH EVENT LISTENERS
// ========================
function attachProductCardEvents() {
    document.querySelectorAll(".perfume-card").forEach(card => {
        const productName = card.getAttribute("data-product");
        if (productName && productsDB[productName]) {
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
            newCard.addEventListener("click", (e) => {
                e.stopPropagation();
                openProduct(productName);
            });
        }
    });
}

// ========================
// INITIALIZATION
// ========================
function init() {
    attachProductCardEvents();
    updateCartUI();
    updateCartCount();
    updateCartTotal();
    createStars();
    
    // Cart button
    const cartBtn = document.getElementById("cart-btn");
    if (cartBtn) cartBtn.addEventListener("click", openCart);
    
    // Close cart button
    const closeCartBtn = document.getElementById("closeCartSidebarBtn");
    if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
    
    // Submit order button (WhatsApp + Google Sheet)
    const submitBtn = document.getElementById("OrderBtn");
    if (submitBtn) submitBtn.addEventListener("click", submitOrder);
    
    // Close modal button
    const closeModalBtn = document.getElementById("closeModalBtn");
    if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
    
    // Close modal when clicking overlay
    const modalOverlay = document.getElementById("productModal");
    if (modalOverlay) {
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }
    
    // Make functions global
    window.openCart = openCart;
    window.closeCart = closeCart;
    window.submitOrder = submitOrder;
}

// Run when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbynfOF8qAOQRP-1sUp14Me9Mv4yNI7Qx8M1-uD7sONK4bC72Id4PV_fnd3XeasaxlqjrQ/exec';
}

// ========================
// الباب السري للوحة التحكم (3 ضغطات)
// ========================
let clickCount = 0;
let clickTimeout;

const adminTrigger = document.getElementById("admin-trigger");
if (adminTrigger) {
    adminTrigger.addEventListener("click", () => {
        clickCount++;
        
        // لو ضغط 3 مرات ورا بعض في أقل من ثانية ونص
        if (clickCount === 3) {
            clickCount = 0; // تصفير العداد
            clearTimeout(clickTimeout);
            window.location.href = "admin.html"; // يحولك لصفحة الأدمن علطول
        }
        
        // تصفير العداد لو العميل طول بين الضغطات (عشان متفتحش بالصدفة)
        clearTimeout(clickTimeout);
        clickTimeout = setTimeout(() => {
            clickCount = 0;
        }, 1500); 
    });
}
