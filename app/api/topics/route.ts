import client from '@/lib/appwrite';
import { Databases, ID, Query } from 'appwrite';
import { NextResponse } from 'next/server';

const database = new Databases(client)

async function createTopic(data: {term: string, description: string}) {

  try{
    const response = await database.createDocument(
      process.env.NEXT_PUBLIC_DB_ID!,
      '66aa4ef900118b802d7e',
      ID.unique(),
      data
    )
    return response;
  } catch (error) {
    console.log('error creating topic', error)
    throw new Error('Error creating topic')
  }
}

async function getTopics() {
  console.log(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)

  try{
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_DB_ID!,
      '66aa4ef900118b802d7e',
      [Query.orderDesc("$createdAt")]
    )
    return response.documents;
  } catch (error) {
    console.log('Error getting topics', error)
    throw new Error('Error getting topics')
  }
}

export async function POST(req: Request){
  try{
    const {term, description} = await req.json()
    const data = {term, description}
    const response = await createTopic(data)
    return NextResponse.json({message: 'Topic created successfully', data: response})
  } catch (error) {
    console.log('Error creating topic', error)
    return NextResponse.json({message: 'Error creating topic', error: error}, {status: 500})
  }
}

export async function GET(){
  try{
    const response = await getTopics()
    return NextResponse.json({message: 'Topics retrieved successfully', data: response})
  } catch (error) {
    console.log('Error getting topics', error)
    return NextResponse.json({message: 'Error getting topics', error: error}, {status: 500})
  }
}