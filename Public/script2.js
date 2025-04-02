const base = "http://localhost:8000"
const IDChair  = document.getElementById("tableId")
const number = document.getElementById("quantity")
const date = document.getElementById("borrowTime")
const doro = document.getElementById("confirmBorrow")

doro.addEventListener("click", async () => {
    let Uioi= {
        IDChair: IDChair.value,
        Number: number.value,
        Date: date.value
    } 
    console.log(Uioi)
    const response = await axios.post(`${base}/Chairs`, Uioi)
})


