import cron from "node-cron"


const checkMedicalExaminations = () =>{
    console.log('name')
}

const cronSchedule = "* /5 * * * *";

cron.schedule(cronSchedule, checkMedicalExaminations)