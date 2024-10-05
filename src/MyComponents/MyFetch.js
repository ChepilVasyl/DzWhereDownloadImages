export default (url) =>
{
    return fetch("http://localhost:5220/"+url)
        .then(res =>
        {
            if (!res.ok)
                throw new Error("Помилка в MyFetch")
            return res.json()
        })
        .catch(err=>
        {
            console.log(err)
            throw err
        })
}