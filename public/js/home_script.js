

console.log('LoL');
//for clicked animation
$('.menu-bar-container li').on('click', function(){
	$('.menu-bar-container li').removeClass('clicked');
	$(this).addClass('clicked');
});

//for opening and changing view based on click menubar!
$('.menu-bar-container li').on('click', function(){
	let open = $(this).text();
	switch(open){
		case "Dashboard":
			$('.view-container').children().addClass('hidden');
			$('.graphing').removeClass('hidden');
			break;
		case "Chat":
			$('.view-container').children().addClass('hidden');
			$('.chat').removeClass('hidden');
			break;
		case "Worker List":
			$('.view-container').children().addClass('hidden');
			$('.worker-list').removeClass('hidden');
			break;
		case "Worker Edit":
			$('.view-container').children().addClass('hidden');
			$('.worker-edit').removeClass('hidden');
			break;
		case "Sallary":
			$('.view-container').children().addClass('hidden');
			$('.sallary').removeClass('hidden');
			break;
		case "Support":
			$('.view-container').children().addClass('hidden');
			$('.support').removeClass('hidden');
			break;
		case "Others":
			$('.view-container').children().addClass('hidden');
			$('.others').removeClass('hidden');
			break;
	}
});



//graphing in dashboard
var ctx = $('#worker-per-months');
var overviewChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
        datasets: [{
            label: 'Jumlah Penerimaan Pegawai',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'		
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

//Counting gender
function countGender(items){
	let pria = wanita = 0;
	items.forEach((item,index) => {
		let x = item.val();
		x = x.gender;
		if(x == "pria"){
			pria += 1;
		} else {
			wanita += 1;
		}
	})
	updateGenderChart(pria,wanita)
}

//gender ratio
var ctx = $('#gender-ratio');
var genderChart = new Chart(ctx, {
	type: 'doughnut',
	data: {
		labels: ['Pria','Wanita'],
		datasets: [{
			data: [0,0],
			backgroundColor: [
				'rgba(255, 99, 132, 1)',
				'rgba(54, 162, 235, 1)'	
			],
			borderColor: [
				'rgba(255, 99, 132, 1)',
				'rgba(54, 162, 235, 1)'
			],
			borderWidth: 1
		}]
	},
	options: {
	
	}
});

function updateGenderChart(pria,wanita){
	console.log(pria +"|"+ wanita);
	genderChart.data.datasets = [{
			data: [pria,wanita],
			backgroundColor: [
				'rgba(255, 99, 132, 1)',
				'rgba(54, 162, 235, 1)'	
			],
			borderColor: [
				'rgba(255, 99, 132, 1)',
				'rgba(54, 162, 235, 1)'
			],
			borderWidth: 1
		}]
	genderChart.update();
}


//fired
var ctx = $('#fired');
var overviewChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
        datasets: [{
            label: 'Jumlah Penerimaan Pegawai',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'		
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

//Chat App
var socket = io();
var form = document.getElementById("MyForm");


form.addEventListener('submit', function(event){
	let date = new Date();
	socket.emit('newMessage', document.getElementById('nama_user').value  + "||\n" + `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.toString().split("GMT")[1]}` + "||"+ document.getElementById('text_box').value);
	document.getElementById('text_box').value = "";
	isTyping = false;
	event.preventDefault();
})

socket.on('addOnlineUser', function(usernames){
	let list = document.getElementById('user_lists');
	list.innerHTML = '';
	for(var i=0;i<usernames.length;i++){
		var listUser = document.createElement("LI");
		listUser.setAttribute('id',`user_${usernames[i]}`);
		var textNodeUser = document.createTextNode(usernames[i]);
		listUser.appendChild(textNodeUser);
		document.getElementById('user_lists').append(listUser);
	}
})

socket.on('newMessage', function(msg){
	var element = document.getElementById('messages');

	var list = document.createElement("LI");
	var textNode = document.createTextNode(msg);
	list.appendChild(textNode);
	console.log(list);
	element.append(list);

	var elements = document.getElementsByClassName('temporary');
    	while(elements.length > 0){
        	elements[0].parentNode.removeChild(elements[0]);
   	}
	document.getElementById('MyButton').addEventListener('click', function(){
		let el = document.getElementById('messages');
		el.scrollTop = el.scrollHeight;
	})
});

document.getElementById('submit_name').addEventListener('click', addClass)
user = document.getElementById('nama_user')
function addClass(){
	if(user.value != ''){
		username = user.value;
		socket.emit('registerUser', username);
	}
}

socket.on('registerRespond', function(status){
	if(!status){
		alert('user sudah ada cari nama lain!')
	} else {
		document.getElementById('chatroom').classList.remove('hidden')
		document.getElementById('homepage').classList.add('hidden')
	}
})

textBox = document.getElementById('text_box');
var isTyping = false;
textBox.addEventListener('keyup', function(){
	if(isTyping == false){
		socket.emit('newTyping', username + ' sedang mengetik..');
	}

	isTyping = true;

})

socket.on('newTyping', function(msg){
	var element = document.getElementById('messages');

        var list = document.createElement("LI");
        var textNode = document.createTextNode(msg);
	list.setAttribute('class','temporary');
        list.appendChild(textNode);
        console.log(list);
        element.append(list);
})

//worker list filter
function filterAll(){
	$('#worker').children().removeClass('hidden');
}
function filterCEO(){
	$('#worker').children().addClass('hidden');
	$('.CEO').removeClass('hidden');
}
function filterCoFounder(){
	$('#worker').children().addClass('hidden');
	$('.Co-Founder').removeClass('hidden');
}
function filterEmployee(){
	$('#worker').children().addClass('hidden');
	$('.Employee').removeClass('hidden');
}
function filterName(){
	$('#worker').children().addClass('hidden');
	let name = $('#input_nama').val();
	name = name.toLowerCase();
	let arr = $('#worker').children();
	for(let i=0;i<arr.length;i++){
		let nama = arr[i].childNodes[1].firstElementChild.innerText;
		nama = nama.toLowerCase(); 
		if((nama == name) || (nama.includes(name, 0))){
			arr[i].classList.remove('hidden');
		}
	}
	
}

