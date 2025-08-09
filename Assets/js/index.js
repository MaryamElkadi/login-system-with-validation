import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

document.addEventListener("DOMContentLoaded", function () {
   document.addEventListener("DOMContentLoaded", function() {
            // Initialize users in localStorage if not exists
            if (!localStorage.getItem('users')) {
                const defaultUsers = [
                    { username: "maryam", password: "123456" },
                    { username: "admin", password: "admin123" },
                    { username: "testuser", password: "testpass" }
                ];
                localStorage.setItem('users', JSON.stringify(defaultUsers));
            }

            const loginForm = document.getElementById('loginForm');
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            const termsCheckbox = document.getElementById('termsCheckbox');
            const usernameError = document.getElementById('usernameError');
            const passwordError = document.getElementById('passwordError');

            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Reset error messages
                usernameError.style.display = 'none';
                passwordError.style.display = 'none';
                
                const username = usernameInput.value.trim();
                const password = passwordInput.value.trim();
                const termsAccepted = termsCheckbox.checked;
                const users = JSON.parse(localStorage.getItem('users'));
                
                // Validate inputs
                let isValid = true;
                
                if (!username) {
                    usernameError.textContent = 'Username is required';
                    usernameError.style.display = 'block';
                    isValid = false;
                }
                
                if (!password) {
                    passwordError.textContent = 'Password is required';
                    passwordError.style.display = 'block';
                    isValid = false;
                } else if (password.length < 6) {
                    passwordError.textContent = 'Password must be at least 6 characters';
                    passwordError.style.display = 'block';
                    isValid = false;
                }
                
                if (!termsAccepted) {
                    Swal.fire({
                        title: 'Terms Not Accepted',
                        text: 'Please accept the terms & conditions',
                        icon: 'warning'
                    });
                    isValid = false;
                }
                
                if (!isValid) return;
                
                // Check credentials
                const user = users.find(u => u.username === username && u.password === password);
                
                if (user) {
                    // Successful login
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    Swal.fire({
                        title: `Welcome back, ${username}!`,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        window.location.href = './hello.html'; // Redirect after login
                    });
                } else {
                    Swal.fire({
                        title: 'Login Failed',
                        text: 'Invalid username or password',
                        icon: 'error'
                    });
                }
            });

            // Add input event listeners to clear errors when typing
            usernameInput.addEventListener('input', () => {
                usernameError.style.display = 'none';
            });
            
            passwordInput.addEventListener('input', () => {
                passwordError.style.display = 'none';
            });
        });
});