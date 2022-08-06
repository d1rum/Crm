import Token from './Token';
import AppStorage from "./AppStorage";

class User{
    responseAfterLogin(res){
        const access_token = res.data.access_token
        const user_name = res.data.name
        const user_surname = res.data.surname
        const user_id = res.data.user_id
        const user_email = res.data.email
        const user_phone = res.data.phone
        if(Token.isValid(access_token)){
            AppStorage.store(access_token,user_name,user_surname,user_id,user_email,user_phone)
        }
    }
    hasToken(){
        const storeToken = localStorage.getItem('token');
        if(storeToken){
            return Token.isValid(storeToken)? true : false
        }
        false
    }
    loggedIn(){
        return this.hasToken()
    }
    userName(){
        if(this.loggedIn()) {
            return localStorage.getItem('user_name');
        }
    }
    // userSurname(){
    //     if(this.loggedIn()) {
    //         return localStorage.getItem('user_surname');
    //     }
    // }
    // userEmail(){
    //     if(this.loggedIn()) {
    //         return localStorage.getItem('user_email');
    //     }
    // }
    // userPhone(){
    //     if(this.loggedIn()) {
    //         return localStorage.getItem('user_phone');
    //     }
    // }
    userId(){
        if(this.loggedIn()) {
            return localStorage.getItem('user_id');
        }
    }
    id(){
        if(this.loggedIn()) {
            const payload = Token.payload(localStorage.getItem('token'));
            return payload.sub
        }
        return false
    }
}
// eslint-disable-next-line no-class-assign
export default User = new User();
