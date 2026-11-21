---
layout: default
---

<article>
  <h1>{{ page.title }}</h1>
  <p>
    <small>
      Dipublikasikan pada: {{ page.date | date: "%d %B %Y" }} | 
      Dilihat: <span id="view-count">...</span> kali
    </small>
  </p>
  
  <div>
    {{ content }}
  </div>
</article>

<script>
  // GANTI URL DI BAWAH DENGAN URL CLOUDFLARE WORKER KAMU
  const workerUrl = "https://workers.dev";
  
  // Mengambil alamat halaman artikel ini sebagai slug unik
  const slug = encodeURIComponent(window.location.pathname);

  fetch(`${workerUrl}?slug=${slug}`, {
    method: "POST"
  })
    .then(response => response.json())
    .then(data => {
      if (data.views !== undefined) {
        document.getElementById("view-count").innerText = data.views;
      }
    })
    .catch(err => {
      console.error("Gagal memuat jumlah lihat:", err);
      document.getElementById("view-count").innerText = "1";
    });
          </script>
          
