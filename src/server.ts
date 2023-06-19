import mongoose from 'mongoose';
import app from './app';
import config from './config/index';

async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`🛢Database is connected successfully`);

    app.listen(config.port, () => {
        console.log(`Application app listening on port ${config.port}`)
      })
  
  } catch (err) {
    console.log('Failed to connect 🛢Database',err)
  }


}
boostrap();

