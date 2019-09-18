$(document).ready(function(){
    $('.staff').click(function(){
        $('.showsignup').fadeIn();
    })
    $('.staff').click(function(){
        $('.login').fadeOut();
    });
    $('.admin').click(function(){
        $('.showsignup').hide();
    })
    $('.admin').click(function(){
        $('.admin-login-container').fadeIn();
    });
    $('.staff').click(function(){
        $('.admin-login-container').hide();
    });
    $('.login').click(function(){
        $('.admin-login-container').hide();
    })
    $('.admin').click(function(){
        $('.login').hide();
    })
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

        if (!logemail || !logpassword){
            $('.errorMessage').html('Please fill in all fields');
            
        } 
        $.ajax({
            method: "GET",
            url: `http://localhost:3000/users?email=${logemail}&password=${logpassword}`,
            data: {
                email: logemail,
                password: logpassword,
            },
        success: function(response){
            if(response.length){
                localStorage.setItem('logemail', logemail);
                window.location.assign('leaveForm.html');
                
            } else {
                $.ajax({
                    method: "POST",
                    url: 'http://localhost:3000/users',
                    data: {
                        email: logemail,
                        password: logpassword,
                    },
                    success: function(){
                        localStorage.setItem('logemail', logemail);
                        window.location.assign('leaveForm.html');
                        return;
                    }
                })
            }
        }
        });
        
        //to check if user is in database
        // $.ajax({
        //     method:'GET', 
        //     url: `http://localhost:3000/users?email=${logemail}&password=${logpasswword}`,
        //     data:{
        //         email: logemail,
        //         password: logpassword,
        //     },
        //     success: function(response){
        //         if(response.length) {
        //             $('.errorMessage').html('Login successful');
        //             localStorage.setItem('email', logemail);
        //             //if log in is successful
        //             window.location.assign('leaveForm.html');
        //             return;
        //         } else {
        //             $('.errorMessage').html('email or password do not match')
        //         }
        //     }
        // })
    });



    //Admin login 
    $('.admin-login').click(function(event){
        event.preventDefault();
        const emailadmin = $('#emailadmin').val();
        const passwordadmin = $('#passwordadmin').val();

        if(!emailadmin || !passwordadmin) {
            $('.messageAdmin').html('kindly fill in fields');
        }
        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/admin?email=${emailadmin}&password=${passwordadmin}`,
            data:{
               emailadmin,
              passwordadmin
            },
        success: function(response){
            if(response.length){
                localStorage.setItem('emailadmin', emailadmin);
                window.location.assign('admin.html');
            }
        }
        });

    });



    //apply form
    $('.apply-button').click(function(event){
        event.preventDefault();
        const fullname = $('#fullname').val();
        const email = $('#email').val();
        const leave = $('#leave').val();
        const startdate = $('#startdate').val();       
        const enddate = $('#enddate').val();       
    });

    // $('.img').click(function(){
    //     window.location.assign('admin.html');

    // })

    //LOGOUT BUTTON
    $('.logoutBtn').click(function() {
        //clear the localstorage and redirect to signup page
        localStorage.clear();
        $('.checkLogin').html('Kindly login');
        window.location.assign('signup.html');
      });

});