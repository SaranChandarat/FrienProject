const base = "http://localhost:8000"
const IDTable = document.getElementById("tableId")
const number = document.getElementById("quantity")
const date = document.getElementById("borrowTime")
const doro = document.getElementById("confirmBorrow")
const touo = document.getElementById("honn")
const youi = document.getElementById("dataTable")

doro.addEventListener("click", async () => {
    let Uioi= {
        IDTable: IDTable.value,
        Number: number.value,
        Date: date.value
    } 
    console.log(Uioi)
    const response = await axios.post(`${base}/Bleta`, Uioi)
})
