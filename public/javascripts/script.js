

const register = document.querySelector('#registerButton');
const backToLoginButton = document.querySelector('#backToLoginButton');
const signin = document.querySelector('#signin');
const logout = document.querySelector('#logoutButton');



// Register Section

backToLoginButton?.addEventListener('click', () => {
    window.location.href = '/';
})

register?.addEventListener('click', async () => {
    const fName = document.querySelector('#fName');
    const lName = document.querySelector('#lName');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const confirmPassword = document.querySelector('#cnfPassword');

    if (!fName.value || !lName.value || !email.value || !password.value || !confirmPassword.value) {
        alert("All input fields Are Required!");
        return;
    }

    if ((password?.value?.length && confirmPassword?.value?.length) < 8) {
        alert("Password should be strong ");
        return;
    }

    if (password?.value != confirmPassword?.value) {
        alert("Passwords are not same");
        return;
    }

    await fetch("/api/register", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ fName: fName.value, lName: lName.value, password: password.value, confirmPassword: confirmPassword.value, email: email.value })
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (data?.status === "success") {
                alert("Account created Successfully");
                window.location.href = "/";
            }
        })
        .catch((err) => {
            console.log("404 Error Not Found", err);
        })
})


//sign-in Section
signin?.addEventListener('click', () => {
    const username = document.querySelector('#username');
    const loginPassword = document.querySelector('#loginPassword');
    fetch('/api/home', ({
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username.value, loginPassword: loginPassword.value })
    }))
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (data?.status == "success") {
                window.location.href = '/dashboard';
            }
            alert(data.message);
        })
        .catch((err) => {
            console.log("Account don't exist.Create Account", err);
        })
})

//Logout Section
logout?.addEventListener('click', () => {
    const conf = confirm("Do you want to log Out?");
    if (conf) window.location.href = '/';
})