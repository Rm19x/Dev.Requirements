/**
 * ==========================================================================
 * DEVELOPER REQUIREMENTS SUITE - ENCODERS & DECODERS MODULE
 * Authored by: Mr.Rm19 (github.com/Rm19x)
 * Description: Implementasi algoritma konversi data nyata 
 * dari string teks mentah ke berbagai skema encoding standar developer.
 * ==========================================================================
 */

// --- 4. URL ENCODER & DECODER ---
function processURLEncode() {
    const input = document.getElementById('url-codec-input').value;
    document.getElementById('url-codec-output').value = encodeURIComponent(input);
}

function processURLDecode() {
    const input = document.getElementById('url-codec-input').value;
    try {
        document.getElementById('url-codec-output').value = decodeURIComponent(input);
    } catch (e) {
        document.getElementById('url-codec-output').value = "ERROR: Format URI Malformed. Gagal melakukan dekoding teks.";
    }
}

function clearURLCodec() {
    document.getElementById('url-codec-input').value = '';
    document.getElementById('url-codec-output').value = '';
}


// --- 5. HTML ENTITY ENCODER ---
function processHTMLEntityEncode() {
    const input = document.getElementById('html-entity-input').value;
    // Mengonversi karakter sensitif HTML menjadi entitas karakter aman
    const encoded = input.replace(/&/g, "&amp;")
                         .replace(/</g, "&lt;")
                         .replace(/>/g, "&gt;")
                         .replace(/"/g, "&quot;")
                         .replace(/'/g, "&#039;");
    document.getElementById('html-entity-output').value = encoded;
}

function clearHTMLEntity() {
    document.getElementById('html-entity-input').value = '';
    document.getElementById('html-entity-output').value = '';
}


// --- 6. BASE32 ENCODER & DECODER (REAL ALGORITHM) ---
const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function processBase32Encode() {
    const input = document.getElementById('base32-input').value;
    if (!input) { document.getElementById('base32-output').value = ''; return; }
    
    // Mengubah string teks menjadi array biner byte data
    let bytes = [];
    for (let i = 0; i < input.length; i++) {
        bytes.push(input.charCodeAt(i));
    }

    let bits = "";
    for (let i = 0; i < bytes.length; i++) {
        let bin = bytes[i].toString(2);
        bits += "00000000".substring(bin.length) + bin;
    }

    let encoded = "";
    for (let i = 0; i < bits.length; i += 5) {
        let chunk = bits.substr(i, 5);
        if (chunk.length < 5) chunk += "00000".substring(chunk.length);
        encoded += BASE32_ALPHABET[parseInt(chunk, 2)];
    }

    // Menambahkan karakter padding '=' sesuai spesifikasi standard RFC 4648
    while (encoded.length % 8 !== 0) {
        encoded += "=";
    }

    document.getElementById('base32-output').value = encoded;
}

function processBase32Decode() {
    const input = document.getElementById('base32-input').value.trim().toUpperCase().replace(/=/g, "");
    if (!input) { document.getElementById('base32-output').value = ''; return; }

    let bits = "";
    for (let i = 0; i < input.length; i++) {
        let idx = BASE32_ALPHABET.indexOf(input[i]);
        if (idx === -1) {
            document.getElementById('base32-output').value = "ERROR: String mengandung karakter Base32 ilegal!";
            return;
        }
        let bin = idx.toString(2);
        bits += "00000".substring(bin.length) + bin;
    }

    let bytes = [];
    for (let i = 0; i < bits.length; i += 8) {
        let chunk = bits.substr(i, 8);
        if (chunk.length === 8) bytes.push(parseInt(chunk, 2));
    }

    let decodedText = String.fromCharCode.apply(null, bytes);
    document.getElementById('base32-output').value = decodedText;
}

function clearBase32() {
    document.getElementById('base32-input').value = '';
    document.getElementById('base32-output').value = '';
}


// --- 7. BASE64 ENCODER & DECODER ---
function processBase64Encode() {
    const input = document.getElementById('base64-input').value;
    try {
        // Menggunakan btoa bawaan browser secara aman dengan dukungan UTF-8 alternatif sederhana
        const encoded = btoa(unescape(encodeURIComponent(input)));
        document.getElementById('base64-output').value = encoded;
    } catch (e) {
        document.getElementById('base64-output').value = "ERROR: Gagal melakukan kompilasi Base64 Enkoding.";
    }
}

function processBase64Decode() {
    const input = document.getElementById('base64-input').value.trim();
    try {
        const decoded = decodeURIComponent(escape(atob(input)));
        document.getElementById('base64-output').value = decoded;
    } catch (e) {
        document.getElementById('base64-output').value = "ERROR: Karakter string bukan struktur Base64 murni yang valid!";
    }
}

function clearBase64() {
    document.getElementById('base64-input').value = '';
    document.getElementById('base64-output').value = '';
}


// --- 8. MORSE CODE ENCODER & DECODER ---
const MORSE_DICTIONARY = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
    'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
    'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': '/'
};

function processMorseEncode() {
    const input = document.getElementById('morse-input').value.toUpperCase();
    let result = [];
    
    for (let i = 0; i < input.length; i++) {
        let char = input[i];
        if (MORSE_DICTIONARY[char] !== undefined) {
            result.push(MORSE_DICTIONARY[char]);
        }
    }
    document.getElementById('morse-output').value = result.join(' ');
}

function processMorseDecode() {
    const input = document.getElementById('morse-input').value.trim();
    if (!input) return;
    
    // Membuat kamus terbalik untuk mempercepat pembacaan kode morse ke alfabet biasa
    const invertedMorseDict = {};
    for (let key in MORSE_DICTIONARY) {
        invertedMorseDict[MORSE_DICTIONARY[key]] = key;
    }

    const morseWords = input.split(' ');
    let decodedOutput = "";

    morseWords.forEach(chunk => {
        if (invertedMorseDict[chunk] !== undefined) {
            decodedOutput += invertedMorseDict[chunk];
        } else if (chunk === '/') {
            decodedOutput += ' ';
        } else {
            decodedOutput += '?'; // Penanda karakter tidak dikenali
        }
    });

    document.getElementById('morse-output').value = decodedOutput;
}

function clearMorse() {
    document.getElementById('morse-input').value = '';
    document.getElementById('morse-output').value = '';
}