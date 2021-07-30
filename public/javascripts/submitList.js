const submitBtn = document.getElementById('submitForms');
const listForms = document.getElementsByClassName('shopListForms')


submitBtn.addEventListener("click", (evt) => {
    console.log(listForms)
    listForms[0].submit();
    listForms[1].submit();
    listForms[2].submit();
  });