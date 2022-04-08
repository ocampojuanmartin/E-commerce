import axios from 'axios';
export const GET_PRODUCTS = "GET_PRODUCTS"
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS"
export const GET_DETAILS = "GET_DETAILS"
export const ADD_CART = "ADD_CART"
export const CLEAR_CART = "CLEAR_CART"
export const DELETE_ONE_ITEM_FROM_CART = "DELETE_ONE_ITEM_FROM_CART"
export const SET_USER = "SET_USER"
export const DELETE_FROM_FAVORITES = 'DELETE_FROM_FAVORITES'
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES'
export const DELETE_ALL_SINGLE_ITEM_FROM_CART = 'DELETE_ALL_SINGLE_ITEM_FROM_CART'
export const Get_ALL_FAVORITES = 'Get_ALL_FAVORITES'
export const CLEAN_DETAIL = "CLEAN_DETAIL"
export const EDIT_THE_PRODUCT = "EDIT_THE_PRODUCT"
export const GET_CATEGORIES = "GET_CATEGORIES"
export const GET_BRAND = "GET_BRAND"
export const FILTER_BY = "FILTER_BY"
export const FILTER_BY_CATEGORIES = "FILTER_BY_CATEGORIES"
export const FILTER_BY_BRAND = "FILTER_BY_BRNAD"
export const GET_ALL_USERS = "GET_ALL_USERS"
export const DELETE_ONE_ITEM_FROM_STOCK = "DELETE_ONE_ITEM_FROM_STOCK"
export const UPDATE_USERS = "UPDATE_USERS"
export const GET_PRODUCT_PAGINADO = "GET_PRODUCT_PAGINADO"
export const IS_ADMIN = 'IS_ADMIN'
export const GET_SHOP = "GET_SHOP"
export const CLEAN_RESULT_SEARCH = "CLEAN_RESULT_SEARCH"

const { REACT_APP_BACKEND_URL } = process.env


export function getAllProducts() {
  return async function (dispatch) {
    try {
      var json = await axios.get(`${REACT_APP_BACKEND_URL}/api/products`);
      return dispatch({
        type: "GET_PRODUCTS",
        payload: json.data,
      });
    } catch (e) {
      console.log(e)
    }
  }
}

