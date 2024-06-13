// The provided course information.
const COURSEINFO = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const ASSIGNMENTGROUP = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LEARNERSUBMISSIONS = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

function inLearnerData(ID, learnerData) {
  //console.log("inLearnerData(" + ID + "," + learnerData + ")");
  //console.log("LEARNERDATA: " + learnerData);
  if (learnerData.length == 0) {
    console.log("returns false");
    return false;
  } else {
    for (let i = 0; i < learnerData.length; i++) {
      //console.log("learnerData.ID: " + learnerData[i].id + "\nID: " + ID);
      if (learnerData[i].id == ID) {
        console.log("returning true");
        return true;
      }
    }
  }
  console.log("returning false");
  return false;
}

function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
  //
  //   check if assignment group matches courseinfo
  //
  console.log("learnerSubmisssions: " + learnerSubmissions);

  let thisSub = {};
  let thisID = 0;
  let learnerData = [];
  let thisLearner = {};

  for (let i = 0; i < learnerSubmissions.length; i++) {
    thisSub = learnerSubmissions[i];
    thisID = thisSub.learner_id;
    //console.log(thisSub);
    //console.log(thisID);
    if (!inLearnerData(thisID, learnerData)) {
      let thisLearner = {};
      //add entry with new student id
      learnerData.push(thisLearner);
      //   console.log(learnerData);

      thisLearner.id = thisID;
      thisLearner.avg = 0;
      console.log(learnerData);
    }
    //code that happens for each submission now that each learner gets added at their first appearance
    console.log("thisSub: " + thisSub);
  }
}
getLearnerData(COURSEINFO, ASSIGNMENTGROUP, LEARNERSUBMISSIONS);
