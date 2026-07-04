/**
 * ==========================================================================
 * DEVELOPER REQUIREMENTS SUITE - CRYPTO & OBFUSCATOR MODULE
 * Authored by: Mr.Rm19 (github.com/Rm19x)
 * Description: Logika proteksi kode tingkat dasar, penyamaran string, 
 * dan skema enkripsi berbasis kalkulasi bitwise XOR nyata.
 * ==========================================================================
 */

// --- 9. JAVASCRIPT OBFUSCATOR SIMPLE ---
function processJSObfuscate() {
    const inputCode = document.getElementById('obfuscator-input').value;
    if (!inputCode.trim()) {
        document.getElementById('obfuscator-output').value = '';
        return;
    }

    try {
        let hexString = "";
        // Mengonversi setiap karakter skrip menjadi representasi kode heksadesimal (\xHH)
        for (let i = 0; i < inputCode.length; i++) {
            let hex = inputCode.charCodeAt(i).toString(16);
            hexString += "\\x" + ("00" + hex).slice(-2);
        }

        // Membungkus string heksadesimal ke dalam struktur fungsi evaluasi mandiri (IIFE)
        const obfuscatedResult = `/* Obfuscated by Mr.Rm19 (github.com/Rm19x) */\n(function(_0xrm19,_0xdev){eval(_0xrm19);})("${hexString}");`;
        document.getElementById('obfuscator-output').value = obfuscatedResult;
    } catch (e) {
        document.getElementById('obfuscator-output').value = "ERROR: Gagal melakukan enkapsulasi kode JavaScript.";
    }
}

function clearObfuscator() {
    document.getElementById('obfuscator-input').value = '';
    document.getElementById('obfuscator-output').value = '';
}


// --- 10. XOR CIPHER TOOL ---
function processXORCipher() {
    const inputText = document.getElementById('xor-input').value;
    const key = document.getElementById('xor-key').value;
    const outputBox = document.getElementById('xor-output');

    if (!inputText) { outputBox.value = ''; return; }
    if (!key) { alert('Harap tentukan Kunci (Key) XOR terlebih dahulu, sahabat Mr.Rm19!'); return; }

    let result = "";
    // Melakukan operasi bitwise XOR (^) antara karakter teks dengan karakter kunci secara berulang
    for (let i = 0; i < inputText.length; i++) {
        let charCode = inputText.charCodeAt(i);
        let keyCharValue = key.charCodeAt(i % key.length);
        let xorValue = charCode ^ keyCharValue;
        
        // Mengubah hasil XOR menjadi karakter string kembali
        result += String.fromCharCode(xorValue);
    }
    outputBox.value = result;
}

function clearXORCipher() {
    document.getElementById('xor-input').value = '';
    document.getElementById('xor-output').value = '';
}


// --- 11. ROT13 OBFUSCATOR ---
function processROT13() {
    const input = document.getElementById('rot13-input').value;
    const alphabetInput = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const alphabetOutput = "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm";
    
    let result = "";
    // Memetakan ulang posisi karakter alfabet bergeser 13 langkah ke kanan
    for (let i = 0; i < input.length; i++) {
        let char = input[i];
        let idx = alphabetInput.indexOf(char);
        if (idx !== -1) {
            result += alphabetOutput[idx];
        } else {
            result += char; // Karakter angka/simbol tidak diubah
        }
    }
    document.getElementById('rot13-output').value = result;
}

function clearROT13() {
    document.getElementById('rot13-input').value = '';
    document.getElementById('rot13-output').value = '';
}