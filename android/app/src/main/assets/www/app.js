const API = "https://api.alquran.cloud/v1";
const AUDIO = "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy";
const WBW = "https://api.quranwbw.com";
const TAFSIR = "https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir";

let currentSurah = 1;
let currentAyah = 1;
let fontSize = 27;
let wordMode = true;
let translationMode = true;

const surahs = [
    ["আল-ফাতিহা","Al-Fatihah","الفاتحة",7],
    ["আল-বাকারা","Al-Baqarah","البقرة",286],
    ["আলে ইমরান","Ali 'Imran","آل عمران",200],
    ["আন-নিসা","An-Nisa","النساء",176],
    ["আল-মায়িদাহ","Al-Ma'idah","المائدة",120],
    ["আল-আনআম","Al-An'am","الأنعام",165],
    ["আল-আরাফ","Al-A'raf","الأعراف",206],
    ["আল-আনফাল","Al-Anfal","الأنفال",75],
    ["আত-তাওবাহ","At-Tawbah","التوبة",129],
    ["ইউনুস","Yunus","يونس",109],
    ["হুদ","Hud","هود",123],
    ["ইউসুফ","Yusuf","يوسف",111],
    ["আর-রাদ","Ar-Ra'd","الرعد",43],
    ["ইবরাহিম","Ibrahim","إبراهيم",52],
    ["আল-হিজর","Al-Hijr","الحجر",99],
    ["আন-নাহল","An-Nahl","النحل",128],
    ["আল-ইসরা","Al-Isra","الإسراء",111],
    ["আল-কাহফ","Al-Kahf","الكهف",110],
    ["মারইয়াম","Maryam","مريم",98],
    ["ত্ব-হা","Ta-Ha","طه",135],
    ["আল-আম্বিয়া","Al-Anbya","الأنبياء",112],
    ["আল-হাজ্জ","Al-Hajj","الحج",78],
    ["আল-মুমিনুন","Al-Mu'minun","المؤمنون",118],
    ["আন-নূর","An-Nur","النور",64],
    ["আল-ফুরকান","Al-Furqan","الفرقان",77],
    ["আশ-শুআরা","Ash-Shu'ara","الشعراء",227],
    ["আন-নামল","An-Naml","النمل",93],
    ["আল-কাসাস","Al-Qasas","القصص",88],
    ["আল-আনকাবুত","Al-'Ankabut","العنكبوت",69],
    ["আর-রূম","Ar-Rum","الروم",60],
    ["লুকমান","Luqman","لقمان",34],
    ["আস-সাজদাহ","As-Sajdah","السجدة",30],
    ["আল-আহযাব","Al-Ahzab","الأحزاب",73],
    ["সাবা","Saba","سبأ",54],
    ["ফাতির","Fatir","فاطر",45],
    ["ইয়াসীন","Ya-Sin","يس",83],
    ["আস-সাফফাত","As-Saffat","الصافات",182],
    ["সাদ","Sad","ص",88],
    ["আয-যুমার","Az-Zumar","الزمر",75],
    ["গাফির","Ghafir","غافر",85],
    ["ফুসসিলাত","Fussilat","فصلت",54],
    ["আশ-শূরা","Ash-Shura","الشورى",53],
    ["আয-যুখরুফ","Az-Zukhruf","الزخرف",89],
    ["আদ-দুখান","Ad-Dukhan","الدخان",59],
    ["আল-জাসিয়াহ","Al-Jathiyah","الجاثية",37],
    ["আল-আহকাফ","Al-Ahqaf","الأحقاف",35],
    ["মুহাম্মদ","Muhammad","محمد",38],
    ["আল-ফাতহ","Al-Fath","الفتح",29],
    ["আল-হুজুরাত","Al-Hujurat","الحجرات",18],
    ["কাফ","Qaf","ق",45],
    ["আয-যারিয়াত","Adh-Dhariyat","الذاريات",60],
    ["আত-তূর","At-Tur","الطور",49],
    ["আন-নাজম","An-Najm","النجم",62],
    ["আল-কামার","Al-Qamar","القمر",55],
    ["আর-রহমান","Ar-Rahman","الرحمن",78],
    ["আল-ওয়াকিয়াহ","Al-Waqi'ah","الواقعة",96],
    ["আল-হাদীদ","Al-Hadid","الحديد",29],
    ["আল-মুজাদালাহ","Al-Mujadila","المجادلة",22],
    ["আল-হাশর","Al-Hashr","الحشر",24],
    ["আল-মুমতাহিনাহ","Al-Mumtahanah","الممتحنة",13],
    ["আস-সাফ","As-Saff","الصف",14],
    ["আল-জুমুআহ","Al-Jumu'ah","الجمعة",11],
    ["আল-মুনাফিকুন","Al-Munafiqun","المنافقون",11],
    ["আত-তাগাবুন","At-Taghabun","التغابun",18],
    ["আত-তালাক","At-Talaq","الطلاق",12],
    ["আত-তাহরীম","At-Tahrim","التحريم",12],
    ["আল-মুলক","Al-Mulk","الملك",30],
    ["আল-কলম","Al-Qalam","القلم",52],
    ["আল-হাক্কাহ","Al-Haqqah","الحاقة",52],
    ["আল-মাআরিজ","Al-Ma'arij","المعارج",44],
    ["নূহ","Nuh","نوح",28],
    ["আল-জিন","Al-Jinn","الجن",28],
    ["আল-মুযযাম্মিল","Al-Muzzammil","المزمل",20],
    ["আল-মুদ্দাসসির","Al-Muddaththir","المدثر",56],
    ["আল-কিয়ামাহ","Al-Qiyamah","القيامة",40],
    ["আল-ইনসান","Al-Insan","الإنسان",31],
    ["আল-মুরসালাত","Al-Mursalat","المرسلات",50],
    ["আন-নাবা","An-Naba","النبأ",40],
    ["আন-নাযিয়াত","An-Nazi'at","النازعات",46],
    ["আবাসা","Abasa","عبس",42],
    ["আত-তাকভীর","At-Takwir","التكوير",29],
    ["আল-ইনফিতার","Al-Infitar","الانفطار",19],
    ["আল-মুতাফফিফীন","Al-Mutaffifin","المطففين",36],
    ["আল-ইনশিকাক","Al-Inshiqaq","الانشقاق",25],
    ["আল-বুরুজ","Al-Buruj","البروج",22],
    ["আত-তারিক","At-Tariq","الطارق",17],
    ["আল-আলা","Al-A'la","الأعلى",19],
    ["আল-গাশিয়াহ","Al-Ghashiyah","الغاشية",26],
    ["আল-ফজর","Al-Fajr","الفجر",30],
    ["আল-বালাদ","Al-Balad","البلد",20],
    ["আশ-শামস","Ash-Shams","الشمس",15],
    ["আল-লাইল","Al-Layl","الليل",21],
    ["আদ-দুহা","Ad-Duha","الضحى",11],
    ["আশ-শারহ","Ash-Sharh","الشرح",8],
    ["আত-তীন","At-Tin","التين",8],
    ["আল-আলাক","Al-'Alaq","العلق",19],
    ["আল-কদর","Al-Qadr","القدر",5],
    ["আল-বাইয়্যিনাহ","Al-Bayyinah","البينة",8],
    ["আয-যিলযাল","Az-Zalzalah","الزلزلة",8],
    ["আল-আদিয়াত","Al-'Adiyat","العاديات",11],
    ["আল-কারিয়াহ","Al-Qari'ah","القارعة",11],
    ["আত-তাকাসুর","At-Takathur","التكاثر",8],
    ["আল-আসর","Al-'Asr","العصر",3],
    ["আল-হুমাযাহ","Al-Humazah","الهمزة",9],
    ["আল-ফীল","Al-Fil","الفيل",5],
    ["কুরাইশ","Quraysh","قريش",4],
    ["আল-মাউন","Al-Ma'un","الماعون",7],
    ["আল-কাওসার","Al-Kawthar","الكوثر",3],
    ["আল-কাফিরুন","Al-Kafirun","الكافرون",6],
    ["আন-নাসর","An-Nasr","النصر",3],
    ["আল-মাসাদ","Al-Masad","المسد",5],
    ["আল-ইখলাস","Al-Ikhlas","الإخلاص",4],
    ["আল-ফালাক","Al-Falaq","الفلق",5],
    ["আন-নাস","An-Nas","الناس",6]
];

