const submit=document.querySelector("#add");
const update=document.querySelector("#update");
const content = document.querySelector("#tableBody");

//POST API
submit.addEventListener('click',()=>{
    let fname=document.querySelector("#fname").value;
    let lname=document.querySelector("#lname").value;
    let email=document.querySelector("#email").value;
    let gender=document.querySelector("#gender").value;
    let ip_add=document.querySelector("#ip_add").value;
    let formData={fname,lname,email,gender,ip_add};

    fetch("http://localhost:1111/api/users",{
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
    let html="";

    fetch('http://localhost:1111/api/users',{mode:'cors'})
    .then(response=>{
        return response.json();
    })
    .then(data=>{
        data.forEach(element=>{
            html += `
            <tr>
                <td>${element.id}</td>
                <td>${element.first_name}</td>
                <td>${element.last_name}</td>
                <td>${element.email}</td>
                <td>${element.gender}</td>
                <td>${element.ip_address}</td>
                <td>
                <div class="actions">
                    <a class="btn-update" href="javascript:void(0)" onClick="updateMember(${element.id})">
                      <i class="fas fa-edit"></i>
                    </a>
                    <a class="btn-delete" href="javascript:void(0)" onClick="deleteMember(${element.id})">
                      <i class="fas fa-trash"></i>
                    </a>
                </div>
                </td>
            </tr>
            `;
        });

        content.innerHTML = html;
    })
    .catch(error=>{
        console.log(error);
    });
}


//DELETE
function deleteMember(id) {
    if (confirm("Are you sure you want to delete this employee?")) {
        fetch("http://localhost:1111/api/users", {
            method: 'DELETE',
            body: JSON.stringify({ id }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => response.text())
        .then(response => {
            console.log(response);
            location.reload();
        })
        .catch(error => {
            console.log(error);
        });
    } else {
        alert("You Canceled!");
    }
}


//search
function updateMember(id){
    fetch(`http://localhost:1111/api/users/${id}`)
    .then(response=> response.json())
    .then(data=>{
        document.querySelector("#fname").value=data[0].first_name;
        document.querySelector("#lname").value=data[0].last_name;
        document.querySelector("#email").value=data[0].email;
        document.querySelector("#gender").value=data[0].gender;
        document.querySelector("#ip_add").value=data[0].ip_address;
        document.querySelector("#ID").value=data[0].id;
    }).catch(error=>{
        console.log(error);
    })
}

//PUT
update.addEventListener('click',()=>{
    let fname=document.querySelector("#fname").value;
    let lname=document.querySelector("#lname").value;
    let email=document.querySelector("#email").value;
    let gender=document.querySelector("#gender").value;
    let ip_add = document.querySelector("#ip_add").value;
    let id=document.querySelector("#ID").value;

    let formData = {fname, lname, email, gender, ip_add, id};
    fetch(`http://localhost:1111/api/users`,{
        method:'PUT',
        body: JSON.stringify(formData),
        headers:{
            "Content-Type":"application/json",
        },
    }).catch((error)=>{
        console.log(error);
    })
    alert("User Updated Successfully");
    location.reload();
})
