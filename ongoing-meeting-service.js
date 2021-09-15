const { getUserByUsername } = require('./user-service');
const ongoing_meetings = [];

const getOngoinMeetingById = (meetingId) => {
    return ongoing_meetings.find((meeting) => meeting.id == meetingId);
};

const initiateMeeting = (meetingId, username, socketId) => {

    let user = getUserByUsername(username);
    if (!user) {
        user = { username, name: username };
    }

    thisUser = { ...user };
    thisUser.socketId = socketId;
    // let meeting = ongoing_meetings.find(meeting => meeting.meetingId == meetingId);

    let meeting = {
        id: meetingId,
        users: [],
        initiator: null,
        startTime: null,
        entTime: null,
    };

    console.log(meeting, 'meetings');

    meeting = { ...meeting, users: [], initiator: thisUser, startTime: new Date() }
    ongoing_meetings.push(meeting);
    return meeting;
}

const joinMeeting = (meetingId, username, socketId) => {
    let meeting = ongoing_meetings.find(meeting => meeting.id === meetingId);
    var userIndex;
    if (!meeting) {
        meeting = initiateMeeting(meetingId, username, socketId)
    }

    let user = getUserByUsername(username);
    if (!user) {
        user = { username, name: username };
    }
    console.log(user , 'user');
    thisUser = { ...user };
    thisUser.socketId = socketId;

    for (var key in ongoing_meetings) {
        var data = ongoing_meetings[key];
        userIndex = data.users.findIndex((user) => user.username == thisUser.username)
    }

    if (userIndex === -1) {
        meeting.users.push(thisUser);

    }
    else {
        meeting.users[userIndex] = thisUser;
    }
    return meeting;
}

const leaveMeeting = (meetingId, username, socketId) => {
    let meeting = ongoing_meetings.find((meeting) => meeting.id == meetingId);
    if (!meeting) {
        return {};
    }
    const user = meeting.users.find((u) => u.socketId === socketId);
    meeting.users.splice(meeting.users.indexOf(user), 1);
    return { meeting, user };
};

const endMeeting = (meetingId) => {
    return ongoing_meetings.splice(
        ongoing_meetings.findIndex((meeting) => meeting.id == meetingId),
        1
    )[0];
};


module.exports = {
    getOngoinMeetingById,
    joinMeeting,
    initiateMeeting,
    leaveMeeting,
    endMeeting,
}