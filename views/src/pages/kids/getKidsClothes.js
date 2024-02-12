

const getKidsClothes = async () => {
    const token = localStorage.getItem("token");

    try {       
        const res = await fetch(`https://myntra-vzgy.onrender.com/products/kids`, {
            method: "GET",
            headers: {
                "Authorization": token
            },
        });
        const response = await res.json();
        return response;       
    } catch (error) {
        console.log(error);
        return error
    }
}

export default getKidsClothes;