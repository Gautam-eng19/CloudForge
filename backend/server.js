const express = require("express"); 
const app = express();
const projects = [];

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("<h1>CLOUDFORGE</h1>")
})

app.get("/api/health",(req, res) =>{
    res.json({
        status: "ok"
    });
});

app.post("/api/projects",(req,res)=>{
    const project = {
        id : projects.length + 1,
        name : req.body.name,
        repo_url : req.body.repo_url
    }

    projects.push(project);

    res.status(201).json(project);
})

app.get("/api/projects",(req, res) =>{
    res.json(projects);
});

app.get("/api/projects/:id",(req,res)=>{
    const id = Number(req.params.id);

    const project = projects.find(project => project.id === id);
    if(!project){
        return res.status(404).json({
            message:"PROJECT NOT FOUND"
        })
    }
    res.json(project);
});

app.put("/api/projects/:id",(req,res)=>{
    const id = Number(req.params.id);

    const project = projects.find(project => project.id === id);
    if(!project){
        return res.status(404).json({
            message:"PROJECT NOT FOUND"
        })
    }
    project.name = req.body.name;
    project.repo_url = req.body.repo_url;

    res.json(project);
});

app.delete("/api/projects/:id",(req,res)=>{
    const id = Number(req.params.id);

    const index = projects.findIndex(project => project.id === id );
    if(index===-1){
        return res.status(404).json({
            message:"PROJECT NOT FOUND"
        })
    }

    const deletedProject = projects.splice(index,1);
    res.json({
        message:"PROJECT DELETED",
        Project: deletedProject[0]
    });
});

app.listen(3000,()=>{
    console.log("CloudForge backend running on port 3000");
});
