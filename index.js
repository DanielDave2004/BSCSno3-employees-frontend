const content=document.querySelector("#content");
const submit=document.querySelector("#add");

//POST API
submit.addEventListener('click',()=>{
    let fname=document.querySelector("#fname").value;
    let lname=document.querySelector("#lname").value;
    let email=document.querySelector("#email").value;
    let gender=document.querySelector("#gender").value;
    let formData={fname,lname,email,gender};

    fetch("https://bscsno3-employees.onrender.com/api/users",{
        method:'POST',
        body: JSON.stringify(formData),
        headers:{
            "Content-Type":"application/json",
        },
    }).catch((error)=>{
        console.log(error);
    })
    alert("User Added Successfully");
    location.reload();
});


window.addEventListener('load', ()=>{
    getUsers();
})


function getUsers(){
    let html=""
    //FETCH API
    fetch('https://bscsno3-employees.onrender.com/api/users',{mode:'cors'})
    .then(response=>{
        console.log(response);
        return response.json();
    })
    .then(data=>{
        console.log(data);
        data.forEach(element=>{
            html+=`<li> ${element.first_name} ${element.last_name}</li>`
        })

        content.innerHTML=html;
    })
    .catch(error=>{
        console.log(error);
    })
}