export function searchProduct(search) {
  return async function (dispatch) {
    try {
      let busqueda = await axios.get(`${REACT_APP_BACKEND_URL}/api/products/name/` + search)
      return dispatch({
        type: SEARCH_PRODUCTS,
        payload: busqueda.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function detailProduct(id) {
  return async function (dispatch) {
    try {
      let detail = await axios.get(`${REACT_APP_BACKEND_URL}/api/products/id/` + id)
      return dispatch({
        type: GET_DETAILS,
        payload: detail.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function addCart(product) {
  //console.log(product)
  return function (dispatch) {
    try {
      return dispatch({
        type: ADD_CART,
        payload: product,
      })
    } catch (e) { console.log(e) }
  }
}

export function clearCart() {
  return function (dispatch) {
    try {
      return dispatch({
        type: CLEAR_CART,
      })
    } catch (e) { console.log(e) }
  }
}

export function deleteOneItemFromCart(id) {
  return function (dispatch) {
    try {
      return dispatch({
        type: DELETE_ONE_ITEM_FROM_CART,
        payload: id,

      })

    } catch (e) { console.log(e) }
  }
}
export function deleteAllSingleItemFromCart(id) {
  return function dispatch(dispatch) {
    try {
      return dispatch({
        type: DELETE_ALL_SINGLE_ITEM_FROM_CART,
        payload: id,
      })
    } catch (e) { console.log(e) }
  }
}

export function addToFavorites(id) {
  return function (dispatch) {
    try {
      return dispatch({
        type: ADD_TO_FAVORITES,
        payload: id,
      })
    } catch (e) { console.log(e) }
  }
}

export function deleteFromFavorites(id) {
  return function (dispatch) {
    try {
      return dispatch({
        type: DELETE_FROM_FAVORITES,
        payload: id,
      })
    } catch (e) { console.log(e) }
  }
}

export function getMyFavorites() {
  return function (dispatch) {
    try {
      return dispatch({
        type: Get_ALL_FAVORITES
      })
    } catch (e) { console.log(e) }
  }
}

export function userGmail(user) {
  return function (dispatch) {
    try {
      return dispatch({
        type: SET_USER,
        payolad: user,
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export function cleanDetail() {
  try {
    return {
      type: CLEAN_DETAIL
    }

  } catch (e) {
    console.log(e)
  }
}


export function editTheProduct(product) {
  try {
    return async function (dispatch) {
      await axios.put(`${REACT_APP_BACKEND_URL}/api/products/update/${product._id}`, product)
    }
  } catch (e) { console.log(e) }
}

export function getAllCategories() {
  return async function (dispatch) {
    try {
      var category = await axios.get(`${REACT_APP_BACKEND_URL}/api/categories`);
      return dispatch({
        type: GET_CATEGORIES,
        payload: category.data,
      });
    } catch (e) {
      console.log(e)
    }
  }
}

export function getAllBrand() {
  return async function (dispatch) {
    try {
      var marcas = await axios.get(`${REACT_APP_BACKEND_URL}/api/products/brands`);
      marcas = [...new Set(marcas.data)]
      return dispatch({
        type: GET_BRAND,
        payload: marcas,
      });
    } catch (e) {
      console.log(e)
    }
  }
}

export function filterBy(value) {
  return async function (dispatch) {
    try {
      var payload = await axios.get(`${REACT_APP_BACKEND_URL}/api/products/${value}`);
      return dispatch({
        type: FILTER_BY,
        payload: payload.data,
      });
    } catch (e) {
      console.log(e)
    }
  }
}

export function filterByCategories(value) {
  return async function (dispatch) {
    try {
      var payload = await axios.get(`${REACT_APP_BACKEND_URL}/api/products/category?name=${value}`);
      return dispatch({
        type: FILTER_BY,
        payload: payload.data,
      });
    } catch (e) {
      console.log(e)
    }
  }
}

export function filterByBrands(value) {
  return async function (dispatch) {
    try {
      var payload = await axios.get(`${REACT_APP_BACKEND_URL}/api/products/brand?name=${value}`);
      return dispatch({
        type: FILTER_BY,
        payload: payload.data,
      });
    } catch (e) {
      console.log(e)
    }
  }
}

export function deleteOneItemFromStock(id) {
  return async function () {
    try {
      axios.delete(`${REACT_APP_BACKEND_URL}/api/products/delete/${id}`)
    } catch (e) { console.log(e) }
  }
}

export function getAllUsers() {
  return async function (dispatch) {
    try {
      let users = await axios.get(`${REACT_APP_BACKEND_URL}/api/users`)
      return dispatch({
        type: GET_ALL_USERS,
        payload: users
      })
    } catch (e) { console.log(e) }
  }
}

export function updateUsers(user) {
  try {
    return async function () {
      await axios.put(`${REACT_APP_BACKEND_URL}/api/users/update/${user._id}`, user)
    }
  } catch (e) { console.log(e) }
}

export function filterByRange(maxValue, minValue) {
  return async function (dispatch) {
    try {
      var payload = await axios.get(`${REACT_APP_BACKEND_URL}/api/products/range?minprice=${minValue}&maxprice=${maxValue}`);
      return dispatch({
        type: FILTER_BY,
        payload: payload.data,
      });
    } catch (e) {
      console.log(e)
    }
  }
}

export function deleteUsers(user) {
  try {
    return async function () {
      await axios.delete(`${REACT_APP_BACKEND_URL}/api/users/delete/${user}`)
    }
  } catch (e) { console.log(e) }
}

export function getProductPagination() {
  return async function (dispatch) {
    try {
      var productOnStock = await axios.get(`${REACT_APP_BACKEND_URL}/api/products/forPage`);
      return dispatch({
        type: GET_PRODUCT_PAGINADO,
        payload: productOnStock.data.totalResult,
      });
    } catch (e) {
      console.log(e)
    }
  }
}

export function isAdmin(token) {
  return async function (dispatch) {
    console.log(token)
    try {
      let config = {
        headers: {
          Authorization: 'Bearer' + token
        }
      }
      let isTheAdmin = await axios(`${REACT_APP_BACKEND_URL}/admin/verify`, null, config)
      return dispatch({
        type: IS_ADMIN,
        payload: isTheAdmin
      })
    } catch (e) { console.log(e) }
  }
}

export function GetFilters(filters) {
  return async function (dispatch) {
    try {
      var payload = await axios.get(`${REACT_APP_BACKEND_URL}/api/products/forPage`, { params: filters });
      return dispatch({
        type: FILTER_BY,
        payload: payload.data,
      });
    } catch (e) {
      console.log(e)
    }
  }
}


export function AddFilters(filters) {

  return function (dispatch) {
    try {
      return dispatch({
        type: "ADD_FILTERS",
        payload: filters,
      })
    } catch (e) { console.log(e) }
  }
}

export function getAllOrders(id) {
  return function (dispatch) {
    try {
      let theOrders = axios(`${REACT_APP_BACKEND_URL}/api/orders/all`, id)
      return dispatch({
        type: "GET_ALL_ORDERS",
        payload: theOrders
      })
    } catch (e) { console.log(e) }
  }
}

export function updateOrder(id, status, config) {
  return function (dispatch) {
    const res = axios.put(`${REACT_APP_BACKEND_URL}/api/orders/${id}`, status, config)
      .then(res => {
        return res.data
      }).catch(e => {
        if (e.response.status === 400) {
          return e.response.data.error
        }
      })
    return res
  }
}

export function resetPasswordByAdmin(id, config) {
  return async function () {
    try {
      await axios.put(`${REACT_APP_BACKEND_URL}/api/auth/force-reset-password`, id, config)
    } catch (e) { console.log(e) }
  }
}

export function updateCategoy(old, actual) {
  return async function () {
    try {
      await axios.put(`${REACT_APP_BACKEND_URL}/api/categories/update?nameCategory=${old}`, actual)
    } catch (e) { console.log(e) }
  }
}

export function createCategory(category) {
  return async function () {
    try {
      await axios.post(`${REACT_APP_BACKEND_URL}/api/categories/create`, category)
    } catch (e) { console.log(e) }
  }
}

export function deleteCategory(category) {
  return async function () {
    try {
      await axios.delete(`${REACT_APP_BACKEND_URL}/api/categories/delete/${category}`)
    } catch (e) { console.log(e) }
  }
}

export function getShopsByUser(config) {
  return async function (dispatch) {
    try {
      let shop = await axios.get(`${REACT_APP_BACKEND_URL}/api/orders/allUser`, config)
      return dispatch({
        type: GET_SHOP,
        payload: shop.data
      })
    } catch (error) {
      console.log(error)
    }

  }
}

export function cleanResultSearch() {
  try {
    return {
      type: CLEAN_RESULT_SEARCH
    }

  } catch (e) {
    console.log(e)
  }
}
