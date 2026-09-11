export const caseStudies = {
  relaska: {
    eyebrow: 'Case Study — 02 // Fullstack & Predictive Analytics',
    title: 'Proyek RELASKA — Smart Computer Store',
    meta: [
      ['Role', 'System Architect & Fullstack Dev'],
      ['Timeline', '12 Weeks'],
      ['Focus', 'E-Commerce, Data Mining, UI/UX'],
      ['Tools', 'Laravel, PHP, Bootstrap 5, MySQL']
    ],
    sections: [
      {
        number: '01 // PROBLEM',
        title: 'The Guesswork in Building a PC',
        paragraphs: [
          'Membangun PC rakitan seringkali menjadi proses yang menakutkan bagi pemula. Mereka harus menghadapi masalah kompatibilitas hardware (seperti socket processor yang tidak cocok dengan motherboard) dan ketidakpastian harga komponen komputer yang sangat fluktuatif.',
          'Banyak pengguna merasa ragu untuk menekan tombol "Beli" karena takut harga komponen tersebut akan anjlok minggu depan. Tantangannya adalah menciptakan platform yang tidak hanya bisa menjual barang, tetapi juga bertindak sebagai penasihat teknis dan finansial yang cerdas.'
        ],
        visual: 'Document — Fluktuasi Harga Hardware & Isu Kompatibilitas'
      },
      {
        number: '02 // PROCESS',
        title: 'Modeling the Data Before the Screens',
        reverse: true,
        paragraphs: [
          'Pengembangan dimulai dengan merancang algoritma Linear Regression menggunakan metode Least Squares. Tujuannya adalah memproses riwayat harga 6 bulan terakhir dari setiap produk ke dalam sistem, guna menghitung slope (kemiringan tren) dan intercept.',
          'Alih-alih menggunakan library external berat seperti RapidMiner, seluruh formula matematika statistika ini ditanamkan langsung ke dalam controller PHP agar berjalan ringan secara real-time saat pengguna mengakses website.'
        ],
        visual: 'Logic Flow — Least Squares Method in PHP'
      },
      {
        number: '03 // SOLUTION',
        title: 'Price Trend Radar & PC Builder Simulator',
        paragraphs: [
          'Solusi utamanya adalah mengkonversi hasil rumit dari Regresi Linear menjadi visualisasi antarmuka (UI) yang bersahabat: Price Trend Radar. Berbentuk seperti Speedometer interaktif, fitur ini memberikan skor prediktif.',
          'Jarum akan menunjuk ke area hijau ("Beli Sekarang") jika harga diprediksi naik lebih dari 5%, atau ke area merah ("Tunda Dulu") jika harga akan turun. Ini diintegrasikan dengan fitur PC Builder yang memastikan komponen yang dipilih saling kompatibel 100%.'
        ],
        visual: 'Mockup — Speedometer Indicator UI & Mobile Responsive Layout'
      },
      {
        number: '04 // IMPLEMENTATION',
        title: 'From Data Analytics to Live Experience',
        full: true,
        paragraphs: [
          'Sistem dibangun menggunakan framework Laravel. Desain antarmuka dirakit ulang (Reverse Engineering) untuk menyesuaikan poin pengujian kuesioner UX. Label prediksi dipisahkan dari animasi lingkaran agar responsif di smartphone, serta ditambahkan Trust Badge verifikasi untuk meningkatkan rasa percaya responden terhadap perhitungan sistem.'
        ],
        visual: 'Screenshot — Live E-Commerce RELASKA & Product Detail Page'
      }
    ],
    result: {
      number: '05 // RESULT',
      title: 'Smarter Purchases, Zero Bottlenecks',
      paragraphs: [
        'Menanamkan model data mining ke dalam web architecture berhasil menjembatani kesenjangan antara e-commerce konvensional dan konsultan perangkat keras cerdas. Pengguna tidak lagi berbelanja secara buta.',
        'Insight: Mengubah angka persentase prediktif menjadi aksi yang jelas ("Beli" atau "Tunda") dan menyajikannya secara mobile-first terbukti menjadi kunci utama meningkatnya rasa aman (trust) pembeli sebelum melakukan checkout hardware mahal.'
      ],
      metrics: [
        ['100%', 'Kompatibilitas Part'],
        ['Real-Time', 'Kalkulasi Regresi Linear'],
        ['Responsive', 'Mobile UI/UX Design']
      ]
    },
    next: { href: 'case-study-ecommerce.html', label: 'Next Case Study: Redesign E-Commerce' }
  },

  ecommerce: {
    eyebrow: 'Case Study — 02 // Software Architecture & Dev',
    title: 'Redesign Website E-Commerce',
    meta: [
      ['Role', 'UI/UX Engineer & System Analyst'],
      ['Timeline', '6 Weeks'],
      ['Focus', 'Checkout Flow, Conversion'],
      ['Tools', 'Figma, Miro, HTML/CSS']
    ],
    sections: [
      {
        number: '01 // PROBLEM',
        title: 'Checkout Was Losing Customers',
        paragraphs: [
          'The existing checkout flow spanned five separate steps — cart, shipping details, address confirmation, payment method, and final review — before a customer could complete a purchase. Analytics showed a steep drop-off between step two and three, and support tickets frequently mentioned confusion about where the process actually ended.',
          "The core issue wasn't visual polish, it was structural: too many decision points spread too thin, with no clear signal to the customer of how much was left to do."
        ],
        visual: 'Wireframe — Original 5-Step Checkout Flow'
      },
      {
        number: '02 // PROCESS',
        title: 'Mapping the Flow Before Touching the UI',
        reverse: true,
        paragraphs: [
          'Before any screen was designed, the full flow was mapped as a flowchart to identify which steps could merge without losing necessary information. Shipping and address confirmation were combined into a single form with smart defaults, and payment method selection moved inline with the review step.',
          'Each revision was tested against the same question: does this step ask the customer for something the system could reasonably infer or remember instead?'
        ],
        visual: 'Flowchart — Consolidating 5 Steps Into 2'
      },
      {
        number: '03 // SOLUTION',
        title: 'A Two-Step Checkout With Persistent Progress',
        paragraphs: [
          'The final design condensed the flow into two steps: Details (shipping, address, and contact merged into one form) and Payment & Review (method selection with an inline order summary). A persistent progress indicator at the top removed any ambiguity about how far along the customer was.',
          'Modular form components were built so the same layout could be reused across mobile and desktop breakpoints without duplicating logic.'
        ],
        visual: 'Mockup — Final Two-Step Checkout UI'
      },
      {
        number: '04 // IMPLEMENTATION',
        title: 'From Mockup to Working Front-End',
        full: true,
        paragraphs: [
          'The approved design was translated into a responsive front-end build, with each form field, button state, and the progress indicator implemented as reusable components rather than one-off markup — so the same checkout logic could be dropped into other flows later.'
        ],
        visual: 'Screenshot — Live Checkout Implementation'
      }
    ],
    result: {
      number: '05 // RESULT',
      title: 'Fewer Steps, Clearer Path to Purchase',
      paragraphs: [
        'By cutting the checkout from five steps to two and giving customers a persistent sense of progress, the redesigned flow removed the two biggest points of confusion identified in the original audit.',
        "Insight: most checkout friction wasn't about UI polish at all — it came from asking for information the system already had, or could reasonably infer. Once that principle became the design filter, cutting steps was a natural consequence rather than a compromise."
      ],
      metrics: [
        ['5 → 2', 'Checkout Steps'],
        ['1', 'Unified Form'],
        ['100%', 'Responsive Reuse']
      ]
    },
    next: { href: 'case-study-relaska.html', label: 'Next Case Study: Proyek RELASKA' }
  }
};