function $(id) {
    return document.getElementById(id);
}

function showPage(name) {
    document.querySelectorAll(".page").forEach(p => {
        p.classList.remove("active");
    });

    const page = $(name + "Page");

    if (page) {
        page.classList.add("active");
    }

    window.scrollTo(0, 0);

    closeDrawer();
}

function closeDrawer() {
    $("drawer")?.classList.remove("open");
    $("drawerOverlay")?.classList.add("hidden");
}

function openDrawer() {
    $("drawer")?.classList.add("open");
    $("drawerOverlay")?.classList.remove("hidden");
}

function renderSurahs() {

    const container = $("surahList");

    if (!container) return;

    container.innerHTML = "";

    surahs.forEach((s, index) => {

        const number = index + 1;

        const item = document.createElement("button");

        item.className = "surah-item";

        item.innerHTML = `
            <div class="surah-number">${number}</div>

            <div class="surah-info">
                <div class="surah-bn">${s[0]}</div>
                <div class="surah-en">${s[1]} · ${s[3]} আয়াত</div>
            </div>

            <div class="surah-ar">${s[2]}</div>
        `;

        item.addEventListener("click", () => {
            openReader(number, 1);
        });

        container.appendChild(item);
    });
}

function renderSurahPopup() {

    const container = $("surahPopupList");

    if (!container) return;

    container.innerHTML = "";

    surahs.forEach((s, index) => {

        const item = document.createElement("button");

        item.className = "surah-item";

        item.innerHTML = `
            <div class="surah-number">${index + 1}</div>
            <div class="surah-info">
                <div class="surah-bn">${s[0]}</div>
                <div class="surah-en">${s[1]}</div>
            </div>
            <div class="surah-ar">${s[2]}</div>
        `;

        item.addEventListener("click", () => {

            $("surahPopup").classList.add("hidden");

            openReader(index + 1, 1);
        });

        container.appendChild(item);
    });
}

