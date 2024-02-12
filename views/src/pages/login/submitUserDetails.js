
const submitUserDetails = async (user) => {
    const data = JSON.stringify(user);

    try {       
        const res = await fetch("https://myntra-vzgy.onrender.com/user/login", {
            method: "POST",
            headers: {
                "Content-type": "Application/json"
            },
            body: data
        });
        const response = await res.json();
        return response;       
    } catch (error) {
        console.log(error);
        return error
    }
}

export default submitUserDetails;