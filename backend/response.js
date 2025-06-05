function getResponse(prompt) {
  const lowerPrompt = prompt.toLowerCase();

  const keywordMap = [
    { keywords: ['about yourself', 'who are you'], reply: "Hi, I'm Michalis, an electrical engineering student passionate about building web applications and AI." },
    { keywords: ['projects', 'worked on'], reply: "I've developed a trading bot, an emotion detection app and a computer vision program." },
    { keywords: ['skills', 'expertise'], reply: "I'm skilled in JavaScript, Python, C++, and Java." },
    { keywords: ['study', 'education'], reply: "I am enrolled in Aristotle University of Thessaloniki, pursuing an Electrical Engineering degree." },
    { keywords: ['hobbies', 'interests'], reply: "I play chess, piano, and basketball." },
    {keywords: ['graduate', 'finished'], reply: "I haven't graduated yet, I'm still completing my degree."},
    {keywords: ['work', 'method'],reply: "I work methodically, breaking down problems and building efficient solutions, often using agile practices."}
  ];

  for (const entry of keywordMap) {
    for (const keyword of entry.keywords) {
      if (lowerPrompt.includes(keyword)) {
        return entry.reply;
      }
    }
  }

  return "Sorry, I didn't understand that. Could you ask something else?";
}

module.exports = { getResponse };