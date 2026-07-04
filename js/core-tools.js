/**
 * ==========================================================================
 * DEVELOPER REQUIREMENTS SUITE - CORE TOOLS MODULE
 * Authored by: Mr.Rm19 (github.com/Rm19x)
 * Description: Menangani manajemen pelacakan domain (.txt), ekstraksi URL,
 * ==========================================================================
 */

// --- 1. ENGINE: DOMAIN TRACKER ---
let globalTrackerDomains = [];

// Event Listener untuk penanganan Drag & Drop serta input file manual
document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('drop-zone-tracker');
    const fileInput = document.getElementById('file-input-tracker');
    const searchInput = document.getElementById('tracker-search');

    if (dropZone && fileInput) {
        // Klik pada area drop zone untuk memicu input file manual
        dropZone.addEventListener('click', function(e) {
            if (e.target !== fileInput && e.target.tagName !== 'LABEL') {
                fileInput.click();
            }
        });

        // Penanganan efek visual drag over
        dropZone.addEventListener('dragover', function(e) {
            e.preventDefault();
            dropZone.style.borderColor = 'var(--accent-green)';
            dropZone.style.background = '#fffcf9';
        });

        dropZone.addEventListener('dragleave', function(e) {
            e.preventDefault();
            dropZone.style.borderColor = '#c8b9ad';
            dropZone.style.background = '#fbf9f6';
        });

        // Penanganan file saat dilepaskan (Drop)
        dropZone.addEventListener('drop', function(e) {
            e.preventDefault();
            dropZone.style.borderColor = '#c8b9ad';
            dropZone.style.background = '#fbf9f6';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                fileInput.files = files;
                processDomainTrackerFile(files[0]);
            }
        });

        // Penanganan input file manual melalui tombol browser
        fileInput.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                processDomainTrackerFile(e.target.files[0]);
            }
        });
    }

    // Event listener untuk kotak pencarian dinamis
    if (searchInput) {
        searchInput.addEventListener('keyup', filterDomainTrackerList);
    }
});

function processDomainTrackerFile(file) {
    if (!file || file.type !== "text/plain" && !file.name.endsWith('.txt')) {
        alert("Mohon masukkan file teks (.txt) yang valid, sahabat!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const textContent = e.target.result;
        // Memecah baris teks, membersihkan spasi, dan membuang baris kosong
        globalTrackerDomains = textContent.split(/\r?\n/)
                                           .map(line => line.trim())
                                           .filter(line => line.length > 0);

        if (globalTrackerDomains.length > 0) {
            document.getElementById('tracker-prompt').innerHTML = 
                `Berhasil memuat <strong>${globalTrackerDomains.length} domain</strong> dari file: <code>${file.name}</code>`;
            document.getElementById('tracker-search').disabled = false;
            renderDomainTrackerList();
        } else {
            alert("File .txt tersebut kosong atau tidak berisi data domain.");
        }
    };
    reader.readAsText(file);
}

function renderDomainTrackerList() {
    const listContainer = document.getElementById('tracker-list-output');
    const statsCounter = document.getElementById('tracker-stats');
    
    if (!listContainer) return;
    listContainer.innerHTML = '';
    let totalVisited = 0;

    globalTrackerDomains.forEach((domain, index) => {
        const localStorageKey = 'visited_mr_rm19_' + domain.toLowerCase();
        const isVisited = localStorage.getItem(localStorageKey) === 'true';
        if (isVisited) totalVisited++;

        const li = document.createElement('li');
        li.className = 'domain-tracker-item';
        li.setAttribute('data-domain-name', domain.toLowerCase());

        const a = document.createElement('a');
        // Pastikan tautan memiliki skema protokol agar tidak mengarah ke internal host
        a.href = (domain.startsWith('http://') || domain.startsWith('https://')) ? domain : 'http://' + domain;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.className = 'domain-item-link';
        a.innerText = domain;
        
        // Simpan status klik saat developer menekan tautan
        a.onclick = function() {
            localStorage.setItem(localStorageKey, 'true');
            updateTrackerBadgeAndStats();
        };

        const badge = document.createElement('span');
        badge.id = 'tracker-badge-' + index;
        if (isVisited) {
            badge.className = 'status-tag visited';
            badge.innerText = '✓ Visited';
        } else {
            badge.className = 'status-tag unvisited';
            badge.innerText = 'Unvisited';
        }

        li.appendChild(a);
        li.appendChild(badge);
        listContainer.appendChild(li);
    });

    if (statsCounter) {
        statsCounter.innerText = `${totalVisited} / ${globalTrackerDomains.length} Selesai`;
    }
}

function updateTrackerBadgeAndStats() {
    let totalVisited = 0;
    globalTrackerDomains.forEach((domain, index) => {
        const localStorageKey = 'visited_mr_rm19_' + domain.toLowerCase();
        const isVisited = localStorage.getItem(localStorageKey) === 'true';
        if (isVisited) totalVisited++;

        const badge = document.getElementById('tracker-badge-' + index);
        if (badge && isVisited) {
            badge.className = 'status-tag visited';
            badge.innerText = '✓ Visited';
        }
    });
    
    const statsCounter = document.getElementById('tracker-stats');
    if (statsCounter) {
        statsCounter.innerText = `${totalVisited} / ${globalTrackerDomains.length} Selesai`;
    }
}

function filterDomainTrackerList() {
    const query = document.getElementById('tracker-search').value.toLowerCase();
    const items = document.getElementsByClassName('domain-tracker-item');

    for (let i = 0; i < items.length; i++) {
        const domainAttr = items[i].getAttribute('data-domain-name');
        if (domainAttr) {
            if (domainAttr.includes(query)) {
                items[i].style.display = '';
            } else {
                items[i].style.display = 'none';
            }
        }
    }
}

function resetDomainTracker() {
    if (globalTrackerDomains.length === 0) {
        alert('Belum ada data domain untuk direset, sahabat Mr.Rm19!');
        return;
    }
    if (confirm('Apakah Anda yakin ingin mereset riwayat klik pelacakan untuk semua domain saat ini?')) {
        globalTrackerDomains.forEach(domain => {
            localStorage.removeItem('visited_mr_rm19_' + domain.toLowerCase());
        });
        renderDomainTrackerList();
    }
}


// --- 2. ENGINE: URL EXTRACTOR ---
function extractURLsReal() {
    const inputText = document.getElementById('extractor-input').value;
    const outputBox = document.getElementById('extractor-output');
    const counterBadge = document.getElementById('extractor-count');
    
    // Regex akurat untuk menangkap skema http/https secara real-time
    const urlRegex = /https?:\/\/[^\s]+/g;
    const matches = inputText.match(urlRegex);

    if (matches && matches.length > 0) {
        // Menghapus duplikasi tautan yang sama persis
        const uniqueURLs = [...new Set(matches)];
        // Bersihkan tanda baca liar di akhir string URL akibat tumpukan log data
        const cleanedURLs = uniqueURLs.map(url => url.replace(/[.,;)]$/, ''));

        outputBox.innerHTML = '';
        counterBadge.innerText = cleanedURLs.length;

        cleanedURLs.forEach(url => {
            const a = document.createElement('a');
            a.href = url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.className = 'domain-item-link';
            a.style.display = 'block';
            a.style.marginBottom = '6px';
            a.textContent = url;
            outputBox.appendChild(a);
        });
    } else {
        counterBadge.innerText = '0';
        outputBox.innerHTML = '<span style="color: var(--danger-btn);">Tidak ditemukan struktur URL (http:// atau https://) yang valid dalam teks log Anda.</span>';
    }
}

