const Student = require('./models/student.js');

async function runCrud(){
    try{

        //insert
        const newStudent = await Student.create({
            name:'hasasn',
            email: 'hasasn@gmail.com',
            age:16
        })

        console.log('data inserted', newStudent.toJSON());

        //read
        const allStudents = await Student.findAll();
        console.log('all student', JSON.stringify(allStudents));

        const foundStudent = await Student.findByPk(newStudent.id);
        console.log('read : (BY ID):', foundStudent.name);

        //update
        await Student.update(
            {
                age:24
            },
            {
            where: {
                id:newStudent.id
                }
            }
        )

        console.log('update : student name updated 24')

        await Student.destroy({
            where:{
                id:newStudent.id
            }
        })

        
        console.log('deleted : student with id ',newStudent.id)

        //delete
        const deleteStudent = await Student.destroy({where:{
            id:newStudent.id
        }})

        if(deleteStudent > 0){
            console.log('this has been deleted successfully');
        }else{
            console.log('Something went wrong');
        }
        
    }catch(error){
        console.log(error);
    }
}

runCrud();