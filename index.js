require('dotenv').config()

const express = require('express')
const cors = require('cors');
const mysql = require('mysql2')
const app = express()
const port = 3000

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})

app.use(express.json())
app.use(cors());

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err)
    return
  }
  console.log('Conectado ao banco de dados MySQL!')
})

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`)
})  

app.post('/contatos', (req, res) => {
  const { nome, telefone } = req.body

  if (!nome || !telefone) {
    return res.status(400).json({ erro: 'Nome e telefone são obrigatórios' })
  }

  const nomeValido = nome.split(' ').filter(word => word.length >= 3).length >= 2
  if (!nomeValido) {
    return res.status(400).json({ erro: 'Nome deve ter no mínimo duas palavras com 3 letras cada' })
  }

  const telefoneValido = /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(telefone)
  if (!telefoneValido) {
    return res.status(400).json({ erro: 'Telefone inválido' })
  }

  const sql = 'INSERT INTO contatos (nome, telefone) VALUES (?, ?)'
  db.query(sql, [nome, telefone], (err, result) => {
    if (err) {
      console.error('Erro ao inserir contato:', err)
      return res.status(500).json({ erro: 'Erro ao inserir contato' })
    }

    const contatoCriado = { id: result.insertId, nome, telefone }
    res.status(201).json(contatoCriado)
  })
})

app.get('/contatos', (req, res) => {
  const sql = 'SELECT * FROM contatos'
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar contatos:', err)
      return res.status(500).json({ erro: 'Erro ao buscar contatos' })
    }

    res.status(200).json(results)
  })
})

app.patch('/contatos/:id', (req, res) => {
  const id = req.params.id
  const { nome, telefone } = req.body

  if (!nome || !telefone) {
    return res.status(400).json({ erro: 'Nome e telefone são obrigatórios' })
  }

  const nomeValido = nome.split(' ').filter(word => word.length >= 3).length >= 2
  if (!nomeValido) {
    return res.status(400).json({ erro: 'Nome deve ter no mínimo duas palavras com 3 letras cada' })
  }

  const telefoneValido = /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(telefone)
  if (!telefoneValido) {
    return res.status(400).json({ erro: 'Telefone inválido' })
  }

  const sql = 'UPDATE contatos SET nome = ?, telefone = ? WHERE id = ?'
  db.query(sql, [nome, telefone, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar contato:', err)
      return res.status(500).json({ erro: 'Erro ao atualizar contato' })
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Contato não encontrado' })
    }

    const contatoAtualizado = { id, nome, telefone }
    res.status(200).json(contatoAtualizado)
  })
})

app.delete('/contatos/:id', (req, res) => {
  const id = req.params.id

  const sql = 'DELETE FROM contatos WHERE id = ?'
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir contato:', err)
      return res.status(500).json({ erro: 'Erro ao excluir contato' })
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Contato não encontrado' })
    }

    res.status(204).end()
  })
})