import express from "express";
import {updatetask} from"../../controller/employee/updatetask.js";
const router = express.Router();

router.put('/updatetask/:taskId',updatetask )

export default router;