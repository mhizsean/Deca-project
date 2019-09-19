$(document).ready(function(){

    //Jquery effects
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
    $('.apply-button').click(function(){
        $('.form-container-leave').fadeOut();
    });
    $('.apply-button').click(function(){
        $('.request').fadeIn();
    });
    $('.policy').click(function(){
        $('.showsignup').hide();
    });
    $('.policy').click(function(){
        $('.login').hide();
    });
    $('.policy').click(function(){
        $('.policy-container').show();
    });
    $('.policy').click(function(){
        $('.head').hide();
    });
    $('.showsignup').click(function(){
        $('.head').show();
    });
    
    $('.staff').click(function(){
        $('.policy-container').hide();
    });
    $('.staff').click(function(){
        $('.head').show();
    });
    $('.admin').click(function(){
        $('.policy-container').hide();
    });
    $('.admin').click(function(){
        $('.head').show();
    })
    $('.policy').click(function(){
        $('.admin-login-container').hide();
    })

    $('.apply').click(function(){
        $('.form-container-leave').show();
    });
    $('.status').click(function(){
        $('.form-container-leave').hide();
    })
    $('.apply').click(function(){
        $('.check-status').hide();
    })
    $('.status').click(function(){
        $('.check-status').show();
    })
    //signup function =======================================================================================
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
        //sign up
        //ajax
        $.ajax({
            method: "GET",
            url: 'http://localhost:3000/users?email='+ email,
            data: {
                email,
            },
        success: function(response){
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


    //login form===================================================================================
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
                email:logemail,
                password:logpassword
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
        
    });



    //Admin login ==========================================================================
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
        const description = $('#description').val();
        
        if (!fullname || !email || !leave || !startdate || !enddate || !description){
            alert('fill in blanks');
           
        }
        $.ajax({
            method: "POST",
            url: 'http://localhost:3000/apply',
            data: {
                fullname,
                email,
                leave,
                startdate,
                enddate,
                description,
            },
            success: function(response){
                if(response.length){
                
                
                window.location.assign('#request');
                $('.apply-button').click(function(){
                    $('.form-container-leave').fadeOut();
                })
                $('.apply-button').click(function(){
                    $('.request').fadeIn();
                })
                return;
                }
            }
        })
        
        
    });


    //display leave request 
    $('.view-request').click(function(event){
        event.preventDefault();
        const email = localStorage.getItem('logemail');
        //alert(email);
        

        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/apply?email=${email}`,
            data: {
               email
            },
            success: function(resp){
                if(resp.length){
                    let fullname = resp[0]['fullname'];
                    let leavetype = resp[0]['leave']
                    let disc = resp[0]['description'];
                    let start = resp[0]['startdate'];
                    let end = resp[0]['enddate'];
                   // alert(fullname);
                    let disp = "";
                    disp +='<p>Name:'+fullname+'</p>';
                    disp +='<p>Leave Type:'+leavetype+'</p>';
                    disp +='<p>Leave Description:'+disc+'</p>';
                    disp +='<p>Start Date:'+start+'</p>';
                    disp +='<p>End Date:'+end+'</p>';
                    disp +='<button class="btn">Delete Request</button>'

                   $('#dis').html(disp);
                }
            }
        });
    });

    $('.btn').click(function(){
        $('#dis').detach();
    });

    //admin view request approval
    $('.leave-btn').click(function(event){
        event.preventDefault();
        const fullname = $('#fullname').val();
        const leave = $('#leave').val();
        const startdate =$('#startdate').val();
        const enddate = $('#enddate').val();
        const description = $('#description').val();
        

        $.ajax({
            method:'GET',
            url: `http://localhost:3000/apply?fullname=${fullname}&leave=${leave}&startdate=${startdate}&enddate=${enddate}&description=${description}`,
            data: {
                fullname,
                leave,
                startdate,
                enddate,
                description,
            }
        })
    })


    //LOGOUT BUTTON
    $('.logout').click(function() {
        //clear the localstorage and redirect to signup page
        localStorage.clear();
        // $('.checkLogin').html('Kindly login');
        window.location.assign('index.html');
    });




});