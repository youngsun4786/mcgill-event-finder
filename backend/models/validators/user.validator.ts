export const jsonSchema = {
  $jsonSchema: {
    bsonType: "object",
    title: "User Object Validation",
    required: ["name", "email", "password", "role"],
    additionalProperties: true,
    properties: {
      _id: {},
      name: {
        bsonType: "string",
        description: "'name' is required and is a string",
        minLength: 2,
        maxLength: 32,
      },
      email: {
        bsonType: "string",
        pattern: "^.+@.+$",
        description: "'email' is required and is a string",
        minLength: 4,
        maxLength: 50,
      },
      password: {
        bsonType: "string",
        description: "'password' is required and is a string",
        minLength: 3,
      },
      role: {
        enum: ["student", "professor", "admin", "staff"],
        description: "'role' of the user that must be selected",
      },
      pins: {
        bsonType: ["array"],
        minItems: 0,
        description: "'pins' is an array of posts",
        items: {
          bsonType: ["object"],
        },
      },
      createdAt: {
        bsonType: "date",
        description: "'createdAt' is a date",
      },
      updatedAt: {
        bsonType: "date",
        description: "'updatedAt' is a date",
      },
    },
  },
};
