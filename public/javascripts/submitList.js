const submitBtn = document.getElementById('submitForms');
const listForms = document.getElementsByClassName('shopListForms')


submitBtn.addEventListener("click", (evt) => {
    console.log(listForms)
    // for (let index = 0; index < listForms.length; index++) {
    //     listForms[index].submit()
    // }
    listForms[0].submit();
    listForms[1].submit();
    listForms[2].submit();
  });