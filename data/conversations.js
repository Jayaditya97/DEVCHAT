const conversations = [
  {
    id: 1,
    members: [1, 2], // user ids
    isGroup: false,
    name: null,
    lastMessage: "Hello",
    updatedAt: new Date(),
  },
  {
    id: 2,
    members: [1, 3],
    isGroup: false,
    name: null,
    lastMessage: "Hey",
    updatedAt: new Date(),
  },
];

module.exports = conversations;