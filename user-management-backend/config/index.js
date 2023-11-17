import dotenv from 'dotenv'

dotenv.config()

const config = {
    MONGO_DB_URL: process.env.MONGO_DB_URL,
    LOCAL_DEV: process.env.LOCAL_DEV,
    DB_NAME: process.env.DB_NAME, 
    IMAGE_BUCKET: process.env.IMAGE_BUCKET
}

export default config