function clearURLExtractor() {
    document.getElementById('extractor-input').value = '';
    document.getElementById('extractor-output').innerHTML = 'Hasil pemisahan URL nyata akan muncul di sini...';
    document.getElementById('extractor-count').innerText = '0';
}


// --- 3. ENGINE: PATH APPENDER ---
let globalAppendedList = [];

function processPathAppendReal() {
    const inputText = document.getElementById('append-input').value;
    const customPath = document.getElementById('append-path-value').value.trim();
    const outputBox = document.getElementById('append-output');
    const counterBadge = document.getElementById('append-count');

    const urlRegex = /https?:\/\/[^\s]+/g;
    const matches = inputText.match(urlRegex);

    if (matches && matches.length > 0) {
        const uniqueMatches = [...new Set(matches)];
        globalAppendedList = [];

        uniqueMatches.forEach(rawUrl => {
            try {
                let cleanedRaw = rawUrl.replace(/[.,;)]$/, '');
                const urlObj = new URL(cleanedRaw);
                // Mengambil root origin (Skema + Host + Port jika ada)
                const rootDomain = urlObj.origin;
                // Gabungkan root domain dengan custom path pilihan
                const finalUrl = rootDomain + (customPath.startsWith('/') ? customPath : '/' + customPath);
                globalAppendedList.push(finalUrl);
            } catch (e) {
                // Lewati baris jika kegagalan parsing URL objek bawaan browser terjadi
            }
        });

        // Hilangkan duplikasi hasil akhir setelah digabungkan path baru
        globalAppendedList = [...new Set(globalAppendedList)];
        outputBox.innerHTML = '';
        counterBadge.innerText = globalAppendedList.length;

        globalAppendedList.forEach(url => {
            const a = document.createElement('a');
            a.href = url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.className = 'domain-item-link';
            a.style.display = 'block';
            a.style.marginBottom = '6px';
            a.style.color = 'var(--accent-orange)';
            a.textContent = url;
            outputBox.appendChild(a);
        });
    } else {
        globalAppendedList = [];
        counterBadge.innerText = '0';
        outputBox.innerHTML = '<span style="color: var(--danger-btn);">Gagal memproses. Pastikan input teks log memuat awalan tautan http:// atau https://</span>';
    }
}

function copyAppendResultsReal() {
    if (globalAppendedList.length === 0) {
        alert('Tidak ada data hasil penggabungan URL untuk disalin!');
        return;
    }
    const bulkText = globalAppendedList.join('\n');
    navigator.clipboard.writeText(bulkText).then(() => {
        alert('Seluruh URL kustom baru berhasil disalin ke clipboard Anda, sahabat Mr.Rm19!');
    }).catch(err => {
        console.error("Gagal melakukan penyalinan otomatis: ", err);
    });
}

function clearPathAppender() {
    document.getElementById('append-input').value = '';
    document.getElementById('append-output').innerHTML = 'Hasil penggabungan URL baru akan muncul di sini...';
    document.getElementById('append-count').innerText = '0';
    globalAppendedList = [];
}
