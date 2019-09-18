$(document).ready(function(){
    
    $('.gotologin').click(function(){
        $('.showsignup').fadeOut();
    });
    $('.gotologin').click(function(){
        $('.login').fadeIn(2000);
    });
    $('.gotosignup').click(function(){
        $('.login').fadeOut();
    });
    $('.gotosignup').click(function(){
        $('.showsignup').fadeIn(2000);
    });

    //signup function 
    $('.subSignUp').click(function(event){
        event.preventDefault();
        const fullname = $('#fullname').val();
        const email = $('#email').val();
        const department = $('#department').val();
        const password = $('#password').val();       

        if (!fullname || !email || !department || !password ) {
            $('.errorMessage').html('Kindly fill in all fields');
            return;
        }
        //sign in
        //ajax
        $.ajax({
            method: "GET",
            url: 'http://localhost:3000/users?email='+ email,
            data: {
                email,
            },
        success: function(response){
                //if user already exist 
        if(response.length){
            $('.errorMessage').append('User Already Exist')
        } else {
            $.ajax({
                method: "POST",
                url: 'http://localhost:3000/users',
                data: {
                    fullname,
                    email,
                    department,
                    password,
                },
                success: function(){
                    $('.errorMessage').html('sign up successful');
                    localStorage.setItem('email', email);
                    //if log in is successful
                    window.location.assign('leaveForm.html');
                    return;
                }
            })
        }
        }
        })

        
    });
    //login form
    $('.loginBtn').click(function(event){
        event.preventDefault();
        const logemail = $('#logemail').val();
        const logpassword = $('#logpassword').val();
        // if (!logemail || !logpassword){
        //     $('.errorMessage').html('Please fill in all fields');
        //     return;
        // } else {
        //     $.ajax({
        //         method: "GET",
        //         url: ``,
        //         data: {
        //             email: logemail,
        //             password: logpassword,
        //         },
        //         success: function(){
        //             $('.errorMessage').append('login successful');
        //         }
        //     })
        // }
        //to check if user is in database
        $.ajax({
            method:'GET', 
            url: `http://localhost:3000/users?email=${logemail}&password=${logpasswword}`,
            data:{
                email: logemail,
                password: logpassword,
            },
            success: function(response){
                if(response.length) {
                    $('.errorMessage').html('Login successful');
                    localStorage.setItem('email', logemail);
                    //if log in is successful
                    window.location.assign('leaveForm.html');
                    return;
                } else {
                    $('.errorMessage').html('email or password do not match')
                }
            }
        })
    })
});