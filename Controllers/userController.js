import bcrypt from 'bcrypt'
import { User } from '../Models/User.js';
import jwt from 'jsonwebtoken';

export const register = async (req,res)=>{

  const {name,email,password} = req.body;

  if(name == "" || email == "" || password == "")
    return res.json({message : "All fields must be filled"});

  let user = await User.findOne({email});
  if(user)
    return res.json({message : "User already exists...", success : false });


  // Bcrypt is a password hashing algorithm used to securely convert plain-text passwords into a hashed (encrypted) form that is difficult for attackers to    reverse-engineer. It is specifically designed for storing passwords in a way that enhances security. To store manogodb username and password and other passwords in forms we use bcrypt to store in such a way that it wont be visible to other users means it is encrypted. use npm i bcrypt

  // before storing the password we have to encrypt it.

  const hashPassword = await bcrypt.hash(password,10);

  user = await User.create({name,email,password : hashPassword})
    

  res.json({ message : "user created successfully",
    success : true,
    user})

}

export const login = async (req,res) =>{

  const {email,password} = req.body;

  if(email == "" || password == "")
    return res.json({message : "All fields must be filled"});

  let user = await User.findOne({email});
  if(!user)
    return res.json({message : "User not exists...", success : false });

  const validPassword = await bcrypt.compare(password,user.password);

  if(!validPassword)
    return res.json({message : "Invalid Password...", success : false})

  const token = jwt.sign({userId : user._id}, process.env.JWT)

  res.json({message : `Welcom ${user.name}`, token, success : true})
}