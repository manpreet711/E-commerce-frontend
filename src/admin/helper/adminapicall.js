const { API } = require("../../backend");


//Category calls
//create a category
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept: "application/json",
            "content-Type": "application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
    .then(response => {
        return response.json();
    })
    .catch( err => console.log(err));
};

//get all categories
export const getCategories = () => {
    return fetch(`${API}/categories`,{
        method: "GET"
    }).then(response =>{
        return response.json()
    })
    .catch(err => console.log(err));
};

//get a category
export const getCategory = (categoryId) =>{
    return fetch(`${API}/category/${categoryId}`,{
        method:"GET"
    }).then(response =>{
        return response.json()
    }).catch(err => console.log(err));
};

//update a Category
export const updateCategory = (categoryId,userId,token,category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "content-Type": "application/json",
            Authorization:`Bearer ${token}`
        },
        body:category
    }).then((response) => {
        return response.json()
    }).catch((err) => { console.log(err)});
};

//Delete a Category
export const removeCategory = (categoryId,userId,token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept: "application/json",
            Authorization:`Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    })
    .catch( err => console.log(err));
};



//PRODUCT CALLS
//create a product
export const createProduct =(userId,token,product) => {
    return fetch(`${API}/product/create/${userId}`,{
        method: "POST",
        headers:{
        Accept: "application/json",
        Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
};

//get all products
export const getProducts = () => {
    return fetch(`${API}/products`,{
        method: "GET"
    }).then(response =>{
        return response.json()
    })
    .catch(err => console.log(err));
};

//get a product
export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`,{
        method:"GET"
    }).then(response =>{
        return response.json()
    }).catch(err => console.log(err));
}

//update a product
export const updateProduct =(productId,userId,token,product) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: "PUT",
        headers:{
        Accept: "application/json",
        Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
};

//delete a product
export const deleteProduct = (productId,userId,token) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: "DELETE",
        headers:{
        Accept: "application/json",
        Authorization: `Bearer ${token}`
        }
    
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};