const name = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const date = document.getElementById('date');
const time = document.getElementById('time');

const cancelBtn = document.getElementById('cancelBtn');
const bookBtn = document.getElementById('bookBtn');

const bookingList = document.getElementById('bookingList');
//--------------------------------------------------------------------------------------------------

cancelBtn.addEventListener('click', clearForm);
bookBtn.addEventListener('click', submitForm);

document.addEventListener('DOMContentLoaded', getBookings);

bookBtn.addEventListener('mouseover', (e)=>{
    bookBtn.style.backgroundColor = 'rgb(230, 133, 16)';
});
bookBtn.addEventListener('mouseout', (e)=>{
    bookBtn.style.backgroundColor = 'orange';
});

cancelBtn.addEventListener('mouseover', (e)=>{
    cancelBtn.style.backgroundColor = 'rgb(240, 240, 239)';
});
cancelBtn.addEventListener('mouseout', (e)=>{
    cancelBtn.style.backgroundColor = 'white';
});


//----------------------------------------------------------------------------------------------------

function clearForm(e) {
    name.value = '';
    email.value = '';
    phone.value = '';
    date.value = '';
    time.value = '';
};

function submitForm(e) {
    e.preventDefault();

    if(name.value == '' || phone.value == '' || email.value == '' || date.value == '' || time.value == ''){
        alert('Kindly fill all the fields');
    }
    else{
        let booking = {
            name : name.value,
            email : email.value,
            phone : phone.value,
            date : date.value,
            time : time.value
        };
        axios.post('http://localhost:8000/bookingApp/add-user', booking)
            .then(result => {
                //add booking to list
                name.value = '';
                email.value = '';
                phone.value = '';
                date.value = '';
                time.value = '';
                updateNewBooking_Li(result);
            })
            .catch(err => alert('Something went wrong while booking: '+err));
    }
};

function getBookings(){
    axios.get('http://localhost:8000/bookingApp/get-users')
    .then(response => {
        // bookingList.innerHTML = '';
        showBooking(response);
    })
    .catch(err=>{
        alert('Something went wrong while fetching bookings: '+err);
    })
}

function showBooking(res){
    for(let i=0; i< res.data.length; i++){
        let obj = res.data[i];

        let li = document.createElement('li');
        li.className = "booking";
        // li.appendChild(document.createTextNode(obj.Bname + " - " + obj.Bemail + " - " + obj.Bphone + " - " + obj.Bdate + " - " + obj.Btime + "     "));
        li.appendChild(document.createTextNode(obj.name + " - " + obj.email + " - " + obj.date + " - " + obj.time + "     "));
        li.appendChild(document.createElement("span"))

        // create delete button
        let delBtn = document.createElement("button");
        delBtn.className = "deleteUser";
        delBtn.setAttribute("onclick",`deleteBooking(event,'${obj.id}')`);
        delBtn.appendChild(document.createTextNode("Delete User"));
        li.appendChild(delBtn);
        li.appendChild(document.createTextNode("  "));

        // create edit button
        let editBtn = document.createElement("button");
        editBtn.className = "editUser";
        editBtn.setAttribute("onclick",`editBooking(event,'${obj.id}')`);
        editBtn.appendChild(document.createTextNode("Edit User"));
        li.appendChild(editBtn);

        // add new list item to expense UL
        bookingList.appendChild(li);
        // console.log(obj);
    }

    console.log('success');
}


function updateNewBooking_Li(result){
    let obj = result.data.newUserDetail;

    let li = document.createElement('li');
    li.className = "booking";
    // li.appendChild(document.createTextNode(obj.Bname + " - " + obj.Bemail + " - " + obj.Bphone + " - " + obj.Bdate + " - " + obj.Btime + "     "));
    li.appendChild(document.createTextNode(obj.name + " - " + obj.email + " - " + obj.date + " - " + obj.time + "     "));
    li.appendChild(document.createElement("span"))

    // create delete button
    let delBtn = document.createElement("button");
    delBtn.className = "deleteUser";
    delBtn.setAttribute("onclick",`deleteBooking(event,'${obj.id}')`);
    delBtn.appendChild(document.createTextNode("Delete User"));
    li.appendChild(delBtn);
    li.appendChild(document.createTextNode("  "));

    // create edit button
    let editBtn = document.createElement("button");
    editBtn.className = "editUser";
    editBtn.setAttribute("onclick",`editBooking(event,'${obj.id}')`);
    editBtn.appendChild(document.createTextNode("Edit User"));
    li.appendChild(editBtn);

    // add new list item to expense UL
    bookingList.appendChild(li);
    // console.log(obj);
}

function deleteBooking(e,id){   
    let itemSelect = e.target.parentElement;
    axios.delete("http://localhost:8000/bookingApp/delete-user/"+id)
    .then(()=>{
        bookingList.removeChild(itemSelect);
        alert('Booking deleted..!!');
    })
    .catch(err => alert('Something went wrong while deleting booking: '+err));
}

function editBooking(e,id){
    let itemSelect = e.target.parentElement;
    axios.get("http://localhost:8000/bookingApp/get-user/"+id)
    .then(res => {
        let obj = res.data;
        name.value = obj.name;
        email.value = obj.email;
        phone.value = obj.phone;
        date.value = obj.date;
        time.value = obj.time;
    })
    .then(()=>{
        axios.delete("http://localhost:8000/bookingApp/delete-user/"+id)
        .then(()=>{
            bookingList.removeChild(itemSelect);
        })
        .catch(err=> alert('Something went wrong while editing booking: '+err));
    });
}



//==============================================

