document.getElementById('heading').value = "Registration of Records";

const handleSubmit = () => {
    const id = document.getElementById("id").value;
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    const student = {
        id: id,
        name: name,
        email: email,
        phone: phone
    };

    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();

    document.getElementById("id").value = "";
    document.getElementById("email").value = "";
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";

    let temp = document.getElementById('update').innerText;
    if (temp === 'Submit') {
        alert("Record Inserted Successfully");
    }
}

const displayStudents = () => {
    const stable = document.getElementById("studentTable");
    const students = JSON.parse(localStorage.getItem("students")) || [];

    if (students.length > 0) {
        stable.style.display = "table";
    } else {
        stable.style.display = "none";
        return;
    }

    stable.innerHTML = `
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
        </tr>`;

    students.forEach((student, index) => {
        const row = stable.insertRow();
        row.insertCell(0).innerText = student.id;
        row.insertCell(1).innerText = student.name;
        row.insertCell(2).innerText = student.email;
        row.insertCell(3).innerText = student.phone;

        const actionCell = row.insertCell(4);
        const updateBtn = document.createElement("button");
        updateBtn.innerText = "Update";
        updateBtn.classList.add("action-btn", "updatebtn");
        updateBtn.onclick = () => updateRecord(index);
        actionCell.appendChild(updateBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.classList.add("action-btn", "deleteBtn");
        deleteBtn.onclick = () => deleteRecord(index);
        actionCell.appendChild(deleteBtn);
    });
}

const deleteRecord = (index) => {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    alert("Record Deleted Successfully");
    displayStudents();
}

const updateRecord = (index) => {
    document.getElementById('heading').innerText = "Update Record";
    document.getElementById('update').innerText = "Update";
    document.getElementById('update').onclick = () => {
        alert("Record Updated Successfully");
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];

    document.getElementById("id").value = students[index].id;
    document.getElementById("name").value = students[index].name;
    document.getElementById("email").value = students[index].email;
    document.getElementById("phone").value = students[index].phone;

    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
}

window.onload = () => {
    displayStudents();
};
