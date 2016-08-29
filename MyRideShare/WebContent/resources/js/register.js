"use strict";

$(function () {


    $('#password').blur(function () {
        var inputVal = $("#password").val();
        var characterReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
        if (!characterReg.test(inputVal)) {
            $("#lblPasswordError").empty();
            $("#lblPasswordError").append('<span style="color:red">Password  should be at least 6 Character and have at least one capital letter, one small letter, one number.</span>');
            return false;
            //$("#password").focus();
        }
        else {
            $("#lblPasswordError").empty();

        }
    });


    $('#birthday').blur(function () {

        var today = new Date();
        var nowyear = today.getFullYear();
        var nowmonth = today.getMonth();
        var nowday = today.getDate();
        var b = $("#birthday").val();



        var birth = new Date(b);

        var birthyear = birth.getFullYear();
        var birthmonth = birth.getMonth();
        var birthday = birth.getDate();

        var age = nowyear - birthyear;
        var age_month = nowmonth - birthmonth;
        var age_day = nowday - birthday;

        if ((age == 18 && age_month <= 0 && age_day <= 0) || age < 18) {
            $("#lblBirthdayError").empty();
            $("#lblBirthdayError").append('<span style="color:red">For a safer community and rides, only members with 18+ years old are allowed to use the application.</span>');
            return false;
        }
        else {
            $("#lblBirthdayError").empty();

        }


    });

    $("#btnSubmit").submit(function () {

        $("#form").find(':input').each(function () {
            alert(1)
            var x = $(this).val();
             alert( x)
            if (x ==null || x== "") {
                alert( emp)
                 $("#lblError").append('<span style="color:red">All Fields are Required</span>');
               // return false;
            }
            else
            {
                 //$("#lblError").append('<span style="color:red">All Fields are Required</span>');
             $("#lblError").empty();

            }
        });
    });







});
