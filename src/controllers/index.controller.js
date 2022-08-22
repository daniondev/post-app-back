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

    let response = {
        isValid: false
    }

    if(nombre == ''){
        response.message = 'El nombre no puede ser vacio';
        res.status(200).json(response)
        return false;
    }

    if(descripcion == ''){
        response.message = 'La descripción no puede ser vacia';
        res.status(200).json(response)
        return false;
    }

    const strQuery = `INSERT INTO post (nombre, descripcion) 
                    VALUES ($1, $2) RETURNING id `

    const resQuery = await pool.query(strQuery, [nombre, descripcion])
    
    req.body.id = resQuery.rows.at(0).id;
    response.isValid = true;
    response.message = 'Post Agregado Correctamente'
    response.body = req.body

    res.status(200).json(response)
}

const deletePost = async (req, res) => {
    const id = req.params.id

    let response = {
        isValid: false
    }

    if(isNaN(parseInt(id))){
        response.message = 'El id debe ser un número';
        res.status(400).json(response)
        return false;
    }

    //TODO: Buscar si el id existe

    // Eliminado Lógico
    const strQuery = `UPDATE post  
                    SET activo = false
                    WHERE id = $1`

    await pool.query(strQuery, [id])

    response.isValid = true;
    response.message = 'Post Eliminado Correctamente';
    response.body = req.body;

    res.status(200).json(response)
}

const readsPosts = async (req, res) => {
    const limit = req.params.limit
    const offset = req.params.offset

    const strQuery = `SELECT id, nombre, descripcion 
                    FROM post 
                    WHERE activo = TRUE 
                    LIMIT ${limit} 
                    OFFSET ${offset} `

    const response = await pool.query(strQuery)

    res.status(200).json(response.rows)
}

module.exports = {
    readPosts,
    createPost,
    deletePost,
    readsPosts
}