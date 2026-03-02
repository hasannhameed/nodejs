const {Students, Course} = require('../models/index.js');

const getUser = async (req, res) => {
    try{
        const userid = req.params.id;
        const student = await Students.findByPk(userid, {
            include: Course 
        })
        if(!student){
            return res.status(404).json('student not found');
        }
        res.status(200).json({student});
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}


const getallUsers = async (req,res) => {
    try{
        const StudentsData = await Students.findAll({include: Course});
        res.status(200).json(StudentsData);
    }catch(e){
        res.status(500).json(e.message);
    }
}

const postUser = async (req, res) => {
    try{
        const {name, Courses:CoursesData} = req.body;
        const [student, created] = await Students.findOrCreate({
                    where: { name: name },
                    defaults: { name: name }
                });
        if(CoursesData && CoursesData.length > 0 ){
            for(const c of CoursesData){
                const [course] = await Course.findOrCreate({
                    where:{name:c.name},
                    default:{name:c.name}
                });
                await student.addCourse(courseName)
            }
        }

        const updatedStudents = await Students.findByPk(student.id, {
            include: Course
        });
        res.status(200).json(updatedStudents);
    }catch(e){
        res.status(500).json(e.message);
    }
}

const putUser = async (req, res) => {
    try{
        const userId = req.params.id;
        const data = req.body;
        const updatedRows = await Students.update(data,{
            where: { id: userId }
        },{include:Course});
        if (updatedRows === 0) {
            return res.status(404).json({ message: "User not found or no changes made" });
        }
        res.status(200).json({ message: "User updated successfully" });
    }catch(e){
        res.status(500).json({ error: e.message });
    }
}

const deleteUser = async (req, res) => {
    try{
        const id = req.params.id;
        const deletedRows = await Students.destroy({
            where: { id: id }
        },{include:Course});
        if (deletedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    }catch(e){
        res.status(500).json(e.message)
    }
}

const deleteAllUser = async (req, res) => {
    try{
        const deletedRows = await Students.destroy({
            where: {}, 
            truncate: false
        });
        if (deletedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    }catch(e){
        res.status(500).json(e.message)
    }
}

const getallCourse = async (req, res) => {
    try{
        const CourseData = await  Course.findAll({include:Students})
        res.status(200).json(CourseData);
    }catch(error){
        return res.status(200).json({"Error":error.message});
    }
}

const getCourse = async (req, res) => {
    try{
        const courseId = req.params.id;
        const course = await  Course.findByPk(courseId,{where:{id:courseId}},{include:Students});
        res.status(200).json(course);
    }catch(error){
        return res.status(200).json({"Error":error.message});
    }
}

const postCourse = async (req, res) => {
    try {
        const { name, Students: studentData } = req.body;

        const [course, created] = await Course.findOrCreate({
            where: { name: name },
            defaults: { name: name }
        });

        if (studentData && studentData.length > 0) {
            for (const s of studentData) {
                const [student] = await Students.findOrCreate({
                    where: { name: s.name },
                    defaults: { name: s.name }
                });
                await course.addStudent(student);
            }
        }
        const updatedCourse = await Course.findByPk(course.id, {
            include: Students
        });
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
}

const deleteCourse = async (req, res) => {
    try{
        const courseId = req.params.id;
        const affectedRows = await Course.destroy({
            where: { id: courseId }
        });
        if(affectedRows ==0){
            return res.status(500).json({"error":"User not deleted"});
        }
        res.status(200).json({"success":"User deleted"});
    }catch(error){
        return res.status(200).json({"Error":error.message});
    }
}

const deleteAllCourse = async (req, res) => {
    try{
        const affectedRows = await  Course.destroy(
        {
            where: {}, 
            truncate: false
        });
        if(affectedRows ==0){
            return res.status(500).json({"error":"User not deleted"});
        }
        res.status(200).json({"success":"All Users deleted"});
    }catch(error){
        return res.status(200).json({"Error":error.message});
    }
}

const putCourse = async (req, res) => {
    try{
        const courseId = req.params.id;
        const data = req.body;
        const affectedrows = await Course.update(data,{where:{id:courseId}},{include:Course});
        if(affectedRows==0){
            return res.status(500).json({"Error":"Course Details Not Updated"});
        }
        res.status(200).json(affectedRows);
    }catch(error){
        return res.status(200).json({"Error":error.message});
    }
}

module.exports = {
    getallUsers,
    getUser,
    postUser,
    deleteUser,
    deleteAllUser,
    putUser,
    getallCourse,
    getCourse,
    postCourse,
    deleteCourse,
    deleteAllCourse,
    putCourse
};