// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
	apiKey: "AIzaSyCori3ypQRSo-oHnNTFIujYAbLQmx_vSdM",
	authDomain: "daftar-pegawai-88588.firebaseapp.com",
	databaseURL: "https://daftar-pegawai-88588-default-rtdb.firebaseio.com",
	projectId: "daftar-pegawai-88588",
	storageBucket: "daftar-pegawai-88588.appspot.com",
	messagingSenderId: "543692695855",
	appId: "1:543692695855:web:1c7eb049702b97de5d59da",
	measurementId: "G-BWJDL73XD5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


var db = firebase.database();
var idPegawai = db.ref('idPegawai');
idPegawai.orderByChild('nama').on('value', showData, showError);

//adding Worker Profile
function addPegawai(){
	let date = new Date();
	let nama = $('#nama_pegawai').val();
	let gender = document.querySelector('input[name="gender"]:checked').value;
	let jabatan = $('#jabatan_pegawai').val();
	let tempat = $('#tempat_pegawai').val();
	let lahir = $('#lahir_pegawai').val();
	let email = $('#email_pegawai').val();
	let tel = $('#tel_pegawai').val();
	let umur = lahir.split('-')
	umur = parseInt(date.getFullYear()) - parseInt(umur[0]) ;
	
	idPegawai.push({
		nama: nama,
		umur: umur,
		gender: gender,
		jabatan: jabatan,
		TTL: `${tempat}:${lahir}`,
		email: email,
		tel: tel
	})
}

//display Data
function showData(items){
	let content = '';
	let list = $('#worker');
	
	items.forEach((item) => {
		let x = item.val();
		content += `<li class='${x.jabatan} ${x.umur}'>
						<div class='pekerja'>
							<div class="img-worker">
								<img alt="foto profil"></img>
							</div>
							<div class="worker-identity">
								<p class='name'>${x.nama}</p>
								<p>${x.umur}</p>
								<p>${x.jabatan}</p>
								<br>
								<p class="kunci hidden">${item.key}</p>
							</div>
							<div class="skill">
								<canvas></canvas>
							</div>
						</div>
					</li>`;
	})
	list.append(content);
	console.log(list);
	
	//hitung ulang gender
	countGender(items);
}
function showError(err){
	console.log(err);
}