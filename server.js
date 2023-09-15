const express = require ('express');
const app = express();
const Joi = require('@hapi/joi'); //schema validation

app.use(express.json());

// create a JSON data array

const employee =[
    {
        id:1,
        name:"selva",
        address:"dharmapuri",
        mobileno: "8778376526",
    },
    {
        id:2,
        name:"ganapathi",
        address:"bangalore",
        mobileno:"098765342",
    },
    {
        id:3,
        name:"Rahul",
        address:"salem",
        mobileno:"098765432",
    }, 
];

app.get('/',(req,res)=>{
    res.send('Helllo world');
});

//GET all employee details
app.get('/api/employee', (req,res)=> {
    res.send(employee);
    });

//GET ----(READ)a single ID Request
app.get('/api/employee/:id', (req, res) => {
    const employe = employee.find(e => e.id === parseInt(req.params.id));
     
    if (!employe) res.status(404).send('Not valid Employee ID!');
    res.send(employe);
    });
//POST ---(CREATE) a new employee Request     
app.post('/api/employee',(req,res) =>{
    const { error } = validateEmploye(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const employe={
        id:employee.length +1,
        name: req.body.name,
        address:req.body.address,
        mobileno:req.body.mobileno,
    };
    employee.push(employe);
    res.send(employee);

});

//server
const port = process.env.PORT || 3000;
app.listen(3000,()=>console.log('listening ${port}...'));

//schema validation
function validateEmploye(employe){
    const schema = {
        name : Joi.string().min(3).required(),
        address:Joi.string().required(),
        mobileno:Joi.string().min(10).max(12).required()
    };
    return Joi.validate(employe,schema);
}

//PUT ---(UPDATE) a employee identified by the EmployeeId in the Request
app.put('/api/employee/:id',(req,res)=>{
    const employe = employee.find(e => e.id === parseInt(req.params.id));
    if(!employe)
 res.status(404).send('The Employee with the given ID was not found');
    // const result = validateEmploye(req.body);
    const {error} = validateEmploye(req.body);
    if(error){ 
        res.status(400).send(error.details[0].message);
        return;
    }
        employe.name= req.body.name;
        // employe.designation = req.body.designation;
        employe.address = req.body.address; 
        employe.mobileno =req.body.mobileno;
        // employe.pincode = req.body.pincode;
        res.send(employe);
    }
);
//DELETE a employee with the specified EmployeeId in the Request
app.delete('/api/employee/:id',(req,res) =>{
    
    const employe = employee.find(e => e.id === parseInt(req.params.id));
        if(!employe) return  res.status(404).send('The Employee with the given ID was not found');
      
        const index = employee.indexOf(employe);
        employee.splice(index,1);
        res.send(employe); 
})



// app.get('/api/employee/:id',(req,res) => {
//     const employe = employee.find(e => e.id === parseInt(req.params.id));
//     if(!employe) return res.status(404).send('The Employee with the given ID was not found');
//     res.send(employe);
// }); 



