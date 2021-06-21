import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      'mongodb+srv://Maithili23:Siddha97@cloudrsa.xkgfc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true
      }
    );

    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
