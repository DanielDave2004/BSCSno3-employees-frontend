const content=document.querySelector("#content");
const submit=document.querySelector("#add");
const update=document.querySelector("#update");


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

function getUsers() {
    setRow('<tr class="state-row"><td colspan="7">Loading employees…</td></tr>');
    fetch(API, { mode: 'cors' })
        .then(r => r.json())
        .then(data => {
            if (!data.length) {
                setRow('<tr class="state-row"><td colspan="7">No employees found.</td></tr>');
                return;
            }
            let html = '';
            data.forEach(e => {
                html += `
                <tr>
                    <td>${e.id}</td>
                    <td>${e.first_name}</td>
                    <td>${e.last_name}</td>
                    <td>${e.email}</td>
                    <td>${e.gender}</td>
                    <td>
                        <div class="actions">
                            <a class="btn-update" href="javascript:void(0)" onclick="updateMember(${e.id})">Update</a>
                            <a class="btn-delete" href="javascript:void(0)" onclick="deleteMember(${e.id})">Delete</a>
                        </div>
                    </td>
                </tr>`;
            });
            setRow(html);
        })
        .catch(() => {
            setRow('<tr class="state-row"><td colspan="7">Failed to load data. Check your connection.</td></tr>');
        });
}


//DELETE
function deleteMember(id) {
    if (confirm("Are you sure you want to delete this employee?")) {
        fetch("https://bscsno3-employees.onrender.com/api/users", {
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
    fetch(`https://bscsno3-employees.onrender.com/api/users/${id}`)
    .then(response=> response.json())
    .then(data=>{
        document.querySelector("#fname").value=data[0].first_name;
        document.querySelector("#lname").value=data[0].last_name;
        document.querySelector("#email").value=data[0].email;
        document.querySelector("#gender").value=data[0].gender;
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

    let id=document.querySelector("#ID").value;

    let formData={fname,lname,email,gender,id};
    fetch(`https://bscsno3-employees.onrender.com/api/users/`,{
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




