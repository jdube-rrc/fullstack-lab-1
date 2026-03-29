import { PrismaClient } from '@prisma/client';
import { departments } from '../src/data/employeeData';
import { managementData } from '../src/data/managementData';

const prisma = new PrismaClient();

async function main() {
  // Seed Departments and Employees
  for (const dept of departments) {
    const createdDept = await prisma.department.create({
      data: {
        name: dept.name,
        employees: {
          create: dept.employees.map(emp => ({
            firstName: emp.firstName,
            lastName: emp.lastName,
          })),
        },
      },
    });
    console.log(`Created department: ${createdDept.name}`);
  }

  // Seed Management Roles
  for (const role of managementData) {
    await prisma.role.create({
      data: {
        firstName: role.firstName,
        lastName: role.lastName,
        role: role.role,
      },
    });
    console.log(`Created role: ${role.role}`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
