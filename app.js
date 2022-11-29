// Add click event listener to '#login' element
$("#login").on("click", function () {
    //invoke Greetr with 'G$'
    let loginGrtr = G$("Toni", "Baglien");

    $("#logindiv").hide();

    //Grab the language from the input and set it in Greetr (setLang)
    //Use HTMLGreeting to passt through jquery to Greetr
    //Then log
    loginGrtr.setLang($("#lang").val()).HTMLGreeting("#greeting", true).log();
});
