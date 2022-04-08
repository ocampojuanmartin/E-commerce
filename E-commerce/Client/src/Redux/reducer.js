import {
    GET_PRODUCTS, SEARCH_PRODUCTS, GET_DETAILS, ADD_CART, CLEAR_CART, DELETE_ONE_ITEM_FROM_CART, ADD_TO_FAVORITES, DELETE_FROM_FAVORITES, Get_ALL_FAVORITES,
    DELETE_ALL_SINGLE_ITEM_FROM_CART, SET_USER, CLEAN_DETAIL, EDIT_THE_PRODUCT, GET_BRAND, GET_CATEGORIES,
    GET_ALL_USERS, DELETE_ONE_ITEM_FROM_STOCK, UPDATE_USERS, GET_PRODUCT_PAGINADO, FILTER_PRICE, FILTER_BY, IS_ADMIN, GET_SHOP, CLEAN_RESULT_SEARCH

} from "./actions"

const initialState = {
    product: [],
    detailproduct: {},
    shopingCart: JSON.parse(localStorage.getItem("carrito")) || [],
    haveResult: false,
    resultSearch: [],
    favoriteItems: [],
    user2: {},
    categories: [],
    brands: [],
    users: [],
    productOnStock: [],
    isAdmin: false,
    orders: [],
    pages: 10,
    filters: {},
    myShop: []

}
export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                product: action.payload
            }

        case SEARCH_PRODUCTS:
            if (!action.payload[0]) {
                return {
                    ...state,
                    resultSearch: action.payload,
                    haveResult: true
                }
            } else {

                return {
                    ...state,
                    resultSearch: action.payload,
                    haveResult: false
                }
            }

        case GET_DETAILS:
            return {
                ...state,
                detailproduct: action.payload
            }

        case ADD_CART:
            let myItem = action.payload
            let myCartQuantity = myItem.quantity
            let sum = 0
            for (let i = 0; i < state.shopingCart.length; i++) {
                if (state.shopingCart[i]._id === myItem._id) {
                    sum++
                }
            }

            let local = JSON.parse(localStorage.getItem("carrito"))
            let result = sum < myCartQuantity ? [...state.shopingCart, myItem] : [...state.shopingCart]

            //mandar result a local storage 
            const setShoppingCartState = (x) => {
                try {
                    let data = JSON.stringify(x)
                    localStorage.setItem('carrito', data)
                    //localStorage.setItem('carrito', [...local, data])
                } catch (e) { console.log(e) }
            }
            setShoppingCartState(result)

            let myResult = JSON.parse(localStorage.getItem("carrito"))

            return {
                ...state,
                shopingCart: myResult

            }

        case CLEAR_CART:
            localStorage.setItem('carrito', '[]')

            return {
                ...state,
                shopingCart: JSON.parse(localStorage.getItem("carrito"))
            }

        case DELETE_ONE_ITEM_FROM_CART:
            let myDeleteProduct = state.shopingCart.find(product => product._id === action.payload)
            let myFilterProducts = state.shopingCart.filter(product => product !== myDeleteProduct)
            myFilterProducts = JSON.stringify(myFilterProducts)
            localStorage.setItem('carrito', myFilterProducts)
            return {
                ...state,
                shopingCart: JSON.parse(localStorage.getItem("carrito")),
            }

        case DELETE_ALL_SINGLE_ITEM_FROM_CART:
            let theItem = action.payload
            let itemsWithoutTheItem = state.shopingCart.filter(x => x._id !== theItem._id)
            itemsWithoutTheItem = JSON.stringify(itemsWithoutTheItem)
            localStorage.setItem('carrito', itemsWithoutTheItem)
            return {
                ...state,
                shopingCart: JSON.parse(localStorage.getItem("carrito"))
            }

        case ADD_TO_FAVORITES:
            let myProductFavorite = action.payload
            state.favoriteItems = state.favoriteItems.filter(x => x !== null)
            let findProduct = state.favoriteItems.find(x => x._id === myProductFavorite._id)
            findProduct ? myProductFavorite = null : myProductFavorite = action.payload
            state.favoriteItems = state.favoriteItems.filter(x => x !== null)
            return {
                ...state,
                favoriteItems: [...state.favoriteItems, myProductFavorite]
            }

        case DELETE_FROM_FAVORITES:
            let myFilterFavoriteProducts = state.favoriteItems.filter(x => x !== action.payload)
            return {
                ...state,
                favoriteItems: myFilterFavoriteProducts
            }

        case Get_ALL_FAVORITES:
            return {
                ...state
            }

        case SET_USER:
            return {
                ...state,
                user2: action.payolad
            }

        case CLEAN_DETAIL:
            return {
                ...state,
                detailproduct: {}
            }

        case EDIT_THE_PRODUCT:
            return {
                ...state
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case GET_BRAND:
            return {
                ...state,
                brands: action.payload
            }


        case FILTER_BY:
            return {
                ...state,
                pages: action.payload.totalPage,
                product: action.payload.totalProducts
            }

        case GET_ALL_USERS:
            return {
                ...state,
                users: action.payload
            }

        case DELETE_ONE_ITEM_FROM_STOCK:
            return {
                ...state,

            }

        case UPDATE_USERS:
            return {
                ...state
            }

        case GET_PRODUCT_PAGINADO:
            return {
                ...state,
                productOnStock: action.payload
            }


        case IS_ADMIN:
            return {
                ...state,
            }

        case "ADD_FILTERS":
            return {
                ...state,
                filters: action.payload

            }

        case "GET_ALL_ORDERS":
            return {
                ...state,
                orders: action.payload
            }

        case GET_SHOP:
            return {
                ...state,
                myShop: action.payload
            }

        case CLEAN_RESULT_SEARCH:
            return {
                ...state,
                resultSearch: []
            }
        default:
            return state
    }

}



