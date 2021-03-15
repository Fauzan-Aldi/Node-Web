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


//adding Worker Profile
function addPegawai(){
	let date = new Date();
	let nama = $('#nama_pegawai').val();
	let gender = document.querySelector('input[name="gender"]:checked').value;
	let jabatan = $('#jabatan_pegawai').val();
	let tempat = $('#tempat_pegawai').val();
	let lahir = $('#lahir_pegawai').val();
	let email = $('#email_pegawai').val();
	let wage = $('#gaji_pegawai').val();
	let tel = $('#tel_pegawai').val();
	let umur = lahir.split('-');
	let Acc = date.getFullYear();
	umur = parseInt(date.getFullYear()) - parseInt(umur[0]);
	//let today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
	
	idPegawai.push({
		nama: nama,
		umur: umur,
		gender: gender,
		jabatan: jabatan,
		TTL: `${tempat}:${lahir}`,
		Acc: Acc,
		email: email,
		wage: wage,
		tel: tel
		
	})
	
	$(".form-input-worker").submit(function(e){
		e.preventDefault();
	})
		swal.fire({
  title: "Worker is Added!",
  text: "Thankyou For Fillingin!",
  icon: "success",
});
}

//Delete Data
function deleteData(key){
	console.log(key);
	idPegawai.child(key).remove();
}

//Edit Data
function editFix(arr){
	name = arr[0];
	wage = arr[1];
	rank = arr[2];
	key = arr[3];
	console.log(name + wage + rank);
	
	if(name != ''){
		idPegawai.child(key).update({
		'nama': arr[0]
		});
	}
	if(wage != ''){
		idPegawai.child(key).update({
		'wage': arr[1]
		});
	}
	if(rank != ''){
		idPegawai.child(key).update({
		'jabatan': arr[2]
		});
	}
}

//display Data
function showData(items){
	let content = '';
	let list = $('#worker');
	let foto = "";
	list.empty();
	
	items.forEach((item) => {
		let x = item.val();
		if(x.gender == "wanita"){
			foto = "public/images/female.jpg";
		} else {
			foto = "public/images/male.jpg";
		}
		content += `<li class='${x.jabatan} ${x.umur}'>
						<div class='pekerja'>
							<div class="img-worker">
								<img src=${foto} class="foto-profile" alt="foto profil"></img>
							</div>
							<div class="worker-identity">
								<p class='name'>${x.nama}</p>
								<p>${x.umur} tahun</p>
								<p>${x.jabatan}</p>
								<p>Rp${x.wage}</p>
								<br>
								<p class="kunci hidden">${item.key}</p>
							</div>
							<div class="skill">
								<canvas></canvas>
							</div>
							<button onclick='asw(this)' class='fa fa-times ${item.key}'></button>
							<button onclick='editProfile(this)' class='fa fa-pen ${item.key}'></button>
						</div>
					</li>`;
	})
	console.log(items.val());
	
	list.append(content);
	console.log(list);
	
	//Display Total Worker
	displayTotalWorker(items);
	
	//Display New Member
	displayTotalNewWorker(items);
	
	//hitung ulang gender
	countGender(items);
}
idPegawai.orderByChild('nama').on('value', showData, showError);
function showError(err){
	console.log(err);
}