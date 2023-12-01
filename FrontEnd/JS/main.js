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

document.addEventListener('DOMContentLoaded', refreshBookings);

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
            Bname : name.value,
            Bemail : email.value,
            Bphone : phone.value,
            Bdate : date.value,
            Btime : time.value
        };
        axios.post('localhost:3000', booking)
            .then(result => {
                //add booking to list
                showBooking(result);
            })
            .catch(err => alert('Something went wrong: ',err));
    }
    name.value = '';
    email.value = '';
    phone.value = '';
    date.value = '';
    time.value = '';

};

function refreshBookings(){
    axios.get('localhost:3000')
    .then(response => {showOutput(response)})
    .catch(err=>{
        alert('Something went wrong: ',err);
    })
}

function showBooking(result){

}





const msg = document.getElementById('msg');
const bookings = document.getElementById('bookings');


const btn = document.getElementById('submitButton');




// btn.addEventListener('mouseover', (e)=>{
//     btn.style.backgroundColor = 'blue';
// });

// btn.addEventListener('mouseout', (e)=>{
//     btn.style.backgroundColor = 'orange';
// });

document.addEventListener('DOMContentLoaded', refreshBookings);

btn.addEventListener('click',addBooking);
bookings.addEventListener('click',alterBookings);




function addBooking(e){
    e.preventDefault();

    if(name.value == '' || phone.value == '' || email.value == '' || date.value == '' || time.value == ''){
        msg.classList.add('error');
        msg.innerText = 'Please fill all the fields..';
        setTimeout(() => { 
            msg.classList.remove('error'); 
            msg.innerText = '';
        }, 3000);
    }
    else{
        let booking = {
            Bname : name.value,
            Bemail : email.value,
            Bphone : phone.value,
            Bdate : date.value,
            Btime : time.value
        };

        axios.post('https://crudcrud.com/api/0ab6f559e4c64d13b8f0bb3cc11f3b3f/bookingApp',booking)
        .then(()=>{
            msg.classList.add('success');
            msg.innerText = "call slot booked!";
            name.innerHTML = '';
            email.innerHTML = '';
            phone.innerHTML = '';
            date.innerHTML = '';
            time.innerHTML = '';
            setTimeout(() => { 
                msg.classList.remove('success');
                msg.innerText = '';
            }, 3000);

            refreshBookings();
        })
        .catch(()=>{
            msg.innerText = 'Something went wrong while adding data!!';
            setTimeout(() => { 
                msg.classList.remove('error'); 
                msg.innerText = '';
            }, 3000);
        })
    }
}



function alterBookings(e){
    
    let itemSelect = e.target.parentElement;
    if(e.target.classList.contains("deleteUser")){
        axios.delete("https://crudcrud.com/api/0ab6f559e4c64d13b8f0bb3cc11f3b3f/bookingApp/"+itemSelect.getAttribute("bookingId"))
        .then(()=>{
            bookings.removeChild(itemSelect);
            msg.innerText = 'Booking deleted..!!';
            setTimeout(() => { 
                msg.classList.remove('error'); 
                msg.innerText = '';
            }, 3000);
        })
        .catch(()=>{
            msg.innerText = 'Something went wrong while deleting booking';
            setTimeout(() => { 
                msg.classList.remove('error'); 
                msg.innerText = '';
            }, 3000);
        })
    }
    else{
        axios.get("https://crudcrud.com/api/0ab6f559e4c64d13b8f0bb3cc11f3b3f/bookingApp/"+itemSelect.getAttribute("bookingId"))
        .then(res => {
            let obj = res.data;
            name.value = obj.Bname;
            email.value = obj.Bemail;
            phone.value = obj.Bphone;
            date.value = obj.Bdate;
            time.value = obj.Btime;
        })
        .then(()=>{
            axios.delete("https://crudcrud.com/api/0ab6f559e4c64d13b8f0bb3cc11f3b3f/bookingApp/"+itemSelect.getAttribute("bookingId"))
            .then(()=>{
                bookings.removeChild(itemSelect);
                msg.innerText = 'Edit the user..!!';
                setTimeout(() => { 
                    msg.classList.remove('error'); 
                    msg.innerText = '';
                }, 1000);
            })
            .catch(()=>{
                msg.innerText = 'Something went wrong while deleting booking';
                setTimeout(() => { 
                    msg.classList.remove('error'); 
                    msg.innerText = '';
                }, 3000);
            })
        });
    }
}




function refreshBookings(){


}



function showOutput(res){

    for(let i=0; i< res.data.length; i++){
        let obj = res.data[i];

        let li = document.createElement('li');
        li.className = "booking";
        li.setAttribute("bookingId",obj._id);
        li.appendChild(document.createTextNode(obj.Bname + " - " + obj.Bemail + " - " + obj.Bphone + " - " + obj.Bdate + " - " + obj.Btime + "     "));
        li.appendChild(document.createElement("span"))

        // create delete button
        let delBtn = document.createElement("button");
        delBtn.className = "deleteUser";
        delBtn.appendChild(document.createTextNode("Delete User"));
        li.appendChild(delBtn);
        li.appendChild(document.createTextNode("  "));

        // create edit button
        let editBtn = document.createElement("button");
        editBtn.className = "editUser";
        editBtn.appendChild(document.createTextNode("Edit User"));
        li.appendChild(editBtn);

        // add new list item to expense UL
        bookings.appendChild(li);
        console.log(obj);
    }

    console.log('success');
}