// console.log(document.getElementById('name'));
// console.log(window);


// const itemList = document.querySelector('.items');

// const item1 = itemList.children[0];
// item1.innerText='HELLO';
// item1.style.color = 'green';

// itemList.children[1].style.color='yellow';



const btn = document.querySelector('#submitButton');
btn.addEventListener('mouseover', (e)=>{
    btn.style.backgroundColor = 'blue';
});

btn.addEventListener('mouseout', (e)=>{
    btn.style.backgroundColor = 'orange';
});

btn.addEventListener('click',(e)=>{
    const name = document.querySelector('#name');
    const email = document.querySelector('#email');
    const phone = document.querySelector('#phone');
    const date = document.querySelector('#date');
    const time = document.querySelector('#time');

    const msg = document.querySelector('#msg');
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
        

        console.log(name.value);
        console.log(email.value);
        console.log(phone.value);
        console.log(date.value);
        console.log(time.value);

    }
});

// function printAll(){
//     console.log(document.getElementsByName('name')[0].value);
//     console.log(document.getElementsByName('email')[0].value);
//     console.log(document.getElementsByName('phone')[0].value);
//     console.log(document.getElementsByName('date')[0].value);
//     console.log(document.getElementsByName('time')[0].value);
//     return false;
// }