async function openReader(surah, ayah = 1) {

    currentSurah = surah;
    currentAyah = ayah;

    showPage("reader");

    const info = surahs[surah - 1];

    $("readerSurah").textContent =
        `${surah}. ${info[0]}`;

    $("readerMeta").textContent =
        `${info[1]} · ${info[3]} আয়াত`;

    $("ayahContainer").innerHTML =
        `<div class="content-card">লোড হচ্ছে...</div>`;

    try {

        const arabicURL =
            `${API}/surah/${surah}/quran-uthmani`;

        const bengaliURL =
            `${API}/surah/${surah}/bn.bengali`;

        const [arRes, bnRes] = await Promise.all([
            fetch(arabicURL),
            fetch(bengaliURL)
        ]);

        if (!arRes.ok || !bnRes.ok) {
            throw new Error("API error");
        }

        const arabic = await arRes.json();
        const bengali = await bnRes.json();

        const arAyahs = arabic.data.ayahs;
        const bnAyahs = bengali.data.ayahs;

        $("ayahContainer").innerHTML = "";

        arAyahs.forEach((a, i) => {

            const translation =
                bnAyahs[i]?.text || "";

            const card =
                document.createElement("article");

            card.className = "ayah-card";

            card.dataset.ayah = a.numberInSurah;

            card.innerHTML = `

                <div class="ayah-number">
                    ${a.numberInSurah}
                </div>

                <div
                    class="ayah-arabic"
                    style="font-size:${fontSize}px"
                >
                    ${escapeHTML(a.text)}
                </div>

                ${
                    translationMode
                    ?
                    `<div class="ayah-translation">
                        ${escapeHTML(translation)}
                    </div>`
                    :
                    ""
                }

                <div class="ayah-actions">

                    <button
                        class="ayah-action play"
                        title="Audio"
                    >▶</button>

                    <button
                        class="ayah-action words"
                        title="শব্দার্থ"
                    >ع</button>

                    <button
                        class="ayah-action copy"
                        title="Copy"
                    >⧉</button>

                    <button
                        class="ayah-action share"
                        title="Share"
                    >↗</button>

                    <button
                        class="ayah-action tafsir"
                        title="তাফসীর"
                    >📚</button>

                </div>
            `;

            card.addEventListener("click", (event) => {

                if (
                    event.target.closest(".ayah-action")
                ) {
                    return;
                }

                if (wordMode) {
                    openWords(
                        surah,
                        a.numberInSurah
                    );
                }

                localStorage.setItem(
                    "lastRead",
                    JSON.stringify({
                        surah,
                        ayah: a.numberInSurah
                    })
                );
            });

            card.querySelector(".words")
                .addEventListener("click", () => {
                    openWords(
                        surah,
                        a.numberInSurah
                    );
                });

            card.querySelector(".play")
                .addEventListener("click", () => {
                    playSurah(surah);
                });

            card.querySelector(".copy")
                .addEventListener("click", () => {

                    const text =
                        `${a.text}\n\n${translation}`;

                    navigator.clipboard
                        ?.writeText(text);

                    alert("আয়াত কপি হয়েছে");
                });

            card.querySelector(".share")
                .addEventListener("click", () => {

                    const text =
                        `${info[0]} ${a.numberInSurah}\n${a.text}\n${translation}`;

                    if (navigator.share) {
                        navigator.share({
                            title: "কুরআন শরীফ",
                            text
                        });
                    } else {
                        navigator.clipboard
                            ?.writeText(text);

                        alert("কপি হয়েছে");
                    }
                });

            card.querySelector(".tafsir")
                .addEventListener("click", () => {
                    openTafsir(
                        surah,
                        a.numberInSurah
                    );
                });

            $("ayahContainer").appendChild(card);
        });

    } catch (error) {

        console.error(error);

        $("ayahContainer").innerHTML = `
            <div class="content-card">
                <h3>ডাটা লোড করা যায়নি</h3>
                <p>
                    ইন্টারনেট সংযোগ পরীক্ষা করুন এবং আবার চেষ্টা করুন।
                </p>
            </div>
        `;
    }
}

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text || "";

    return div.innerHTML;
}

