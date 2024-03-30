import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
  MONGO_USER:get('MONGO_USER').required().asString(),
  MONGO_PASS:get('MONGO_PASS').required().asString(),
  SEED_JWT:get('SEED_JWT').required().asString(),
  MAILER_SERVICE:get('MAILER_SERVICE').required().asString(),
  MAILER_EMAIL:get('MAILER_EMAIL').required().asString(), 
  MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
  WEBSERVICE_URL:get('WEBSERVICE_URL').required().asString(),
  SEND_EMAIL: get('SEND_EMAIL').default('false').asBool(),

}



