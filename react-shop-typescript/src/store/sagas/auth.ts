import { call, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import authService, { AuthLoginResponse } from "services/authService";
import cartService from "services/cartService";
import wishlistService from "services/wishlistService";
import { authError, authLogin } from "store/actions/authAction";
import { GET_WISHLIST } from "store/reducers/wishlistReducers";
import { AUTH_LOGOUT, CART_SET_CART, FETCH_LOGIN, LOGIN } from "store/type";

export function* fetchLogin(action: any): any {
    try {
        let res: AuthLoginResponse = yield call(authService.login, action.payload)

        if (res.error) {
            yield put(authError(res.error))
        } else if (res.data) {
            localStorage.setItem('login', JSON.stringify(res.data))
            localStorage.setItem('token', JSON.stringify(res.data.token))
            yield put(authLogin(res.data))
        }
    } catch (error) {

    }
}


function* getWishlist(): any {
    try {
        let res = yield call(wishlistService.getwishlist1)
        //    console.log('res: ' + res)
        if (res.error) {

        } else {
            yield put({ type: GET_WISHLIST })
        }
    } catch (err) { }
}


function logout(): any {
    localStorage.removeItem('login')
    localStorage.removeItem('token')
}

export function* rootAuthSaga() {
    yield takeLatest(GET_WISHLIST, getWishlist)
    yield takeLatest(FETCH_LOGIN, fetchLogin)
    yield takeLatest(AUTH_LOGOUT, logout)
}