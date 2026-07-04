/**
 * ==========================================================================
 * DEVELOPER REQUIREMENTS SUITE - VISUAL & DATA GENERATORS MODULE
 * Authored by: Mr.Rm19 (github.com/Rm19x)
 * pola regex standar, pengacak larik data, dan parser spesifikasi biner Bencode.
 * ==========================================================================
 */

// --- 17. REGEX CODE GENERATOR SIMPLE ---
function generateRegexPatternReal() {
    const selectedRule = document.getElementById('regex-rule-select').value;
    const patternBox = document.getElementById('regex-pattern-output');
    const jsBox = document.getElementById('regex-js-output');

    let pattern = "";
    let jsFunctionSnippet = "";

    // Memetakan rumus regex standar industri berdasarkan opsi pilihan
    if (selectedRule === "email") {
        pattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
        jsFunctionSnippet = "const isValidEmail = (str) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.test(str);";
    } else if (selectedRule === "ipv4") {
        pattern = "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$";
        jsFunctionSnippet = "const isValidIPv4 = (str) => /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(str);";
    } else if (selectedRule === "alpha-numeric") {
        pattern = "^[a-zA-Z0-9]+$";
        jsFunctionSnippet = "const isAlphanumeric = (str) => /^[a-zA-Z0-9]+$/.test(str);";
    } else if (selectedRule === "http-url") {
        pattern = "^https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$";
        jsFunctionSnippet = "const isValidURL = (str) => /^https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$/.test(str);";
    }

    patternBox.value = pattern;
    jsBox.value = jsFunctionSnippet;
}


// --- 18. CSS FLEXBOX LAYOUT CREATOR ---
function updateFlexboxVisualizer() {
    const flexDir = document.getElementById('flex-dir').value;
    const justify = document.getElementById('flex-justify').value;
    const sandbox = document.getElementById('flex-sandbox');
    const codeBox = document.getElementById('flex-css-code-output');

    if (!sandbox || !codeBox) return;

    // Terapkan properti CSS nyata ke elemen kontainer sandbox
    sandbox.style.flexDirection = flexDir;
    sandbox.style.justifyContent = justify;

    // Cetak output CSS nyata untuk disalin developer
    const cssCode = `.flex-container {\n  display: flex;\n  flex-direction: ${flexDir};\n  justify-content: ${justify};\n  background-color: #f1eae4;\n  padding: 15px;\n}`;
    codeBox.value = cssCode;
}


// --- 19. CSS GRID LAYOUT CREATOR ---
function updateGridVisualizer() {
    const colsCount = document.getElementById('grid-cols-count').value || 3;
    const gapSize = document.getElementById('grid-gap-count').value || 10;
    const sandbox = document.getElementById('grid-sandbox');
    const codeBox = document.getElementById('grid-css-code-output');

    if (!sandbox || !codeBox) return;

    // Terapkan properti grid nyata ke elemen kontainer sandbox
    sandbox.style.gridTemplateColumns = `repeat(${colsCount}, 1fr)`;
    sandbox.style.gap = `${gapSize}px`;

    // Cetak output CSS nyata untuk disalin developer
    const cssCode = `.grid-container {\n  display: grid;\n  grid-template-columns: repeat(${colsCount}, 1fr);\n  gap: ${gapSize}px;\n  background-color: #f1eae4;\n  padding: 15px;\n}`;
    codeBox.value = cssCode;
}


// --- 20. JAVASCRIPT ARRAY SHUFFLER ---
function processArrayShuffleReal() {
    const rawInput = document.getElementById('array-shuffler-input').value.trim();
    const outputBox = document.getElementById('array-shuffler-output');

    if (!rawInput) { outputBox.value = ''; return; }

    try {
        let arrayTarget = [];

        // Deteksi jika input berupa string format JSON Array murni seperti ["A", "B"]
        if (rawInput.startsWith('[') && rawInput.endsWith(']')) {
            arrayTarget = JSON.parse(rawInput);
            if (!Array.isArray(arrayTarget)) throw new Error();
        } else {
            // Jika berupa teks biasa, pecah berdasarkan karakter koma
            arrayTarget = rawInput.split(',').map(item => item.trim()).filter(item => item.length > 0);
        }

        // Algoritma Acakfisher-Yates Real (Unbiased Shuffle)
        for (let i = arrayTarget.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arrayTarget[i], arrayTarget[j]] = [arrayTarget[j], arrayTarget[i]];
        }

        // Tampilkan hasil acak dalam format string objek JSON array yang indah
        outputBox.value = JSON.stringify(arrayTarget, null, 2);

    } catch (e) {
        outputBox.value = "ERROR: Format penulisan objek array salah. Pastikan menggunakan pola pemisah koma standar atau format JSON murni!";
    }
}

function clearArrayShuffler() {
    document.getElementById('array-shuffler-input').value = '';
    document.getElementById('array-shuffler-output').value = '';
}


// --- 21. BENCODE ENCODER & DECODER (REAL BITSTREAM PARSER) ---
function processBencodeEncode() {
    const input = document.getElementById('bencode-input').value.trim();
    const outputBox = document.getElementById('bencode-output');

    if (!input) { outputBox.value = ''; return; }

    // Jika input dideteksi berupa angka integer, gunakan arsitektur 'i<number>e'
    if (/^-?\d+$/.test(input)) {
        outputBox.value = `i${input}e`;
    } else {
        // Jika berupa string text standar, gunakan arsitektur '<length>:<string>'
        outputBox.value = `${input.length}:${input}`;
    }
}

function processBencodeDecode() {
    const input = document.getElementById('bencode-input').value.trim();
    const outputBox = document.getElementById('bencode-output');

    if (!input) { outputBox.value = ''; return; }

    try {
        // Proses parsing nyata format bencode integer i<num>e
        if (input.startsWith('i') && input.endsWith('e')) {
            const numPart = input.slice(1, -1);
            if (/^-?\d+$/.test(numPart)) {
                outputBox.value = numPart;
            } else {
                throw new Error();
            }
        } else if (input.includes(':')) {
            // Proses parsing nyata format bencode string <len>:<str>
            const parts = input.split(':');
            const length = parseInt(parts[0], 10);
            const actualString = parts.slice(1).join(':'); // Satukan kembali jika string mengandung tanda titik dua
            
            if (!isNaN(length) && actualString.length === length) {
                outputBox.value = actualString;
            } else {
                throw new Error();
            }
        } else {
            throw new Error();
        }
    } catch (e) {
        outputBox.value = "ERROR: Struktur Bencode salah atau tidak didukung oleh modul parser dasar ini.";
    }
}

function clearBencode() {
    document.getElementById('bencode-input').value = '';
    document.getElementById('bencode-output').value = '';
}