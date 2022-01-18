
//for sorting in  ascending
router.get('/ascending=:Field', async (req,res) => {
    try{
        const Field = req.params.Field;
        if(Field === 1){
            const user = await User.aggregate([
                {
                    $sort: {
                        fname: 1   
                    }
                }    
            ])
            res.send(user);
        }
        else if(Field === 3){
            const user = await User.aggregate([
                {
                    $sort: {
                        company: 1   
                    }
                }    
            ])
            res.send(user);
        }
        else if(Field === 2){
            const user = await User.aggregate([
                {
                    $sort: {
                        lname: 1   
                    }
                }    
            ])
            res.send(user); 
        }   
    }
    catch(err){
        res.status(500).send(err); 
    }
})

//for sorting in descending
router.get('/descending=:Field', async (req,res) => {
    try{
        const Field = req.params.Field;
        console.log("Field:", Field)
        if(Field === 1){
            const user = await User.aggregate([
                {
                    $sort: {
                        fname: -1   
                    }
                }    
            ])
            res.send(user);
        }
        else if(Field === 3){
            const user = await User.aggregate([
                {
                    $sort: {
                        company: -1   
                    }
                }    
            ])
            res.send(user);
        }
        else if(Field === 2){
            const user = await User.aggregate([
                {
                    $sort: {
                        lname: -1   
                    }
                }    
            ])
            res.send(user); 
        }   
    }
    catch(err){
        res.status(500).send(err); 
    }
})