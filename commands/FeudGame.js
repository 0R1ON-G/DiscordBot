module.exports = {
    name:'FeudGame',
    description: "Runs the whole Discord Feud Game",
    async execute(message, args){
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }
          
const QuestionArray = ["How many friends do you have?", "How many hours are you online every day?", "What is your favorite animal?", "What is your favorite video game?", "Who is your favorite streamer?", "Who is the best teacher at CV?"];

var AnswerArray = [
    ["0", "3", "5", "10", "EMPTY", "EMPTY", "EMPTY"],
    ["1", "2", "3", "6", "EMPTY", "EMPTY", "EMPTY"],
    ["dog", "cat", "capibarra", "monkey", "EMPTY", "EMPTY", "EMPTY", "EMPTY"],
    ["apexlegends", "fortnite", "warzone", "eldenring", "minecraft", "EMPTY", "EMPTY"],
    ["xqc", "hasanabi", "jidion", "shroud", "iitztimmy", "drdisrespect", "EMPTY"],
    ["mr.poole", "poole", "mr poole", "EMPTY", "EMPTY", "EMPTY", "EMPTY"]
    ];

var PointsArray = [
    ["10", "25", "15", "50", "0", "0", "0"],
    ["25", "30", "35", "10", "0", "0", "0"],
    ["25", "35", "20", "20", "0", "0", "0"],
    ["20", "10", "10", "20", "40", "0", "0"],
    ["25", "15", "5", "15", "20", "20", "0"],
    ["100", "100", "100", "0", "0", "0", "0"]
    ];
    
var PointsAward = ["0", "0", "0", "0", "0"];

var UserAnswer = [];

var Qused = [];

var Qasked = false;
    
for(var i = 0; i < 5; i++) {
    var Qindex = 0;
    var Qasked = true;
    while(Qasked) {
        Qindex = getRandomInt(QuestionArray.length);
        var Question = QuestionArray[Qindex];
        Qasked = Qused.includes(Question);
        
    }
    Qused.push(QuestionArray[Qindex]);
    message.channel.send(QuestionArray[Qindex]);

    var Aindex = 0;
    // The Sleep and Message Catch Function!
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
   
   async function count() {
       const msg = await message.channel.send("Time Remaining: 10");
       var running = true;
       const filter = m => true;
       const collector = message.channel.createMessageCollector({ filter, time: 10_000 });
       function collectEvent(m) {
        running = false;
        UserAnswer.push(m.content);
        collector.stop();
       }
    
       collector.on('collect', collectEvent);
       for(var a = 9; a >= 0; a--) {
           await sleep(1000);
           if(!running) {
               break;
           }
           msg.edit("Time Remaining: " + a);
       }
       if(running) {
           UserAnswer.push("NO ASNWER");
       }
   }
    await count();

   //message collector here

    var Answer = UserAnswer[i];

    

    for (var Aindex = 0; Aindex < AnswerArray[Qindex].length; Aindex++) {
        if(Answer == (AnswerArray[Qindex][Aindex])) {
            PointsAward[i] = (PointsArray[Qindex][Aindex]);
        }
    }
}

for(var i = 0; i < 5; i++) {
    message.channel.send(UserAnswer[i] + " : " + PointsAward[i] + " Points");
}

var TotalPoints = 0;

for(var i = 0; i < 5; i++) {
    TotalPoints = Number(Number(TotalPoints) + Number(PointsAward[i]));
}

message.channel.send("You got a total of: " + TotalPoints + " Points!");

}
}