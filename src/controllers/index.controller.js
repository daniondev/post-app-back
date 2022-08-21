const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'dw4444',
    database: 'postdb',
    port: '5432'
}) 

const readPosts = async (req, res) => {
    const strQuery = `SELECT id, nombre, descripcion 
                    FROM post 
                    WHERE activo = TRUE`

    const response = await pool.query(strQuery)

    res.status(200).json(response.rows)
}

const createPost = async (req, res) => {
    const { nombre, descripcion } = req.body

    if(nombre == ''){
        res.status(400).json({message : 'El nombre no puede ser vacio'})
        return false;
    }

    if(descripcion == ''){
        res.status(400).json({message : 'La descripción no puede ser vacia'})
        return false;
    }

    const strQuery = `INSERT INTO post (nombre, descripcion) 
                    VALUES ($1, $2)`

    await pool.query(strQuery, [nombre, descripcion])
    
    res.status(200).json({
        message: 'Post Agregado Correctamente',
        body: req.body
    })
}

const deletePost = async (req, res) => {
    const id = req.params.id

    if(isNaN(parseInt(id))){
        res.status(400).json({message : 'El id debe ser un número'})
        return false;
    }

    // Eliminado Lógico
    const strQuery = `UPDATE post  
                    SET activo = false
                    WHERE id = $1`

    await pool.query(strQuery, [id])

    res.status(200).json({
        message: 'Post Eliminado Correctamente',
        body: req.body
    })
}

module.exports = {
    readPosts,
    createPost,
    deletePost
}