AFRAME.registerComponent("markerhandler", { 
    init: async function () { 

        this.el.addEventListener("markerFound", () => { 
            console.log("marker is found") 
        this.handleMarkerFound(); 
    }); 
    this.el.addEventListener("markerLost", () => { 
        console.log("marker is lost") 
        this.handleMarkerLost(); 
    }); 
},
 askUserId: function () {
      var iconUrl = "https://raw.githubusercontent.com/whitehatjr/menu-card-app/main/hunger.png";
      swal({
        title: "Welcome to Your Toy Store!!",
        icon: iconUrl,
        content: {
          element: "input",
          attributes: {
            placeholder: "Type your user id",
            type: "number",
            min: 1
          }
        },
        closeOnClickOutside: false,
      }).then(inputValue => {
        tableNumber = inputValue;
      });
    },

handleMarkerFound: function () { 
    // Changing button div visibility 
    var buttonDiv = document.getElementById("button-div"); 
    buttonDiv.style.display = "flex"; 
    var ratingButton = document.getElementById("summary-button"); 
    var orderButtton = document.getElementById("order-button"); 
    // Handling Click Events 
    ratingButton.addEventListener("click", function () { 
        swal({ icon: "warning", title: "Order Summary ", text: "Work In Progress" }); 
    });
orderButtton.addEventListener("click", () => { 
    swal({ icon: "https://i.imgur.com/4NZ6uLY.jpg", title: "Thanks For Order!", text: "This is a toy car for you and your family.!"}); 
}); 
},

getAllToys: async function(){
    return await firebase 
    .firestore()
    .collection("toys")
    .get()
    .then(snap => {
        return snap.docs.map(doc => doc.data ())
    });

},


handleMarkerLost: function () { 
    // Changing button div visibility 
    var buttonDiv = document.getElementById("button-div"); 
    buttonDiv.style.display = "none"; 
} ,
handleOrder: function (uid, toy) {
    //Reading current table order details
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then(doc => {
        var details = doc.data();

        if (details["current_orders"][toy.id]) {
          //Increasing Current Quantity
          details["current_orders"][toy.id]["quantity"] += 1;

          //Calculating Subtotal of item
          var currentQuantity = details["current_orders"][toy.id]["quantity"];

          details["current_orders"][toy.id]["subtotal"] =
            currentQuantity * toy.price;
        } else {
          details["current_orders"][toy.id] = {
            item: toy.toy_name,
            price: toy.price,
            quantity: 1,
            subtotal: toy.price * 1
          };
      }

        details.total_bill += toy.price;

        // Updating db
        firebase
          .firestore()
          .collection("users")
          .doc(doc.id)
          .update(details);
      });
  },
    
});

 