export const chats = [
  {
    id: 1,
    name: "Kenny Elias",
    message: "Yeah, we will talk about the vehicle issues later",
    time: "15:47pm",
    image: require("@/assets/images/kenny.png"),
    unreadCount: 2,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    message: "Thanks! I really appreciate it.",
    time: "14:22pm",
    image: require("@/assets/images/person1.jpg"),
    unreadCount: 5,
  },
  {
    id: 3,
    name: "Daniel Smith",
    message: "Can you send the report today?",
    time: "13:11pm",
    image: require("@/assets/images/person2.jpg"),
  },
  {
    id: 4,
    name: "Lisa Adams",
    message: "Meet me at the usual spot.",
    time: "12:30pm",
    image: require("@/assets/images/person3.jpg"),
  },
  {
    id: 5,
    name: "Tom Brooks",
    message: "That works for me 👍",
    time: "11:18am",
    image: require("@/assets/images/person4.jpg"),
  },
  {
    id: 6,
    name: "Emma White",
    message: "I’m almost there, give me 5 mins.",
    time: "10:45am",
    image: require("@/assets/images/person5.jpg"),
    unreadCount: 1,
  },
  {
    id: 7,
    name: "Chris Walker",
    message: "Call me when you're free.",
    time: "10:00am",
    image: require("@/assets/images/person6.jpg"),
  },
  {
    id: 8,
    name: "Olivia Brown",
    message: "That’s awesome 😄",
    time: "09:37am",
    image: require("@/assets/images/person7.jpg"),
  },
  {
    id: 9,
    name: "Mark Davis",
    message: "We need to reschedule the meeting.",
    time: "09:02am",
    image: require("@/assets/images/person8.jpg"),
  },
  {
    id: 10,
    name: "Sophia Lee",
    message: "Let’s touch base tomorrow.",
    time: "08:45am",
    image: require("@/assets/images/person9.jpg"),
  },
];

