

function init(){
  let userId;
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {// si user existe => on est connecté
    console.log('connecté');
    $('li .connecter').hide();
    $('li .deconnecter').show();
    var close =[];
    userId = user.uid;

firebase.database().ref('list/' + userId +'/' ).on('value', function(snapshot) {
  document.getElementById('myUL').innerHTML = "";
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    console.log(childKey);
    console.log(childData);
  var li = document.createElement("li");


  
  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('list' + userId + '/').push().key;

  var t = document.createTextNode(childData);
  li.appendChild(t);

  document.getElementById("myUL").appendChild(li);

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.setAttribute('data-key', childKey);
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
      var deleteKey = this.getAttribute('data-key');
      firebase.database().ref('list/' + userId + '/').child(deleteKey).remove();
    }
  }
    // ...
  });
  document.getElementById('loader').style.display ='none';
});

//fin de on sur la BDD

 

var add = document.getElementById('add');



// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('#myUL');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var newPostKey = firebase.database().ref().child('list' + userId + '/').push().key;

  var inputValue = document.getElementById("myInput").value;
  
  // Get a key for a new Post.

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['list/'  + userId + '/' + newPostKey] = inputValue;
  console.log(updates);
  document.getElementById("myInput").value = "";

  firebase.database().ref().update(updates);


}



add.addEventListener('click', newElement);
$('#myInput').keypress(function(e){
      var key = e.which;
      if(key == 13) //the enter key code
      {
        $('#add').click();
        return false;
      }
    });
    //on affiche que l'on est connecté dans la console
    $('#logOut').click(function(){
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
         

          console.log('t\'es déconnecté parce que tu as appuyé sur le boutton déconnexion!');
        })
        .then(() => {
        window.location.href = './signin.html';
        
         })
        .catch(function(error) {
          // An error happened.
          
        });
    });//fin du click de déconnexion

  } else {
     console.log('déconnecté');
     
     //on affiche que l'on est déconnecté dans la console
    // User is signed out.
    // ...
  }
});


var Scarner = document.getElementById('btScaner');

Scarner.addEventListener('click', () => {

    cordova.plugins.barcodeScanner.scan(
        function (result) {
            alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
        },
        function (error) {
            alert("Scanning failed: " + error);
        }
    );
})
  

}//fin de init



window.onload = init;