async function openWords(surah, ayah) {

    $("wordPopup").classList.remove("hidden");

    $("wordMeaningList").innerHTML =
        `<div class="content-card">শব্দার্থ লোড হচ্ছে...</div>`;

    try {

        const response =
            await fetch(`${WBW}/${surah}/${ayah}`);

        if (!response.ok) {
            throw new Error("WBW unavailable");
        }

        const data = await response.json();

        const words =
            extractWords(data);

        if (!words.length) {
            throw new Error("No words");
        }

        renderWords(words);

    } catch (error) {

        renderFallbackWords(surah, ayah);
    }
}

function extractWords(data) {

    const source =
        data?.words ||
        data?.data?.words ||
        data?.result?.words ||
        data?.ayah?.words ||
        [];

    if (!Array.isArray(source)) {
        return [];
    }

    return source.map(w => {

        const arabic =
            w.word ||
            w.arabic ||
            w.text ||
            w.uthmani ||
            "";

        const meaning =
            w.translation ||
            w.bangla ||
            w.bn ||
            w.meaning ||
            w.translations?.bn ||
            w.translations?.bengali ||
            "";

        return {
            arabic,
            meaning
        };

    }).filter(w => w.arabic);
}

function renderWords(words) {

    const container =
        $("wordMeaningList");

    container.innerHTML = "";

    words.forEach(word => {

        const div =
            document.createElement("div");

        div.className = "word-item";

        div.innerHTML = `
            <div class="word-ar">
                ${escapeHTML(word.arabic)}
            </div>

            <div class="word-bn">
                ${escapeHTML(word.meaning || "অর্থ পাওয়া যায়নি")}
            </div>
        `;

        container.appendChild(div);
    });
}

function renderFallbackWords(surah, ayah) {

    let words = [];

    if (surah === 1 && ayah === 1) {

        words = [
            ["بِسْمِ", "নামে"],
            ["اللَّهِ", "আল্লাহ"],
            ["الرَّحْمَٰنِ", "পরম করুণাময়"],
            ["الرَّحِيمِ", "অসীম দয়ালু"]
        ];
    }

    if (!words.length) {

        $("wordMeaningList").innerHTML = `
            <div class="content-card">
                <p>
                    এই আয়াতের শব্দে-শব্দে অর্থ এখন পাওয়া যাচ্ছে না।
                </p>
            </div>
        `;

        return;
    }

    renderWords(
        words.map(w => ({
            arabic: w[0],
            meaning: w[1]
        }))
    );
}

