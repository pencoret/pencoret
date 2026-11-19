document.addEventListener("DOMContentLoaded", async () => {
  // GANTI dengan URL asli Worker hitung-klik Anda
  const API_URL = "https://workers.dev";
  const path = window.location.pathname;

  // 1. Kirim laporan klik jika pengunjung membuka halaman artikel (bukan beranda/halaman statis)
  const halamanBukanArtikel = ["/", "/about/", "/contact/", "/privacy-policy/", "/disclaimer/"];
  if (!halamanBukanArtikel.includes(path)) {
    fetch(`${API_URL}?hit=${encodeURIComponent(path)}`).catch(() => {});
  }

  // 2. Ambil data terpopuler & perbarui bagian "Postingan Populer" di Beranda
  if (path === "/") {
    try {
      const res = await fetch(API_URL);
      const topPosts = await res.json();
      if (!topPosts || topPosts.length === 0) return;

      // Cari semua link artikel yang ada di halaman beranda untuk mencocokkan judul & gambarnya
      const petaArtikel = {};
      document.querySelectorAll("a[href]").forEach((a) => {
        const href = a.getAttribute("href");
        const judul = a.textContent.trim();
        if (href && judul && judul.length > 15 && !petaArtikel[href]) {
          petaArtikel[href] = judul;
        }
      });

      // Targetkan wadah carousel / bagian Postingan Populer
      const carouselTrack = document.querySelector(".carousel-track, .carousel__track, [class*='carousel'] ul");
      if (carouselTrack) {
        const htmlPopuler = topPosts
          .filter((item) => petaArtikel[item.path])
          .map(
            (item) => `
              <li class="carousel-slide" style="padding: 16px;">
                <a href="${item.path}" style="font-weight: bold; font-size: 1.1rem; display: block;">
                  ${petaArtikel[item.path]}
                </a>
                <small style="opacity: 0.7;">Dibaca ${item.views} kali</small>
              </li>
            `
          )
          .join("");

        if (htmlPopuler) {
          carouselTrack.innerHTML = htmlPopuler;
        }
      }
    } catch (err) {
      console.error("Gagal memuat postingan populer:", err);
    }
  }
});
