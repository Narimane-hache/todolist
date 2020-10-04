function init(){
$('.signup').hide();

$('.recover-password').hide();


$('.btn-reset').click(function () {
    $('.login').hide();
    $('.recover-password').fadeIn(300);
});

$('.btn-member').click(function () {
    $('.login').hide();
    $('.signup').fadeIn(300);
});


$('.btn-login').click(function () {
    $('.signup').hide();
    $('.recover-password').hide();
    $('.login').fadeIn(300);

});

$('.notification').hide();

$('.btn-password').click(function () {

    if($('#resetPassword').val()==0) {
        // $('#resetPassword').after('<span class="error">Email not valid.</span>')
        $('.error').text('Email not valid.')
    }

   else {
        $('.reset-mail').text($('#resetPassword').val());
        $('.recover-password form').hide();
        $('.notification').fadeIn(300);
    }
});

//en écoute du changement de statut à firebase auth(connecté ou non)
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {// si user existe => on est connecté
    console.log('connecté');
    $('.connecter').css('display','none')
    // $('li .deconnecter').show();

    //on affiche que l'on est connecté dans la console
    $('#logOut').click(function(){
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
          

          console.log('t\'es déconnecté parce que tu as appuyé sur le boutton déconnexion!');
        }).catch(function(error) {
          // An error happened.
        });
    });//fin du click de déconnexion

  } else {
     console.log('déconnecté');//on affiche que l'on est déconnecté dans la console
    // User is signed out.
    $('.connecter').show();
    $('.deconnecter').hide();
    // ...
  }
});

$('#signIn').click(function(){//au click sur l'élément html qui a l'ID signIn j'execute la fonction anonyme
    let email = $('#email').val();//déclaration de la variable email à qui est assignée la valeur de l'input id email
    let password = $('#password').val();
    console.log(email + password);

    //fonction de connexion par email et password au service auth de firebase
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
        window.location.href = './index.html';
    })
    .catch(function(error) {//les paramètres attendues de la fonction 
    //sont des variables email et password
    //.catch renvoi le rapport d'erreur s'il y en a un dans la variable error
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("ce message ne s'affiche que en cas d'erreur (signInWithEmailAndPassword)"+error);
      // ...
    });

});



//signup


   



    $('#signUp').click(function(){
        //récupération de la valeur de l'input en JS
        //let name = document.getElementById('name').value;

        //récupération de la valeur de l'input en jQuery
        let name = $('#name1').val();
        console.log(name);
        let email1 = $('#email1').val();
        let password1 = $('#password1').val();
        let password2 = $('#password2').val();
        console.log("email1= "+ email + " password1= " + password + " password2= " + password2);
        if(password1 == password2){
            console.log('mots de passe identiques');
            firebase.auth().createUserWithEmailAndPassword(email1, password1)
            .then(() => {
            window.location.href = './index.html';
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // ...
            }).then(function(){
                let user = firebase.auth().currentUser;
                user.updateProfile({
                  displayName: name
                })
                .then(function() {
                  // Update successful.
                  console.log('displayName a été mis à jour!');
                  window.location.href = './account.html';
                }).catch(function(error) {
                  // An error happened.
                });
            });
            



        }else{
            console.log('mots de passe pas identiques');
            alert('Les mots de passe ne correspondent pas!');
            $('#password1').val("");
            $('#password2').val("");

        }


    });








}//fin de init



window.onload = init;


