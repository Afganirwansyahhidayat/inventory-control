// animasi nama gua
var typed = new Typed(".auto", {
  strings: ["Afgan Irwansyah Hidayat", "Afgan Irwansyah Hidayat"],
  typeSpeed: 100,
  backSpeed: 50,
  loop: true,
});

var semuaproduk = []; // array
var increment = 1; // bagian md
var modeedit = false ; // bagian edit
var indexproductedit = null; // index product yg mau di edit

function menyimpanbarang() {
  // Jika sedang dalam mode edit, gunakan kode produk yang lama, jika tidak, buat kode produk baru
  var codeproduct = modeedit 
  ? document.getElementById("product-code").value // Gunakan kode yang ada jika edit
  : "MD-" + String(increment).padStart(3, "0"); // Buat kode baru jika menambah produk

  var productname = document.getElementById("product-name").value;
  var productprice = document.getElementById("price").value;
  var productimage = document.getElementById("product-image").value;
  var productsatuan = document.getElementById("satuan").value;
  var productkategori = document.getElementById("kategori").value;
  var productstok = document.getElementById("stok").value;

  // Cek jika ada field yang kosong
  if (!productname || !productprice || !productimage || !productstok) {
    alert("Silakan isi semua field yang diperlukan");
    return;
  }

  // Object Var
  var produk = {
    codeproduct,
    productname,
    productprice,
    productimage,
    productsatuan,
    productkategori,
    productstok,
  };

  if (modeedit) {
    // Jika dalam mode edit, update produk yang ada
    semuaproduk[productkategori][indexproductedit] = produk;
    modeedit = false;
    indexproductedit = null;
    alert("Produk berhasil diedit");

    // Tidak perlu mengubah increment saat edit
  } else {
    // Jika menambah produk baru, pastikan kategori sudah ada
    if (!semuaproduk[productkategori]) {
      semuaproduk[productkategori] = [];
    }

    // Tambahkan produk ke kategori yang sesuai
    semuaproduk[productkategori].push(produk);
    alert('Produk Berhasil di Tambahkan');

    // Update increment hanya jika produk baru ditambahkan
    increment++; // Hanya increment jika menambah produk baru
  }

  // Setel kode produk otomatis pada input
  document.getElementById("product-code").value = codeproduct;

  console.log(semuaproduk);

  // Render ulang tabel setelah produk ditambahkan atau diedit
  renderTable();

  // Reset field input
  hapusotomatis();
}


// Fungsi untuk menghapus input secara otomatis
function hapusotomatis() {
  document.getElementById("product-code").value = "";
  document.getElementById("product-name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("product-image").value = "";
  document.getElementById("stok").value = "";
}

// Fungsi untuk edit produk
function editproduct(index, category) {
  // Akses produk berdasarkan kategori dan index
  var produkedit = semuaproduk[category][index];

  // Mengisi input dengan nilai produk yang dipilih
  document.getElementById('product-code').value = produkedit.codeproduct; 
  document.getElementById('product-name').value = produkedit.productname;
  document.getElementById('price').value = produkedit.productprice;
  document.getElementById('product-image').value = produkedit.productimage;
  document.getElementById('satuan').value = produkedit.productsatuan;  
  document.getElementById('kategori').value = produkedit.productkategori;
  document.getElementById('stok').value = produkedit.productstok;

  modeedit = true;
  indexproductedit = index;

  alert("Harap mengedit produk.")
}

function deleteproduct(index, kategori) {
  // Hapus produk berdasarkan index di kategori
  semuaproduk[kategori].splice(index, 1);
   // Update increment berdasarkan produk terakhir yang tersisa
   updateIncrement();

  renderTable();
  alert("Produk berhasil di hapus")
}

// Menampilkan tabel produk
// Menampilkan tabel produk
function renderTable() {
  const table = document.getElementById("my-table");
  let nomorUrut = 1; // Variabel untuk nomor urut produk 
  table.innerHTML = `
    <thead style=" background-color: #dee2e6;">
      <tr>
        <th>#</th>
        <th>Code</th>
        <th>Name</th>
        <th>Price</th>
        <th>Satuan</th>
        <th>Category</th>
        <th>Stock</th>
        <th>Image</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      ${Object.keys(semuaproduk).map((category) => semuaproduk[category].map((produk, index) => {
        // Menampilkan nomor urut secara global
        return `
        <tr>
          <td>${nomorUrut++}</td>  <!-- Increment nomor urut di sini -->
          <td>${produk.codeproduct}</td>
          <td>${produk.productname}</td>
          <td>Rp ${produk.productprice},00</td>
          <td>${produk.productsatuan}</td>
          <td>${produk.productkategori}</td>
          <td style="background-color: ${produk.productstok < 5 ? 'red' : 'white'}">${produk.productstok}</td>
          <td><img src="${produk.productimage}" alt="${produk.productname}" width="70" style="margin-left: 50px;"></td>
          <td>
             <button style="background-color : blue; border: 0px; border-radius: 2px; padding: 10px 20px; color: white; font-size: 15px;" onclick="editproduct(${index}, '${category}')"> Edit  </button>  
             <button  style="background-color : red ; border: 0px; border-radius: 2px; padding: 10px 11px; color: white; font-size: 15px;" onclick="deleteproduct(${index}, '${category}')"> Delete </button>
          </td>
        </tr>
        `;
      }).join('')).join('')}
    </tbody>
  `;
}


// Fungsi Clear All
function clearAll() {
  // Mengosongkan array semuaproduk
  semuaproduk = [];

  // Reset increment ke 1 setelah clear all
  increment = 1;
  
  // Merender ulang tabel (tabel akan kosong karena semuaproduk sudah kosong)
  renderTable();

  alert("Semua produk berhasil dihapus.");
}
// Fungsi untuk memperbarui nilai increment
function updateIncrement() {
  let existingCodes = [];

  // Ambil semua kode produk yang ada
  for (let category of Object.keys(semuaproduk)) {
    for (let produk of semuaproduk[category]) {
     let codeNumber = parseInt(produk.codeproduct.split("-")[1]);
      existingCodes.push(codeNumber);
    }
  } 

  // Urutkan kode produk yang ada
  existingCodes.sort((a, b) => a - b);

  // Tentukan increment berikutnya
  increment = 1; // Set awal increment ke 1

  // Cek apakah ada kode yang hilang
  for (let i = 0; i < existingCodes.length; i++) {
    if (existingCodes[i] !== increment) {
      // Jika ada gap (misalnya MD-002 hilang), maka increment harus disesuaikan
      break;
    }
    increment++;
  }

  console.log("Increment setelah update: " + increment);
}


// Menambahkan event listener untuk tombol Clear All
document.getElementById("clear-all").addEventListener("click", clearAll);

// Menambahkan produk
document.getElementById("add").addEventListener("click", menyimpanbarang);
