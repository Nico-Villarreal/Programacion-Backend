const socket = io();

let products;
let listProduct;
let titleForm;
let descriptionForm;
let priceForm;
let thumbnailForm;
let codeForm;
let stockForm;
let button = document.getElementById("btn");

let addProduct= button.addEventListener("click",()=>{

    //traigo los elementos del formulario
    titleForm= document.getElementById("title");
    descriptionForm= document.getElementById("description");
    priceForm= document.getElementById("price");
    thumbnailForm= document.getElementById("thumbnail");
    codeForm= document.getElementById("code");
    stockForm= document.getElementById("stock");
    categoryForm= document.getElementById("category");

    //los guardo en el objeto
    if (titleForm.value !== '' && descriptionForm.value !== '' && priceForm.value !== '' && thumbnailForm.value !== '' && codeForm.value !== '' && stockForm.value !== '' && stockForm.categoryForm !== '') {
        products = {
            title: titleForm.value,
            description: descriptionForm.value,
            price: priceForm.value,
            thumbnail: thumbnailForm.value,
            code: codeForm.value,
            stock: stockForm.value,
            categoryForm: categoryForm.value,
            status: true,
        };

        titleForm.value = '';
        descriptionForm.value = '';
        priceForm.value = '';
        thumbnailForm.value = '';
        codeForm.value = '';
        stockForm.value = '';
        categoryForm.value = '';

        alert('Se agrego correctamente el product')

    } else{
        alert('Por favor, rellene la totalidad de los campos')
    }
    //mando los datos
    socket.emit('prod', products);

    //muestro la lista.
    socket.on('listUpdate',data =>{
        listProduct= document.getElementById("listProducts");
        listProduct.innerHTML= JSON.stringify(data, null, 2);

    })

});


