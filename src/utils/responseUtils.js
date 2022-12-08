import res from "express/lib/response.js";


export function dbRequest(recebendor) {
    try {
        recebendor();
    } catch (ex) {
        console.log(ex);
        res.status(400).json({erro: `${ex}`});
    }
}
