const { fakerPT_BR } = require('@faker-js/faker');
const faker = fakerPT_BR

function createRandomUser() {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    return {
        uuid: faker.string.uuid(),
        name: `${firstName} ${lastName}`,
        email: faker.internet.email({ firstName, lastName }),
        password: "$2b$08$EVCDK6rlfSal2GYRYFueBeiaSz2uHcditU/qCQyA047uqXho0BTP2",
        birthDate: faker.date.birthdate({ min: 1985, max: 2010, mode: "year" })
    };
}

async function runSeed(Student, Course) {
    const countStudents = await Student.findAndCountAll()
    const countCourses = await Course.findAndCountAll()
    if (countCourses.count != 0 || countStudents.count != 0) { return }

    console.log("Running seeds");
    const createdStudents = []
    for (let index = 0; index < 20; index++) {
        createdStudents.push(createRandomUser())
    }

    const createdCourses = [
        {
            uuid: faker.string.uuid(),
            description: "Backend Nível 1",
            courseHours: 10,
            startDate: "06/01/2023",
            finishDate: "07/01/2023"
        },
        {
            uuid: faker.string.uuid(),
            description: "Backend Nível 2",
            courseHours: 12,
            startDate: "07/01/2023",
            finishDate: "08/01/2023"
        },
        {
            uuid: faker.string.uuid(),
            description: "Backend Nível 3",
            courseHours: 14,
            startDate: "09/01/2023",
            finishDate: "10/01/2023"
        },
        {
            uuid: faker.string.uuid(),
            description: "Frontend Nível 1",
            courseHours: 12,
            startDate: "07/01/2023",
            finishDate: "08/01/2023"
        },
        {
            uuid: faker.string.uuid(),
            description: "Frontend Nível 2",
            courseHours: 8,
            startDate: "09/01/2023",
            finishDate: "10/01/2023"
        },
        {
            uuid: faker.string.uuid(),
            description: "Frontend Nível 3",
            courseHours: 16,
            startDate: "10/01/2023",
            finishDate: "11/01/2023"
        },
    ]

    const students = await Student.bulkCreate(createdStudents);
    const courses = await Course.bulkCreate(createdCourses);
    await courses[0].addStudents([
        students[0],
        students[2],
        students[5],
        students[7],
        students[8],
        students[12],
        students[3],
        students[4],
        students[13],
        students[15],
        students[10],
        students[9]
    ])
    await courses[1].addStudents([
        students[0],
        students[2],
        students[5],
        students[7],
        students[8],
        students[12],
        students[3],
        students[4]
    ])
    await courses[2].addStudents([
        students[0],
        students[2],
        students[5],
        students[7]
    ])
    await courses[3].addStudents([
        students[17],
        students[16],
        students[1],
        students[2],
        students[3],
        students[15],
        students[14],
        students[13],
        students[5],
        students[8],
        students[9],
        students[10],
        students[11]
    ]),
        await courses[4].addStudents([
            students[17],
            students[16],
            students[1],
            students[2],
            students[3],
            students[15],
            students[14],
            students[13]
        ]),
        await courses[5].addStudents([
            students[17],
            students[16],
            students[1],
            students[2],
            students[3]
        ])
}

module.exports = runSeed