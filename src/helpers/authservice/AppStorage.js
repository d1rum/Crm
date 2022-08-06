class AppStorage{
    storeToken(token){
        localStorage.setItem('token',token);
    }
    storeUserName(user_name){
        localStorage.setItem('user_name',user_name);
    }
    storeUserSurname(user_surname){
        localStorage.setItem('user_surname',user_surname)
    }
    storeUserId(user_id){
        localStorage.setItem('user_id',user_id)
    }
    storeUserEmail(user_email){
        localStorage.setItem('user_email',user_email)
    }
    storeUserPhone(user_phone){
        localStorage.setItem('user_phone',user_phone)
    }
    store(token,user_name,user_surname,user_id,user_email,user_phone){
        this.storeToken(token)
        this.storeUserName(user_name)
        this.storeUserSurname(user_surname)
        this.storeUserId(user_id)
        this.storeUserEmail(user_email)
        this.storeUserPhone(user_phone)
    }
    clear(){
        localStorage.removeItem('token')
        localStorage.removeItem('user_name')
    }
    // getToken(){
    //     localStorage.getItem(token);
    // }
    // getUserName(){
    //     localStorage.getItem(user_name);
    // }
    // getUserSurname(){
    //     localStorage.getItem(user_surname);
    // }
    // getUserId(){
    //     localStorage.getItem(user_id);
    // }
    // getUserEmail(){
    //     localStorage.getItem(user_email);
    // }
    // getUserPhone(){
    //     localStorage.getItem(user_phone);
    // }
}
// eslint-disable-next-line no-class-assign
export default AppStorage = new AppStorage();