export const conversations = [
  {
    senderId: "user1",
    receiverId: "user2",
    message:
      "Bro… I just had the weirdest dream. Like, I was riding a giant slice of pizza through the clouds while debating politics with a talking raccoon.",
    timeSent: new Date("2025-04-17T23:45:00Z"),
  },
  {
    senderId: "user1",
    receiverId: "user2",
    message:
      "And the raccoon had a monocle. I'm concerned about my brain at this point 💀",
    timeSent: new Date("2025-04-17T23:46:10Z"),
  },
  {
    senderId: "user2",
    receiverId: "user1",
    message:
      "😂 What did you eat before bed?? That sounds like a cheese-induced hallucination.",
    timeSent: new Date("2025-04-17T23:48:22Z"),
  },
  {
    senderId: "user1",
    receiverId: "user2",
    message:
      "Taco Bell. At 11:30 PM. With a side of regret and existential dread.",
    timeSent: new Date("2025-04-17T23:50:03Z"),
  },

  // === Day break ===
  {
    senderId: "user2",
    receiverId: "user1",
    message:
      "Morning! Just saw your messages from last night… wow. Also, I accidentally brushed my teeth with face wash. Send help.",
    timeSent: new Date("2025-04-18T08:02:44Z"),
  },
  {
    senderId: "user1",
    receiverId: "user2",
    message:
      "Wait what? 😂\nYour mouth must smell like a skincare commercial now.",
    timeSent: new Date("2025-04-18T08:04:01Z"),
  },
  {
    senderId: "user2",
    receiverId: "user1",
    message:
      "Yeah but it burns like betrayal.\nAnyway, how’s the UI redesign coming?",
    timeSent: new Date("2025-04-18T08:05:12Z"),
  },
  {
    senderId: "user1",
    receiverId: "user2",
    message:
      "Almost done.\nSpent 2 hours animating a toggle switch because my brain decided that was priority number one 🤦‍♂️",
    timeSent: new Date("2025-04-18T08:06:55Z"),
  },
  {
    senderId: "user1",
    receiverId: "user2",
    message:
      "But hey, it glows now. Like... *a little too much* but it’s ✨ aesthetic ✨",
    timeSent: new Date("2025-04-18T08:08:00Z"),
  },
  {
    senderId: "user2",
    receiverId: "user1",
    message:
      "As long as it doesn’t blind the users.\nBTW, do you remember that squirrel from the park that chased me?",
    timeSent: new Date("2025-04-18T08:09:45Z"),
  },
  {
    senderId: "user2",
    receiverId: "user1",
    message:
      "It came back today.\nIt stared into my soul.\nI think I owe it money or something.",
    timeSent: new Date("2025-04-18T08:10:22Z"),
  },

  // === Next Day ===
  {
    senderId: "user1",
    receiverId: "user2",
    message: "LMAO did you name it yet?\nI vote for Sir Nutters the III 🐿️",
    timeSent: new Date("2025-04-19T10:15:00Z"),
  },
  {
    senderId: "user2",
    receiverId: "user1",
    message:
      "It’s official now.\nSir Nutters has declared my front yard as a sovereign squirrel state.",
    timeSent: new Date("2025-04-19T10:17:30Z"),
  },
  {
    senderId: "user1",
    receiverId: "user2",
    message:
      "I bow to your new ruler.\nDo I need a visa to visit your house now?",
    timeSent: new Date("2025-04-19T10:18:45Z"),
  },
  {
    senderId: "user1",
    receiverId: "user2",
    message:
      "Also, random thought: if you were a sandwich, what kind would you be?",
    timeSent: new Date("2025-04-19T10:20:00Z"),
  },
  {
    senderId: "user2",
    receiverId: "user1",
    message:
      "Easy. Grilled cheese with a twist. Like maybe jalapeños or something unexpected. Spicy, chaotic, yet comforting.",
    timeSent: new Date("2025-04-19T10:21:30Z"),
  },
  {
    senderId: "user2",
    receiverId: "user1",
    message: "What about you?",
    timeSent: new Date("2025-04-19T10:21:45Z"),
  },
  {
    senderId: "user1",
    receiverId: "user2",
    message:
      "PB&J but with a secret layer of Nutella in the middle.\nBecause I look classic on the outside, but deep down, I'm a chocolate-loving maniac.",
    timeSent: new Date("2025-04-19T10:23:12Z"),
  },

  // === New Day ===
  {
    senderId: "user2",
    receiverId: "user1",
    message:
      "OKAY but why did I just find a spoon in the fridge?\nLike, not a bowl. Just… a lonely spoon. Cold. Forgotten. 😢",
    timeSent: new Date("2025-04-20T07:10:00Z"),
  },
  {
    senderId: "user1",
    receiverId: "user2",
    message: "That spoon’s been through things. Let it chill 🥄❄️",
    timeSent: new Date("2025-04-20T07:12:25Z"),
  },
  {
    senderId: "user1",
    receiverId: "user2",
    message:
      "Also I can’t find my left sock and I swear it’s plotting something with the spoon.",
    timeSent: new Date("2025-04-20T07:13:00Z"),
  },
  {
    senderId: "user2",
    receiverId: "user1",
    message:
      "This is why we need to sleep more. We’re unraveling. Socks, spoons, squirrels… what’s next?",
    timeSent: new Date("2025-04-20T07:14:30Z"),
  },
  {
    senderId: "user1",
    receiverId: "user2",
    message:
      "Next up: fridge poetry with expired condiments.\nComing soon to a theater near you.",
    timeSent: new Date("2025-04-20T07:15:40Z"),
  },

  // === Short break, then random late night thought ===
  {
    senderId: "user1",
    receiverId: "user2",
    message:
      "You ever think about how strawberries aren’t actually berries, but bananas are? This world is a lie.",
    timeSent: new Date("2025-04-21T01:48:00Z"),
  },
  {
    senderId: "user2",
    receiverId: "user1",
    message: "You can’t just drop that at 2 AM 😭 now I need to Google this.",
    timeSent: new Date("2025-04-21T01:49:10Z"),
  },
  {
    senderId: "user1",
    receiverId: "user2",
    message:
      "I live for chaos. Also, avocados are berries too. Sleep well with that info.",
    timeSent: new Date("2025-04-21T01:50:22Z"),
  },
  {
    senderId: "user2",
    receiverId: "user1",
    message: "I'm blocking you after this 😂",
    timeSent: new Date("2025-04-21T01:50:40Z"),
  },

  // === Morning of the same day ===
  {
    senderId: "user1",
    receiverId: "user2",
    message:
      "Good morning, sunshine ☀️\nStill thinking about berry conspiracies?",
    timeSent: new Date("2025-04-21T08:01:03Z"),
  },
  {
    senderId: "user2",
    receiverId: "user1",
    message:
      "Unfortunately, yes.\nAlso, I just spilled coffee on my keyboard, so if you get a message like ‘ggagggg’ later, that’s why.",
    timeSent: new Date("2025-04-21T08:03:45Z"),
  },
  {
    senderId: "user1",
    receiverId: "user2",
    message:
      "Tell your keyboard I’m sorry for its sacrifice. It died for the beans 🫡",
    timeSent: new Date("2025-04-21T08:05:00Z"),
  },
];
