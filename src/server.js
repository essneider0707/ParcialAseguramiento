const express = require('express');
const cors = require('cors');
const path = require('path'); // Asegúrate de importar el módulo 'path'
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/calculate', (req, res) => {
    const { firstOperand, secondOperand, operator } = req.body;

    if (typeof firstOperand !== 'number' || typeof secondOperand !== 'number') {
        return res.status(400).send({ error: 'Operands must be numbers' });
    }

    let result;
    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            if (secondOperand === 0) return res.status(400).send({ error: 'Division by zero' });
            result = firstOperand / secondOperand;
            break;
        default:
            return res.status(400).send({ error: 'Invalid operator' });
    }

    res.send({ result });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
