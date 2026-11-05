// GOLDEN ARENA - MAIN JAVASCRIPT

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const modal = $("#modalBackdrop");
const toast = $("#toast");

let toastTimer;

// TOAST XABAR
function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}

// MODAL OYNANI OCHISH
function openModal(title, text, eyebrow = "GOLDEN ARENA") {
    $("#modalTitle").textContent = title;
    $("#modalText").textContent = text;
    $("#modalEyebrow").textContent = eyebrow;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");

    $("#modalClose").focus();
}

// MODAL OYNANI YOPISH
function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
}

// MOBIL MENYU
$("#menuBtn").addEventListener("click", () => {
    $(".desktop-nav").classList.toggle("open");
});

// MENYU LINKLARI
$$(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        $(".desktop-nav").classList.remove("open");
    });
});

// QIDIRUV TUGMASI
$("#searchToggle").addEventListener("click", () => {
    $("#games").scrollIntoView({
        behavior: "smooth"
    });

    setTimeout(() => {
        $("#gameSearch").focus();
    }, 450);
});

// PROFILGA KIRISH
$("#profileBtn").addEventListener("click", () => {
    openModal(
        "Xush kelibsiz!",
        "Golden Arena akkaunt tizimi hozircha demo rejimida. Haqiqiy akkaunt uchun server kerak.",
        "PLAYER ACCOUNT"
    );
});

// PLATFORMANI TANISHTIRISH
$("#trailerBtn").addEventListener("click", () => {
    openModal(
        "Golden Arena",
        "Bu platformada sevimli o‘yinlaringizni topishingiz, janrlar bo‘yicha qidirishingiz va ular haqida ma'lumot olishingiz mumkin.",
        "PLATFORM INTRO"
    );
});

// MODAL YOPISH TUGMALARI
$("#modalClose").addEventListener("click", closeModal);

$("#modalSecondary").addEventListener("click", closeModal);

// MODAL ASOSIY TUGMASI
$("#modalPrimary").addEventListener("click", () => {
    closeModal();

    showToast("Golden Arena'ga xush kelibsiz!");
});

// MODAL TASHQARISINI BOSISH
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// ESC BOSILGANDA MODAL YOPILADI
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});

// O'YINLARNI FILTRLASH
function filterGames() {

    const activeFilter = $(".filter-btn.selected").dataset.filter;

    const query = $("#gameSearch")
        .value
        .trim()
        .toLowerCase();

    let visibleGames = 0;

    $$(".game-card").forEach(card => {

        const genre = card.dataset.category;

        const title = card.dataset.title.toLowerCase();

        const matchesGenre =
            activeFilter === "all" ||
            genre === activeFilter;

        const matchesSearch =
            title.includes(query);

        const show =
            matchesGenre && matchesSearch;

        card.hidden = !show;

        if (show) {
            visibleGames++;
        }

    });

    $("#emptyState").hidden = visibleGames !== 0;
}

// JANR TUGMALARI
$$(".filter-btn").forEach(button => {

    button.addEventListener("click", () => {

        $$(".filter-btn").forEach(item => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        filterGames();

    });

});

// O'YIN QIDIRISH
$("#gameSearch").addEventListener("input", filterGames);

// O'YIN HAQIDA BATAFSIL
$$(".card-action").forEach(button => {

    button.addEventListener("click", () => {

        const game = button.dataset.game;

        const card = button.closest(".game-card");

        const price = card.dataset.price;

        const description =
            card.querySelector(".game-info p").textContent;

        openModal(
            game,
            `${game} — ${description}. Narxi: ${price}. Bu demo katalog. O‘yinni yuklab olish uchun haqiqiy do‘kon havolasi hali ulanmagan.`,
            "GAME DETAILS"
        );

    });

});

// EMAIL OBUNA
$("#subscribeForm").addEventListener("submit", (event) => {

    event.preventDefault();

    const email = $("#emailInput").value.trim();

    if (!email) {
        showToast("Email manzilingizni kiriting!");
        return;
    }

    showToast("Rahmat! Obuna so‘rovi qabul qilindi.");

    $("#subscribeForm").reset();

});

// SAYT ICHIDA SILLIQ O'TISH
$$('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", (event) => {

        const target = document.querySelector(
            anchor.getAttribute("href")
        );

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});

// SAYT YUKLANGANDA
document.addEventListener("DOMContentLoaded", () => {

    console.log("GOLDEN ARENA muvaffaqiyatli ishga tushdi!");

});