// Code your solution here

document.addEventListener("DOMContentLoaded", e => {

    const shoeList = document.getElementById("shoe-list")
    const reviewsList = document.getElementById("reviews-list")
    
    
    fetch("http://localhost:3000/shoes")
    .then(r => r.json())
    .then(shoes => shoes.forEach(shoe => {
        const li = document.createElement("li")
        showShoe(shoe.name, li)
    }))
    
    
    const showShoe = (shoe, li) => {        
        li.innerText += shoe
        li.classList.add("list-group-item")
        shoeList.append(li)
    }
    
    fetch("http://localhost:3000/shoes/1")
    .then(r => r.json())
    .then(shoe => {
        const shoeImage = document.getElementById("shoe-image")
        const shoeName = document.getElementById("shoe-name")
        const shoeDesc = document.getElementById("shoe-description")
        const shoePrice = document.getElementById("shoe-price")
        shoeImage.src=`${shoe.image}`
        shoeName.innerText = `${shoe.name}`
        shoeDesc.innerText = `${shoe.description}`
        shoePrice.innerText = `${shoe.price}`
        shoe.reviews.forEach(review => {
            const li = document.createElement("li")
            li.innerText += `${review.content}`
            reviewsList.append(li)
            li.classList.add("list-group-item")
        })
        
    })
    
        const formContainer = document.getElementById("form-container")
        formContainer.innerHTML = 
        `<form id="new-review">
        <div class="form-group">
        <textarea class="form-control" id="review-content" rows="3"></textarea>
        <input type="submit" class="btn btn-primary"></input>
        </div>
        </form>`

        formContainer.addEventListener("submit", e => {
            e.preventDefault()
            const newReview = (document.getElementById("new-review"))
            console.log(newReview)
            const reviewContent = document.getElementById("review-content").value
            console.log(reviewContent)


            fetch(`http://localhost:3000/shoes/1/reviews`, {
                method: "POST",
                headers: {
                    "content_type": "application/json"
                },
                body: JSON.stringify({
                    content: reviewContent
                })
            })
            .then(r => r.json())
            .then(console.log)

        })

    


}) // DOMContentLoaded