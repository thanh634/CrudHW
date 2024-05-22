document
    .querySelector("#editUserModal")
    .addEventListener("shown.bs.modal", () => {
        document.querySelector("#firstNameEdit").focus();
    });

document
    .querySelector("#addUserModal")
    .addEventListener("shown.bs.modal", () => {
        document.querySelector("#firstName").focus();
    });

document.querySelectorAll(".delete-btn").forEach((btnConfirm) => {
    btnConfirm.addEventListener("click", (e) => {
        const options = {
            title: "Are you sure?",
            type: "danger",
            btnOkText: "Yes",
            btnCancelText: "No",
            onConfirm: () => {
                console.log("Confirm");
                deleteUser(btnConfirm.dataset.id);
            },
            onCancel: () => {
                console.log("Cancel");
            },
        };
        const {
            el,
            content,
            options: confirmedOptions,
        } = bs5dialog.confirm("Do you really want to delete this user?", options);
    });
});

function populateData(btn) {
    document.querySelector("#id").value = btn.dataset.id;

    document.querySelector("#firstNameEdit").value = btn.dataset.firstName;
    document.querySelector("#lastNameEdit").value = btn.dataset.lastName;
    document.querySelector("#usernameEdit").value = btn.dataset.username;
    document.querySelector("#mobileEdit").value = btn.dataset.mobile;
    document.querySelector("#isAdminEdit").checked = btn.dataset.isAdmin === "true";
}

async function updateUser(e) {
    e.preventDefault();

    const formData = new FormData(document.getElementById('editUserForm'));
    let data = Object.fromEntries(formData.entries());

    try {
        let res = await fetch('/users', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (res.status === 200) {
            location.reload();
        }
        else {
            let resText = await res.text();
            throw new Error(resText);
        }
    }
    catch (error) {
        console.log("Update user error: ", error);
        e.tartget.querySelector('#errorMessage').innerText = error.message;
    }
}

async function deleteUser(id) {
    try {
        let res = await fetch('/users', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });

        if (res.status === 200) {
            location.reload();
        }
        else {
            let resText = await res.text();
            throw new Error(resText);
        }
    }
    catch (error) {
        console.log("Delete user error: ", error);
        let toast = new boostrap.Toast(document.querySelector('.toast'), {});
        let toastBody = document.querySelector(".toast .toast-body");

        toastBody.innerHTML = "Can not delete user";
        toastBody.classList.add("text-danger");
        toast.show();
    }
}