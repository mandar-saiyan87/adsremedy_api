import mongoose from 'mongoose'
const mongoDBURI = `mongodb+srv://adsremedyDBAdmin:sQfHMr8Z4fe9Oo0B@cluster0.h5b5pkb.mongodb.net/adsremedyDB?retryWrites=true&w=majority&appName=Cluster0`

async function connectMongo() {
  try {
    await mongoose.connect(mongoDBURI)
    console.log(`adsremedyDB connected`)
  } catch (error) {
    console.log(error)
  }
}

export default connectMongo