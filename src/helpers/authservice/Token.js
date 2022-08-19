class Token{

    isValid(token){
        const payload = this.payload(token)
        if (payload){
            return payload.iss = !!("http://192.168.197.37:8001/api/auth/admin/login" || "http://192.168.197.37:8001/api/auth/admin/register")
            // return payload.iss = "http://127.0.0.1:8000/"
        }
        return false
    }

    payload(token){
        const payload = token.split('.')[1]
        return this.decode(payload)
    }

    decode(payload){
        return JSON.parse(atob(payload))
    }
}

// eslint-disable-next-line no-class-assign
export default Token = new Token();

