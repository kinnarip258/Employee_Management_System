//for pagination //authenticate ,
router.get('/getUsers/page=:page', authenticate , async (req,res) => {
    try{
        let page = req.params.page;
       
        const users = await User.aggregate([
            {
                $skip: (page-1) * 10 
            },
            {
                $limit: 10  
            }, 
        ])
        
        res.send(users)
    }
    catch(err) {
        console.log("error: ", err);
        res.send("error" + err);
    }
})

//for searchEmployee
router.get('/searchuser=:Employee', async (req,res) => {
    try{
        const searchUser = req.params.Employee
        
        const Employee = await User.aggregate([
            {
                $match: {
                    $or: [
                        { fname: new RegExp(searchUser, 'i')},
                        { company: new RegExp(searchUser, 'i')},
                        {salary1: parseInt(searchUser)},
                        {salary2: parseInt(searchUser)},
                        {salary3: parseInt(searchUser)}
                    ]
                }
            }
        ])
        res.status(200).send(Employee);
    }
    catch(err){
        res.status(500).send(err);
    }
})

//for sorting in  ascending
router.get('/ascending', async (req,res) => {
    try{
        const user = await User.aggregate([
            {
                $sort: {
                    fname: 1   
                }
            }    
        ])
        res.send(user);
       
    }
    catch(err){
        res.status(500).send(err); 
    }
})

//for sorting in descending
router.get('/descending', async (req,res) => {
    try{
        
        const user = await User.aggregate([
            {
                $sort: {
                    fname: -1   
                }
            }    
        ])
        res.send(user);    
    }
    catch(err){
        res.status(500).send(err); 
    }
})


//all in one api
//authenticate, 
router.get('/getUser/page=:page/:Request', async (req,res) => {
    try{
        let page = req.params.page;
        let skip = (page-1) * 10;

        //total pages
        const total = await User.countDocuments({});
        let totalPage = Math.ceil(total/10);


        //sorting in ascending order
        if(req.params.Request === "ascending"){
            const users = await User.aggregate([
                {
                    $sort: {
                        fname: 1
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: 10  
                },
        
            ])
            res.send({users, totalPage})
        }
        //sorting in descending order
        else if(req.params.Request === "descending"){
            const users = await User.aggregate([
                {
                    $sort: {
                        fname: -1
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: 10  
                },
                 
            ])

            res.send({users, totalPage})
        }
        //get all employees data in created by order
        else if (req.params.Request === "all"){
            
            const users = await User.aggregate([
                {
                    $skip: skip 
                },
                {
                    $limit: 10  
                }, 
            ])
            
            res.send({users, totalPage})
        }
        //search employees
        else {
            const searchUser = req.params.Request
            const users = await User.aggregate([
                {
                    $match: {
                        $or: [
                            { fname: new RegExp(searchUser, 'i')},
                            { company: new RegExp(searchUser, 'i')},
                            {salary1: parseInt(searchUser)},
                            {salary2: parseInt(searchUser)},
                            {salary3: parseInt(searchUser)}
                        ]
                    }
                },
                
                {
                    $skip: skip
                },
                {
                    $limit: 10  
                },
                   
            ])
            res.send({users, totalPage})
        }

    }
    catch(err){
        res.status(500).send(err);
    }
})
