import { Document, model, Schema } from 'mongoose';

interface IDashboard extends Document {
  Hero: string;
  AboutUs: string;
  coreDescription: string;
  hiredescription: string;
  namedescription: string;
  conectdescription: string;
}

const DashboardSchema = new Schema<IDashboard>({
  Hero: { type: String, default: '' },
  AboutUs: { type: String, default: '' },
  coreDescription: { type: String, default: '' },
  hiredescription: { type: String, default: '' },
  namedescription: { type: String, default: '' },
  conectdescription: { type: String, default: '' }
}, { timestamps: true });

export default model<IDashboard>('Dashboard', DashboardSchema);
export { IDashboard };