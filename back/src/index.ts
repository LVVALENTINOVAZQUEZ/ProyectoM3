import server from "./server";
import {PORT} from "./Config/envs"
import "reflect-metadata"
import { AppDataSource } from "./Config/data-source";

AppDataSource.initialize()
.then(() => {
    console.log('DB connection successful');
        server.listen(PORT, () => {
            console.log(`Server listen on port ${PORT}`)  
        })
    })
    .catch((err) => {

    console.log("Error: ", err)

    });