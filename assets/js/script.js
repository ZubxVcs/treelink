/**
 * untuk link copy
 */

const actionLink = document.querySelectorAll(".link-card .link-action");

actionLink.forEach((action) => {
    action.addEventListener("click", (e) => {
        e.preventDefault();
        const href = action.closest(".link-card").getAttribute("href");
        navigator.clipboard.writeText(href);
       
        /**
         * untuk memunculkan notif
         */
        const toastElement = document.getElementById("toast");
        toastElement.innerHTML = `
            <div class="toast-container">
                <p>✅ Link berhasil disalin!</p>
            </div>
        `;

        /**
         * untuk menghapus notif
         */
        const toastContainer = toastElement.querySelector(".toast-container");
        
        setTimeout(() => {
            toastContainer.classList.add("toast-gone");
        }, 300);
        
        setTimeout(() => {
            toastContainer.remove();
        }, 4000);
    });
});

/**
 * untuk mengganti hover dengan touch support
 */
const sosmedIcons = document.querySelectorAll(".sosmed i");

sosmedIcons.forEach((icon) => {
    // For desktop hover
    icon.addEventListener("mouseenter", () => {
        icon.classList.remove("ph");
        icon.classList.add("ph-fill");
    });

    icon.addEventListener("mouseleave", () => {
        icon.classList.remove("ph-fill");
        icon.classList.add("ph");
    });

    // For touch devices
    icon.addEventListener("touchstart", () => {
        icon.classList.remove("ph");
        icon.classList.add("ph-fill");
    });

    icon.addEventListener("touchend", () => {
        icon.classList.remove("ph-fill");
        icon.classList.add("ph");
    });
});

/**
 * animasi scroll untuk background text
 * dengan performance optimization untuk mobile
 */
let ticking = false;
let lastScrollY = 0;

function updateAnimation() {
    const bgText = document.querySelector(".bg-text-animation");
    if (bgText) {
        // Smooth animation dengan clamp untuk mencegah excessive movement
        const scrollAmount = Math.min(lastScrollY, window.innerHeight);
        bgText.style.transform = `translateX(-50%) translateX(${scrollAmount * 0.3}px)`;
    }
    ticking = false;
}

document.addEventListener("scroll", () => {
    lastScrollY = window.scrollY;
    
    if (!ticking) {
        window.requestAnimationFrame(updateAnimation);
        ticking = true;
    }
}, { passive: true });

/**
 * Prevent layout shift pada mobile saat loading
 */
window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});