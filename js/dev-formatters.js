/**
 * ==========================================================================
 * DEVELOPER REQUIREMENTS SUITE - DEVELOPER FORMATTERS MODULE
 * Authored by: Mr.Rm19 (github.com/Rm19x)
 * Description: Kompresi skrip murni, manipulasi skema markup, generator 
 * metadata arsitektur SEO, serta sistem translasi numerik radiks.
 * ==========================================================================
 */

// --- 12. JSON TO HTML TABLE CONVERTER ---
function processJSONToTable() {
    const jsonInputText = document.getElementById('json-table-input').value.trim();
    const previewContainer = document.getElementById('json-table-preview-container');
    const codeOutputBox = document.getElementById('json-table-output-code');

    if (!jsonInputText) {
        previewContainer.innerHTML = '<span style="color: var(--text-muted);">Pratinjau render tabel nyata akan muncul di sini...</span>';
        codeOutputBox.value = '';
        return;
    }

    try {
        const parsedData = JSON.parse(jsonInputText);
        
        // Memastikan input JSON berupa Array Object
        const dataArray = Array.isArray(parsedData) ? parsedData : [parsedData];
        if (dataArray.length === 0 || typeof dataArray[0] !== 'object' || dataArray[0] === null) {
            throw new Error("JSON harus berupa objek atau tumpukan array objek.");
        }

        // Ambil semua kunci unik sebagai header kolom tabel
        let headers = [];
        dataArray.forEach(obj => {
            Object.keys(obj).forEach(key => {
                if (!headers.includes(key)) headers.push(key);
            });
        });

        // Menyusun baris dokumen elemen tabel HTML
        let htmlTableCode = '<table class="real-rendered-table">\n  <thead>\n    <tr>\n';
        headers.forEach(header => {
            htmlTableCode += `      <th>${header}</th>\n`;
        });
        htmlTableCode += '    </tr>\n  </thead>\n  <tbody>\n';

        dataArray.forEach(obj => {
            htmlTableCode += '    <tr>\n';
            headers.forEach(header => {
                let cellValue = obj[header] !== undefined ? obj[header] : '';
                if (typeof cellValue === 'object') cellValue = JSON.stringify(cellValue);
                htmlTableCode += `      <td>${cellValue}</td>\n`;
            });
            htmlTableCode += '    </tr>\n';
        });
        htmlTableCode += '  </tbody>\n</table>';

        // Render visualisasi nyata ke layar dan cetak source kodenya
        previewContainer.innerHTML = htmlTableCode;
        codeOutputBox.value = htmlTableCode;

    } catch (err) {
        previewContainer.innerHTML = `<span style="color: var(--danger-btn);">JSON Parsing Error: ${err.message}</span>`;
        codeOutputBox.value = '';
    }
}

function clearJSONToTable() {
    document.getElementById('json-table-input').value = '';
    document.getElementById('json-table-preview-container').innerHTML = '<span style="color: var(--text-muted);">Pratinjau render tabel nyata akan muncul di sini...</span>';
    document.getElementById('json-table-output-code').value = '';
}


// --- 13. MARKDOWN TO HTML LIVE EDITOR ---
function liveRenderMarkdown() {
    const rawMarkdown = document.getElementById('markdown-input').value;
    const previewPane = document.getElementById('markdown-preview');

    if (!rawMarkdown.trim()) {
        previewPane.innerHTML = 'Hasil ketikan Markdown terjemas secara live di sini...';
        return;
    }

    // Parser Regex sederhana namun nyata untuk elemen esensial Markdown dasar
    let htmlConverted = rawMarkdown
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") // Amankan tag HTML liar
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')   // H1 Header
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')  // H2 Header
        .replace(/^### (.*$)/gim, '<h3>$1</h3>') // H3 Header
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>') // Bold text **
        .replace(/\*(.*)\*/gim, '<em>$1</em>') // Italic text *
        .replace(/`([^`]+)`/gim, '<code>$1</code>') // Inline code `
        .replace(/\n/g, '<br>'); // Baris baru

    previewPane.innerHTML = htmlConverted;
}


// --- 14. HTML / CSS / JS CODE MINIFIER ---
function processCodeMinify() {
    const sourceCode = document.getElementById('minifier-input').value;
    if (!sourceCode.trim()) { document.getElementById('minifier-output').value = ''; return; }

    // Proses minifikasi nyata membersihkan spasi berlebih, breakline, dan sisa komentar tunggal/blok
    let compressed = sourceCode
        .replace(/\/\*[\s\S]*?\*\//g, '')  // Hapus blok komentar multi baris (/* comment */)
        .replace(/([^\\:]|^)\/\/.*$/gm, '$1') // Hapus komentar baris tunggal (// comment)
        .replace(/\s+/g, ' ')               // Ubah whitespace beruntun/tab menjadi spasi tunggal
        .replace(/\s*([\{\}\:\;\,\=\\+\\-\\*\\/])\s*/g, '$1') // Buang spasi liar di sekitar operator dan kurung kurawal
        .trim();

    document.getElementById('minifier-output').value = compressed;
}

function clearMinifier() {
    document.getElementById('minifier-input').value = '';
    document.getElementById('minifier-output').value = '';
}


// --- 15. ROBOTS.TXT & SITEMAP BUILDER ---
function buildSEOFilesReal() {
    let domainUrl = document.getElementById('seo-domain-url').value.trim();
    if (!domainUrl) { domainUrl = "https://github.com/Rm19x"; }
    
    // Hilangkan tanda '/' di akhir domain jika diinput user agar tidak terjadi double slash
    if (domainUrl.endsWith('/')) { domainUrl = domainUrl.slice(0, -1); }

    const currentDate = new Date().toISOString().split('T')[0];

    // Buat konfigurasi skrip robots.txt nyata
    const robotsCode = `# Created dynamically by Mr.Rm19 Requirements Suite\nUser-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /config/\n\nSitemap: ${domainUrl}/sitemap.xml`;
    
    // Buat struktur XML sitemap resmi standar mesin pencari Google
    const sitemapCode = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${domainUrl}/</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>`;

    document.getElementById('seo-robots-output').value = robotsCode;
    document.getElementById('seo-sitemap-output').value = sitemapCode;
}


// --- 16. BINARY / HEX / DECIMAL CONVERTER ---
function processSystemNumericConvert() {
    const inputData = document.getElementById('converter-input-text').value.trim();
    const outBin = document.getElementById('convert-out-bin');
    const outHex = document.getElementById('convert-out-hex');

    if (!inputData) { outBin.value = ''; outHex.value = ''; return; }

    // Jika input berupa angka murni desimal
    if (/^\d+$/.test(inputData)) {
        const num = parseInt(inputData, 10);
        outBin.value = num.toString(2);
        outHex.value = "0x" + num.toString(16).toUpperCase();
    } else {
        // Jika input berupa rangkaian kata string/teks biasa
        let binaryResult = [];
        let hexResult = [];
        
        for (let i = 0; i < inputData.length; i++) {
            let code = inputData.charCodeAt(i);
            let binStr = code.toString(2);
            binaryResult.push("00000000".substring(binStr.length) + binStr);
            hexResult.push(code.toString(16).toUpperCase());
        }
        outBin.value = binaryResult.join(' ');
        outHex.value = hexResult.join(' ');
    }
}

function clearNumericConverter() {
    document.getElementById('converter-input-text').value = '';
    document.getElementById('convert-out-bin').value = '';
    document.getElementById('convert-out-hex').value = '';
}