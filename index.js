const COURSEINFO = {
  id: 451,
  name: "Introduction to JavaScript",
};

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
  if (learnerData.length == 0) {
    return false;
  } else {
    for (let i = 0; i < learnerData.length; i++) {
      if (learnerData[i].id == ID) {
        return true;
      }
    }
  }
  return false;
}

function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
  //console.log("learnerSubmissions: ", learnerSubmissions);

  let thisSub = {};
  let thisID = 0;
  let learnerData = [];
  const cutoffDate = new Date("2024-06-13");

  for (let i = 0; i < learnerSubmissions.length; i++) {
    thisSub = learnerSubmissions[i];
    thisID = thisSub.learner_id;

    if (!inLearnerData(thisID, learnerData)) {
      let thisLearner = {};
      learnerData.push(thisLearner);
      thisLearner.id = thisID;
      thisLearner.avg = 0;
      thisLearner.totalPointsPossible = 0; // Initialize totalPointsPossible
      thisLearner.totalPointsEarned = 0; // Initialize totalPointsEarned
    }

    // Find the assignment with the matching id using a for loop
    let thisAssignmentId = thisSub.assignment_id;
    let maxPoints = 0;
    let dueDate;

    for (let j = 0; j < assignmentGroup.assignments.length; j++) {
      if (assignmentGroup.assignments[j].id === thisAssignmentId) {
        maxPoints = assignmentGroup.assignments[j].points_possible;
        dueDate = new Date(assignmentGroup.assignments[j].due_at);
        break;
      }
    }

    // Skip this assignment if its due date is after the cutoff date
    if (dueDate > cutoffDate) {
      continue;
    }

    // Update the totalPointsPossible and totalPointsEarned for the learner
    for (let k = 0; k < learnerData.length; k++) {
      if (learnerData[k].id == thisID) {
        learnerData[k].totalPointsPossible += maxPoints;
        learnerData[k].totalPointsEarned += thisSub.submission.score;
        // Add new property for the assignment score
        learnerData[k][thisAssignmentId] = thisSub.submission.score / maxPoints;
        break;
      }
    }

    console.log("thisSub: ", thisSub);
  }

  // Calculate the avg for each learner after all submissions are processed
  for (let k = 0; k < learnerData.length; k++) {
    if (learnerData[k].totalPointsPossible > 0) {
      learnerData[k].avg =
        learnerData[k].totalPointsEarned / learnerData[k].totalPointsPossible;
    }
  }

  return learnerData;
}

console.log(getLearnerData(COURSEINFO, ASSIGNMENTGROUP, LEARNERSUBMISSIONS));