async function openTafsir(surah, ayah) {

    $("wordPopup").classList.remove("hidden");

    $("wordMeaningList").innerHTML =
        `<div class="content-card">তাফসীর লোড হচ্ছে...</div>`;

    try {

        const url =
            `${TAFSIR}/bn-tafseer-ibn-e-kaseer/${surah}/${ayah}.json`;

        const response =
            await fetch(url);

        if (!response.ok) {
            throw new Error("Tafsir unavailable");
        }

        const data =
            await response.json();

        const text =
            data.text ||
            data.tafsir ||
            data.content ||
            data.data?.text ||
            "তাফসীর পাওয়া যায়নি।";

        $("wordMeaningList").innerHTML = `
            <div class="content-card">
                <h3>
                    তাফসীর — ${surahs[surah - 1][0]} ${ayah}
                </h3>

                <p style="line-height:2">
                    ${escapeHTML(text)}
                </p>
            </div>
        `;

    } catch (error) {

        $("wordMeaningList").innerHTML = `
            <div class="content-card">
                <h3>তাফসীর</h3>
                <p>
                    তাফসীর বর্তমানে লোড করা যাচ্ছে না।
                </p>
            </div>
        `;
    }
}

function playSurah(surah) {

    const audio =
        new Audio(`${AUDIO}/${surah}.mp3`);

    audio.play().catch(() => {
        alert("Audio চালু করা যায়নি।");
    });
}

function renderLastRead() {

    const raw =
        localStorage.getItem("lastRead");

    const card =
        $("lastReadCard");

    if (!raw) {
        card.textContent =
            "এখনো কোনো আয়াত পড়া হয়নি।";
        return;
    }

    try {

        const data =
            JSON.parse(raw);

        const info =
            surahs[data.surah - 1];

        card.innerHTML = `
            <strong>
                ${info[0]}
            </strong>

            <br>

            আয়াত ${data.ayah}

            <br><br>

            <button
                class="primary-btn"
                id="continueReading"
            >
                আবার পড়ুন
            </button>
        `;

        $("continueReading")
            ?.addEventListener("click", () => {
                openReader(
                    data.surah,
                    data.ayah
                );
            });

    } catch {
        card.textContent =
            "শেষ পড়া তথ্য পাওয়া যায়নি।";
    }
}

function updateFont() {

    document.querySelectorAll(".ayah-arabic")
        .forEach(el => {
            el.style.fontSize =
                `${fontSize}px`;
        });
}

function initNavigation() {

    $("menuBtn")
        ?.addEventListener("click", openDrawer);

    $("drawerOverlay")
        ?.addEventListener("click", closeDrawer);

    document.querySelectorAll(".drawer-item")
        .forEach(btn => {

            btn.addEventListener("click", () => {

                showPage(btn.dataset.page);
            });
        });

    document.querySelectorAll("[data-page]")
        .forEach(btn => {

            btn.addEventListener("click", () => {

                showPage(btn.dataset.page);
            });
        });

    $("backReader")
        ?.addEventListener("click", () => {
            showPage("quran");
        });

    $("surahSelectBtn")
        ?.addEventListener("click", () => {

            $("surahPopup")
                .classList.remove("hidden");
        });

    $("closeSurahPopup")
        ?.addEventListener("click", () => {

            $("surahPopup")
                .classList.add("hidden");
        });

    $("closeWordPopup")
        ?.addEventListener("click", () => {

            $("wordPopup")
                .classList.add("hidden");
        });

    $("wordMode")
        ?.addEventListener("click", () => {

            wordMode = !wordMode;

            $("wordMode")
                .classList.toggle(
                    "active",
                    wordMode
                );

            localStorage.setItem(
                "wordMode",
                wordMode
            );
        });

    $("translationMode")
        ?.addEventListener("click", () => {

            translationMode =
                !translationMode;

            $("translationMode")
                .classList.toggle(
                    "active",
                    translationMode
                );

            if (
                document.querySelector(".page.active")
                    ?.id === "readerPage"
            ) {
                openReader(
                    currentSurah,
                    currentAyah
                );
            }
        });

    $("fontPlus")
        ?.addEventListener("click", () => {

            fontSize =
                Math.min(
                    fontSize + 2,
                    40
                );

            updateFont();
        });

    $("fontMinus")
        ?.addEventListener("click", () => {

            fontSize =
                Math.max(
                    fontSize - 2,
                    20
                );

            updateFont();
        });
}

function initTasbih() {

    let count =
        Number(
            localStorage.getItem("tasbih") || 0
        );

    const countEl =
        $("tasbihCount");

    function render() {
        countEl.textContent = count;
    }

    $("tasbihBtn")
        ?.addEventListener("click", () => {

            count++;

            localStorage.setItem(
                "tasbih",
                count
            );

            render();
        });

    $("tasbihReset")
        ?.addEventListener("click", () => {

            count = 0;

            localStorage.setItem(
                "tasbih",
                count
            );

            render();
        });

    render();
}

