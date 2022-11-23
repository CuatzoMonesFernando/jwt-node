import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'

import pkg from '../package.json'
import routesApi from './routes'

import { createRoles, createAdmin} from "./libs/initialSetup"

const app = express();
createRoles();
createAdmin();

// Settings
app.set("pkg", pkg);
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

// Middlewares
const corsOptions = {
  // origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(helmet());

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json({
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  })
})

app.use(routesApi)

export default app
