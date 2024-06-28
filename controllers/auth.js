const express = require('express');
const bcrypt = require('bcryptjs')
const User = require('../models/User');
const {generateJWT} = require('../helpers/jwt');

const createUser = async(req, res= express.response) => {

  const { email, password } = req.body;

  try {

    let user = await User.findOne({ email: email})

    if(user) {
      return res.status(400).json({
        ok: false,
        msg: 'Un usuario ya existe con ese correo'
      })
    }

    user = new User(req.body);

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    //Generar JWT
    const token = await generateJWT(user.id, user.name);
  
    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator'
    })
  }

};

const loginUser = async(req, res= express.response) => {

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email})

    if(!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario o contraseña incorrectos'
      })
    }

    //confirmar los passwords
    const validPassword = bcrypt.compareSync(password, user.password);

    if(!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto'
      })
    }

    //Generar JWT
    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator'
    })
  }

};

const renewToken = async(req, res = express.response) => {

  const {uid, name} = req;

  //Generar un nuevo JWT y retornarlo en esta petición
  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    token
  })
};

module.exports = {
  createUser,
  loginUser,
  renewToken
};