import express from "express";
import Emp from '../Models/EmpModel.js'



const empRouter = express.Router();



//Dashboard 

empRouter.get(
  '/summary',
  async(req, res) => {

    try {

      const emp = await Emp.aggregate([

        { 
          $group : { 
            _id : null, 
            numEmp : { $sum : 1 } 
          } 
        }

      ]);


      const ageCategories = await Emp.aggregate([

        {
          "$group": {
              "_id": {
                  "$concat": [
                      { "$cond": [ { "$and": [ { "$gte": ["$age", 18] }, { "$lte": ["$age", 25] } ]}, "18 - 25", ""] },
                      { "$cond": [ { "$and": [ { "$gte": ["$age", 26] }, { "$lte": ["$age", 30] } ]}, "26 - 30", ""] },
                      { "$cond": [ { "$and": [ { "$gte": ["$age", 31] }, { "$lte": ["$age", 35] } ]}, "31 - 35", ""] },
                      { "$cond": [ { "$and": [ { "$gte": ["$age", 36] }, { "$lte": ["$age", 40] } ]}, "36 - 40", ""] },
                      { "$cond": [ { "$and": [ { "$gte": ["$age", 41] }, { "$lte": ["$age", 45] } ]}, "41 - 45", ""] },
                      { "$cond": [ { "$and": [ { "$gte": ["$age", 46] }, { "$lte": ["$age", 50] } ]}, "46 - 50", ""] },
                      { "$cond": [ { "$and": [ { "$gte": ["$age", 51] }, { "$lte": ["$age", 55] } ]}, "51 - 55", ""] },
                      { "$cond": [ { "$and": [ { "$gte": ["$age", 56] }, { "$lte": ["$age", 60] } ]}, "56 - 60", ""] },
                      { "$cond": [ { "$gte": [ "$age", 61 ] }, "Over 60", ""] }
                  ]
              },
              "countAge": { "$sum": 1 }
          }
      },

      { $sort: { _id: 1 } },
        
     

    ]);


      const departmentCategories = await Emp.aggregate([
        {
          $group: {
            _id: '$department',
            countDepartment: { $sum: 1 },
          },
        },
      ]);


      const statusCategories = await Emp.aggregate([
        {
          $group: {
            _id: '$status',
            countStatus: { $sum: 1 },
          },
        },
      ]);

    

      res.send({emp, ageCategories, departmentCategories, statusCategories});

    }

    catch(err) {
      console.log(err);
    }

  }
);



//Get all users

empRouter.get(
  '/',

  async (req, res) => {

    try {

        const emp = await Emp.find({});

        res.send(emp);

    }

    catch(err) {
        console.log(err);
    }

  }
);



// Create a new user

empRouter.post(
    '/',
    async (req, res) => {
  
      try {
  
          const newEmp = new Emp({
            fullName: req.body.fullName,
            completeAddress: req.body.completeAddress,
            mapAddress: req.body.mapAddress,
            age: req.body.age,
            department: req.body.department,
            status: req.body.status
          });

          const emp = await newEmp.save();

          res.send({ message: 'New employee created', emp });

      }
  
      catch (err) {
          console.log(err);
      }
  
    }
  );



//Get a specific user

empRouter.get(
  '/:id',
  async (req, res) => {

    try {

        const emp = await Emp.findById(req.params.id);
 
        if(emp) {
        res.send(emp);
        }

        else {
        res.status(404).send({message: 'emp not found'});
        }

    }

    catch (err) {
        console.log(err);
    }

  }
);






//Update a specific user

empRouter.put(
  '/:id',

  async(req, res) => {

    try {

        const emp = await Emp.findById(req.params.id);

        if(emp) {

        emp.fullName = req.body.fullName || emp.fullName;
        emp.completeAddress = req.body.completeAddress || emp.completeAddress;
        emp.mapAddress = req.body.mapAddress || emp.mapAddress,
        emp.age = req.body.age || emp.age;
        emp.department = req.body.department || emp.department;
        emp.status = req.body.status || emp.status;

        const updatedEmp = await emp.save();

        res.send({message: 'emp updated', emp: updatedEmp});

        }

        else {

        res.status(404).send({message: 'emp not found'});

        }
    }
    
    catch (err) {
        console.log(err);
    }

  }
);


//Delete specific users

empRouter.delete(
  '/:id',
  async (req, res) => {

    try {

        const emp = await Emp.findById(req.params.id);

        if (emp) {
          await emp.deleteOne();
          res.send({message: 'emp is deleted'});
        }
    
        else {
          res.status(404).send({message: 'emp not found'});
        }
    }

    catch (err) {
        console.log(err);
    }
  }

);





export default empRouter;