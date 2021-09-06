import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../', '.env') });

import app from './Server';
import logger from './services/Logger';
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
