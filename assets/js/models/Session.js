export class Session
{

    get(key)
    {
        const value = sessionStorage.getItem(key)
        if(value === false) return false
        return JSON.parse(value);
    }

    set(key, value)
    {
        return sessionStorage.setItem(key, JSON.stringify(value));
    }

    remove(key)
    {
        return sessionStorage.removeItem(key);
    }

    clear()
    {
        console.log('clearing session')
        return sessionStorage.clear();
    }

    hasPermission(perm)
    {
        const user = this.get('user')
        if(user === false) return false
        return user.permissions.includes(perm)
    }

}