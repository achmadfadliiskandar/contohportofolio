document.addEventListener("DOMContentLoaded", function () {
    
    // ==========================================
    // 1. SLIDER / FILTER FOTO GALERI
    // ==========================================
    const filterButtons = document.querySelectorAll("#gallery-filters button");
    const galleryItems = document.querySelectorAll(".gallery-item");
  
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Ubah status tombol aktif (warna tombol)
            filterButtons.forEach(btn => {
                btn.classList.remove("btn-primary", "active-filter");
                btn.classList.add("btn-outline-primary");
            });
            this.classList.remove("btn-outline-primary");
            this.classList.add("btn-primary", "active-filter");
  
            const filterValue = this.getAttribute("data-filter");
  
            // Tampilkan atau sembunyikan kartu berdasarkan tombol yang dipilih
            galleryItems.forEach(item => {
                if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });
  
  
    // ==========================================
    // 2. TAHUN OTOMATIS DI FOOTER
    // ==========================================
    const tahunSpan = document.getElementById("tahun");
    if (tahunSpan) {
        tahunSpan.textContent = new Date().getFullYear();
    }
  
  
    // ==========================================
    // 3. DARK MODE
    // ==========================================
    const darkModeSwitch = document.getElementById("darkModeSwitch");
    const darkModeLabel = document.getElementById("darkModeLabel");
    const body = document.body;
  
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        if (darkModeSwitch) darkModeSwitch.checked = true;
        updateDarkModeLabel(true);
    } else {
        if (darkModeSwitch) darkModeSwitch.checked = false;
        updateDarkModeLabel(false);
    }
  
    if (darkModeSwitch) {
        darkModeSwitch.addEventListener("change", function () {
            if (this.checked) {
                body.classList.add("dark-mode");
                localStorage.setItem("theme", "dark");
                updateDarkModeLabel(true);
            } else {
                body.classList.remove("dark-mode");
                localStorage.setItem("theme", "light");
                updateDarkModeLabel(false);
            }
        });
    }
  
    function updateDarkModeLabel(isDark) {
        if (darkModeLabel) {
            const currentLang = localStorage.getItem("lang") || "id";
            if (isDark) {
                darkModeLabel.innerHTML = `<i class="bi bi-sun-fill me-1"></i> ${currentLang === 'id' ? 'Terang' : 'Light'}`;
            } else {
                darkModeLabel.innerHTML = `<i class="bi bi-moon-fill me-1"></i> ${currentLang === 'id' ? 'Gelap' : 'Dark'}`;
            }
        }
    }
  
  
    // ==========================================
    // 4. NAVBAR AKTIF SAAT SCROLL & SMOOTH SCROLL
    // ==========================================
    const sections = document.querySelectorAll("section[id], header[id]");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  
    function changeNavOnScroll() {
        let scrollPos = window.scrollY + 200;
  
        if (window.scrollY < 100) {
            navLinks.forEach((link) => link.classList.remove("active"));
            const berandaLink = document.querySelector('.navbar-nav .nav-link[href="#beranda"]');
            if (berandaLink) berandaLink.classList.add("active");
            return;
        }
  
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");
  
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === "#" + sectionId) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }
  
    window.addEventListener("scroll", changeNavOnScroll);
    changeNavOnScroll();
  
    const hashNavLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
    hashNavLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
  
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
  
  
    // ==========================================
    // 5. FITUR BAHASA (ID / EN) & KAMUS KONTEN
    // ==========================================
    const translations = {
        id: {
            nav_beranda: "Beranda",
            nav_tentang: "Tentang",
            nav_prestasi: "Prestasi",
            nav_kontak: "Kontak",
            
            hero_title_1: "Membangun Kekuatan,",
            hero_title_2: "Mengejar Prestasi.",
            hero_desc: "Halo, saya <strong class='text-dark'>Affandi Faisal Naim</strong>. Selamat datang di portofolio resmi saya. Tempat di mana kedisiplinan latihan tanpa henti, mentalitas kompetitif, dan rekam jejak kejuaraan disatukan.",
            hero_quote: "Disiplin • Konsistensi • Mental Juara",
            btn_prestasi: "Jelajahi Prestasi",
            btn_kontak: "Hubungi Saya",
  
            tentang_title: "Tentang Saya",
            tentang_desc1: "Sebagai seorang atlet taekwondo, perjalanan saya dibentuk oleh kedisiplinan harian, dorongan untuk terus melampaui batas kemampuan fisik, dan ketahanan mental di bawah tekanan kompetisi.",
            tentang_desc2: "Website ini saya bangun sebagai rekam jejak digital transparan guna mempermudah kolaborasi dengan pelatih, klub, maupun pihak-pihak yang ingin mendukung perjalanan karier olahraga saya ke tingkat yang lebih tinggi.",
  
            prestasi_title: "Podium & Sertifikat",
            prestasi_subtitle: "Pilih kategori di bawah untuk melihat dokumentasi kejuaraan",
            filter_semua: "Semua",
            filter_podium: "Foto Podium",
            filter_sertifikat: "Foto Sertifikat",
  
            podium_1_title: "Juara 1 Kejurcab Taekwondo Kota Bekasi",
            podium_1_desc: "Kyorugi Super Cadet C Kelas 34 KG",
            podium_2_title: "Juara 1 Kejuaraan Taekwondo Bekasi Open",
            podium_2_desc: "Kejuaraan Taekwondo Piala Ketua Umum BNI Pusat",
            podium_3_title: "Juara 1 One Pride Future Champ",
            podium_3_desc: "Kyorugi Cadet Putra U 39 Kg",
            podium_4_title: "Juara 2 ITN VII",
            podium_4_desc: "9-10 Maret 2024",
            podium_5_title: "Juara 1 Bekasi Open",
            podium_5_desc: "Bekasi Open Nov 2023",
            podium_6_title: "Juara 3 ITN Open VIII",
            podium_6_desc: "Feb 2025",
  
            cert_1_title: "Sertifikat Kejuaraan One Pride Future Champ",
            cert_1_desc: "Kyorugi Cadet Putra U 39 KG.",
            cert_2_title: "Sertifikat Juara 1 Piala Kemenpora RI Bekasi Open Championship",
            cert_2_desc: "Kyorugi Pra Cadet C Under 28 KG Putra.",
            cert_3_title: "Sertifikat Juara 2 ITN OPEN VII",
            cert_3_desc: "Kyorugi Super Cadet C Putra U 31.",
            cert_4_title: "Sertifikat Juara 1 Kejurcab Taekwondo Kota Bekasi",
            cert_4_desc: "Kyorugi Super Cadet C PA U34.",
            cert_5_title: "Sertifikat Juara 3 ITN OPEN VII",
            cert_5_desc: "Kyorugi Super Cadet U37 Putra.",
            cert_6_title: "Sertifikat Juara 1 Bekasi Open Championship III",
            cert_6_desc: "Kyorugi Cadet U37 Putra.",
            btn_buka_pdf: "Buka PDF Asli",
  
            kontak_title: "Mari Terhubung",
            kontak_desc: "Punya tawaran kerja sama, jadwal uji coba, atau ingin berdiskusi seputar peluang karier atlet?",
            info_kontak_title: "Informasi Kontak & Alamat",
            alamat_label: "Alamat Domisili",
            telp_label: "WhatsApp / Telepon",
            email_label: "Email Resmi",
  
            stat_1_title: "Blue Belt with Red Stripe",
            stat_1_desc: "Tingkatan Sabuk",
            stat_2_title: "Kyorugi",
            stat_2_desc: "Kategori Utama",
            stat_3_desc: "Dedikasi & Fokus",
  
            biodata_title: "Biodata Atlet",
            bio_name_label: "Nama Lengkap",
            bio_birth_label: "Tempat, Tanggal Lahir",
            bio_phone_label: "No Telepon",
            bio_school_label: "Sekolah"
        },
        en: {
            nav_beranda: "Home",
            nav_tentang: "About",
            nav_prestasi: "Achievements",
            nav_kontak: "Contact",
            
            hero_title_1: "Building Strength,",
            hero_title_2: "Chasing Glory.",
            hero_desc: "Hello, I am <strong class='text-dark'>Affandi Faisal Naim</strong>. Welcome to my official portfolio. Where relentless training discipline, competitive mindset, and championship track records unite.",
            hero_quote: "Discipline • Consistency • Champion Mindset",
            btn_prestasi: "Explore Achievements",
            btn_kontak: "Get in Touch",
  
            tentang_title: "About Me",
            tentang_desc1: "As a taekwondo athlete, my journey is shaped by daily discipline, the drive to push beyond physical limits, and mental resilience under competitive pressure.",
            tentang_desc2: "I built this website as a transparent digital footprint to facilitate collaboration with coaches, clubs, and supporters looking to advance my athletic career.",
  
            prestasi_title: "Podium & Certificates",
            prestasi_subtitle: "Select a category below to view championship documentation",
            filter_semua: "All",
            filter_podium: "Podium Photos",
            filter_sertifikat: "Certificate Photos",
  
            podium_1_title: "1st Place Bekasi City Taekwondo Championship",
            podium_1_desc: "Kyorugi Super Cadet C 34 KG Class",
            podium_2_title: "1st Place Bekasi Open Taekwondo Championship",
            podium_2_desc: "BNI Chairman Cup Taekwondo Championship",
            podium_3_title: "1st Place One Pride Future Champ",
            podium_3_desc: "Kyorugi Cadet Male U 39 Kg",
            podium_4_title: "2nd Place ITN VII",
            podium_4_desc: "March 9-10, 2024",
            podium_5_title: "1st Place Bekasi Open",
            podium_5_desc: "Bekasi Open Nov 2023",
            podium_6_title: "3rd Place ITN Open VIII",
            podium_6_desc: "Feb 2025",
  
            cert_1_title: "One Pride Future Champ Championship Certificate",
            cert_1_desc: "Kyorugi Cadet Male U 39 KG.",
            cert_2_title: "1st Place Kemenpora RI Bekasi Open Championship Certificate",
            cert_2_desc: "Kyorugi Pra Cadet C Under 28 KG Male.",
            cert_3_title: "2nd Place ITN OPEN VII Certificate",
            cert_3_desc: "Kyorugi Super Cadet C Male U 31.",
            cert_4_title: "1st Place Bekasi City Taekwondo Championship Certificate",
            cert_4_desc: "Kyorugi Super Cadet C Male U34.",
            cert_5_title: "3rd Place ITN OPEN VII Certificate",
            cert_5_desc: "Kyorugi Super Cadet U37 Male.",
            cert_6_title: "1st Place Bekasi Open Championship III Certificate",
            cert_6_desc: "Kyorugi Cadet U37 Male.",
            btn_buka_pdf: "Open Original PDF",
  
            kontak_title: "Let's Connect",
            kontak_desc: "Have cooperation offers, trial schedules, or want to discuss athletic career opportunities?",
            info_kontak_title: "Contact Info & Address",
            alamat_label: "Domicile Address",
            telp_label: "WhatsApp / Phone",
            email_label: "Official Email",
  
            stat_1_title: "Blue Belt with Red Stripe",
            stat_1_desc: "Belt Rank",
            stat_2_title: "Kyorugi",
            stat_2_desc: "Main Category",
            stat_3_desc: "Dedication & Focus",
  
            biodata_title: "Athlete Bio",
            bio_name_label: "Full Name",
            bio_birth_label: "Place, Date of Birth",
            bio_phone_label: "Phone Number",
            bio_school_label: "School"
        }
    };
  
    const langSwitchBtn = document.getElementById('langSwitchBtn');
    const langText = document.getElementById('langText');
    
    let currentLang = localStorage.getItem('lang') || 'id';
    applyLanguage(currentLang);
  
    if (langSwitchBtn) {
        langSwitchBtn.addEventListener('click', function () {
            currentLang = currentLang === 'id' ? 'en' : 'id';
            localStorage.setItem('lang', currentLang);
            applyLanguage(currentLang);
        });
    }
  
    function applyLanguage(lang) {
        if (langText) {
            langText.textContent = lang === 'id' ? 'EN' : 'ID';
        }
  
        // Menerjemahkan semua elemen HTML yang memiliki atribut data-i18n
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
  
        // Perbarui label dark mode menyesuaikan bahasa aktif
        const isDark = body.classList.contains("dark-mode");
        updateDarkModeLabel(isDark);
    }
  
    // ==========================================
    // 6. TOMBOL BACK TO TOP
    // ==========================================
    const backToTopBtn = document.getElementById('backToTopBtn');
  
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            // Tombol akan muncul jika halaman di-scroll ke bawah sejauh 300px
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
  
        // Aksi saat tombol diklik (halaman naik secara mulus / smooth scroll)
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
  
});
