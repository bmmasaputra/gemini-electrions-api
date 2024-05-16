import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

// Mengambil list company dari database
export async function getCompanyList() {
    const [getCompany] = await pool.query("SELECT DISTINCT company FROM dataset_laptop_new")
    return getCompany.map(data => data.company)
}

const companyList = await getCompanyList()

// Mengambil jumlah model dari setiap company
export async function getNumberOfModels() {
    let numberOfModels = []
    let temp
    
    for (let i = 0; i < companyList.length; i++) {
        const [countModels] = await pool.query("SELECT count(*) AS jumlah_model FROM dataset_laptop_new WHERE company = ?",[companyList[i]])
        temp = countModels.map(model => model.jumlah_model)
        numberOfModels.push(temp)
    }
    
    return numberOfModels.flat()
}

const numberOfModels = await getNumberOfModels()

// console.log(companyList)
// console.log(numberOfModels)