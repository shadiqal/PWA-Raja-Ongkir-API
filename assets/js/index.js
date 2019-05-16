"use strict"

function init() {
    var output = '',
        output2 = '';
    fetch('assets/php/api.php?data=provinsi')
        .then(response => response.json())
        .then(data => {
            output += '<select class="browser-default custom-select" id="kotaAsal" name="kotaAsal">';
            output2 += '<select class="browser-default custom-select" id="kotaTujuan">';
            var resource = data.rajaongkir.results;
            for (var i in resource) {
                output += '<option value="' + resource[i].city_id + '">' + resource[i].city_name + '</option>';
                output2 += '<option value="' + resource[i].city_id + '">' + resource[i].city_name + '</option>';
            }
            output += '</select>';
            output2 += '</select>';
            document.getElementById('listKotaAsal').innerHTML = output;
            document.getElementById('listKotaTujuan').innerHTML = output2;
        })
}

function cekHarga() {
    var kotaAsal = document.getElementById('kotaAsal').value;
    var kotaTujuan = document.getElementById('kotaTujuan').value;
    var kurir = document.getElementById('kurir').value;
    var berat = document.getElementById('berat').value;
    console.log(berat);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var hasil = this.responseText;
            decode(hasil, kotaAsal, kotaTujuan, kurir, berat);
        }
    }
    xhr.open("POST", "assets/php/api.php?data=biaya", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send('kotaAsal=' + kotaAsal + '&kotaTujuan=' + kotaTujuan + '&kurir=' + kurir + '&berat=' + berat);
}

function decode(hasil, kotaAsal, kotaTujuan, kurir, berat) {
    var output = '';
    var json = JSON.parse(hasil);
    var dataUser = json.rajaongkir;
    var data = json.rajaongkir.results;
    for (var i in data) {
        var harga = data[i].costs[i].cost[i].value;
        var durasi = data[i].costs[i].cost[i].etd;
        var description = data[i].costs[i].description;
        var service = data[i].costs[i].service;
        var kotaAsal = dataUser.origin_details.city_name;
        var kotaTujuan = dataUser.destination_details.city_name;
        var kurir = dataUser.query.courier;
        var berat = dataUser.query.weight;
    }
    output += '<h6 class="card-subtitle mb-2 text-muted">Kota asal : ' + kotaAsal + '</h6>' +
        '<h6 class="card-subtitle mb-2 text-muted">Kota tujuan : ' + kotaTujuan + '</h6>' +
        '<h6 class="card-subtitle mb-2 text-muted">Berat : ' + berat + 'Kg</h6>' +
        '<h6 class="card-subtitle mb-2 text-muted">Kurir : ' + kurir + '</h6>' +
        '<table class="table table-hover">' +
        '<thead>' +
        '<tr>' +
        '<th scope="col">#</th>' +
        '<th scope="col">Jenis layanan</th>' +
        '<th scope="col">Waktu</th>' +
        '<th scope="col">Tarif</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        '<tr>' +
        '<th scope="row">1</th>' +
        '<td>' + service + '</td>' +
        '<td>' + durasi + ' Hari</td>' +
        '<td>Rp.' + harga + '</td>' +
        '</tr>' +
        '</tbody>';
    document.getElementById('detail').innerHTML = output;
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('sw.js').then(function (registration) {
            // Ketika regristasi service worker berhasil
            console.log('ServiceWorker berhasil di tambahkan: ', registration.scope);
        }, function (err) {
            // Jika gagal
            console.log('ServiceWorker gagal di tambahkan: ', err);
        });
    });
}