function initSettings() {

    const dark =
        localStorage.getItem("darkMode") === "true";

    $("darkMode").checked = dark;

    document.body.classList.toggle(
        "dark",
        dark
    );

    $("darkMode")
        ?.addEventListener("change", e => {

            const value =
                e.target.checked;

            document.body.classList.toggle(
                "dark",
                value
            );

            localStorage.setItem(
                "darkMode",
                value
            );
        });

    const savedWord =
        localStorage.getItem("wordMode");

    if (savedWord !== null) {
        wordMode = savedWord === "true";
    }

    if ($("wordModeSetting")) {

        $("wordModeSetting").checked =
            wordMode;

        $("wordModeSetting")
            .addEventListener("change", e => {

                wordMode =
                    e.target.checked;

                localStorage.setItem(
                    "wordMode",
                    wordMode
                );

                $("wordMode")
                    ?.classList.toggle(
                        "active",
                        wordMode
                    );
            });
    }
}

function calculateQibla(lat, lon) {

    const kaabaLat =
        21.4225 * Math.PI / 180;

    const kaabaLon =
        39.8262 * Math.PI / 180;

    const userLat =
        lat * Math.PI / 180;

    const userLon =
        lon * Math.PI / 180;

    const dLon =
        kaabaLon - userLon;

    const y =
        Math.sin(dLon);

    const x =
        Math.cos(userLat) *
        Math.tan(kaabaLat) -
        Math.sin(userLat) *
        Math.cos(dLon);

    let bearing =
        Math.atan2(y, x) * 180 / Math.PI;

    bearing =
        (bearing + 360) % 360;

    return bearing;
}

function initLocation() {

    if (!navigator.geolocation) {

        $("locationText").textContent =
            "অবস্থান পাওয়া যাচ্ছে না";

        return;
    }

    navigator.geolocation.getCurrentPosition(
        position => {

            const lat =
                position.coords.latitude;

            const lon =
                position.coords.longitude;

            $("locationText").textContent =
                `অবস্থান: ${lat.toFixed(2)}, ${lon.toFixed(2)}`;

            const qibla =
                calculateQibla(lat, lon);

            $("qiblaDirection").textContent =
                `কিবলার দিক: ${qibla.toFixed(1)}° উত্তর থেকে পূর্ব দিকে`;

            loadPrayerTimes(lat, lon);
        },
        () => {

            $("locationText").textContent =
                "অবস্থান অনুমতি পাওয়া যায়নি";

            $("qiblaDirection").textContent =
                "কিবলার জন্য Location permission দিন।";
        },
        {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 300000
        }
    );
}

async function loadPrayerTimes(lat, lon) {

    const date =
        new Date();

    const day =
        String(date.getDate())
            .padStart(2, "0");

    const month =
        String(date.getMonth() + 1)
            .padStart(2, "0");

    const year =
        date.getFullYear();

    try {

        const url =
            `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${lat}&longitude=${lon}&method=4`;

        const response =
            await fetch(url);

        const data =
            await response.json();

        const timings =
            data.data.timings;

        const next =
            findNextPrayer(timings);

        $("nextPrayer").textContent =
            `পরবর্তী নামাজ: ${next.name} — ${next.time}`;

    } catch {

        $("nextPrayer").textContent =
            "নামাজের সময় লোড করা যায়নি";
    }
}

function findNextPrayer(timings) {

    const prayers = [
        ["ফজর", timings.Fajr],
        ["যোহর", timings.Dhuhr],
        ["আসর", timings.Asr],
        ["মাগরিব", timings.Maghrib],
        ["এশা", timings.Isha]
    ];

    const now =
        new Date();

    const current =
        now.getHours() * 60 +
        now.getMinutes();

    for (const p of prayers) {

        const parts =
            p[1].split(":");

        const minutes =
            Number(parts[0]) * 60 +
            Number(parts[1]);

        if (minutes > current) {

            return {
                name: p[0],
                time: p[1]
            };
        }
    }

    return {
        name: "ফজর",
        time: prayers[0][1]
    };
}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderSurahs();
        renderSurahPopup();

        renderLastRead();

        initNavigation();
        initTasbih();
        initSettings();

        initLocation();

        showPage("home");
    }
);
