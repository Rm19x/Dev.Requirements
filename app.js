/**
 * ==========================================================================
 * DEVELOPER REQUIREMENTS SUITE - GLOBAL CORE APPLICATION
 * Authored by: Mr.Rm19 (github.com/Rm19x)
 * Description: Mengontrol arsitektur navigasi tab, inisialisasi visualizer,
 * dan manajemen state sistem internal.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Developer Requirements Suite v1.0 by Mr.Rm19 initialized successfully.");
    // Inisialisasi visualizer bawaan agar langsung menampilkan kode awal
    if (typeof updateFlexboxVisualizer === 'function') updateFlexboxVisualizer();
    if (typeof updateGridVisualizer === 'function') updateGridVisualizer();
});

/**
 * Mengatur perpindahan Tab Panel secara responsif & dinamis
 * @param {Event} event - Klik target tombol navigasi
 * @param {String} panelId - ID dari kontainer panel yang ingin dibuka
 */
function switchTab(event, panelId) {

    const panels = document.getElementsByClassName('tab-panel');
    for (let i = 0; i < panels.length; i++) {
        panels[i].classList.remove('active');
    }

    const tabButtons = document.getElementsByClassName('tab-btn');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }

    const targetPanel = document.getElementById(panelId);
    if (targetPanel) {
        targetPanel.classList.add('active');
    } else {
        console.error("Panel ID target tidak ditemukan: " + panelId);
    }
    
    event.currentTarget.classList.add('active');
}