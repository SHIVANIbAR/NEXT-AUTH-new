import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { request } from "http";
import { NextResponse } from "next/server";
import * as z from "zod"
//DEFINE schema for input 
const userSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    
  })
  


export async function POST(req: Request) {
  // return NextResponse.json({success:true})
  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);
    //check if email alredy access
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }
    //check if username alredy access
    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: "User with this usename already exists" },
        { status: 409 }
      );
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const {password:newUserPassword, ...rest}=newUser;
    return NextResponse.json(
      { user: rest, message: "user created a sucessfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
        { message: "SOMETHING WENT WRONG" },
        { status: 500 }
      );
  }
}
