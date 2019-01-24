// Code your solution here

// When a user loads the page, they should be able to see a list of all the shoes in the sidebar and by default, have the first shoe rendered on the main container.
// When a user clicks on one of the shoes in the sidebar, they should be able to see more details about the shoe, the reviews associated with it and a form in the main container.
// When a user fills the form out and submits it, the review should get persisted in the backend and also shown on the page, without refreshing.


document.addEventListener("DOMContentLoaded", e => {
    const shoeList = document.getElementById("shoe-list")
    const shoeImage = document.getElementById("shoe-image")
    const shoeName = document.getElementById("shoe-name")
    const shoeDesc = document.getElementById("shoe-description")
    const shoePrice = document.getElementById("shoe-price")
    const reviewsList = document.getElementById("reviews-list")
    const formContainer = document.getElementById("form-container")

    fetch("http://localhost:3000/shoes")
    .then(r => r.json())
    .then(shoes => shoes.forEach(shoe => {
        showShoe(shoe.name, shoe.id)
    }))

    fetch("http://localhost:3000/shoes/1")
    .then(r => r.json())
    .then(shoe => {
        bigScreenShoe(shoe.image, shoe.name, shoe.description, shoe.price)
        shoe.reviews.forEach(review => showReview(review.content))
    })
    
    
    const showShoe = (shoe, id) => {
        const li = document.createElement("li")
        li.innerText += shoe
        li.classList.add("list-group-item")
        li.setAttribute("data-id", `${id}`)
        shoeList.append(li)
    }

    shoeList.addEventListener("click", e => {
        const id = e.target.dataset.id

        fetch(`http://localhost:3000/shoes/${id}`)
        .then(r => r.json())
        .then(shoe => {
            bigScreenShoe(shoe.image, shoe.name, shoe.description, shoe.price)
            shoe.reviews.forEach(review => showReview(review.content))
        })

    })

    const bigScreenShoe = (img, name, desc, price) => {
        shoeImage.src = `${img}`
        shoeName.innerText = name
        shoeDesc.innerText = desc
        shoePrice.innerText = price
        console.log(shoeImage.parentNode)
        

    }

    const showReview = (review) => {
        const li = document.createElement("li")
        li.innerText += review
        li.classList.add("list-group-item")
        reviewsList.append(li)

    }

    formContainer.innerHTML = 
    `<form id="new-review">
    <div class="form-group">
      <textarea class="form-control" id="review-content" rows="3"></textarea>
      <input type="submit" class="btn btn-primary"></input>
    </div>
  </form>`

  formContainer.addEventListener("submit", e => {
    e.preventDefault()
    const reviewContent = document.getElementById("review-content").value
    console.log(e.target)
    
    fetch(`http://localhost:3000/${dataset.id}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            reviewContent
        })
    })
    .then(r => r.json())
    .then(content => {
        showReview(content)
    })

  })

}) //DOMContentLoaded