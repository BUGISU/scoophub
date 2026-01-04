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
      "$2b$10$coQlvi11/q5g1wSjykx/7OUTuNJXAEzNIOMzhLDGyNsc3cetGz1Da",
    role: "customer",
    name: "Customer",
  },
  {
    id: 3,
    email: "company@scoophub.com",
    // password: company1234
    passwordHash:
      "$2b$10$xBR4dRsOpFobgUF7EBmy3uMDT3VV84wU82DnYZEkUdWuvqkxVVH26",
    role: "company",
    name: "Company",
  },
];

module.exports = { users };
