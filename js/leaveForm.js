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
        } else {
            //sign in
            //ajax
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
                    $('.errorMessage').html('Sign Up Successful');
                    return;
                }
            })
        }

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
                    $('.errorMessage').append('Sign Up Successful')
                }
            })
        }
    })
});