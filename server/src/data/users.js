// 절대 실서비스에서는 이렇게 하시면 안 됩니다(데모용).
// 비밀번호는 bcrypt 해시로 저장되어야 합니다.

const users = [
  {
    id: 1,
    email: "admin@scoophub.com",
    // password: admin1234
    passwordHash:
      "$2a$10$mEd32CuF8YHYG788o.ecqubdtKTjLQWP3.n6c5oGZ0YZpCwBrQFgW",
    role: "admin",
    name: "Admin",
  },
  {
    id: 2,
    email: "customer@scoophub.com",
    // password: customer1234
    passwordHash:
      "$2a$10$Qn7Jm4mO4x7i0z6j3j9K4e0uAqzQdNnJ8mU2FQmJ0m1o2f0fP2l5y",
    role: "customer",
    name: "Customer",
  },
  {
    id: 3,
    email: "company@scoophub.com",
    // password: company1234
    passwordHash:
      "$2a$10$zv1p9n4fYt9j7x9YgqQ6ZeV6wq5nH1Z7mK2H1w0o1nq3J9L7jYt1C",
    role: "company",
    name: "Company",
  },
];

module.exports = { users };
