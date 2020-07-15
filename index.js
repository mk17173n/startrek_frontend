/****************  DOM Elements ****************/
const toggleView = document.querySelector("#toggle-dark-mode")
const characterForm = document.querySelector("#character-form")
const characterList = document.querySelector("#character-list")


/**************** Event Listeners ****************/

//toggleView for red alert
toggleView.addEventListener("click", handleredAlertClick)

//submitting character
characterForm.addEventListener("submit", handleFormSubmit)


//like button clicked
characterList.addEventListener("click", e => {
    //console.log(e)
  // like button clicked
    if (e.target.dataset.action === "like") {
      handleLike(e)
    }
   if (e.target.dataset.action === "image") {
     updateName(e)
   }
  
 }) 

 
//function for dark mode
//testing feature
 function handleredAlertClick(event) {
    document.body.classList.toggle("dark-mode")
    //let audio = new Audio("Red Alert.mp3")

   if(event.target.checked){
      audio = new Audio("Red Alert.mp3")
      alert("Red Alert!!! All Hands to Battle Station!!!")
      audio.play()
    } else {
      audio.pause()
    }
    }
    
  

//function for form submission
function handleFormSubmit(e) {
e.preventDefault()
const characterName = e.target["name"].value
  const actorName = e.target["actor_name"].value
  const actorSex = e.target["actor_sex"].value
  const actorDob = e.target["actor_dob"].value
  const characterImage = e.target["image"].value
  const characterDescription = e.target["description"].value

const newCharacter = {
name: characterName,
image: characterImage,
description: characterDescription,
likes: 0,

name: actorName,
sex: actorSex,
dob: actorDob,
}



fetch("https://startrek-backend.herokuapp.com/characters", {
method: "POST",
headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(newCharacter)
})
  .then(r => {
    if (r.ok) {
      return r.json()
    } else {
      throw new Error("transporter malfunction")
    }
  })
  .then(actualNewCharacter => {
    // put it on the DOM
    renderOneCharacter(actualNewCharacter)
  })
  .catch(error => {
    alert(error)
  })

}



//function for handling likes
function handleLike(e) {
    const outerLi = e.target.closest(".card")
    const likeCount = outerLi.querySelector(".like-count")
    const newLikes = parseInt(likeCount.textContent) + 1
    const characterId = outerLi.dataset.id
  
    fetch(`https://startrek-backend.herokuapp.com/characters/${characterId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: newLikes
      })
    })
  
    // optimistic rendering: DOM manipulation outside of fetch
    likeCount.textContent = newLikes
  }

// function for rendering one character
function renderOneCharacter(characterObj) {
const outerLi = document.createElement('li')
outerLi.className = "card"
outerLi.dataset.id = characterObj.id

outerLi.innerHTML = `
<div class="image">
<img data-action = "image" src="${characterObj.image}" alt="${characterObj.name}">
</div>
<div class="content">
<div class="name">${characterObj.name}</div>
<div class="likes">
  <span class="like-count">${characterObj.likes}</span> Likes
</div>
<div data-action= "des" class="description">${characterObj.description}</div>
</div>
<button data-action="like" class="like button">
Like 
</button>
`


characterList.append(outerLi)


}





// function for rendering all characters
function renderAllCharacters(characters) {
    characters.forEach(renderOneCharacter)
  }


  // initial fetch request
fetch("https://startrek-backend.herokuapp.com/characters")
  .then(r => r.json())
  .then(characters => {
    // once we're here, do DOM stuff
    renderAllCharacters(characters)
    //console.log(characters)
  })










   //TEST CODE


  // fetch("https://startrek-backend.herokuapp.com/actors")
  // .then(r => r.json())
  // .then(actors=> {
  //   // once we're here, do DOM stuff
  //   //console.log(actors)
  //   //console.log(characters)
  // }) 

  // lets clickedDescription = false
  // outerLi.addEventListener("click", (e) => {
        // clickedDescription = !clickedDescription
        // create another variable associated to the outerLi
        // with the variable use that with innerHTML 
        // append it to the actual outerLi
        // if(clickedDescription) {
              // reverse the description
              // outerLi.innerHTML = '
              // `
              // with some html content involving the description
              //`

        // } else {
              // reverting the description
        // }
  // })
  
  // outerLi.addEventListener('click', (e) => {
  //   // console.log(e)
  //   // let charName = reverseString(characterObj.name)
  //   // // console.log(charName)
  //   outerLi.innerHTML = `
  // <div class="image">
  // <img src="${characterObj.image}" alt="${characterObj.name}">
  // </div>
  // <div class="content">
  // <div class="name">${reverseString(characterObj.name)}</div>
  // <div class="likes">
  //   <span class="like-count">${characterObj.likes}</span> Likes
  // </div>
  // <div class="description">${characterObj.description}</div>
  // </div>
  // <button data-action="like" class="like button">
  // Like 
  // </button>
  // `
  // })

  // function reverseString(name) {
  //   return name.split("").reverse().join("");
  // }




//   description = outerLi.querySelector(".description")

// description.addEventListener("click", e=> {
//   newDescription = e.target.textContent.toUpperCase()
 
//   fetch(`https://startrek-backend.herokuapp.com/characters/${characterObj.id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify({
//         description: newDescription
//       })
//     })
  
//     // optimistic rendering: DOM manipulation outside of fetch
//     description.textContent = newDescription
//   })
  
// function handleDelete(e) {
//   const outerLi = e.target.closest(".card")
//   const characterId = outerLi.dataset.id
//   fetch(`https://startrek-backend.herokuapp.com/characters/${characterId}`, {
//     method: "DELETE"
//   })
//     .then(r => r.json())
//     .then(data => {
//       console.log(data)
//       // pessimistic rendering: DOM manipulation inside of fetch
//       outerLi.remove()
//     })
//     // optimisitic rendering outside of fetch: outerLi.remove()
// }