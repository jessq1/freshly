let foodItem, foodId
const firdgeBody = document.getElementById('firdgeBody');

firdgeBody.addEventListener("click", (evt) => {
    foodId=evt.target.id
    foodItem=evt.target.getAttribute('name')
    console.log(foodItem)
    console.log(foodId)
  });
