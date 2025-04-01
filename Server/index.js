const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

let conn = null;

const initMySQL = async () => {
    try {
        conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'webdb',
            port: 8830
        });
        console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
    }
};

const validateData = (userData) => {
    let errors = [];
    if (!userData.IDTable) errors.push('กรุณาใส่ไอดีโต๊ะ');
    if (!userData.Number) errors.push('กรุณาใส่จำนวนโต๊ะ');
    if (!userData.Date ) errors.push('กรุณาใส่วันที่');
    
    return errors;
};

app.get('/Bleta', async (req, res) => {
    try {
        const [results] = await conn.query('SELECT * FROM Bleta');
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', errorMessage: error.message });
    }
});

app.post('/Bleta', async (req, res) => {
    try {
        if (!conn) return res.status(500).json({ message: 'Database ยังไม่ได้เชื่อมต่อ' });

        let user = req.body;
        const errors = validateData(user);
        if (errors.length > 0) return res.status(400).json({ message: 'ข้อมูลไม่ครบถ้วน', errors });
        
        const [results] = await conn.query(
            'INSERT INTO Bleta set ?' 
            ,user
        );

        res.status(201).json({ message: 'สร้างผู้ใช้สำเร็จ', userId: results.insertId });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', errorMessage: error.message });
    }
});

app.put('/Bleta/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ message: 'ID ไม่ถูกต้อง' });

        const updateUser = req.body;
        const [results] = await conn.query('UPDATE Bleta SET ? WHERE IDTable = ?', [updateUser, id]);

        if (results.affectedRows === 0) return res.status(404).json({ message: 'ไม่พบผู้ใช้' });

        res.json({ message: 'อัปเดตสำเร็จ' });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', errorMessage: error.message });
    }
});

app.delete('/Bleta/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ message: 'ID ไม่ถูกต้อง' });

        const [results] = await conn.query('DELETE FROM Bleta WHERE IDTable = ?', [id]);
        if (results.affectedRows === 0) return res.status(404).json({ message: 'ไม่พบผู้ใช้' });

        res.json({ message: 'ลบสำเร็จ' });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', errorMessage: error.message });
    }
});


app.get('/Chairs', async (req, res) => {
    try {
        const [results] = await conn.query('SELECT * FROM Chairs');
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', errorMessage: error.message });
    }
});

app.get('/Computers', async (req, res) => {
    try {
        const [results] = await conn.query('SELECT * FROM Computers');
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', errorMessage: error.message });
    }
});

app.get('/Papers', async (req, res) => {
    try {
        const [results] = await conn.query('SELECT * FROM Papers');
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', errorMessage: error.message });
    }
});

app.get('/Hydra', async (req, res) => {
    try {
        const [results] = await conn.query('SELECT * FROM Hydra');
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', errorMessage: error.message });
    }
});

app.get('/Notebooks', async (req, res) => {
    try {
        const [results] = await conn.query('SELECT * FROM Notebooks');
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', errorMessage: error.message });
    }
});







app.listen(port, async () => {
    await initMySQL();
    console.log(' Server is running on port ' + port);
});
