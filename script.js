// jQuery animations
$(document).ready(function() {
	// container animation
	$(".container").addClass("animated fadeIn");
 	// h1 animation
 	$(".mainHeader").addClass("animated bounceInRight");
 	// borderBottom (3 border colors after h1) animation
 	$(".borderBottom").addClass("animated bounceInLeft");
 	// paragraph after h1 animation
 	$(".guideText").addClass("animated pulse");
});



//Declaring Variables to store the elements
const form = document.querySelector('form')

var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");

var tgt;

var buttonDelete = document.getElementById("clear");


// create an empty array to store our to-dos
 let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []



//Set Local Storage
 localStorage.setItem('items', JSON.stringify(itemsArray))
 let data = JSON.parse(localStorage.getItem('items'))


//Get the length of the input to later check if its grater than 0
function inputLength() {
  return input.value.length;
}


let ikey = 0;
//Function that crate a list item after user input
function createListElement(text) {


  //Create Li
  var li = document.createElement("li");

  //Store created li in variable
  // li.appendChild(document.createTextNode(input.value));

  li.setAttribute('id', 'ikey'+ikey);
	localStorage.setItem('ikey'+ikey, li);

	ikey++;


	 li.textContent = text;

  //// adds style to the list items
	li.classList.add("listItem");

  //Append Li to the Ul
  ul.appendChild(li);

  // revert input value back to nothing
  // input.value = "";
}

function storeLi() {

  // push any new input value into the array
  itemsArray.push(input.value);
  console.log(input.value);


  //set the localStorage to the new, updated value
   localStorage.setItem('items', JSON.stringify(itemsArray));
	 // data = JSON.parse(localStorage.getItem('items'))
  console.log(itemsArray);

	createListElement(input.value);

  // revert input value back to nothing
  input.value = "";
}


form.addEventListener('submit', function(e){
	// will prevent the form from the default submit action, which we don't want, since we're not sending any data to a server.
   e.preventDefault();

	 storeLi();
});


//loop through everything in our data variable
data.forEach(item => {
	//display all existing stored information on the front end every time we open the app.
  createListElement(item)
	console.log(item);
});




//Function that After clicking Check if there is value in input by calling inputLength() function then create element by calling createListElement() function
function addListAfterClick() {
  if (inputLength() > 0) {
    // console.log(inputLength());
    storeLi();
  }
}

//Function that After Pressing Enter key Check if there is value in input by calling inputLength() function then create element by calling createListElement() function
// function addListAfterPress(event) {
//   if (inputLength() > 0 && event.keyCode === 13) {
//     createListElement();
//   }
// }

//After Clicking Item, Adding the checklist to List Items that are already in the Ul
document.getElementById("shopList").addEventListener("click", function(e) {

  // store event parameter target in variable
  tgt = e.target;

  // creates a remove button for the finished item:
  var removeButton = document.createElement("button");
  //Adding a class to the removeButton
  removeButton.classList.add("deleteButton");

  //If the target Li is pressed, check if the target is an Li
  if (tgt.tagName.toUpperCase() == "LI") {

    // tgt.parentNode.removeChild(tgt); // or tgt.remove();  //"REMOVES LI when pressed"

    //Assign className that toggles to the li target in variable, with the css class
    var finished = tgt.classList.toggle("done");

    //If it has that className
    if (finished) {
      //Display the created button with the word remove
      removeButton.appendChild(document.createTextNode("X"));

      //Adding a class to the removeButton
      removeButton.classList = "deleteButton";
      // console.log(removeButton.classList = "deleteButton");

      //Append to the target li the button
      tgt.appendChild(removeButton);

       console.log(tgt);


       


      //When remove button is clicked, delete the target li
      removeButton.addEventListener("click", function() {

				tgt.remove();

				console.log(tgt.value);

				let _item = tgt;
				console.log(_item.getAttribute('id'));

				console.log(_item.innerText);

				var index = _item.innerText.slice(0, -1);

				console.log(index);

				// var arr  = localStorage.getItem('items');
				// console.log(arr);
				// console.log(_item.innerText);
				//  const filterArr = [];
				//  for(item in arr) {
				// 	 console.log(item);
				//  	//  if(_item.innerText !== item ) {
				//   //   	filterArr.push(item);
				//  	// }
				//  }


				 // localStorage.removeItem(_item);

				 for (var i = 0; i < itemsArray.length; i++) {
		       if (itemsArray[i] == index) {
		         itemsArray.splice(i, 1);
		         break;
		        }
		      }



        //  itemsArray.splice(tgt, 1);



				  console.log(itemsArray);

				 localStorage.setItem('items', JSON.stringify(itemsArray));
				 // data = JSON.parse(localStorage.getItem('items'))

				 console.log(localStorage.items);

				 // localStorage.setItem('items', JSON.stringify(filterArr));
			   // data = JSON.parse(localStorage.getItem('items'));

				// localStorage.removeItem(_item.getAttribute('id'));
				// console.log(localStorage);





      });

      //else if the target doesnt have the class name, delete the remove button
    } else {
      tgt.getElementsByClassName("deleteButton")[0].remove();
    }
  }

});



//Call after clicking addListAfterClick()
button.addEventListener("click", addListAfterClick);

//Call after enter pressing addListAfterClick()
// input.addEventListener("keypress", addListAfterPress);

//Delete local storage when delet button is clicked
buttonDelete.addEventListener('click', function() {
  localStorage.clear()
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
  }
})
