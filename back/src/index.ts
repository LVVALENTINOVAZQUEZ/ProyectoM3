import server from "./server";
import {PORT} from "./Config/envs"

server.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`)  
})